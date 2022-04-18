<template>
  <div class="item-details">
    <h2>
      <router-link
        class="nav-item"
        :to="{ name: 'item', params: { id: previousItem } }"
        ><div class="nav-arrow">&lt;</div></router-link
      >
      {{ potteryItem.title }}
      <router-link
        class="nav-item"
        :to="{ name: 'item', params: { id: nextItem } }"
        ><div class="nav-arrow">&gt;</div></router-link
      >
    </h2>
    <div class="item-description">
      {{ potteryItem.description }}
    </div>
    <div class="item-description">
      {{ potteryItem.price }}
    </div>
  </div>
  <ul class="item-images">
    <li class="item-image" v-for="image in potteryItem.images" :key="image">
      <router-link
        class="nav-item"
        :to="{ name: 'image', params: { id: potteryItem.id, image } }"
      >
        <img :src="imageUrl(image)" :alt="potteryItem.title" />
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { items } from '@/data/spring-2022-list';
import { onMounted, ref } from 'vue';

const route = useRoute();
let potteryItem = ref({
  id: '',
  title: '',
  description: '',
  price: '',
  images: [],
});
let nextItem = ref(items[0].id);
let previousItem = ref(items[0].id);

const imageUrl = (imageId) => {
  return new URL(
    import.meta.env.BASE_URL +
      'assets/images/spring-2022/medium/' +
      potteryItem.value.id +
      imageId +
      '.jpg',
    import.meta.url
  ).href;
};
function initPotteryItem(id) {
  let index = items.findIndex((item) => {
    return item.id === id;
  });
  if (index <= 0) {
    index = 0;
  }
  potteryItem.value = items[index];
  nextItem.value = index + 1 < items.length ? items[index + 1].id : items[0].id;
  previousItem.value =
    index - 1 >= 0 ? items[index - 1].id : items[items.length - 1].id;
}
onMounted(() => {
  initPotteryItem(route.params.id);
});
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    initPotteryItem(to.params.id);
  }
});
</script>

<style scoped lang="scss">
h2 {
  margin-top: 16px;
  margin-bottom: 16px;
}
.item-details {
  text-align: center;
}
.item-description,
.item-price {
  font-size: 20px;
}
.item-images {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: center;
}
.item-image {
  margin: 32px;
}
.nav-arrow {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 30px;
}
</style>
