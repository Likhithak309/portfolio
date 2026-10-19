import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { RotateCcw, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { INITIAL_RESUME_DATA } from '../data/initialResumeData';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
  onReset: () => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  data,
  onChange,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<
    'contact' | 'profile' | 'education' | 'skills' | 'projects' | 'certifications' | 'achievements' | 'activities'
  >('contact');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const handleObjectiveChange = (value: string) => {
    onChange({
      ...data,
      careerObjective: value,
    });
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, education: updated });
  };

  const handleSkillChange = (category: keyof ResumeData['skills'], value: string) => {
    const arrayValues = value.split(',').map((s) => s.trim()).filter(Boolean);
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: arrayValues,
      },
    });
  };

  const handleProjectFieldChange = (index: number, field: string, value: any) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, projects: updated });
  };

  const handleProjectBulletChange = (projIndex: number, bulletIndex: number, value: string) => {
    const updated = [...data.projects];
    const bullets = [...updated[projIndex].bullets];
    bullets[bulletIndex] = value;
    updated[projIndex] = { ...updated[projIndex], bullets };
    onChange({ ...data, projects: updated });
  };

  const addProjectBullet = (projIndex: number) => {
    const updated = [...data.projects];
    updated[projIndex] = {
      ...updated[projIndex],
      bullets: [...updated[projIndex].bullets, ''],
    };
    onChange({ ...data, projects: updated });
  };

  const removeProjectBullet = (projIndex: number, bulletIndex: number) => {
    const updated = [...data.projects];
    const bullets = updated[projIndex].bullets.filter((_, i) => i !== bulletIndex);
    updated[projIndex] = { ...updated[projIndex], bullets };
    onChange({ ...data, projects: updated });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Editor Header */}
      <div className="border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/70">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Resume Content Editor</span>
            <span className="text-xs font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Live Sync Enabled
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify any details below. Changes reflect instantly on your ATS-friendly resume.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset all details to the authentic verified profile data?')) {
              onReset();
              showNotification('Reset to authentic verified profile.');
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {notification && (
        <div className="bg-emerald-50 text-emerald-800 text-xs px-6 py-2 border-b border-emerald-100 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Editor Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-100/60 p-1.5 gap-1 text-xs font-medium text-slate-600">
        {[
          { id: 'contact', label: 'Contact & Links' },
          { id: 'profile', label: 'Career Objective' },
          { id: 'education', label: 'Education' },
          { id: 'skills', label: 'Technical Skills' },
          { id: 'projects', label: 'Projects (Inspected)' },
          { id: 'certifications', label: 'Certifications' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'activities', label: 'Hackathons & Activities' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-[#0A2540] font-bold shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="p-6 overflow-y-auto max-h-[640px] text-sm">
        {/* 1. Contact Info */}
        {activeTab === 'contact' && (
          <div className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={data.personalInfo.headline}
                  onChange={(e) => handlePersonalInfoChange('headline', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={data.personalInfo.linkedinUrl}
                  onChange={(e) => handlePersonalInfoChange('linkedinUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={data.personalInfo.githubUrl}
                  onChange={(e) => handlePersonalInfoChange('githubUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                <strong>ATS Compliance Rule:</strong> Avoid adding physical street addresses, date of birth, marital status, or photographs. Only phone, email, city/state, LinkedIn, and GitHub are required.
              </span>
            </div>
          </div>
        )}

        {/* 2. Career Objective */}
        {activeTab === 'profile' && (
          <div className="space-y-3 max-w-2xl">
            <label className="block text-xs font-semibold text-slate-700">
              Profile Summary / Career Objective (ATS Formatted)
            </label>
            <textarea
              rows={5}
              value={data.careerObjective}
              onChange={(e) => handleObjectiveChange(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-xs text-slate-500">
              Tips: Mention your degree, CGPA (9.56), academic rank, core foundational technologies (C, Python, Java, MySQL, Flask), and target fresher software engineering role without generic cliches.
            </p>
          </div>
        )}

        {/* 3. Education */}
        {activeTab === 'education' && (
          <div className="space-y-5 max-w-2xl">
            {data.education.map((item, idx) => (
              <div key={item.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Degree / Level</label>
                    <input
                      type="text"
                      value={item.degree}
                      onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Year Range</label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleEducationChange(idx, 'year', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">Institution</label>
                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) => handleEducationChange(idx, 'institution', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">CGPA / Score</label>
                    <input
                      type="text"
                      value={item.score}
                      onChange={(e) => handleEducationChange(idx, 'score', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Details (Optional)</label>
                    <input
                      type="text"
                      value={item.details || ''}
                      onChange={(e) => handleEducationChange(idx, 'details', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Technical Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Programming Languages (comma-separated)
              </label>
              <input
                type="text"
                value={data.skills.programming.join(', ')}
                onChange={(e) => handleSkillChange('programming', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
              <span className="text-[11px] text-slate-500">
                Note: Marked with (Foundational) to remain 100% honest to fresher level.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Web Development (comma-separated)
              </label>
              <input
                type="text"
                value={data.skills.webDevelopment.join(', ')}
                onChange={(e) => handleSkillChange('webDevelopment', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Databases (comma-separated)
              </label>
              <input
                type="text"
                value={data.skills.databases.join(', ')}
                onChange={(e) => handleSkillChange('databases', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Developer Tools (comma-separated)
              </label>
              <input
                type="text"
                value={data.skills.tools.join(', ')}
                onChange={(e) => handleSkillChange('tools', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                AI & Workflow Exposure (comma-separated)
              </label>
              <input
                type="text"
                value={data.skills.aiAndAutomation.join(', ')}
                onChange={(e) => handleSkillChange('aiAndAutomation', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>
        )}

        {/* 5. Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6 max-w-2xl">
            {data.projects.map((proj, pIdx) => (
              <div key={proj.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0A2540] uppercase tracking-wide">
                    Project {pIdx + 1}: {proj.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleProjectFieldChange(pIdx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Project Type</label>
                    <input
                      type="text"
                      value={proj.type}
                      onChange={(e) => handleProjectFieldChange(pIdx, 'type', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={proj.githubUrl}
                      onChange={(e) => handleProjectFieldChange(pIdx, 'githubUrl', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Live URL (Optional)</label>
                    <input
                      type="url"
                      value={proj.liveUrl || ''}
                      onChange={(e) => handleProjectFieldChange(pIdx, 'liveUrl', e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={(e) =>
                        handleProjectFieldChange(
                          pIdx,
                          'technologies',
                          e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        )
                      }
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                </div>

                {/* Bullets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">Project Bullets (Action + Tech + Result)</label>
                    <button
                      onClick={() => addProjectBullet(pIdx)}
                      className="text-xs text-blue-700 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Bullet</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {proj.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <textarea
                          rows={2}
                          value={b}
                          onChange={(e) => handleProjectBulletChange(pIdx, bIdx, e.target.value)}
                          className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs focus:ring-1 focus:ring-blue-600"
                        />
                        <button
                          onClick={() => removeProjectBullet(pIdx, bIdx)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                          title="Delete bullet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. Certifications */}
        {activeTab === 'certifications' && (
          <div className="space-y-4 max-w-2xl">
            {data.certifications.map((cert, cIdx) => (
              <div key={cert.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Certification Title</label>
                    <input
                      type="text"
                      value={cert.title}
                      onChange={(e) => {
                        const updated = [...data.certifications];
                        updated[cIdx] = { ...updated[cIdx], title: e.target.value };
                        onChange({ ...data, certifications: updated });
                      }}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Issuer</label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => {
                        const updated = [...data.certifications];
                        updated[cIdx] = { ...updated[cIdx], issuer: e.target.value };
                        onChange({ ...data, certifications: updated });
                      }}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">Score or Note</label>
                    <input
                      type="text"
                      value={cert.scoreOrDate || ''}
                      onChange={(e) => {
                        const updated = [...data.certifications];
                        updated[cIdx] = { ...updated[cIdx], scoreOrDate: e.target.value };
                        onChange({ ...data, certifications: updated });
                      }}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. Achievements */}
        {activeTab === 'achievements' && (
          <div className="space-y-4 max-w-2xl">
            {data.achievements.map((ach, aIdx) => (
              <div key={ach.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Achievement Title</label>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => {
                      const updated = [...data.achievements];
                      updated[aIdx] = { ...updated[aIdx], title: e.target.value };
                      onChange({ ...data, achievements: updated });
                    }}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={ach.description}
                    onChange={(e) => {
                      const updated = [...data.achievements];
                      updated[aIdx] = { ...updated[aIdx], description: e.target.value };
                      onChange({ ...data, achievements: updated });
                    }}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 8. Hackathons & Activities */}
        {activeTab === 'activities' && (
          <div className="space-y-4 max-w-2xl">
            {data.activities.map((act, actIdx) => (
              <div key={act.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Event / Activity Name</label>
                    <input
                      type="text"
                      value={act.title}
                      onChange={(e) => {
                        const updated = [...data.activities];
                        updated[actIdx] = { ...updated[actIdx], title: e.target.value };
                        onChange({ ...data, activities: updated });
                      }}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Context / Duration</label>
                    <input
                      type="text"
                      value={act.durationOrDate || ''}
                      onChange={(e) => {
                        const updated = [...data.activities];
                        updated[actIdx] = { ...updated[actIdx], durationOrDate: e.target.value };
                        onChange({ ...data, activities: updated });
                      }}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Details & Learnings</label>
                  <textarea
                    rows={2}
                    value={act.description}
                    onChange={(e) => {
                      const updated = [...data.activities];
                      updated[actIdx] = { ...updated[actIdx], description: e.target.value };
                      onChange({ ...data, activities: updated });
                    }}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
