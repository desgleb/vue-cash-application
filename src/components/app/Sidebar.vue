<template>
  <ul :class="{ open: modelValue }" class="sidenav app-sidenav">
    <li
      v-for="link in links"
      :key="link.url"
      :class="link.isActive ? 'active' : ''"
      @click.prevent="makeActive"
    >
      <router-link :to="link.url" class="waves-effect waves-orange pointer">
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: "Sidebar",
  props: ["modelValue"],
  data() {
    // noinspection JSUnresolvedReference
    return {
      links: [
        {
          title: this.$filters.localizeFilter("Sidebar_Bill"),
          url: "/",
          isActive: true,
        },
        {
          title: this.$filters.localizeFilter("Sidebar_History"),
          url: "/history",
          isActive: false,
        },
        {
          title: this.$filters.localizeFilter("Sidebar_Planning"),
          url: "/planning",
          isActive: false,
        },
        {
          title: this.$filters.localizeFilter("Sidebar_Record"),
          url: "/record",
          isActive: false,
        },
        {
          title: this.$filters.localizeFilter("Sidebar_Categories"),
          url: "/categories",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    makeActive(event) {
      event.target.offsetParent.querySelectorAll("li").forEach((item) => {
        item.classList.remove("active");
      });
      event.target.parentElement.classList.add("active");
    },
  },
};
</script>

<style lang="scss" scoped></style>
