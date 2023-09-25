<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <!--suppress JSUnresolvedReference -->
        <td>{{ $filters.currencyFilter(record.amount) }}</td>
        <!--suppress JSUnresolvedReference -->
        <td>{{ $filters.dateFilter(record.date, "datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Посмотреть запись'"
            class="btn-small btn"
            @click.prevent="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss"></style>
