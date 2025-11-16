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

export function generateLatexCode(payload: any, theme?: { id: string; style: string; color: string }): string {
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

    if (personal.summary || fresherSummary) {
      latex += `\\section*{Professional Summary}\n`;
      latex += texEscape(personal.summary || fresherSummary || '') + '\n\n';
    }

    if (education && education.length > 0) {
      latex += `\\section*{Education}\\n\\begin{itemize}[leftmargin=*]\\n`;
      education.forEach((edu:any) => {
        latex += `\\item \\textbf{${texEscape(edu.degree || '')}} ${edu.field ? `in ${texEscape(edu.field)}` : ''}\\\\\\n`;
        latex += `    ${texEscape(edu.institution || '')}`;
        if (edu.startDate || edu.endDate) {
          latex += `, ${edu.startDate || ''} - ${edu.endDate || ''}`;
        }
        if (edu.gpa) latex += `, GPA: ${texEscape(edu.gpa)}`;
        latex += '\\n';
        if (edu.description) latex += `    \\textit{${texEscape(edu.description)}}\\n`;
      });
      latex += `\\end{itemize}\\n\\n`;
    }

    if (experience && experience.length > 0) {
      latex += `\\section*{Experience}\\n\\begin{itemize}[leftmargin=*]\\n`;
      experience.forEach((exp:any) => {
        latex += `\\item \\textbf{${texEscape(exp.position || '')}} at ${texEscape(exp.company || '')}\\\\\\n`;
        const dateRange = exp.current ? `${exp.startDate || ''} - Present` : `${exp.startDate || ''} - ${exp.endDate || ''}`;
        latex += `    ${dateRange}\\\\\\n`;
        if (exp.description || exp.aiSummary) {
          latex += `    ${texEscape(exp.description || exp.aiSummary || '')}\\n`;
        }
      });
      latex += `\\end{itemize}\\n\\n`;
    }

    if (projects && projects.length > 0) {
      latex += `\\section*{Projects}\\n\\begin{itemize}[leftmargin=*]\\n`;
      projects.forEach((proj:any) => {
        latex += `\\item \\textbf{${texEscape(proj.name || '')}}`;
        if (proj.url) latex += ` - \\href{https://${proj.url}}{${texEscape(proj.url)}}`;
        latex += `\\\\\\n`;
        if (proj.description) latex += `    ${texEscape(proj.description)}\\\\\\n`;
        if (proj.technologies) latex += `    \\textit{Technologies: ${texEscape(proj.technologies)}}\\n`;
      });
      latex += `\\end{itemize}\\n\\n`;
    }

    if (skills && (skills.technical && skills.technical.length > 0 || skills.soft && skills.soft.length > 0)) {
      latex += `\\section*{Skills}\\n`;
      if (skills.technical && skills.technical.length > 0) latex += `\\textbf{Technical:} ${skills.technical.map((s:string) => texEscape(s)).join(', ')}\\\\\\n`;
      if (skills.soft && skills.soft.length > 0) latex += `\\textbf{Soft:} ${skills.soft.map((s:string) => texEscape(s)).join(', ')}\\n`;
      latex += '\\n';
    }

    if (certifications && certifications.length > 0) {
      latex += `\\section*{Certifications}\\n\\begin{itemize}[leftmargin=*]\\n`;
      certifications.forEach((cert:any) => {
        latex += `\\item \\textbf{${texEscape(cert.name || '')}}`;
        if (cert.issuer) latex += ` - ${texEscape(cert.issuer)}`;
        if (cert.date) latex += ` (${texEscape(cert.date)})`;
        if (cert.url) latex += ` - \\href{https://${cert.url}}{${texEscape(cert.url)}}`;
        latex += '\\n';
      });
      latex += `\\end{itemize}\\n\\n`;
    }

    latex += `\\end{document}`;
    return latex;
  }

  let out = `% Document generated\n\\begin{verbatim}\n` + JSON.stringify(payload, null, 2) + `\n\\end{verbatim}`;
  return out;
}
