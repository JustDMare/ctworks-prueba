<template>
  <q-page class="row items-center justify-evenly">
    <table-component :table-data="tableData"></table-component>
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
    return { tableData };
  }
});
</script>
