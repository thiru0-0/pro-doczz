// Helper function to escape LaTeX special characters
export function texEscape(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/\$/g, '\\$')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&')
    .replace(/#/g, '\\#')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/_/g, '\\_')
    .replace(/~/g, '\\textasciitilde{}');
}

interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
    summary: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    aiSummary?: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    url?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  fresherSummary?: string;
}

export function generateLatexCode(payload: any, theme?: { id: string; style: string; color: string }): string {
  // a simple router: if payload looks like resumeData, use resume flow; otherwise serialize payload
  if (payload && payload.personal) {
    const resumeData: any = payload;
    const { personal, education, experience, projects, skills, certifications, fresherSummary } = resumeData;

  let latex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\geometry{margin=0.75in}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    urlcolor=blue,
    citecolor=blue
}

% Theme colors
\\definecolor{primarycolor}{RGB}{33, 150, 243}
\\definecolor{secondarycolor}{RGB}{66, 66, 66}

\\titleformat{\\section}
{\\Large\\bfseries\\color{primarycolor}}
{}
{0em}
{}[\\titlerule]

\\titleformat{\\subsection}
{\\large\\bfseries}
{}
{0em}
{}

\\pagestyle{empty}

\\begin{document}

% Header
\\begin{center}
{\\Huge\\bfseries ${texEscape(personal.name || 'Your Name')}}\\\\[0.5em]
`;

  // Contact information
  const contactInfo = [];
  if (personal.email) contactInfo.push(`\\href{mailto:${personal.email}}{${texEscape(personal.email)}}`);
  if (personal.phone) contactInfo.push(texEscape(personal.phone));
  if (personal.location) contactInfo.push(texEscape(personal.location));
  if (personal.linkedin) contactInfo.push(`\\href{https://${personal.linkedin}}{LinkedIn}`);
  if (personal.github) contactInfo.push(`\\href{https://${personal.github}}{GitHub}`);
  if (personal.website) contactInfo.push(`\\href{https://${personal.website}}{Website}`);

  if (contactInfo.length > 0) {
    latex += contactInfo.join(' $|$ ') + '\\\\[0.5em]\n';
  }

  latex += `\\end{center}

`;

  // Professional Summary
  if (personal.summary || fresherSummary) {
    latex += `\\section*{Professional Summary}\n`;
    latex += texEscape(personal.summary || fresherSummary || '') + '\n\n';
  }

  // Education
  if (education.length > 0) {
    latex += `\\section*{Education}\n\\begin{itemize}[leftmargin=*]\n`;
    education.forEach(edu => {
      latex += `\\item \\textbf{${texEscape(edu.degree || '')}} ${edu.field ? `in ${texEscape(edu.field)}` : ''}\\\n`;
      latex += `    ${texEscape(edu.institution || '')}`;
      if (edu.startDate || edu.endDate) {
        latex += `, ${edu.startDate || ''} - ${edu.endDate || ''}`;
      }
      if (edu.gpa) {
        latex += `, GPA: ${texEscape(edu.gpa)}`;
      }
      latex += '\n';
      if (edu.description) {
        latex += `    \\textit{${texEscape(edu.description)}}\n`;
      }
    });
    latex += `\\end{itemize}\n\n`;
  }

  // Experience
  if (experience.length > 0) {
    latex += `\\section*{Experience}\n\\begin{itemize}[leftmargin=*]\n`;
    experience.forEach(exp => {
      latex += `\\item \\textbf{${texEscape(exp.position || '')}} at ${texEscape(exp.company || '')}\\\n`;
      const dateRange = exp.current 
        ? `${exp.startDate || ''} - Present`
        : `${exp.startDate || ''} - ${exp.endDate || ''}`;
      latex += `    ${dateRange}\\\n`;
      if (exp.description || exp.aiSummary) {
        latex += `    ${texEscape(exp.description || exp.aiSummary || '')}\n`;
      }
    });
    latex += `\\end{itemize}\n\n`;
  }

  // Projects
  if (projects.length > 0) {
    latex += `\\section*{Projects}\n\\begin{itemize}[leftmargin=*]\n`;
    projects.forEach(proj => {
      latex += `\\item \\textbf{${texEscape(proj.name || '')}}`;
      if (proj.url) {
        latex += ` - \\href{https://${proj.url}}{${texEscape(proj.url)}}`;
      }
      latex += `\\\n`;
      if (proj.description) {
        latex += `    ${texEscape(proj.description)}\\\n`;
      }
      if (proj.technologies) {
        latex += `    \\textit{Technologies: ${texEscape(proj.technologies)}}\n`;
      }
    });
    latex += `\\end{itemize}\n\n`;
  }

  // Skills
  if (skills.technical.length > 0 || skills.soft.length > 0) {
    latex += `\\section*{Skills}\n`;
    if (skills.technical.length > 0) {
      latex += `\\textbf{Technical:} ${skills.technical.map(s => texEscape(s)).join(', ')}\\\n`;
    }
    if (skills.soft.length > 0) {
      latex += `\\textbf{Soft:} ${skills.soft.map(s => texEscape(s)).join(', ')}\n`;
    }
    latex += '\n';
  }

  // Certifications
  if (certifications.length > 0) {
    latex += `\\section*{Certifications}\n\\begin{itemize}[leftmargin=*]\n`;
    certifications.forEach(cert => {
      latex += `\\item \\textbf{${texEscape(cert.name || '')}}`;
      if (cert.issuer) {
        latex += ` - ${texEscape(cert.issuer)}`;
      }
      if (cert.date) {
        latex += ` (${texEscape(cert.date)})`;
      }
      if (cert.url) {
        latex += ` - \\href{https://${cert.url}}{${texEscape(cert.url)}}`;
      }
      latex += '\n';
    });
    latex += `\\end{itemize}\n\n`;
  }

  latex += `\\end{document}`;

    return latex;
  }

  // Fallback: simple dump for other document types (so pages can call this function)
  let out = `% Document generated
\begin{verbatim}
` + JSON.stringify(payload, null, 2) + `
\end{verbatim}`;
  return out;
}

