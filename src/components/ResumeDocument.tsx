import React from 'react';
import { ResumeData } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

interface ResumeDocumentProps {
  data: ResumeData;
  compactMode?: boolean;
  highlightKeywords?: boolean;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  data,
  compactMode = true,
  highlightKeywords = false,
}) => {
  const { personalInfo, careerObjective, education, skills, projects, certifications, achievements, activities, strengths } = data;

  const keywordList = [
    'Python', 'Java', 'C', 'Flask', 'MySQL', 'SQLite', 'Git', 'GitHub', 'HTML', 'HTML5',
    'CSS', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'n8n', 'Google AI Studio', 'REST',
    'Database Management', 'Problem Solving', 'Chart.js', 'Google Maps API'
  ];

  // Function to highlight ATS keywords if user turns on the keyword spotlight
  const renderText = (text: string) => {
    if (!highlightKeywords) return text;
    const regex = new RegExp(`\\b(${keywordList.join('|')})\\b`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => {
      const isMatch = keywordList.some(k => k.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span key={i} className="bg-amber-100 text-amber-900 font-semibold px-0.5 rounded">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <article
      className={`resume-paper mx-auto bg-white text-slate-900 shadow-xl transition-all duration-200 border border-slate-200/80 print:shadow-none print:border-none print:m-0 print:p-0 ${
        compactMode
          ? 'max-w-[820px] p-6 sm:p-9 text-[13.5px] leading-[1.38]'
          : 'max-w-[860px] p-8 sm:p-12 text-[14.5px] leading-[1.48]'
      }`}
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* ================= HEADER / CANDIDATE IDENTITY ================= */}
      <header className="border-b-2 border-[#0A2540] pb-3 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A2540] uppercase">
            {personalInfo.fullName}
          </h1>
          <span className="text-xs sm:text-[13px] font-semibold text-slate-700 tracking-wide">
            {personalInfo.headline}
          </span>
        </div>

        {/* Contact Row (1-Column Friendly ATS Text with separators) */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-slate-700">
          <span className="inline-flex items-center gap-1 font-medium text-slate-800">
            <MapPin className="w-3.5 h-3.5 text-[#0A2540] shrink-0 print:hidden" />
            <span>{personalInfo.location}</span>
          </span>
          <span className="text-slate-400 select-none" aria-hidden="true">|</span>

          <a
            href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center gap-1 hover:text-[#0A2540] hover:underline"
          >
            <Phone className="w-3.5 h-3.5 text-[#0A2540] shrink-0 print:hidden" />
            <span>{personalInfo.phone}</span>
          </a>
          <span className="text-slate-400 select-none" aria-hidden="true">|</span>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-1 hover:text-[#0A2540] hover:underline"
          >
            <Mail className="w-3.5 h-3.5 text-[#0A2540] shrink-0 print:hidden" />
            <span>{personalInfo.email}</span>
          </a>
          <span className="text-slate-400 select-none" aria-hidden="true">|</span>

          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#0A2540] font-semibold hover:underline"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#0A2540] shrink-0 print:hidden" />
            <span>linkedin.com/in/likhitha-kosuru</span>
          </a>
          <span className="text-slate-400 select-none" aria-hidden="true">|</span>

          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#0A2540] font-semibold hover:underline"
          >
            <Github className="w-3.5 h-3.5 text-[#0A2540] shrink-0 print:hidden" />
            <span>github.com/Likhithak309</span>
          </a>
        </div>
      </header>

      {/* ================= 1. PROFILE / OBJECTIVE ================= */}
      <section className={compactMode ? 'mt-3.5' : 'mt-4'}>
        <h2 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0A2540] border-b border-[#0A2540]/30 pb-0.5">
          PROFILE
        </h2>
        <p className="mt-1.5 text-slate-700 text-justify leading-relaxed">
          {renderText(careerObjective)}
        </p>
      </section>

      {/* ================= 2. EDUCATION ================= */}
      <section className={compactMode ? 'mt-3' : 'mt-4'}>
        <h2 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0A2540] border-b border-[#0A2540]/30 pb-0.5">
          EDUCATION
        </h2>
        <div className="mt-1.5 space-y-1.5">
          {education.map((item) => (
            <div key={item.id} className="text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <span className="font-bold text-slate-900">
                  {item.degree}
                </span>
                <span className="text-xs font-semibold text-slate-600 sm:text-right shrink-0">
                  {item.year}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 text-xs text-slate-700">
                <span>{item.institution}</span>
                <span className="font-bold text-[#0A2540] shrink-0">
                  {item.score}
                  {item.details && <span className="font-normal text-slate-600"> · {item.details}</span>}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. TECHNICAL SKILLS ================= */}
      <section className={compactMode ? 'mt-3' : 'mt-4'}>
        <h2 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0A2540] border-b border-[#0A2540]/30 pb-0.5">
          TECHNICAL SKILLS
        </h2>
        <div className="mt-1.5 space-y-1 text-slate-800 text-xs sm:text-[13px]">
          <div>
            <span className="font-bold text-slate-900">Programming Languages: </span>
            <span className="text-slate-700">{skills.programming.join(', ')}</span>
          </div>
          <div>
            <span className="font-bold text-slate-900">Web Development: </span>
            <span className="text-slate-700">{skills.webDevelopment.join(', ')}</span>
          </div>
          <div>
            <span className="font-bold text-slate-900">Databases: </span>
            <span className="text-slate-700">{skills.databases.join(', ')}</span>
          </div>
          <div>
            <span className="font-bold text-slate-900">Developer Tools: </span>
            <span className="text-slate-700">{skills.tools.join(', ')}</span>
          </div>
          <div>
            <span className="font-bold text-slate-900">AI & Automation Exposure: </span>
            <span className="text-slate-700">{skills.aiAndAutomation.join(', ')}</span>
          </div>
        </div>
      </section>

      {/* ================= 4. PROJECTS ================= */}
      <section className={compactMode ? 'mt-3' : 'mt-4'}>
        <h2 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0A2540] border-b border-[#0A2540]/30 pb-0.5">
          PROJECTS
        </h2>
        <div className="mt-1.5 space-y-2.5">
          {projects.map((proj) => (
            <div key={proj.id} className="text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span className="font-bold text-slate-900 text-sm">
                    {proj.title}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    | {proj.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#0A2540] shrink-0">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5 print:hidden" />
                  </a>
                  {proj.liveUrl && (
                    <>
                      <span className="text-slate-300" aria-hidden="true">/</span>
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline-flex items-center gap-0.5 text-blue-700 font-semibold"
                      >
                        <Globe className="w-2.5 h-2.5 print:hidden" />
                        <span>Live Demo</span>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div className="text-xs text-slate-600 mt-0.5">
                <span className="font-semibold text-slate-800">Technologies: </span>
                <span>{proj.technologies.join(', ')}</span>
              </div>

              {/* Project Bullets */}
              <ul className="mt-1 list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-700">
                {proj.bullets.map((bullet, idx) => (
                  <li key={idx} className="leading-normal">
                    {renderText(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. CERTIFICATIONS ================= */}
      <section className={compactMode ? 'mt-3' : 'mt-4'}>
        <h2 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0A2540] border-b border-[#0A2540]/30 pb-0.5">
          CERTIFICATIONS
        </h2>
        <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
          {certifications.map((cert) => (
            <li key={cert.id}>
              <span className="font-bold text-slate-900">{cert.title}</span> –{' '}
              <span className="text-slate-700">{cert.issuer}</span>
              {cert.scoreOrDate && (
                <span className="font-semibold text-[#0A2540]"> ({cert.scoreOrDate})</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ================= 6. ACHIEVEMENTS ================= */}
      <section className={compactMode ? 'mt-3' : 'mt-4'}>
        <h2 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0A2540] border-b border-[#0A2540]/30 pb-0.5">
          ACHIEVEMENTS
        </h2>
        <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
          {achievements.map((ach) => (
            <li key={ach.id}>
              <span className="font-bold text-slate-900">{ach.title}</span> –{' '}
              <span className="text-slate-700">{ach.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= 7. HACKATHONS & ACTIVITIES ================= */}
      <section className={compactMode ? 'mt-3' : 'mt-4'}>
        <h2 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0A2540] border-b border-[#0A2540]/30 pb-0.5">
          HACKATHONS & ACTIVITIES
        </h2>
        <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
          {activities.map((act) => (
            <li key={act.id}>
              <span className="font-bold text-slate-900">{act.title}</span>
              {act.durationOrDate && (
                <span className="text-slate-500 font-medium"> ({act.durationOrDate})</span>
              )}
              : <span className="text-slate-700">{act.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= 8. STRENGTHS ================= */}
      <section className={compactMode ? 'mt-3' : 'mt-4'}>
        <h2 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wider text-[#0A2540] border-b border-[#0A2540]/30 pb-0.5">
          STRENGTHS
        </h2>
        <p className="mt-1.5 text-xs text-slate-700">
          {strengths.join(' · ')}
        </p>
      </section>
    </article>
  );
};
