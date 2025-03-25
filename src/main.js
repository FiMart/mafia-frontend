import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import './index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(Toast);
<<<<<<< HEAD

// 👇 Check token before mounting
const checkTokenExpiry = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;
        const now = Math.floor(Date.now() / 1000);

        if (exp < now) {
            // Token expired
            console.warn("⛔ Token expired, clearing session.");
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("username");
            // Optional: redirect to login
            router.push("/login");
        }
    } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        router.push("/login");
    }
};

checkTokenExpiry(); // Call the function

=======
>>>>>>> 0d104b837e000639ab4276695d076fae98e6afe1
app.mount('#app');
