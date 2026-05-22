import { ExternalLink, FileText } from 'lucide-react';
import Section from '../components/Section';
import publications from '../data/publications';

const typeLabels: Record<string, string> = {
  journal: 'Journal',
  conference: 'Conference',
  preprint: 'Preprint',
};

export default function ResearchPage() {
  const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Research</h1>

      {/* Publications */}
      <Section title="Publications" subtitle="Selected publications in reverse chronological order">
        {years.map(year => (
          <div key={year} className="mb-8">
            <h3 className="text-lg font-semibold text-primary mb-4 border-b border-border pb-2">
              {year}
            </h3>
            <div className="space-y-4">
              {publications
                .filter(p => p.year === year)
                .map((pub, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <FileText size={20} className="text-text-light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text mb-1">{pub.title}</h4>
                      <p className="text-sm text-text-light mb-1">{pub.authors}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent-light text-primary font-medium">
                          {typeLabels[pub.type]}
                        </span>
                        <span className="text-sm text-text-light">{pub.venue}</span>
                        {pub.citations !== undefined && (
                          <span className="text-xs text-text-light">
                            {pub.citations} citation{pub.citations !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 rounded-lg hover:bg-accent-light text-text-light hover:text-primary transition-colors"
                        title="View paper"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </Section>

      {/* Patents */}
      <Section title="Patents">
        <div className="text-text-light text-sm">
          Patent information will be added here. Please update this section with your patent details.
        </div>
      </Section>

      {/* Awards */}
      <Section title="Awards & Honors">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-sm font-medium text-primary min-w-[4rem]">2024</span>
            <span className="text-text">Best Paper Award, NeurIPS Workshop on Efficient ML</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-sm font-medium text-primary min-w-[4rem]">2023</span>
            <span className="text-text">Outstanding Reviewer, ICML / NeurIPS / ICLR</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-sm font-medium text-primary min-w-[4rem]">2022</span>
            <span className="text-text">Early Career Research Award, Funding Agency</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-sm font-medium text-primary min-w-[4rem]">2020</span>
            <span className="text-text">Best Dissertation Award, University</span>
          </div>
        </div>
      </Section>
    </div>
  );
}
