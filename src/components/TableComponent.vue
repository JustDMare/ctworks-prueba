<template>
  <table>
    <thead>
      <tr>
        <th>
          {{ $t('table.labelHeader') }}
        </th>
        <th>
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
          :cellPrefix="getCellPrefix(row.data.length, dataIndex)"
          @updateCellData="updateRowData(rowIndex, dataIndex, $event)"
        />
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">
          <button @click="$emit('openNewRowDialog')">
            {{ $t('table.addRowBtn') }}
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { TableData } from 'src/models/table-data';
import { defineComponent, PropType } from 'vue';
import TableCell from './TableCell.vue';
import { multidataRowPrefix } from 'src/config/default-values';

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
      getCellPrefix
    };
  }
});
</script>
