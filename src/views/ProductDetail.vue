<script setup>
    import Header from "../components/Header.vue";
    import { ref, inject, onMounted, watchEffect } from "vue";
    const products = inject("products");
    //以下區塊邏輯: 先讓導入路由再設置常數來實現訪問路由 
    //再宣告productDetail後面要訪問路由的參數(也就是id)的值
    //對應從App.vue抓下來的資料傳進去
    import { useRoute } from "vue-router";
    const route = useRoute();
    const productDetail = ref(null);
    //先訪問到路由的參數ID並傳進一個常數
    //再用整串API資料利用陣列的find方法來尋找對應的id資料形成單一物件並傳進product
    //再把剛抓到的物件賦值給productDetail常數
    onMounted(() => {
        const productId = route.params.id;
        const product = products.value.find(product => product.id == productId);
        productDetail.value = product;
    })
    watchEffect(() => {
        const productId = route.params.id;
        const product = products.value.find(product => product.id == productId);
        productDetail.value = product;
    });
</script>

<template>
    <div class="container">
        <Header></Header>
        <!--這邊加v-if的關係是因為剛開始product的值被設置為null
        直到組件被掛載後才有值, 所以要設條件渲染, 等到product有值後
        才渲染到<template>模板裡-->
        <div class="product" v-if="productDetail">
            <div class="wrap">
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
            <button>加入購物車</button>
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
    .footer button:hover,
    .footer button:active{
        transform: scale(1.1);
        opacity: .8;
        color: #333;
    }
    @media (max-width: 850px) {
        .product .pic{
            width: 100%;
            height: 400px;
        }
    }
    @media (max-width: 450px) {
        .product{
            padding: 50px 0;
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
