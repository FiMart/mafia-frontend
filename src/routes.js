import HomeBefore from "./pages/HomeBefore.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Dashboard from "./pages/Dashboard.vue";
import Buysell from "./pages/Buysell.vue";
import Abouttax from "./pages/Abouttax.vue";
import Profile from "./pages/Profile.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import SurveyExperience from "./pages/SurveyExperience.vue";
import SurveyTax from "./pages/SurveyTax.vue";
import Transaction from "./pages/Transaction.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "HomeBefore",
    component: HomeBefore,
    path: "/",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "Home",
    component: Home,
    path: "/home",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "Register",
    component: Register,
    path: "/register",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "ForgotPassword",
    component: ForgotPassword,
    path: "/forgot-password",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "ResetPassword",
    component: ResetPassword,
    path: "/reset-password",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "SurveyExperience",
    component: SurveyExperience,
    path: "/survey-experience",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "SurveyTax",
    component: SurveyTax,
    path: "/survey-tax",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "Dashboard",
    component: Dashboard,
    path: "/dashboard",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "Buysell",
    component: Buysell,
    path: "/buy-sell",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "Abouttax",
    component: Abouttax,
    path: "/about-tax",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },
  },
  {
    name: "Profile",
    component: Profile,
    path: "/profile",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },  
  },
  {
    name: "Transaction",
    component: Transaction,
    path: "/transaction",
    meta: {
      title: "MutuAl Fund Investment Advisor (MAFIA)",
    },  
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? "Default Title";
});

export default router;
