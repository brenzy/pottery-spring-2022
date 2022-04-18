<template>
  <div class="item-list-wrapper">
    <ul class="item-list">
      <li class="item" v-for="item in items" :key="item.id">
        <ItemListCard :item="item"></ItemListCard>
      </li>
    </ul>
  </div>
</template>

<script setup>
import ItemListCard from '@/components/ItemListCard.vue';
import { items } from '@/data/spring-2022-list';
</script>

<style scoped lang="scss">
.item-list-wrapper {
  margin: 32px;
}
.item-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: center;
}
.item {
  margin: 32px;
}
</style>
