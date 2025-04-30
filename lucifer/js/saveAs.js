/**
 * Enhanced save functionality for Homeless Helpers
 * Uses FileSaver.js for browser compatibility
 */

// Import required libraries
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';

/**
 * Save letter as plain text
 */
export function saveAsText(content, filename) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${filename}.txt`);
}

/**
 * Save letter as Word document (.docx)
 */
export function saveAsWord(content, filename) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: content.split('\n').map(line => {
        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              break: 1
            })
          ]
        });
      })
    }]
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, `${filename}.docx`);
  });
}

/**
 * Save letter as PDF
 */
export function saveAsPdf(content, filename) {
  const doc = new jsPDF();
  
  // Split content by newline and add each line to PDF
  const lines = content.split('\n');
  let yPos = 20;
  
  doc.setFont('helvetica');
  doc.setFontSize(12);
  
  lines.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 7;
    
    // Add new page if needed
    if (yPos > 280) {
      doc.addPage();
      yPos = 20;
    }
  });
  
  doc.save(`${filename}.pdf`);
}
