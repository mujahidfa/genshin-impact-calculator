<template>
  <div id="app" class="">
    <h1 class="pt-4 text-3xl font-bold text-center">
      Genshin Impact Calculator
    </h1>
    <div id="nav" class="p-4 font-bold text-center text-green-900">
      <router-link to="/" exact-active-class="text-green-500">Home</router-link>
      |
      <router-link to="/standard-hit" exact-active-class="text-green-500">
        STANDARD HIT
      </router-link>
      |
      <router-link
        to="/elemental-reaction-hit"
        exact-active-class="text-green-500"
      >
        ELEMENTAL REACTION HIT
      </router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  @apply text-green-900;
}
</style>
