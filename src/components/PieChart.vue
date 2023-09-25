<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>
<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Title, Legend);

export default {
  name: "PieChart",
  components: { Pie },
  data() {
    return {
      categories: [],
      records: [],
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.categories.map((c) => c.title),
        datasets: [
          {
            label: "Расходы по категории",
            data: this.categories.map((c) => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  total += +r.amount;
                }
                return total;
              }, 0);
            }),
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          },
        ],
      };
    },
    chartOptions() {
      return { responsive: true };
    },
  },
  async beforeMount() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = await this.$store.dispatch("fetchRecords");
  },
};
</script>
