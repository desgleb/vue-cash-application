<template>
  <div class="app-main-layout">
    <Navbar @burgerClick="isOpen = !isOpen" />

    <Sidebar v-model="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        to="/record"
        v-tooltip="'Создать новую запись'"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import messages from "@/utils/messages";

export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true,
  }),
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError.code);
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
  },
};
</script>

<style scoped lang="scss"></style>
