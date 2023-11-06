import { MultiDataRowPrefix } from 'src/models/table-data';

/**
 * Max number of cells in a row
 */
export const MAX_NUMBER_OF_DATA_CELLS = 2;

/**
 * The prefix for the multi data rows.
 * @remarks
 * Since there was no specification on whether they could be changed or not, and in what
 * basis, I decided to "prepare" them to be changed for the whole table, meaning that the
 * same prefixes apply to all the multi-data rows in the table, rather than going on a
 * row-by-row basis.
 */
export const multidataRowPrefix: MultiDataRowPrefix = ['A', 'B'];
