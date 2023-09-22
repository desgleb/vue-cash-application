<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <AddCategory @created="addNewCategory" />

        <EditCategory
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="updateCategories"
        />
        <p v-else class="center">Создайте хотя бы одну категорию</p>
      </div>
    </section>
  </div>
</template>

<script>
import AddCategory from "@/components/AddCategory.vue";
import EditCategory from "@/components/EditCategory.vue";
import Loader from "@/components/app/Loader.vue";

export default {
  name: "Categories",
  components: {
    Loader,
    AddCategory,
    EditCategory,
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },
  methods: {
    addNewCategory(category) {
      console.log(category);
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
p {
  &.center {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
