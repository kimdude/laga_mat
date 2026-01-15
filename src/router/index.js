import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import OrdersView from '@/views/OrdersView.vue';
import StockView from '@/views/StockView.vue';
import UserView from '@/views/UserView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

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

//Authorization of user
const authUser = () => {

  //Getting token
  const token = localStorage.getItem("token");

  if(token) {
    //Decoding token
    const decodedToken = jwtDecode(token);

    //Comparing current time with token-expiration time
    const currentTime = Date.now();
    const expTime = decodedToken.exp * 1000;

    if(expTime > currentTime) { 
      return true; 

    } else { 
      localStorage.removeItem("token");
      return false; 
    }

  } else {
    console.log("No token at all")
    return false;
  }
}

//Redirecting with global nav guard
router.beforeEach((to, from) => {

  const canAccess = authUser();

  if(to.name !== "logga_in" && !canAccess) {
    return {name: "logga_in"};  

  } 
  
  if (to.name === "logga_in" && canAccess) {
    return {name: "kontrollpanel"};

  } 

  return true;
});

export default router;
