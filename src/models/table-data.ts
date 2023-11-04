/**
 * Model for the data corresponding to each row of the table.
 * @interface RowData
 * @property {string} label - The label of the row.
 * @property {string[]} data - The data of the row. Defined as a string array to fulfill
 * the requirement for allowing 2 (or more if needed) data values per row.
 *
 * @remarks
 * The data property is set to use strings since I was not sure if the data values were
 * supposed to be numbers or strings.
 */
export interface RowData {
  label: string;
  data: string[];
}

/**
 * Type for the table data.
 * @type TableData
 */
export type TableData = RowData[];

/**
 * Type for the prefix of row cells that contain multiple data values.
 * @type MultiDataRowPrefix
 *
 * @remarks
 * Done as a string array to allow for future expansion if more prefixes were to be added
 * or if the system would allow more than 2 data values per row.
 *
 * While it could be done in a cell-by-cell basis, I decided to go with this version since
 * I considered that it would be more suitable to do it for the whole table (all rows have
 * the same prefix) and didn't want to complicate any further.
 */
export type MultiDataRowPrefix = string[];
