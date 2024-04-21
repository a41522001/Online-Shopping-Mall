<script setup>
    import { ref, computed, Transition, inject } from "vue";
    import { useRouter } from "vue-router";
    const router = useRouter();
    const products = inject("products");
    const userName = ref("");
    const accountState = computed(() => {
        return userName.value? "登出" : "登入";
    })
    const helloName = computed( () => {
        return "你好" + userName.value + "!";
    })
    const showModal = ref(false);
    function openModal(){
        showModal.value = !showModal.value;
        
    }
    function logout(){
        userName.value = "";
        showModal.value = !showModal.value;   
    }
    function inputName(){
        const inputUserName = document.querySelector("#user-name").value;
        if(inputUserName){
            userName.value = inputUserName;
        }
        showModal.value = false;
    }
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
                <li><router-link to="/cart">購物車</router-link></li>
                <li><a href="#" @click="openModal()">{{ accountState }}</a></li>
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
    <Transition name="modal">
        <div class="modal" v-show="showModal">
            <div class="content">
                <div class="logout" v-if="userName">
                    <span @click="showModal = !showModal">&times;</span>
                    <p>確定要登出嗎</p>
                    <button @click="logout()">確定</button>
                </div>
                <div class="login" v-else>
                    <span @click="showModal = !showModal">&times;</span>
                    <label for="user-name">用戶名</label><br>
                    <input type="text" id="user-name"  @keyup.enter="inputName()"><br>
                    <button @click="inputName()">確定</button>
                </div>    
            </div>
            
        </div>
    </Transition>
    <Transition name="error-modal">
        <div class="error-modal" v-show="errorMessage">
            <div class="content">
                <span @click="errorMessage = !errorMessage">&times;</span>
                <p>未搜索到此商品，請輸入正確的關鍵字</p>
            </div>
        </div>
    </Transition>
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
        z-index: 10;
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
        z-index: 10;
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
        z-index: 3;
    }
    header .navbar ul{
        display: flex;
        align-items: center;
        list-style: none;
    }
    header .navbar li{
        color: #fff;
        margin: 0 30px;
        font-size: 1.25rem;
    }
    header .navbar li:first-child{
        max-width: 120px;
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
    .modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    .modal .content{
        width: 300px;
        height: 200px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 30px;
        position: relative;
    }
    .modal span{
        cursor: pointer;
        font-size: 1.5rem;
        position: absolute;
        top: -5px;
        right: 0px;
    }
    .modal-enter-from,
    .modal-leave-to{
        opacity: 0;
    }
    .modal-enter-to,
    .modal-leave-from{
        opacity: 1;
    }
    .modal-enter-active,
    .modal-leave-active{
        transition: opacity .2s;
    }
    .logout{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .logout p{
        font-size: 2rem;
    }
    .logout button{
        margin-top: 50px;
        padding: 5px 40px;
        border: none;
        border-radius: 5px;
        background-color: #49948a;
        color: #fff;
        cursor: pointer;
    }
    .login input{
        width: 200px;
        font-size: initial;
        margin: 10px 0 20px 0;
        border-radius: 5px;
        outline: none;
        border: 1px solid #333;
        padding: 2px 5px;
    }
    .login button{
        padding: 5px 15px;
        border: none;
        border-radius: 5px;
        background-color: #49948a;
        color: #fff;
        cursor: pointer;
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
        .humburger{
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
        }
        header .navbar ul li{
            margin: 10px 5px;
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