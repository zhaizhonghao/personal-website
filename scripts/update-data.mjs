import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const ORCID_ID = '0000-0002-7410-8677';
const ORCID_API = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;
const GS_URL = 'https://scholar.google.com/citations?user=gBY1cdcAAAAJ&hl=en&sortby=pubdate&pagesize=100';

const TYPE_MAP = {
  'journal-article': 'journal',
  'conference-paper': 'conference',
  preprint: 'preprint',
};

function normalizeDoi(doi) {
  return doi ? doi.toLowerCase().trim() : '';
}

function escapeStr(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// --- ORCID ---

async function fetchOrcidWorks() {
  const res = await fetch(ORCID_API, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`ORCID API error: ${res.status}`);
  const data = await res.json();

  const works = [];
  const seen = new Set();

  for (const group of data.group || []) {
    for (const ws of group['work-summary'] || []) {
      const title = ws.title?.title?.value || '';
      const key = title.toLowerCase().trim();
      if (seen.has(key)) continue;
      seen.add(key);

      const doi = (ws['external-ids']?.['external-id'] || []).find(
        e => e['external-id-type'] === 'doi'
      )?.['external-id-value'] || '';

      const pubDate = ws['publication-date'] || {};
      const year = parseInt(pubDate.year?.value, 10) || null;
      const journal = ws['journal-title']?.value || '';

      works.push({
        title,
        doi: normalizeDoi(doi),
        year,
        venue: journal,
        type: TYPE_MAP[ws.type] || 'other',
        link: doi ? `https://doi.org/${doi}` : '',
      });
    }
  }

  return works.sort((a, b) => {
    if (b.year !== a.year) return (b.year || 0) - (a.year || 0);
    return a.title.localeCompare(b.title);
  });
}

// --- Google Scholar (best effort) ---

async function fetchGoogleScholar() {
  try {
    const res = await fetch(GS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Citation metrics
    const metrics = {};
    const tableMatch = html.match(/<table[^>]*id="gsc_rsb_st"[^>]*>([\s\S]*?)<\/table>/);
    if (tableMatch) {
      const vals = [...tableMatch[1].matchAll(/<td class="gsc_rsb_std">(\d+)<\/td>/g)].map(m => parseInt(m[1]));
      if (vals.length >= 6) {
        metrics.citationsAll = vals[0];
        metrics.citationsRecent = vals[1];
        metrics.hIndexAll = vals[2];
        metrics.hIndexRecent = vals[3];
        metrics.i10IndexAll = vals[4];
        metrics.i10IndexRecent = vals[5];
      }
    }

    // Per-paper citations
    const pubs = [];
    const rows = html.matchAll(/<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g);
    for (const row of rows) {
      const t = row[1].match(/<a[^>]*class="gsc_a_at"[^>]*>([^<]+)<\/a>/);
      const c = row[1].match(/<td class="gsc_a_c"[^>]*>.*?<a[^>]*>(\d+)<\/a>/);
      const y = row[1].match(/<td class="gsc_a_y"[^>]*>.*?<span[^>]*>(\d+)<\/span>/);
      if (t) pubs.push({
        title: t[1].trim(),
        citations: c ? parseInt(c[1]) : undefined,
        year: y ? parseInt(y[1]) : null,
      });
    }

    return { metrics, pubs };
  } catch {
    console.log('Google Scholar fetch failed, keeping existing citation data');
    return null;
  }
}

// --- Parse existing publications.ts ---

function parseExistingPublications() {
  const filePath = resolve(ROOT, 'src/data/publications.ts');
  const content = readFileSync(filePath, 'utf-8');

  const pubs = [];
  // Match each publication object
  const blockRegex = /\{\s*\n([\s\S]*?)\s*\}/g;
  let block;
  while ((block = blockRegex.exec(content)) !== null) {
    const body = block[1];

    const getStr = (key) => {
      const m = body.match(new RegExp(`${key}:\\s*'([^']*)'`));
      return m ? m[1] : '';
    };
    const getNum = (key) => {
      const m = body.match(new RegExp(`${key}:\\s*(\\d+)`));
      return m ? parseInt(m[1]) : undefined;
    };

    const title = getStr('title');
    if (!title) continue;

    pubs.push({
      title,
      authors: getStr('authors'),
      venue: getStr('venue'),
      year: getNum('year') || 0,
      type: getStr('type') || 'other',
      doi: normalizeDoi(getStr('doi')),
      link: getStr('link'),
      citations: getNum('citations'),
    });
  }

  return pubs;
}

// --- Merge ---

function mergePublications(orcidWorks, existingPubs, gsData) {
  const byDoi = new Map();
  const byTitle = new Map();
  for (const pub of existingPubs) {
    if (pub.doi) byDoi.set(pub.doi, pub);
    byTitle.set(pub.title.toLowerCase().trim(), pub);
  }

  const merged = orcidWorks.map(work => {
    const existing = work.doi ? byDoi.get(work.doi) : null
      || byTitle.get(work.title.toLowerCase().trim());

    let citations = existing?.citations;
    if (gsData?.pubs) {
      const gs = gsData.pubs.find(
        g => g.title.toLowerCase().trim() === work.title.toLowerCase().trim()
      );
      if (gs?.citations !== undefined) citations = gs.citations;
    }

    return {
      title: work.title,
      authors: existing?.authors || '',
      venue: work.venue || existing?.venue || '',
      year: work.year || existing?.year || 0,
      type: work.type || existing?.type || 'other',
      doi: work.doi || existing?.doi || '',
      link: work.link || existing?.link || '',
      citations,
    };
  });

  // Keep existing pubs not present in ORCID
  const mergedDois = new Set(merged.map(p => p.doi).filter(Boolean));
  const mergedTitles = new Set(merged.map(p => p.title.toLowerCase().trim()));

  for (const pub of existingPubs) {
    if (
      (!pub.doi || !mergedDois.has(pub.doi)) &&
      !mergedTitles.has(pub.title.toLowerCase().trim())
    ) {
      merged.push({ ...pub, venue: pub.venue || '' });
    }
  }

  merged.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });

  return merged;
}

// --- Generate output ---

function generatePublicationsTs(pubs) {
  const lines = [
    'export interface Publication {',
    '  title: string;',
    '  authors: string;',
    '  venue: string;',
    '  year: number;',
    "  type: 'journal' | 'conference' | 'preprint' | 'other';",
    '  doi?: string;',
    '  link?: string;',
    '  citations?: number;',
    '}',
    '',
    'const publications: Publication[] = [',
  ];

  for (const pub of pubs) {
    lines.push('  {');
    lines.push(`    title: '${escapeStr(pub.title)}',`);
    lines.push(`    authors: '${escapeStr(pub.authors)}',`);
    lines.push(`    venue: '${escapeStr(pub.venue)}',`);
    lines.push(`    year: ${pub.year},`);
    lines.push(`    type: '${pub.type}',`);
    if (pub.doi) lines.push(`    doi: '${pub.doi}',`);
    if (pub.link) lines.push(`    link: '${pub.link}',`);
    if (pub.citations !== undefined) lines.push(`    citations: ${pub.citations},`);
    lines.push('  },');
  }

  lines.push('];');
  lines.push('');
  lines.push('export default publications;');
  lines.push('');

  return lines.join('\n');
}

// --- Main ---

async function main() {
  console.log('Fetching ORCID data...');
  const orcidWorks = await fetchOrcidWorks();
  console.log(`  Found ${orcidWorks.length} works from ORCID`);

  console.log('Reading existing publications...');
  const existingPubs = parseExistingPublications();
  console.log(`  Found ${existingPubs.length} existing publications`);

  console.log('Fetching Google Scholar data...');
  const gsData = await fetchGoogleScholar();
  if (gsData) {
    console.log(`  GS publications: ${gsData.pubs?.length || 0}`);
    if (gsData.metrics) {
      console.log(`  Citations: ${gsData.metrics.citationsAll}, h-index: ${gsData.metrics.hIndexAll}, i10: ${gsData.metrics.i10IndexAll}`);
    }
  }

  console.log('Merging...');
  const merged = mergePublications(orcidWorks, existingPubs, gsData);
  console.log(`  Total: ${merged.length} publications`);

  const newContent = generatePublicationsTs(merged);
  const filePath = resolve(ROOT, 'src/data/publications.ts');
  const oldContent = readFileSync(filePath, 'utf-8');

  if (newContent === oldContent) {
    console.log('No changes detected. Skipping update.');
    return;
  }

  writeFileSync(filePath, newContent, 'utf-8');
  console.log('publications.ts updated!');
}

main().catch(err => {
  console.error('Update failed:', err.message);
  process.exit(1);
});
