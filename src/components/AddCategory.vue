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
            :class="{ invalid: v$.title.$dirty && v$.title.required }"
          />
          <label for="name">Название</label>
          <!--suppress JSUnresolvedReference -->
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && v$.title.required"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <!--suppress JSUnresolvedReference -->
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: v$.limit.$dirty && v$.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <!--suppress JSUnresolvedReference -->
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && v$.limit.minValue"
            >Минимальная величина</span
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
      limit: 1,
    };
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(1) },
    };
  },
  methods: {
    submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
      }
    },
  },
};
</script>
<style scoped lang="scss"></style>
