<template>
  <div class="item-card">
    <router-link :to="itemRoute(item)">
      <img class="item-image" :src="imageUrl(item.id)" :alt="item.title" />
    </router-link>
    <div>{{ item.title }}</div>
    <router-link :to="itemRoute(item)">View Details</router-link>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const imageUrl = (id) => {
  return new URL(
    import.meta.env.BASE_URL +
      'assets/images/spring-2022/small/' +
      id +
      'a.jpg',
    import.meta.url
  ).href;
};
const itemRoute = (item) => {
  return { name: 'item', params: { id: item.id } };
};
</script>
<style scoped lang="scss">
.item-card {
  margin: 32px;
}
</style>
