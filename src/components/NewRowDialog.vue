<template>
  <q-dialog v-model="isDialogOpen">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ $t('newRowDialog.title') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          outlined
          v-model="selectedOption"
          :options="options"
          :label="$t('newRowDialog.selectorLabel')"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat :label="$t('newRowDialog.cancelBtn')" v-close-popup />
        <q-btn
          flat
          :label="$t('newRowDialog.addBtn')"
          v-close-popup
          @click="addNewRow"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { MAX_NUMBER_OF_DATA_CELLS } from 'src/config/default-values';

export default defineComponent({
  name: 'NewRowDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['closeNewRowDialog', 'addNewRow'],
  setup(props, context) {
    /**
     * Computed property to generate the options for the `q-select` component based on the
     * maximum number of cells allowed by `MAX_NUMBER_OF_DATA_CELLS`.
     * @computed
     * @returns {number[]} An array of numbers from 1 to `MAX_NUMBER_OF_DATA_CELLS`.
     * @see MAX_NUMBER_OF_DATA_CELLS
     */
    const options = computed<number[]>(() => {
      const options = [];
      for (let i = 1; i <= MAX_NUMBER_OF_DATA_CELLS; i++) {
        options.push(i);
      }
      return options;
    });

    const selectedOption = ref(options.value[0]);

    /**
     * Computed property to keep track of the dialog's state.
     * @computed
     * @returns {boolean} The current state of the dialog.
     *
     * @remarks
     * In Vue 3 it could be done with a simple `v-model` directive, as it has some
     * built-in updating capabilities, but these are not available in Vue 2 as far as I
     * know, even with the `setup` syntax.
     */
    const isDialogOpen = computed<boolean>({
      get() {
        return props.isOpen;
      },
      set(newValue) {
        context.emit('closeNewRowDialog', newValue);
      }
    });

    /**
     * Emits an event to add a new row to the table. The number of data cells is taken
     * from the `selectedOption` attribute.
     * @emits addNewRow The event to add a new row to the table.
     */
    function addNewRow() {
      context.emit('addNewRow', selectedOption.value);
    }
    return { selectedOption, options, isDialogOpen, addNewRow };
  }
});
</script>
