<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">Записей пока нет</p>

    <section v-else>
      <HistoryTable :records="records" />

      <Paginate
        :page-count="20"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      ></Paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";
import Loader from "@/components/app/Loader.vue";
import Paginate from "vuejs-paginate-next";

export default {
  name: "History",
  components: { Loader, HistoryTable, Paginate },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  methods: {
    pageChangeHandler() {
      console.log("paginate");
    },
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.categoryId)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      };
    });

    this.loading = false;
  },
};
</script>

<style scoped lang="scss"></style>
