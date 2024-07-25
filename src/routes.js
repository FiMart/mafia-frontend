import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Dashboard from "./pages/Dashboard.vue";
import Buysell from "./pages/Buysell.vue";
import Abouttax from "./pages/Abouttax.vue";
import Profile from "./pages/Profile.vue";
import {createRouter,createWebHistory} from 'vue-router';

const routes = [
    {
        name:'Home',
        component: Home,
        path: '/'
    },
    {
        name:'Login',
        component: Login,
        path: '/login'
    },
    {
        name:'Register',
        component: Register,
        path: '/register'
    },
    {
        name:'Dashboard',
        component: Dashboard,
        path: '/dashboard'
    },
    {
        name:'Buysell',
        component: Buysell,
        path: '/buysell'
    },
    {
        name:'Abouttax',
        component: Abouttax,
        path: '/abouttax'
    },
    {
        name:'Profile',
        component: Profile,
        path: '/profile'
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router