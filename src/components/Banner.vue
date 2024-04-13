<script setup>
    import { ref, onMounted, onUnmounted, inject } from "vue";
    const products = inject("products");
    const currentIndex = ref(0);
    //以currentIndex來作為切換圖片的索引
    function changePic(n){
        if(currentIndex.value >= 0){
            currentIndex.value += n;
            if(currentIndex.value > 4){
                currentIndex.value = 0;
            }else if(currentIndex.value < 0){
                currentIndex.value = 4;
            }
        }
    }
    function goToPic(n){
        currentIndex.value = n-1;
    }
    //自動切換圖片邏輯區
    //設定計時器
    let interval;
    interval = setInterval(() => changePic(1), 3000);
    //組件卸載時清除計時器
    onUnmounted(() => {
        clearInterval(interval);
    })
</script>

<template>
    <div class="banner">
        <div class="filter"></div>
        <div class="banner-pic" v-for="(product, index) in products" :key="index" v-show="index === currentIndex">
            <img :src="product.image" alt="">
        </div>
        <a class="prev" @click="changePic(-1)">&#10094;</a>
        <a class="next" @click="changePic(1)">&#10095;</a>
        <div class="dot-container">
            <div class="dot" v-for="n in 5" @click="goToPic(n)"
            :class="{activeDot: currentIndex === n-1}"></div>
        </div>
    </div>
    

</template>

<style scoped>
    .banner{
        max-width: 1200px;
        width: 100%;
        margin: auto;
        height: 600px;
        position: relative;
        z-index: 1;
    }
    .banner:hover .filter,
    .banner:active .filter{
        display: block;
    }
    .banner .filter{
        display: none;
        width: 100%; 
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, .1);
    }
    .banner .banner-pic{
        width: 100%;
        height: 100%;
    }
    .banner .banner-pic img{
        width: 100%;
        height: 100%;
    }
    .prev,
    .next{
        cursor: pointer;
        font-size: 2rem;
        text-decoration: none;
        color: #000;
        position: absolute;
        top: 50%;
        z-index: 3;
        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: center;
    }
    .prev:hover, .next:hover,
    .prev:active, .next:active{
        background-color: rgba(0, 0, 0, .3);
        color: #fff;
    }
    .banner .prev{
        left: 0px;
        border-radius: 0 10px 10px 0;
        padding-right: 5px;
    }
    .banner .next{
        right: 0px;
        border-radius: 10px 0 0 10px;
        padding-left: 5px;
    }
    .dot-container{
        position: absolute;
        bottom: 10px;
        left: 50%;
        z-index: 3;
        display: flex;
        transform: translateX(-50%);
    }
    .dot{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .5);
        cursor: pointer;
        margin: 10px;
    }
    .activeDot,
    .dot:hover,
    .dot:active{
        background-color: rgba(255, 255, 255, .5);
    }
    @media (max-width: 500px) {
        .banner{
            height: 300px;
        }
        .dot{
            width: 20px;
            height: 20px;
            margin: 0 8px;
        }
        .prev,
        .next{
            font-size: 1.5rem;
            width: 30px;
            height: 38px;
        }
    }
</style>