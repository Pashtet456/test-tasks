<template>
  <table class="memory-table">
    <tr class="memory-table__row memory-table__row--title">
      <th class="memory-table__cell">
        Значение
      </th>

      <th class="memory-table__cell">
        Время
      </th>
    </tr>

    <tr class="memory-table__row"
         v-for="(value, index) in appMemoryTimeValues" :key="index">
      <td class="memory-table__cell">
        {{ value.name }}
      </td>

      <td class="memory-table__cell">
        {{ stringifyTimeValue( value.time ) }}
      </td>
    </tr>

    <tr v-if="isValuesEmpty" class="memory-table__row">
      <td colspan="2" class="memory-table__cell">
        Нет результатов
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "AppMemoryTable",
  props: {
    values: {
      type: Array,
      required: true,
    }
  },
  methods: {
    stringifyTimeValue( value ) {
      let result = '';

      const hours = Math.trunc(value / 3600);
      const minutes = Math.trunc(value / 60) % 60;
      const seconds = Math.trunc(value % 60);

      if ( hours ) {
        result += hours + ' ч. '
      }

      if ( minutes ) {
        result += minutes + ' мин. '
      }

      if ( seconds ) {
        result += seconds + ' сек.'
      }

      return result;
    }
  },
  computed: {
    ...mapGetters( 'memory', [ 'appMemoryTimeValues' ] ),
    isValuesEmpty() {
      const values = this.appMemoryTimeValues;

      return !values || !values.length;
    }
  }
}
</script>

