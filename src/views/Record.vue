<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      <router-link to="/categories">
        Добавьте хотя бы одну категорию
      </router-link>
    </p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$dirty && amountMinInvalid }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="v$.amount.$dirty && amountMinInvalid"
        >
          Минимальная величина {{ amountMinValue }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$dirty && descriptionRequired }"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="v$.description.$dirty && descriptionRequired"
        >
          Укажите описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader.vue";
import { useVuelidate } from "@vuelidate/core";
import { minValue, required } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Record",
  components: { Loader },
  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: "outcome",
      amount: 1,
      description: "",
    };
  },
  validations() {
    return {
      amount: { minValue: minValue(0.01) },
      description: { required },
    };
  },
  computed: {
    ...mapGetters(["info"]),
    amountMinInvalid() {
      // noinspection JSUnresolvedReference
      return this.v$.amount.minValue.$invalid;
    },
    amountMinValue() {
      return this.v$.amount.minValue.$params.min;
    },
    descriptionRequired() {
      return this.v$.description.required.$invalid;
    },
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Запись успешно создана");
          this.v$.$reset();
          this.amount = 1;
          this.description = "";
        } catch (e) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      // noinspection JSCheckFunctionSignatures
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  beforeUnmount() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style lang="scss" scoped></style>
