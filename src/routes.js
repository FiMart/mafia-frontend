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
        path: '/',
        name:'Home',
        component: Home,
        meta : {
            title: "Home"
        }
    },
    {
        path: '/login',
        name:'Login',
        component: Login,
        meta : {
            title: "Login"
        }
    },
    {
        path: '/register',
        name:'Register',
        component: Register,
        meta : {
            title: "Register"
        }
    },
    {
        path: '/dashboard',
        name:'Dashboard',
        component: Dashboard,
        meta : {
            title: "Dashboard"
        }
    },
    {
        path: '/buysell',
        name:'Buysell',
        component: Buysell,
        meta : {
            title: "Buysell"
        }
    },
    {
        path: '/abouttax',
        name:'Abouttax',
        component: Abouttax,
        meta : {
            title: "Abouttax"
        }
    },
    {
        path: '/profile',
        name:'Profile',
        component: Profile,
        meta : {
            title: "Profile"
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) =>{
    document.title = `${to.meta.title}`;
    next();
})

export default router