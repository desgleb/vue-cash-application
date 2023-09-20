<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <AddCategory />

        <EditCategory />
      </div>
    </section>
  </div>
</template>

<script>
import AddCategory from "@/components/AddCategory.vue";
import EditCategory from "@/components/EditCategory.vue";

export default {
  name: "Categories",
  components: {
    AddCategory,
    EditCategory,
  },
};
</script>

<style scoped lang="scss"></style>
