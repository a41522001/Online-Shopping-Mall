import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import ProductDetail from "../views/ProductDetail.vue";
const routes = [
    {
        path: "/",
        redirect: "home"
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/product/:id",
        name: "productDetail",
        component: ProductDetail
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;