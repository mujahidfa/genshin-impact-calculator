<template>
  <div class="flex flex-col items-center justify-center h-screen space-y-8">
    <h1 class="text-6xl font-bold text-white glow">
      Calculate your character's DMG
    </h1>
    <router-link
      to="/standard-hit"
      class="px-12 py-4 text-3xl font-semibold text-white transition duration-300 ease-in-out transform bg-green-400 rounded-lg hover:bg-green-600 hover:scale-105"
    >
      Get Started
    </router-link>
  </div>
</template>

<style scoped>
.glow {
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #c6f6d5, 0 0 20px #c6f6d5, 0 0 30px #2f855a,
      0 0 40px #2f855a, 0 0 50px #2f855a, 0 0 60px #2f855a, 0 0 70px #2f855a;
  }

  to {
    text-shadow: 0 0 20px #c6f6d5, 0 0 30px #68d391, 0 0 40px #68d391,
      0 0 50px #68d391, 0 0 60px #68d391, 0 0 70px #68d391, 0 0 80px #68d391;
  }
}
</style>
