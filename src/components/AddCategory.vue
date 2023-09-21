<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<!--suppress JSUnresolvedReference -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "AddCategory",
  data() {
    return {
      title: "",
      limit: 100,
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
        const category = await this.$store.dispatch("addCategory", {
          title: this.title,
          limit: this.limit,
        });
        this.title = "";
        this.limit = this.limitMinValue;
        this.v$.$reset();
        this.$message("Категория успешно создана");
        this.$emit("created", category);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    M.updateTextFields();
  },
};
</script>
<style scoped lang="scss"></style>
