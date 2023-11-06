import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  ContentText,
  StyleDictionary,
  TDocumentDefinitions,
  TableCell,
  TableCellProperties
} from 'pdfmake/interfaces';
import {
  MAX_NUMBER_OF_DATA_CELLS,
  multidataRowPrefix
} from 'src/config/default-values';
import { RowData, TableData } from 'src/models/table-data';
import { base64Logo } from './base64logo';
import { distributeDataColSpans } from './distribute-data-colspan';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Exports the table data to a PDF file and opens it in a new tab.
 * @param {TableData} tableData The table data to export
 *
 * @remarks
 * I could refactor the object into smaller functions to reduce the code in this one, but I thought that it would be easier for you to see and revise the structure if I kept it like this. I hope it's not a problem.
 */
export function exportToPDF(tableData: TableData) {
  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 120, 40, 40],
    header: {
      style: 'header',
      columns: [
        {
          image: base64Logo,
          fit: [150, 150]
        },
        {
          stack: [{ text: 'Proceso de selección' }, { text: 'Octubre 2023' }]
        }
      ]
    },
    footer: {
      style: 'footer',
      stack: [
        {
          table: {
            headerRows: 1,
            widths: ['*'],
            body: [[''], ['']]
          },
          layout: 'headerLineOnly'
        },
        {
          columns: [
            { text: 'Daniel Adrian Mare' },
            { text: generateDateElement() }
          ]
        }
      ]
    },
    content: {
      style: 'content',
      table: {
        headerRows: 1,
        widths: getTableWidths(tableData),
        body: generateTableBody(tableData)
      }
    },
    styles: getDocStyles()
  };
  pdfMake.createPdf(docDefinition).open();
}

/**
 * Generates the date text for the footer
 * @returns {string} The date text
 *
 * @remarks
 * I was not sure if the location shown in the example was supposed to be my city or if I
 * was supposed to get the city of the user via geolocation, but since this added more
 * complexity due to having to Google's API to get the city and it wasn't specified in the
 * requirements, I decided to just hardcode my city.
 */
function generateDateElement(): string {
  const date: string = new Date().toLocaleString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dateElement = `Oviedo, ${date}`;
  return dateElement;
}

/**
 * Dinamically generates the widths of the table columns. It starts with 2 columns, as
 * these are the minimum required. Then if it finds a row with 2 or data items, it adds a
 * column for each extra data item.
 * @param {TableData} tableData The table data
 * @returns {string[]} An array of strings, each representing the width of a column
 */
function getTableWidths(tableData: TableData): string[] {
  const widths: string[] = ['*', '*'];
  tableData.forEach((row) => {
    if (row.data.length > 1) {
      for (let i = 0; i < row.data.length - 1; i++) {
        widths.push('*');
      }
    }
  });
  return widths;
}

/**
 * Generates the table body
 * @param {TableData} tableData The table data
 * @returns {TableCell[][]} An array of arrays of TableCells, each representing a row of the table
 * @see generateTableHeaders
 * @see generateTableRow
 */
function generateTableBody(tableData: TableData): TableCell[][] {
  const tableBody: TableCell[][] = [];
  tableBody.push(generateTableHeaders());
  tableData.forEach((row) => {
    tableBody.push(generateTableRow(row));
  });
  return tableBody;
}

/**
 * Generates the table headers. It starts with 2 columns, as these are the minimum. The
 * span of the second column is increased to match the maximum number of data items (when
 * there is more than 1) in the table.
 * @returns {TableCell[]} An array of TableCells, each representing a header cell
 * @see MAX_NUMBER_OF_DATA_CELLS
 * @remarks
 * Unless I am mistaken and there's a better way to do it, it seems that to make the
 * colSpan function properly without breaking the table, you need to add empty cells to
 * fill the space of the colSpan.
 */
function generateTableHeaders(): TableCell[] {
  const headers: TableCell[] = [
    { text: 'Field Label', colSpan: 1, style: 'tableHeader' },
    {
      text: 'Data Value',
      colSpan: MAX_NUMBER_OF_DATA_CELLS,
      style: 'tableHeader'
    }
  ];
  for (let i = 0; i < MAX_NUMBER_OF_DATA_CELLS - 1; i++) {
    headers.push({});
  }
  return headers;
}

/**
 * Generates a table row. It starts with the label of the row and then adds a cell for
 * each data item. If there is more than 1 data item, each cell will be assigned its
 * prefix. It also automatically assigns the colSpans of the data cells with the help of
 * the {@link distributeDataColSpans} function.
 * @param {RowData} row The data of the row
 * @returns {TableCell[]} An array of TableCells, each representing a cell of the row.
 * @see distributeDataColSpans
 *
 * @remarks
 * Unless I am mistaken and there's a better way to do it, it seems that to make the
 * colSpan function properly without breaking the table, you need to add empty cells to
 * fill the space of the colSpan.
 */
function generateTableRow(row: RowData): TableCell[] {
  const tableRow: TableCell[] = [];
  tableRow.push({ text: row.label, style: 'tableCell' });

  const tableCellsPerItem: number[] = distributeDataColSpans(row.data.length);

  row.data.forEach((cell, index) => {
    const tableCell: TableCell = {
      text: cell,
      style: 'tableCell'
    };
    if (row.data.length > 1) {
      (<ContentText>tableCell).text = `${multidataRowPrefix[index]}: ${cell}`;
    }

    tableRow.push(tableCell);
    if (tableCellsPerItem[index] > 1) {
      (<TableCellProperties>tableCell).colSpan = tableCellsPerItem[index];
      for (let i = 0; i < tableCellsPerItem[index] - 1; i++) {
        tableRow.push({});
      }
    }
  });
  return tableRow;
}

/**
 * Returns the styles of the document
 * @returns {StyleDictionary} The styles of the document
 */
function getDocStyles(): StyleDictionary {
  return {
    header: {
      fontSize: 20,
      bold: true,
      alignment: 'center',
      marginTop: 20,
      lineHeight: 1.2
    },
    footer: {
      fontSize: 14,
      bold: true,
      alignment: 'center',
      marginBottom: 20
    },
    content: {
      fontSize: 16
    },
    tableHeader: {
      alignment: 'center',
      bold: true,
      fillColor: '#333',
      color: '#fff',
      margin: [0, 5, 0, 5]
    },
    tableCell: {
      alignment: 'center',
      margin: [0, 5, 0, 5]
    }
  };
}
