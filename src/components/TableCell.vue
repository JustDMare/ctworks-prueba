<template>
  <td>
    <span v-if="cellPrefix">{{ cellPrefix }}: </span>
    <input v-model="localCellData" />
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
