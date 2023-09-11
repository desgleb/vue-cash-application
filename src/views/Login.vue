<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          v-model.trim="email"
          :class="{
            invalid:
              (v$.email.$dirty && v$.email.required.$invalid) ||
              (v$.email.$dirty && v$.email.email.$invalid),
          }"
          type="text"
        />
        <label for="email">Email</label>
        <small
          v-if="v$.email.$dirty && v$.email.required.$invalid"
          class="helper-text invalid"
          >{{ v$.email.required.$message }}
        </small>
        <small
          v-else-if="v$.email.$dirty && v$.email.email.$invalid"
          class="helper-text invalid"
          >{{ v$.email.email.$message }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          v-model.trim="password"
          :class="{
            invalid:
              (v$.password.$dirty && v$.password.required.$invalid) ||
              (v$.password.$dirty && v$.password.minLength.$invalid),
          }"
          autocomplete
          type="password"
        />
        <label for="password">Пароль</label>
        <small
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          class="helper-text invalid"
        >
          {{ v$.password.required.$message }}
        </small>
        <small
          v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
          class="helper-text invalid"
        >
          {{ v$.password.minLength.$message }}. Текущая длина пароля
          {{ password.length }}...
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import messages from "@/utils/messages";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      vuelidate: this.v$,
    };
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch("login", formData);
        // noinspection JSUnresolvedReference
        this.$router.push("/");
      } catch (e) {}
    },
  },
  validations() {
    // noinspection JSUnusedLocalSymbols
    return {
      email: {
        required: helpers.withMessage(
          "Поле EMAIL является обязательным.",
          required
        ),
        email: helpers.withMessage("Это не похоже на EMAIL...", email),
      },
      password: {
        required: helpers.withMessage(
          "Поле PASSWORD является обязательным.",
          required
        ),
        minLength: helpers.withMessage(
          ({ $pending, $invalid, $params, $model }) =>
            `Длина Вашего пароля должна быть не менее, чем ${$params.min} символов.`,
          minLength(12)
        ),
      },
    };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
};
</script>

<style lang="scss" scoped></style>
