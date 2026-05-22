import { type ReactNode } from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-text-light">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
