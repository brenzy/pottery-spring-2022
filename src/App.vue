<template>
  <header>
    <router-link class="nav-item" to="/"
      ><h1>New Pottery - Spring 2022</h1></router-link
    >
  </header>
  <RouterView />
</template>

<script></script>

<style lang="scss">
@import '@/assets/base.css';
header {
  text-align: center;
}
a.nav-item,
a.nav-item:visited,
a.nav-item:hover,
a.nav-item:active {
  color: inherit;
  text-decoration: none;
}
</style>
