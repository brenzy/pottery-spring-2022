import { createRouter, createWebHashHistory } from 'vue-router';
import PotteryListView from '../views/PotteryListView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'pottery-list',
      component: PotteryListView,
    },
    {
      path: '/:id',
      name: 'item',
      component: () => import('../views/PotteryItem.vue'),
    },
    {
      path: '/:id/:image',
      name: 'image',
      component: () => import('../views/PotteryImageView.vue'),
    },
  ],
});

export default router;
