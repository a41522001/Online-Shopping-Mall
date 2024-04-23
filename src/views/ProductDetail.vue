<script setup>
    import Header from "../components/Header.vue";
    import { ref, inject, onMounted, watchEffect, computed } from "vue";
    import { useAuthStore } from "../stores/authStore";
    const authStore = useAuthStore();
    const memberName = computed(() => authStore.memberName); 
    const products = inject("products");
    //以下區塊邏輯: 先讓導入路由再設置常數來實現訪問路由 
    //再宣告productDetail後面要訪問路由的參數(也就是id)的值
    //對應從App.vue抓下來的資料傳進去
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    const router = useRouter();
    const productDetail = ref(null);
    const repeatProduct = ref(false);
    //先訪問到路由的參數ID並傳進一個常數
    //再用整串API資料利用陣列的find方法來尋找對應的id資料形成單一物件並傳進product
    //再把剛抓到的物件賦值給productDetail常數
    onMounted(() => {
        const productId = route.params.id;
        const product = products.value.find(product => product.id == productId);
        productDetail.value = product;
        if(localStorage.getItem("cart")){
            carts.value = JSON.parse(localStorage.getItem("cart"));
        }
    })
    //因重新整理頁面時會導致products讀取不到
    //所以利用watchEffect先監聽一次products的值 再重新執行一遍尋找ID的邏輯
    watchEffect(() => {
        const productId = route.params.id;
        const product = products.value.find(product => product.id == productId);
        productDetail.value = product;
    });
    //添加購物車邏輯區
    const carts = ref([]);
    function addCart(){
        if(!memberName.value){
            loginModal.value = true;
            return;
        }
        if(carts.value.find(cart => cart.id == productDetail.value.id)){
            repeatProduct.value = !repeatProduct.value;
        }else{
            carts.value.push(productDetail.value);
            localStorage.setItem("cart", JSON.stringify(carts.value));
            successModal.value = true;

        }
    }
    function prevPage(){
        router.back();
    }

    const loginModal = ref(false);

    const successModal = ref(false);
</script>

<template>
    <div class="container">
        <Header></Header>
        <!--這邊加v-if的關係是因為剛開始product的值被設置為null
        直到組件被掛載後才有值, 所以要設條件渲染, 等到product有值後
        才渲染到<template>模板裡-->
        <div class="product" v-if="productDetail">
            <div class="wrap">
                <button class="prev" @click="prevPage()">上一頁</button>
                <div class="pic">
                    <img :src="productDetail.image" alt="">
                </div>
                <h1>{{ productDetail.name }}</h1>
                <p>${{ productDetail.price }}</p>
                <div class="detail">
                    <h3>商品詳情</h3>
                    <p>{{ productDetail.description }}</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <button @click="addCart()">加入購物車</button>
        </div>
    </div>
    <div class="repeat-modal" v-show="repeatProduct">
        <div class="content">
            <p>此商品已在購物車內</p>
            <button @click="repeatProduct = !repeatProduct">確定</button>
        </div>
    </div>
    <div class="warn-modal" v-show="loginModal">
        <div class="content">
            <span @click="loginModal = false">&times;</span>
            <p>請先登入</p>
        </div>
    </div>
    <div class="success-modal" v-show="successModal">
        <div class="content">
            <p>成功添加購物車!</p>
            <button @click="successModal = false">確定</button>
        </div>
    </div>
</template>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .product{
        flex-grow: 2;
        max-width: 1200px;
        width: 100%;
        margin: auto;
        background-color: #fff;
    }
    .product .wrap{
        padding: 0 30px;
        position: relative;
    }
    .product .prev{
        padding: 5px 15px;
        background-color: #6e62e0;
        color: #fff;
        position: absolute;
        top: 10px;
        left: 10px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
    .product .pic{
        width: 75%;
        height: 500px;
        margin: auto
    }
    .product .pic img{
        width: 100%;
        height: 100%;
    }
    .product .wrap p{
        font-size: 1.25rem;
        margin: 10px 0 15px 0;
    }
    .detail h3{
        position: relative;
    }
    .detail h3::after{
        content: "";
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -10px;
        left: 0;
        background-color: #333;
    }
    .detail p{
        padding: 10px 0;
        font-size: 1rem; 
    }
    .footer{
        background-color: #6e62e0;
        margin: auto;
        max-width: 1200px;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .footer button{
        padding: .75rem 5.5rem;
        cursor: pointer;
        font-size: 1.5rem;
        background-color: rgb(73, 148, 138);
        color: #fff;
        font-weight: 600;
        border: none;
        border-radius: 10px
    }
    .footer button:hover{
        opacity: .8;
        color: #333;
    }
    .repeat-modal{
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
    .repeat-modal .content{
        width: 300px;
        height: 200px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 10px;
    }
    .repeat-modal p{
        font-size: 1.75rem;
    }
    .repeat-modal button{
        font-size: 1.5rem;
        padding: 10px 30px;
        background-color: #6e62e0;
        color: #fff;
        border-radius: 10px;
        border: none;
        cursor: pointer;
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
    .success-modal{
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
    .success-modal .content{
        width: 300px;
        height: 200px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 10px;
    }
    .success-modal p{
        color: #008000;
        font-size: 1.75rem;
    }
    .success-modal button{
        font-size: 1.5rem;
        padding: 10px 30px;
        background-color: #6e62e0;
        color: #fff;
        border-radius: 10px;
        border: none;
        cursor: pointer;
    }
    @media (max-width: 850px) {
        .product .pic{
            width: 100%;
            height: 400px;
        }
    }
    @media (max-width: 450px) {
        .product{
            padding: 10px 0;
        }
        .product .pic{
            width: 100%;
            height: 300px;
        }
        .product .wrap h1,
        .product .wrap p{
            padding: 0 30px;
        }
        .detail h3{
            padding: 0 30px;
            margin-bottom: 30px;
        }
    }
</style>
