<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <AddCategory @created="addNewCategory" />

        <EditCategory />
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
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
};
</script>

<style scoped lang="scss"></style>
