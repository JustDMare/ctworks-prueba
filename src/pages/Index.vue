<template>
  <q-page class="row items-center justify-evenly">
    <div class="flex">
      <table-component
        :table-data="tableData"
        @updateRowData="updateRowData"
        @updateRowLabel="updateRowLabel"
        @addRow="addRow"
        @openNewRowDialog="updateNewRowDialogVisibility(true)"
      ></table-component>
      <q-btn outline :label="$t('exportBtn')" @click="exportToPDF(tableData)" />
    </div>
    <new-row-dialog
      :is-open="isNewRowDialogOpen"
      @closeNewRowDialog="updateNewRowDialogVisibility"
      @addNewRow="addRow"
    ></new-row-dialog>
  </q-page>
</template>

<script lang="ts">
import TableComponent from 'src/components/TableComponent.vue';
import NewRowDialog from 'src/components/NewRowDialog.vue';
import { defineComponent, ref } from 'vue';
import { TableData } from 'src/models/table-data';
import { exportToPDF } from 'src/utils/pdf-export';

export default defineComponent({
  name: 'PageIndex',
  components: { TableComponent, NewRowDialog },
  setup() {
    const tableData = ref<TableData>([
      { label: 'value_1', data: ['343'] },
      { label: 'value_2', data: ['32', '54'] },
      { label: 'value_3', data: ['6343'] }
    ]);
    const isNewRowDialogOpen = ref(false);

    /**
     * Updates the visibility of the NewRowDialog.
     * @param {boolean} isOpen The new visibility state of the dialog.
     */
    function updateNewRowDialogVisibility(isOpen: boolean) {
      isNewRowDialogOpen.value = isOpen;
    }
    /**
     * Updates the label of a row.
     * @param {number} rowIndex The index of the row to update.
     * @param {string} value The new value of the label.
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
     * @param {number} rowIndex The index of the row to update.
     * @param {number} dataIndex The index of the cell to update.
     * @param {string} value The new value of the cell.
     *
     * @remarks
     * Same as above regarding the implementation.
     */
    function updateRowData(rowIndex: number, dataIndex: number, value: string) {
      tableData.value[rowIndex].data[dataIndex] = value;
    }
    /**
     * Adds a new row to the table with default values.
     * @param {number} numberOfDataCells The number of data cells to add to the row.
     */
    function addRow(numberOfDataCells: number): void {
      const data: string[] = [];
      for (let i = 0; i < numberOfDataCells; i++) {
        data.push('');
      }
      tableData.value.push({ label: '', data });
    }
    return {
      tableData,
      updateRowData,
      updateRowLabel,
      addRow,
      isNewRowDialogOpen,
      updateNewRowDialogVisibility,
      exportToPDF
    };
  }
});
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.q-btn {
  align-self: flex-end;
}
</style>
