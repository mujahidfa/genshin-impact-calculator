import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/standard-hit",
    name: "Standard Hit",
    // route level code-splitting
    // this generates a separate chunk (standard-hit.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StandardHit.vue"),
  },
  {
    path: "/elemental-reaction-hit",
    name: "Elemental Reaction Hit",
    // route level code-splitting
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ElementalReactionHit.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
