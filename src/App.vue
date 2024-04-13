<script setup>
    import { ref, onMounted, provide } from "vue";
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
</script>

<template>
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
</style>