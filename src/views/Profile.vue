<template>
  <div>
    <div class="page-title">
      <!--suppress JSUnresolvedReference -->
      <h3>{{ $filters.localizeFilter("ProfileTitle") }}</h3>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <input
          id="description"
          v-model="name"
          type="text"
          :class="{ invalid: v$.name.$dirty && nameRequired }"
        />
        <!--suppress JSUnresolvedReference -->
        <label for="description">{{
          $filters.localizeFilter("ProfileName")
        }}</label>
        <!--suppress JSUnresolvedReference -->
        <span class="helper-text invalid" v-if="v$.name.$dirty && nameRequired">
          {{ $filters.localizeFilter("ProfileNameError") }}
        </span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <!--suppress JSUnresolvedReference -->
      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localizeFilter("ProfileSubmit") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      isRuLocale: true,
    };
  },
  computed: {
    ...mapGetters(["info"]),
    nameRequired() {
      return this.v$.name.required.$invalid;
    },
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-US",
        });
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
    this.isRuLocale = this.info.locale === "ru-RU";
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
