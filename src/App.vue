<script setup>
    import { ref, onMounted, provide, computed } from "vue";
    import router from "./router";
    const products = ref([]);
    provide("products", products);
    onMounted(async() => {
        try{
            const res = await fetch("https://raw.githubusercontent.com/a41522001/product/main/product.json");
            products.value = await res.json();
        }catch(err){
            console.log(err);
            alert("網址連線錯誤請稍後再試");
        }   
    })
    function scrollToTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
</script>

<template>
    <div id="back-top" @click="scrollToTop()">
        <div id="arrow"></div>
    </div>
    <router-view></router-view>
</template>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        font-family: "Noto Sans TC", sans-serif;
    }
    body{
        background-color: #e6e6e6;
    }
    #back-top{
        position: fixed;
        bottom: 20px;
        right: 30px;
        z-index: 4;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 5px solid #555;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding-bottom: 5px;
    }
    #arrow{
        width: 30px;
        height: 30px;
        background-color: transparent;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 30px solid #3498db;
        transition: border-bottom-color 0.3s;
    }
    @media (max-width: 650px) {
        #back-top{
            border-width: 2px;
            right: 2px;
            bottom: 5px;
            width: 40px;
            height: 40px;
        }
        #arrow{
            width: 15px;
            height: 15px;
            border-width: 0 10px 20px 10px ;
        }
    }
</style>