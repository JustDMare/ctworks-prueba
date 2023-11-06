<template>
  <td>
    <div class="inline-td">
      <span v-if="cellPrefix">{{ cellPrefix }}: </span>
      <q-input dense borderless v-model="localCellData" />
    </div>
  </td>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
  name: 'TableCell',
  props: {
    cellData: {
      type: String,
      required: true
    },
    cellPrefix: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    let localCellData = ref(props.cellData);
    /**
     * Watches for changes in the `localCellData` attribute and emits an event to update
     * the `tableData` object in the parent component.
     * @watch localCellData
     * @emits updateCellData The event to update the data of the cell.
     */
    watch(
      () => localCellData.value,
      (newCellData) => {
        context.emit('updateCellData', newCellData);
      }
    );
    return { localCellData };
  }
});
</script>
<style lang="scss" scoped>
td {
  vertical-align: middle;
}
.inline-td {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
  padding-left: 8px;
}
</style>
