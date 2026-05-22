import { Link } from 'react-router-dom';
import { BookOpen, FolderGit2, Users, Mail, ExternalLink } from 'lucide-react';
import Section from '../components/Section';
import profile from '../data/profile';
import avatarImg from '../assets/avatar.jpg';

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <img
          src={avatarImg}
          alt={profile.name}
          className="w-28 h-28 mx-auto mb-6 rounded-full object-cover ring-4 ring-primary/10 shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
          {profile.name}
        </h1>
        <p className="text-lg text-text-light mb-2">{profile.title}</p>
        <p className="text-text-light">{profile.affiliation}</p>
        <div className="mt-4 flex justify-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
          >
            <Mail size={16} />
            Email
          </a>
          {profile.socialLinks.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-sm font-medium text-text-light hover:text-primary hover:border-primary transition-colors"
            >
              {label}
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </section>

      {/* Bio */}
      <Section title="About">
        <p className="text-text leading-relaxed max-w-3xl">{profile.bio}</p>
      </Section>

      {/* Research Interests */}
      <Section title="Research Interests">
        <div className="flex flex-wrap gap-2">
          {profile.interests.map(interest => (
            <span
              key={interest}
              className="px-4 py-2 rounded-full bg-accent-light text-primary text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </Section>

      {/* Quick Links */}
      <Section title="Explore">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/research"
            className="flex items-start gap-4 p-6 rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all group"
          >
            <BookOpen className="text-primary mt-0.5 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-primary group-hover:text-primary-light transition-colors">
                Research
              </h3>
              <p className="text-sm text-text-light mt-1">
                Publications, patents, and academic awards
              </p>
            </div>
          </Link>
          <Link
            to="/projects"
            className="flex items-start gap-4 p-6 rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all group"
          >
            <FolderGit2 className="text-primary mt-0.5 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-primary group-hover:text-primary-light transition-colors">
                Projects
              </h3>
              <p className="text-sm text-text-light mt-1">
                Research projects and outcomes
              </p>
            </div>
          </Link>
          <Link
            to="/students"
            className="flex items-start gap-4 p-6 rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all group"
          >
            <Users className="text-primary mt-0.5 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-primary group-hover:text-primary-light transition-colors">
                Students
              </h3>
              <p className="text-sm text-text-light mt-1">
                Current and former students I have mentored
              </p>
            </div>
          </Link>
        </div>
      </Section>
    </div>
  );
}
