<template>
  <div class="item-details">
    <h2>
      <router-link
        class="nav-item"
        :to="{
          name: 'image',
          params: { id: route.params.id, image: previousImage },
        }"
        ><div class="nav-arrow">&lt;</div></router-link
      >
      <router-link
        class="nav-item"
        :to="{
          name: 'item',
          params: { id: route.params.id },
        }"
        >{{ potteryItem.title }}</router-link
      >
      <router-link
        class="nav-item"
        :to="{
          name: 'image',
          params: { id: route.params.id, image: nextImage },
        }"
        ><div class="nav-arrow">&gt;</div></router-link
      >
    </h2>
    <div class="item-image-container">
      <router-link
        class="nav-item"
        :to="{
          name: 'image',
          params: { id: route.params.id, image: nextImage },
        }"
      >
        <img class="item-image" :src="imageUrl()" :alt="potteryItem.title" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { items } from '@/data/spring-2022-list';
import { onMounted, ref } from 'vue';

const route = useRoute();
let potteryItem = ref({
  id: '',
  title: '',
  size: '',
  price: '',
  images: [],
});
let nextImage = ref('a');
let previousImage = ref('a');

const imageUrl = () => {
  return new URL(
    import.meta.env.BASE_URL +
      'assets/images/spring-2022/large/' +
      route.params.id +
      route.params.image +
      '.jpg',
    import.meta.url
  ).href;
};
function initPotteryItem(id, imageId) {
  let index = items.findIndex((item) => {
    return item.id === id;
  });
  if (index <= 0) {
    index = 0;
  }
  potteryItem.value = items[index];
  const images = potteryItem.value.images;
  let imageIndex = images.findIndex((image) => {
    return image === imageId;
  });
  if (imageIndex < 0) {
    imageIndex = 0;
  }
  nextImage.value =
    imageIndex + 1 < images.length ? images[imageIndex + 1] : images[0];
  previousImage.value =
    imageIndex - 1 >= 0 ? images[imageIndex - 1] : images[images.length - 1];
}
onMounted(() => {
  initPotteryItem(route.params.id, route.params.image);
});
onBeforeRouteUpdate(async (to, from) => {
  if (
    to.params.id !== from.params.id ||
    to.params.image !== from.params.image
  ) {
    initPotteryItem(to.params.id, to.params.image);
  }
});
</script>

<style scoped lang="scss">
.item-details {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  align-items: stretch;
  align-content: stretch;
}
h2 {
  margin-top: 16px;
  margin-bottom: 32px;
}
.item-image-container {
  margin-left: 32px;
  margin-right: 32px;
  text-align: center;
  flex-grow: 1;
  overflow: hidden;
}
.item-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.nav-arrow {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 30px;
}
</style>
