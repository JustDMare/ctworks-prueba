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
      <tr v-for="(row, index) in tableData" :key="index">
        <td>{{ row.label }}</td>
        <td v-for="(cell, index) in row.data" :key="index">
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { TableData } from 'src/models/table-data';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TableComponent',
  props: {
    tableData: {
      type: Object as PropType<TableData>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>
