<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <PieChart />
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">Записей пока нет</p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :click-handler="pageChangeHandler"
        :container-class="'pagination'"
        :next-text="'Вперед'"
        :page-class="'waves-effect'"
        :page-count="pageCount"
        :prev-text="'Назад'"
      ></Paginate>
    </section>
  </div>
</template>

<!--suppress JSUnresolvedReference -->
<script>
import HistoryTable from "@/components/HistoryTable.vue";
import Loader from "@/components/app/Loader.vue";
import PieChart from "@/components/PieChart.vue";
import Paginate from "vuejs-paginate-next";
import _ from "lodash";

export default {
  name: "History",
  components: { Loader, HistoryTable, Paginate, PieChart },
  data: () => ({
    loading: true,
    records: [],
    page: 1,
    pageSize: 5,
    pageCount: 0,
    allItems: [],
    items: [],
  }),
  methods: {
    pageChangeHandler(page) {
      // noinspection JSUnresolvedReference
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    async setup() {
      const categories = await this.$store.dispatch("fetchCategories");
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход",
          };
        })
      );
    },
  },
  async mounted() {
    this.page = +this.$route.query.page || 1;
    this.records = await this.$store.dispatch("fetchRecords");

    await this.setup();

    this.loading = false;
  },
};
</script>

<style lang="scss" scoped></style>
