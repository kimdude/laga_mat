import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import OrdersView from '@/views/OrdersView.vue';
import StockView from '@/views/StockView.vue';
import UserView from '@/views/UserView.vue';
import { createRouter, createWebHistory } from 'vue-router';

//Routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "kontrollpanel",
      component: HomeView,
    },
    {
      path: "/logga_in",
      name: "logga_in",
      component: LoginView,
    },
    {
      path: "/lager",
      name: "lager",
      component: StockView
    },
    {
      path: "/inkop",
      name: "inkop",
      component: OrdersView
    },
    {
      path: "/anvandare",
      name: "anvandare",
      component: UserView
    }
  ],
});

//Simple authorization of user
const authUser = () => {
  if(!localStorage.getItem("token")) return false;
  else return true;
}

//Redirecting with global nav guard
router.beforeEach((to, from) => {

  if(to.name !== "logga_in") {
    const canAccess = authUser();

    //Redirecting not logged-in users to login-page
    if(!canAccess) return "/logga_in";

  } else if (to.name === "logga_in") {
    const canAccess = authUser();

    //Redirecting logged-in users to home-page
    if(canAccess) return "/";
  }
});

export default router;
