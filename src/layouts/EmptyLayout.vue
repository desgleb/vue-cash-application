<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  name: "Empty",
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
};
</script>
