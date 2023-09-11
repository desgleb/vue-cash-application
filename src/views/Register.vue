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
      <div class="input-field">
        <input
          id="name"
          v-model.trim="name"
          :class="{
            invalid:
              (v$.name.$dirty && v$.name.required.$invalid) ||
              (v$.name.$dirty && v$.name.minLength.$invalid),
          }"
          type="text"
        />
        <label for="name">Имя</label>
        <small
          v-if="v$.name.$dirty && v$.name.required.$invalid"
          class="helper-text invalid"
        >
          {{ v$.name.required.$message }}
        </small>
        <small
          v-else-if="v$.name.$dirty && v$.name.minLength.$invalid"
          class="helper-text invalid"
        >
          {{ v$.name.minLength.$message }} Текущая длина Вашего имени
          {{ name.length }}...
        </small>
      </div>
      <p>
        <label>
          <input v-model="agree" type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
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
        name: this.name,
      };

      try {
        await this.$store.dispatch("register", formData);
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
      name: {
        required: helpers.withMessage(
          "Поле NAME является обязательным.",
          required
        ),
        minLength: helpers.withMessage(
          ({ $pending, $invalid, $params, $model }) =>
            `Длина Вашего имени должна быть не менее, чем ${$params.min} символов.`,
          minLength(3)
        ),
      },
      agree: { checked: (v) => v },
    };
  },
};
</script>

<style lang="scss" scoped></style>
