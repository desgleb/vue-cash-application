<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <!--suppress JSUnresolvedReference -->
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$dirty && titleRequired }"
          />
          <label for="name">Название</label>
          <!--suppress JSUnresolvedReference -->
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && titleRequired"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <!--suppress JSUnresolvedReference -->
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$dirty && limitMinValid }"
          />
          <label for="limit">Лимит</label>
          <!--suppress JSUnresolvedReference -->
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && limitMinValid"
            >Минимальная величина {{ limitMinValue }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  name: "EditCategory",
  data() {
    return {
      select: null,
      title: "",
      limit: 100,
      current: null,
    };
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(100) },
    };
  },
  computed: {
    titleRequired() {
      return this.v$.title.required.$invalid;
    },
    limitMinValid() {
      return this.v$.limit.minValue.$invalid;
    },
    limitMinValue() {
      return this.v$.limit.minValue.$params.min;
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория успешно обновлена");
        this.$emit("updated", categoryData);
      } catch (e) {}
    },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    // noinspection JSCheckFunctionSignatures
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  beforeUnmount() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style scoped lang="scss"></style>
