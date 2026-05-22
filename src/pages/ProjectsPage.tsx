import { ExternalLink } from 'lucide-react';
import Section from '../components/Section';
import projects from '../data/projects';

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Projects</h1>

      <Section title="Research Projects" subtitle="Major research projects I have led or participated in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-primary text-lg">{project.name}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-1.5 rounded-lg hover:bg-accent-light text-text-light hover:text-primary transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <p className="text-sm text-text-light mb-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {project.role}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface text-text-light font-medium">
                  {project.period}
                </span>
                {project.funding && (
                  <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                    {project.funding}
                  </span>
                )}
              </div>

              <div className="mt-auto">
                <h4 className="text-xs font-semibold text-text-light uppercase tracking-wider mb-2">
                  Key Outcomes
                </h4>
                <ul className="space-y-1.5">
                  {project.outcomes.map((outcome, j) => (
                    <li key={j} className="text-sm text-text flex items-start gap-2">
                      <span className="text-accent mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
