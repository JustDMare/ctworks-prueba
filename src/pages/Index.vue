<template>
  <q-page class="row items-center justify-evenly">
    <table-component
      :table-data="tableData"
      @updateRowData="updateRowData"
      @updateRowLabel="updateRowLabel"
    ></table-component>
  </q-page>
</template>

<script lang="ts">
import TableComponent from 'src/components/TableComponent.vue';
import { defineComponent, ref } from 'vue';
import { TableData } from 'src/models/table-data';

export default defineComponent({
  name: 'PageIndex',
  components: { TableComponent },
  setup() {
    const tableData = ref<TableData>([
      { label: 'value_1', data: ['343'] },
      { label: 'value_2', data: ['32', '54'] },
      { label: 'value_3', data: ['6343'] }
    ]);
    /**
     * Updates the label of a row.
     * @param rowIndex The index of the row to update.
     * @param value The new value of the label.
     *
     * @remarks
     * This could have been implemented in different ways (filtering by label, for
     * example), but since I had access to the indexes and there were no further
     * requirements on how to do it, I decided to go with this approach as it was fairly
     * straightforward.
     */
    function updateRowLabel(rowIndex: number, value: string) {
      tableData.value[rowIndex].label = value;
    }
    /**
     * Updates the a certain data cell of a row.
     * @param rowIndex The index of the row to update.
     * @param dataIndex The index of the cell to update.
     * @param value The new value of the cell.
     *
     * @remarks
     * Same as above regarding the implementation.
     */
    function updateRowData(rowIndex: number, dataIndex: number, value: string) {
      tableData.value[rowIndex].data[dataIndex] = value;
    }
    return { tableData, updateRowData, updateRowLabel };
  }
});
</script>
