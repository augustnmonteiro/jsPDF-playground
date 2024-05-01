export const codeExamples = {
  sections: 
`
const pdf = new jsPDF()

const sections = [
    {name: 'Welcome to jsPDF Playground', content: "Just change the code and see the pdf updating in realtime"},
    {name: 'Privacy', content: "* No data leaves your browser!"},
    {name: 'Open Source', content: "Code on github, if you found this helpful you can star it : D"},
];
const margin = 25;

function addTextToPDF(pdf, text, initialY, fontSize, fontStyle, maxWidth, lineHeight, pageHeight, margin) {
    let y = initialY;
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);

    const textLines = pdf.splitTextToSize(text, maxWidth);
    return textLines.reduce((y, line) => {
        if (y + lineHeight > pageHeight - margin * 2) {
            pdf.addPage();
            y = margin;
        }
        pdf.text(line, margin, y);
        return y + lineHeight;
    }, initialY);
}

let initialY = margin;
sections.forEach(section => {
    initialY = addTextToPDF(pdf, section.name, initialY, 14, 'bold', 180, 10, 297, 20);
    initialY = addTextToPDF(pdf, section.content, initialY, 12, 'normal', 180, 10, 297, 20);
});

/**
 * This has to be the last line of the code
 * is where the magic happens : D
 */
URL.createObjectURL(pdf.output('blob'));`
}