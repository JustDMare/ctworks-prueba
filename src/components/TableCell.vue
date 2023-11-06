<template>
  <td :colspan="colSpan">
    <div class="inline-td" :class="{ 'left-padding': !!cellPrefix }">
      <span v-if="cellPrefix">{{ cellPrefix }}: </span>
      <q-input
        dense
        borderless
        debounce="500"
        v-model="localCellData"
        :input-style="!cellPrefix ? { textAlign: 'center' } : {}"
      />
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
    },
    colSpan: {
      type: Number,
      default: 1
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
.text-center {
  text-align: center !important;
}
.inline-td {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.left-padding {
  padding-left: 24px;
}
</style>
