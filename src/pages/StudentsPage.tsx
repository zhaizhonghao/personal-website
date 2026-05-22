import { GraduationCap, MapPin } from 'lucide-react';
import Section from '../components/Section';
import students from '../data/students';
import type { Student } from '../data/students';

const degreeLabels: Record<Student['degree'], string> = {
  PhD: 'PhD Student',
  Master: "Master's Student",
  Undergraduate: 'Undergraduate',
};

const degreeColors: Record<Student['degree'], string> = {
  PhD: 'bg-primary/10 text-primary',
  Master: 'bg-accent-light text-accent',
  Undergraduate: 'bg-surface text-text-light',
};

export default function StudentsPage() {
  const currentStudents = students.filter(s => !s.currentPosition);
  const formerStudents = students.filter(s => s.currentPosition);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Students</h1>

      <Section title="Current Students" subtitle="Students currently under my supervision">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentStudents.map((student, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap size={18} className="text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-primary">{student.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${degreeColors[student.degree]}`}>
                    {degreeLabels[student.degree]}
                  </span>
                </div>
                <p className="text-sm text-text-light mb-1">{student.research}</p>
                <span className="text-xs text-text-light">{student.period}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Former Students" subtitle="Alumni and their current positions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formerStudents.map((student, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                <GraduationCap size={18} className="text-text-light" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-primary">{student.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${degreeColors[student.degree]}`}>
                    {degreeLabels[student.degree]}
                  </span>
                </div>
                <p className="text-sm text-text-light mb-1">{student.research}</p>
                <div className="flex items-center gap-3 text-xs text-text-light">
                  <span>{student.period}</span>
                  {student.currentPosition && (
                    <span className="flex items-center gap-1 text-accent font-medium">
                      <MapPin size={12} />
                      {student.currentPosition}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
