<script setup>
    import { ref, computed, Transition, inject } from "vue";
    import { useRouter } from "vue-router";
    import { useAuthStore } from "../stores/authStore";
    import Signup from "./Signup.vue";
    import Login from "./Login.vue";
    import Logout from "./Logout.vue";
    const authStore = useAuthStore();
    const router = useRouter();
    const products = inject("products");
    const userName = computed(() => authStore.memberName);
    const accountState = computed(() => {
        return userName.value? false : true;
    })
    const helloName = computed( () => {
        return "你好" + userName.value + "!";
    })
    //搜索框邏輯區
    const search = ref("");
    const errorMessage = ref(false);
    function searchProduct(){
        if(search.value === ""){
            return;
        }
        const findProduct = products.value.filter( product => product.name.includes(search.value) )
        if(findProduct.length === 0){ 
            search.value = "";
            errorMessage.value = !errorMessage.value;
            return;
        }
        search.value = "";
        router.push({path: `/product/${findProduct[0].id}`});
    }
    function switchCartPage(){
        if(authStore.memberName){
            router.push({path: "/cart"});
        }else{
            loginModal.value = true;
            return;
        }
    }
    const loginModal = ref(false);
</script>

<template>
    <label class="hamburger" for="toggle">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </label>
    <header>
        <input type="checkbox" id="toggle">
        <nav class="navbar">
            <ul>
                <li v-show="userName">{{ helloName }}</li>
                <li><router-link to="/home">首頁</router-link></li>
                <li><a @click="switchCartPage">購物車</a></li>
                <li><Signup></Signup></li>
                <li>
                    <Login v-if="accountState"></Login>
                    <Logout v-else></Logout>
                </li>
            </ul>
        </nav>
        <div class="logo">
            <h1><router-link to="/home">購物網站</router-link></h1>
        </div>
        <div class="search">
            <input type="text" v-model="search" @keyup.enter="searchProduct()">
            <div class="search-pic" @click="searchProduct()">
                <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="">
            </div>
        </div>
    </header>
    <Transition name="error-modal">
        <div class="error-modal" v-show="errorMessage">
            <div class="content">
                <span @click="errorMessage = !errorMessage">&times;</span>
                <p>未搜索到此商品，請輸入正確的關鍵字</p>
            </div>
        </div>
    </Transition>
    <Teleport to="body">
        <div class="warn-modal" v-show="loginModal">
            <div class="content">
                <span @click="loginModal = false">&times;</span>
                <p>請先登入</p>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
    .error-modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
    }
    .error-modal .content{
        width: 300px;
        height: 200px;
        background-color: #fff;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .error-modal span{
        cursor: pointer;
        font-size: 1.5rem;
        position: absolute;
        top: -5px;
        right: 0px;
    }
    .error-modal p{
        color: #f00;
        font-size: 1.05rem;
    }
    .hamburger{
        display: none;
        border: 1px solid #888;
        background-color: rgba(250, 244, 244, 0.863);
        padding: 2.5px 5px;
        position: absolute;
        top: 10px;
        left: 5px;
        z-index: 5;
        cursor: pointer;
    }
    .hamburger:hover,
    .hamburger:active,
    header .logo:hover,
    header .log:active{
        opacity: .8;
    }
    .hamburger .bar{
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px;
        background-color: #333;
    }
    #toggle{
        display: none;
    }
    header{
        background-color: #6e62e0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
    }
    header .navbar{
        display: flex;
        position: relative;
        z-index: 4;
    }
    header .navbar ul{
        display: flex;
        align-items: center;
        list-style: none;
        min-width: 100px;
    }
    header .navbar li{
        color: #fff;
        margin: 0 30px;
        font-size: 1.25rem;
    }
    header .navbar li:first-child{
        max-width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    header .navbar li a{
        text-decoration: none;
        color: #FFF;
        font-size: 1rem;
    }
    header .navbar li a:hover,
    header .navbar li a:active{
        opacity: .8;
    }
    header .logo{
        margin: 8px;
        padding: 8px 15px;
        background-color: #49948a;
        order: -1;
        flex-shrink: 0;
        cursor: pointer;
    }
    header .logo h1{
        display: flex;
    }
    header .logo h1 a{
        font-size: 1.5rem;
        color: #fff;
    }
    header .search{
        display: flex;
        align-items: center;
        width: 300px;
        position: relative;
        margin-right: 5px;
    }
    header .search input[type=text]{
        width: 100%;
        height: 25px;
        padding-left: 10px;
        border: none;
        border-radius: 5px;
        font-size: initial;
    }
    header .search-pic{
        width: 20px;
        height: 20px;
        background-color: #fff;
        position: absolute;
        top: 2px;
        right: 0;
        cursor: pointer;
    }
    header .search-pic img{
        width: 100%;
        height: 100%;
    }
    .warn-modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
    }
    .warn-modal .content{
        width: 300px;
        height: 200px;
        background-color: #fff;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
    }
    .warn-modal span{
        cursor: pointer;
        font-size: 1.5rem;
        position: absolute;
        top: 0;
        right: 5px;
    }
    .warn-modal p{
        color: #f00;
        font-size: 1.75rem;
    }
    @media (max-width: 1200px) {
        header{
            gap: 10px
        }
        header .navbar ul li{
            margin: 0 15px;
        }
        header .search{
            width: 200px;
        }
    }
    @media (max-width: 850px) {
        .hamburger{
            display: inline-block;
        }
        header{
            justify-content: space-around;
            gap: 100px;
        }
        #toggle:checked + .navbar{
            transform: translateX(0%);
        }
        header .navbar{
            height: auto;
            background-color: #6e62e0;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            transform: translateX(-100%);
            transition: .3s;
        }
        header .navbar ul{
            flex-direction: column;
            margin-top: 50px;
            max-width: 150px;
        }
        header .navbar ul li{
            margin: 10px 5px;
        }
        header .navbar ul li:nth-child(n+4){
            position: relative;
            z-index: 5;
        }
        header .logo{
            margin-left: 60px ;
            position: relative;
            z-index: 5;
        }
        header .logo h1{
            font-size: 1.15rem;
        }
    }
    @media (max-width: 500px) {
        header{
            gap: 25px;
        }
        header .search{
            width: 150px;
        }
    }
</style>