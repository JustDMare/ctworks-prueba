import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { base64Logo } from './base64logo';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function exportToPDF() {
  const docDefinition: TDocumentDefinitions = {
    header: {
      columns: [
        {
          image: base64Logo,
          fit: [100, 100]
        },
        { text: 'hi' }
      ]
    },
    content: 'Hello world'
  };
  pdfMake.createPdf(docDefinition).open();
}
