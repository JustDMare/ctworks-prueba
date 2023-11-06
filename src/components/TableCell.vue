<template>
  <td :colspan="colSpan">
    <div class="inline-td" :class="{ 'left-padding': !!cellPrefix }">
      <span v-if="cellPrefix">{{ cellPrefix }}: </span>
      <q-input
        dense
        borderless
        debounce="500"
        v-model="localCellData"
        :input-style="inputStyle"
      />
    </div>
  </td>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue';

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

    /**
     * Computed property to set the style of the input element to center the text if there
     * is no prefix.
     * @computed
     * @returns The style of the input element.
     *
     * @remarks
     * I haven't found a way to do this with CSS only due to how the `q-input` component
     * works, so I decided to go with this approach.
     */
    const inputStyle = computed(() => {
      return !props.cellPrefix ? { textAlign: 'center' } : {};
    });
    return { localCellData, inputStyle };
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
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.left-padding {
  padding-left: 24px;
}
</style>
