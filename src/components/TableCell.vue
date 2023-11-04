<template>
  <td>
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
    }
  },
  setup(props, context) {
    let localCellData = ref(props.cellData);
    /**
     * Watches for changes in the `localCellData` attribute and emits an event to update
     * the `tableData` object in the parent component.
     * @watch localCellData
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
