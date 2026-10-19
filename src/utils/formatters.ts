import { ResumeData } from '../types/resume';

export function generateAtsPlainText(data: ResumeData): string {
  const { personalInfo, careerObjective, education, skills, projects, certifications, achievements, activities, strengths } = data;

  return `${personalInfo.fullName.toUpperCase()}
${personalInfo.headline}
Location: ${personalInfo.location} | Phone: ${personalInfo.phone} | Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedinUrl}
GitHub: ${personalInfo.githubUrl}

==================================================
PROFILE
==================================================
${careerObjective}

==================================================
EDUCATION
==================================================
${education
  .map(
    (e) => `${e.degree}
${e.institution} (${e.year})
${e.score}${e.details ? ` | ${e.details}` : ''}`
  )
  .join('\n\n')}

==================================================
TECHNICAL SKILLS
==================================================
Programming Languages: ${skills.programming.join(', ')}
Web Development: ${skills.webDevelopment.join(', ')}
Databases: ${skills.databases.join(', ')}
Developer Tools: ${skills.tools.join(', ')}
AI & Workflow Exposure: ${skills.aiAndAutomation.join(', ')}

==================================================
PROJECTS
==================================================
${projects
  .map(
    (p) => `${p.title.toUpperCase()}
Role / Type: ${p.type}
Technologies: ${p.technologies.join(', ')}
GitHub: ${p.githubUrl}${p.liveUrl ? `\nLive Demo: ${p.liveUrl}` : ''}
Key Contributions:
${p.bullets.map((b) => `  * ${b}`).join('\n')}`
  )
  .join('\n\n')}

==================================================
CERTIFICATIONS
==================================================
${certifications
  .map((c) => `* ${c.title} - ${c.issuer}${c.scoreOrDate ? ` (${c.scoreOrDate})` : ''}`)
  .join('\n')}

==================================================
ACHIEVEMENTS
==================================================
${achievements
  .map((a) => `* ${a.title} (${a.yearOrSemester}): ${a.description}`)
  .join('\n')}

==================================================
HACKATHONS & ACTIVITIES
==================================================
${activities
  .map((act) => `* ${act.title}${act.durationOrDate ? ` (${act.durationOrDate})` : ''}: ${act.description}`)
  .join('\n')}

==================================================
STRENGTHS
==================================================
${strengths.join(' · ')}
`;
}

export function generateMarkdown(data: ResumeData): string {
  const { personalInfo, careerObjective, education, skills, projects, certifications, achievements, activities, strengths } = data;

  return `# ${personalInfo.fullName}
**${personalInfo.headline}**  
📍 ${personalInfo.location} | 📞 ${personalInfo.phone} | ✉️ [${personalInfo.email}](mailto:${personalInfo.email})  
🔗 [LinkedIn](${personalInfo.linkedinUrl}) | 🐙 [GitHub](${personalInfo.githubUrl})

---

## PROFILE
${careerObjective}

---

## EDUCATION
${education
  .map(
    (e) => `### **${e.degree}**  
*${e.institution}* | **${e.year}**  
- **Result:** ${e.score}${e.details ? ` (${e.details})` : ''}`
  )
  .join('\n\n')}

---

## TECHNICAL SKILLS
- **Programming Languages:** ${skills.programming.join(', ')}
- **Web Development:** ${skills.webDevelopment.join(', ')}
- **Databases:** ${skills.databases.join(', ')}
- **Developer Tools:** ${skills.tools.join(', ')}
- **AI & Workflow Exposure:** ${skills.aiAndAutomation.join(', ')}

---

## PROJECTS
${projects
  .map(
    (p) => `### **${p.title}**  
*${p.type}* | [GitHub](${p.githubUrl})${p.liveUrl ? ` | [Live Demo](${p.liveUrl})` : ''}  
**Technologies:** ${p.technologies.join(', ')}  
${p.bullets.map((b) => `- ${b}`).join('\n')}`
  )
  .join('\n\n')}

---

## CERTIFICATIONS
${certifications
  .map((c) => `- **${c.title}** – ${c.issuer}${c.scoreOrDate ? ` *(${c.scoreOrDate})*` : ''}`)
  .join('\n')}

---

## ACHIEVEMENTS
${achievements
  .map((a) => `- **${a.title}** (${a.yearOrSemester}): ${a.description}`)
  .join('\n')}

---

## HACKATHONS & ACTIVITIES
${activities
  .map((act) => `- **${act.title}**${act.durationOrDate ? ` *(${act.durationOrDate})*` : ''}: ${act.description}`)
  .join('\n')}

---

## STRENGTHS
${strengths.join(' · ')}
`;
}
