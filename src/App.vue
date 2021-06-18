<template>
  <div id="app" class="">
    <header class="flex justify-around bg-black bg-opacity-75">
      <!-- <h1 class="pt-4 text-3xl font-bold text-center">
        Genshin Impact DMG Calculator
      </h1> -->
      <div class="flex flex-col items-center">
        <img src="@/assets/logo.png" alt="Website logo." class="w-32 h-12" />
        <p
          class="text-xl font-semibold leading-none tracking-wider text-blue-100"
        >
          Calculator
        </p>
      </div>

      <!-- <div class="absolute bg-green-300 route-hat"></div> -->
      <nav
        class="flex items-center p-4 space-x-8 text-lg tracking-wide text-center text-white"
      >
        <router-link
          to="/"
          exact-active-class="font-bold glow"
          class="hover:text-green-200"
        >
          Home
        </router-link>
        <router-link
          to="/standard-hit"
          exact-active-class="font-bold glow"
          class="hover:text-green-200"
        >
          Standard Hit
        </router-link>
        <router-link
          to="/elemental-reaction-hit"
          exact-active-class="font-bold glow"
          class="hover:text-green-200"
        >
          Elemental Reaction Hit
        </router-link>
      </nav>
    </header>

    <keep-alive>
      <router-view class="flex" />
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

body {
  /* background-image: url("./assets/background.jpeg"); */
  /* background-repeat: no-repeat; */
  background: url("./assets/background.jpeg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  @apply bg-black;
}

.glow {
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #c6f6d5, 0 0 20px #c6f6d5, 0 0 30px #38a169,
      0 0 40px #38a169, 0 0 50px #38a169, 0 0 60px #38a169, 0 0 70px #38a169;
  }

  to {
    text-shadow: 0 0 20px #c6f6d5, 0 0 30px #68d391, 0 0 40px #68d391,
      0 0 50px #68d391, 0 0 60px #68d391, 0 0 70px #68d391, 0 0 80px #68d391;
  }
}

.route-hat {
  z-index: 1;
  transition: all 0.2s ease-in-out 0s;
  height: 5px;
  left: 55px;
  width: 42px;
  top: 0px;
}
</style>
