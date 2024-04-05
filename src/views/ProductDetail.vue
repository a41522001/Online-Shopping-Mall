<script setup>
    import Header from "../components/Header.vue";
    import { ref, inject } from "vue";
    const products = inject("products");
</script>

<template>
    <Header></Header>
    <div class="product">
        <ul>
            <li v-for="product in products" v-show="product.id === 20">
                <div class="pic">
                    <img :src="product.image" alt="">
                </div>
                <h1>{{ product.name }}</h1>
                <p>${{ product.price }}</p>
                <div class="detail">
                    <h3>商品詳情</h3>
                    <p v-html="product.description" style="font-size: 1.25rem;"></p>
                </div>
                <div class="footer">
                    <button>加入購物車</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .product{
        max-width: 1200px;
        width: 100%;
        margin: auto;
        background-color: #fff;
        height: 92vh;
    }
    .product ul{
        padding: 30px;
        width: 100%;
        margin: auto;
        list-style: none;
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
    .product li p{
        font-size: 1.5rem;
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
        padding: 5px 0;
        font-size: 1rem; 
    }
    .footer{
        background-color: #6e62e0;
        position: fixed;
        bottom: 0;
        left: 50%;
        max-width: 1200px;
        width: 100%;
        height: 70px;
        transform: translateX(-50%);
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
        .product ul{
            padding: 50px 0;
        }
        .product .pic{
            width: 100%;
            height: 300px;
        }
        .product ul li h1,
        .product ul li p{
            padding: 0 30px;
        }
        .detail h3{
            padding: 0 30px;
            margin-bottom: 30px;
        }
    }
</style>
