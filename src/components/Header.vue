<script setup>
    import { ref, computed } from "vue";
    const userName = ref("Maru");
    const accountState = computed(() => {
        return userName.value? "登出" : "登入";
    })
    const helloName = computed( () => {
        return "你好" + userName.value + "!";
    })
</script>

<template>
    <label class="humburger" for="toggle">
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
                <li><a href="#">結帳</a></li>
                <li><a href="#">{{ accountState }}</a></li>
                <li><a href="#">註冊</a></li>
            </ul>
        </nav>
        <div class="logo">
            <h1><router-link to="/home">購物網站</router-link></h1>
        </div>
        <div class="search">
            <input type="text" name="" id="">
            <div class="search-pic">
                <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="">
            </div>
        </div>
    </header>
</template>

<style scoped>
    .humburger{
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
    .humburger:hover,
    .humburger:active,
    header .logo:hover,
    header .log:active{
        opacity: .8;
    }
    .humburger .bar{
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
    header .logo h1 a{
        font-size: 1.5rem;
        color: #fff;
    }
    header .search{
        display: flex;
        align-items: center;
        width: 300px;
        position: relative;
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
            margin-left: 50px ;
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