import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  ContentText,
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
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Exports the table data to a PDF file and opens it in a new tab
 * @param {TableData} tableData The table data to export
 */
export function exportToPDF(tableData: TableData) {
  const docDefinition: TDocumentDefinitions = {
    header: {
      columns: [
        {
          image: base64Logo,
          fit: [100, 100]
        },
        { text: 'Proceso de selección Octubre 2023' }
      ]
    },
    footer: {
      columns: [
        { text: 'Daniel Adrian Mare' },
        { text: generateDateElement(), alignment: 'right' }
      ]
    },
    content: {
      table: {
        headerRows: 1,
        widths: getTableWidths(tableData),
        body: generateTableBody(tableData)
      }
    }
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
    { text: 'Field Label', colSpan: 1 },
    { text: 'Data Value', colSpan: MAX_NUMBER_OF_DATA_CELLS }
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
  tableRow.push({ text: row.label });

  const tableCellsPerItem: number[] = distributeDataColSpans(row.data.length);

  row.data.forEach((cell, index) => {
    const tableCell: TableCell = {
      text: cell
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
 * Distributes the colSpans of the data cells of a row. The idea is to have an equal
 * distribution between cells, but if the number of cells is not divisible by the number
 * of data items, the remainder is distributed to the first cells.
 * @param rowDataItems The number of data items of that row
 * @returns An array of numbers, each representing the colSpan of a data cell
 *
 * @description
 * Let's say we have 5 max cells and 3 data items. The minimum colSpan is 1 (5/3 = 1.6,
 * floored to 1), then the remainder is 2 (5%3=2), so we assign a colSpan of 1 to every
 * cell and then the first 2 cells gain an extra colSpan.
 *
 * Another example would be 5 max and 2 data items. The minimum colSpan is 2 (5/2 = 2.5,
 * floored to 2). The remainder is 1 (5%2=1), so we assign a colSpan of 2 to every cell
 * and then the first cell gains an extra colSpan.
 *
 * @remarks
 * While it may have been a bit of engineering, I thought that, since the number of cells
 * could vary at some point in the future (at least that's what I imagined given the
 * requirements), it would be better to have a function that would distribute the colSpans
 * between the cells, instead of hardcoding the colSpans.
 */
function distributeDataColSpans(rowDataItems: number): number[] {
  const averageSlotsPerItem: number = Math.floor(
    MAX_NUMBER_OF_DATA_CELLS / rowDataItems
  );
  const remainder: number = MAX_NUMBER_OF_DATA_CELLS % rowDataItems;

  const slotsPerItem: number[] = new Array<number>(
    MAX_NUMBER_OF_DATA_CELLS
  ).fill(averageSlotsPerItem);
  for (let i = 0; i < remainder; i++) {
    slotsPerItem[i]++;
  }
  return slotsPerItem;
}
