<script setup>
    import { ref, inject, onMounted } from "vue";
    const products = inject("products");
</script>

<template>
    <div class="product-list">
        <ul>
            <li v-for="product in products" class="list" :key="product.id">
                <div class="pic">
                    <router-link :to="`/product/${product.id}`">
                    <div class="filter"></div>
                    <img :src="product.image" alt="">
                    </router-link>
                </div>
                <h1><router-link :to="`/product/${product.id}`">{{ product.name }}</router-link></h1>
                <p>${{ product.price }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .product-list{
        max-width: 1200px;
        width: 100%;
        margin: auto;
    }
    .product-list ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        list-style: none;
    }
    .list{
        width: 30%;
        margin: 15px 20px;
        padding-bottom: 15px;
        border: 1px solid #ccc;
        background-color: #6e62e0;
        
    }
    .list .pic{
        width: 100%;
        height: 300px;
        cursor: pointer;
        position: relative;
    }
    .list .pic img{
        width: 100%;
        height: 100%;
    }
    .list .pic .filter{
        display: none;
        width: 100%; 
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, .1);
    }
    .list .pic:hover .filter,
    .list .pic:active .filter{
        display: block;
    }
    .list h1,
    .list p{
        margin: 10px;
    }
    .list h1 a{
        color: #fff
    }
    .list h1 a:hover,
    .list h1 a:active{
        color: rgba(0, 0, 0, .5)
    }
    .list p{
        font-size: 1.5rem;
        color: #fff;
    }
    @media (max-width: 1200px) {
        .list{
            width: 45%;
            margin: 10px;
        }
    }
    @media (max-width: 600px) {
        .list{
            margin: 5px;
        }
        .list .pic{
            height: 150px;
        }
        .list h1{
            font-size: 1.5rem;
        }
        .list p{
            font-size: 1.05rem;
        }
    }
    @media (max-width: 450px) {
        .list h1{
            font-size: 1.2rem;
        }     
    }
</style>