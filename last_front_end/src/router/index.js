import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Market from "../views/Market.vue";
import Search from "../views/Search.vue";
import Account from '../views/Account.vue';
import AddProduct from '../views/AddProduct.vue';
import Login_Register from '../views/Login-Register.vue';
import Firstreport from '../views/Firstreport.vue';
import Secondreport from '../views/Secondreport.vue';
import Thirdreport from '../views/Thirdreport.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login_Register",
    component: Login_Register,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/Cart",
    name: "Cart",
    component: Cart,
  },
 
  {
    path: "/Market",
    name: "Market",
    component: Market,
  },
  {
    path: "/Search",
    name: "Search",
    component: Search,
  },
  {
    path: '/Market',
    name: 'Market',
    component: Market,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/AddProduct',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/Firstreport',
    name: 'Firstreport',
    component: Firstreport,
  },
  {
    path: '/Secondreport',
    name: 'Secondreport',
    component: Secondreport,
  },
  {
    path: '/Thirdreport',
    name: 'Thirdreport',
    component: Thirdreport,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
