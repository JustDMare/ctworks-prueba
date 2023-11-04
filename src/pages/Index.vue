<template>
  <q-page class="row items-center justify-evenly">
    <table-component></table-component>
  </q-page>
</template>

<script lang="ts">
import TableComponent from 'src/components/TableComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { TableComponent },
  setup() {
    return {};
  }
});
</script>
