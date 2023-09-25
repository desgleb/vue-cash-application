<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <!--suppress JSUnresolvedReference -->
      <h4>{{ $filters.currencyFilter(info.bill) }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      <router-link to="/categories">
        Добавьте хотя бы одну категорию
      </router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <!--suppress JSUnresolvedReference -->
        <p>
          <strong>{{ cat.title }}</strong>
          {{ $filters.currencyFilter(cat.spend) }} из
          {{ $filters.currencyFilter(cat.limit) }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            :class="[cat.progressColor]"
            class="determinate"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
import { mapGetters } from "vuex";
import currencyFilter from "@/filters/currency.filter";

export default {
  name: "Planning",
  components: { Loader },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((rec) => rec.categoryId === cat.id)
        .filter((rec) => rec.type === "outcome")
        .reduce((total, record) => {
          // noinspection JSUnusedAssignment
          return (total += +record.amount);
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на" : "Осталось"
      } ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>

<style scoped lang="scss"></style>
