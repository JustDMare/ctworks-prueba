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
     * @param rowIndex The index of the row to update.
     * @param value The new value of the label.
     */
    function updateRowLabel(rowIndex: number, value: string) {
      context.emit('updateRowLabel', rowIndex, value);
    }
    /**
     * Sends upwards the event to update the data of a cell.
     * @param rowIndex The index of the row to update.
     * @param dataIndex The index of the cell to update.
     * @param value The new value of the cell.
     */
    function updateRowData(rowIndex: number, dataIndex: number, value: string) {
      context.emit('updateRowData', rowIndex, dataIndex, value);
    }

    function addRow() {
      context.emit('addRow');
    }

    return { updateRowData, updateRowLabel, addRow };
  }
});
</script>
