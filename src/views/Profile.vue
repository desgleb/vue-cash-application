<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <input
          id="description"
          v-model="name"
          type="text"
          :class="{ invalid: v$.name.$dirty && nameRequired }"
        />
        <label for="description">Имя</label>
        <span class="helper-text invalid" v-if="v$.name.$dirty && nameRequired">
          Укажите Ваше имя
        </span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Profile",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapGetters(["info"]),
    nameRequired() {
      return this.v$.name.required.$invalid;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
      } catch (e) {}
    },
  },
  validations() {
    return {
      name: { required },
    };
  },
  mounted() {
    this.name = this.info.name;
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
};
</script>

<style lang="scss" scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
