<template>
  <table>
    <thead>
      <tr>
        <th>
          {{ $t('table.labelHeader') }}
        </th>
        <th :colspan="MAX_NUMBER_OF_DATA_CELLS">
          {{ $t('table.dataHeader') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
        <TableCell
          :cell-data="row.label"
          @updateCellData="updateRowLabel(rowIndex, $event)"
        />
        <TableCell
          v-for="(cell, dataIndex) in row.data"
          :key="dataIndex"
          :cell-data="cell"
          :colSpan="getCellColSpan(row.data.length, dataIndex)"
          :cellPrefix="getCellPrefix(row.data.length, dataIndex)"
          @updateCellData="updateRowData(rowIndex, dataIndex, $event)"
        />
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td :colspan="MAX_NUMBER_OF_DATA_CELLS + 1" class="text-center">
          <q-btn outline @click="$emit('openNewRowDialog')">
            {{ $t('table.addRowBtn') }}
          </q-btn>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { TableData } from 'src/models/table-data';
import { defineComponent, PropType } from 'vue';
import TableCell from './TableCell.vue';
import {
  MAX_NUMBER_OF_DATA_CELLS,
  multidataRowPrefix
} from 'src/config/default-values';
import { distributeDataColSpans } from 'src/utils/distribute-data-colspan';

export default defineComponent({
  name: 'TableComponent',
  components: { TableCell },
  props: {
    tableData: {
      type: Array as PropType<TableData>,
      required: true
    }
  },
  setup(props, context) {
    /**
     * Sends upwards the event to update the label of a row.
     * @param {number} rowIndex The index of the row to update.
     * @param {string} value The new value of the label.
     */
    function updateRowLabel(rowIndex: number, value: string) {
      context.emit('updateRowLabel', rowIndex, value);
    }
    /**
     * Sends upwards the event to update the data of a cell.
     * @param {number} rowIndex The index of the row to update.
     * @param {number} dataIndex The index of the cell to update.
     * @param {string} value The new value of the cell.
     * @emits updateRowData The event to update the data of a cell.
     */
    function updateRowData(rowIndex: number, dataIndex: number, value: string) {
      context.emit('updateRowData', rowIndex, dataIndex, value);
    }

    /**
     * Returns the prefix for a cell if it's a row with multiple data cells.
     * @param {number} rowDataLenght The number of data cells in the row.
     * @param {number} dataIndex The index of the cell to which the prefix will be added.
     */
    function getCellPrefix(rowDataLenght: number, dataIndex: number) {
      return rowDataLenght > 1 ? multidataRowPrefix[dataIndex] : '';
    }

    /**
     * Returns the colspan for a cell. Makes use of the {@link distributeDataColSpans} function
     * @param {number} rowDataLenght Length of the data array for that row
     * @param {number} dataIndex Index of the cell to which the colspan will be applied
     * @see distributeDataColSpans
     */
    function getCellColSpan(rowDataLenght: number, dataIndex: number) {
      return distributeDataColSpans(rowDataLenght)[dataIndex];
    }

    /**
     * Sends upwards the event to add a new row to the table.
     * @emits addRow
     */
    function addRow() {
      context.emit('addRow');
    }

    return {
      updateRowData,
      updateRowLabel,
      addRow,
      multidataRowPrefix,
      getCellPrefix,
      MAX_NUMBER_OF_DATA_CELLS,
      getCellColSpan
    };
  }
});
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  th,
  td {
    border: 1px solid #ccc;
  }
  th {
    background-color: var(--q-color-primary);
    color: white;
    padding: 8px 0px;
  }
  tfoot {
    td {
      padding: 8px 0px;
    }
  }
}
</style>
