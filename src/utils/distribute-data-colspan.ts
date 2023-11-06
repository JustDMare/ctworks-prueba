import { MAX_NUMBER_OF_DATA_CELLS } from 'src/config/default-values';

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
export function distributeDataColSpans(rowDataItems: number): number[] {
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
