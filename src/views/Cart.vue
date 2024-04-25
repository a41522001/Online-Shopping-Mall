<script setup>
    import Header from "../components/Header.vue";
    import { onMounted, ref, watch, computed } from "vue";
    import Payment from "../components/Payment.vue";
    const carts = ref([]);
    onMounted(() => {
        if(localStorage.getItem("cart")){
            carts.value = JSON.parse(localStorage.getItem("cart"));
        }
    })
    function delCart(index){
        carts.value.splice(index, 1);
    }
    watch(carts, () => {
        localStorage.setItem("cart", JSON.stringify(carts.value));
    }, {deep: true})
    //數量邏輯區
    function changeCount(n, index){
        if( (carts.value[index].count + n ) >= 1 ){
            carts.value[index].count += n;
        }else{
            return;
        }    
    }
    //全選邏輯區
    const isAllChecked = computed({
        get: () => carts.value.length > 0 && carts.value.every(item => item.checked),
        set: (newValue) => {
            carts.value.forEach(item => item.checked = newValue);
        },
    });

    //金額邏輯區
    const total = computed( () => { 
        return carts.value.reduce((total, cart) => {
            if(cart.checked){
                return total + (cart.price * cart.count);
            }else{
                return total + 0;
            }    
        }, 0)
    } )
    //結帳邏輯區
    const showModal = ref(false);
    const nothing = ref(false);
    const paymentModal = ref(false);
    function pay(){
        if(carts.value.length > 0 && carts.value.some(cart => cart.checked)){
            showModal.value = true;
        }else{
            nothing.value = true;
        }    
    }
    function confrim(){
        paymentModal.value = true;
        showModal.value = false;  
    }
    function submit(){
        setTimeout(() => {
            paymentModal.value = false;
            carts.value = carts.value.filter( cart => !cart.checked ); 
            showModal.value = false;
        }, 2000)  
    }
    function closePaymentModal(){
        paymentModal.value = false;
    }
</script>

<template>
    <Header></Header>
    <div class="cart">
        <ul v-if="carts && carts.length > 0">
            <li v-for="(cart, index) in carts" :key="cart.id">
                <input type="checkbox" v-model="cart.checked">
                <div class="pic">
                    <img :src="cart.image" alt="">
                </div>
                <div class="txt">
                    <h1>{{ cart.name }}</h1>
                    <p>${{ cart.price }}</p>
                    <div class="num">
                        <button class="minus" @click="changeCount(-1, index)">－</button>
                        <input type="number" placeholder="數量" min="0" max="99" v-model="cart.count">
                        <button class="plus" @click="changeCount(1, index)">＋</button>
                    </div>
                    <button class="del-btn" @click="delCart(index)">刪除</button>
                </div>
            </li>
            <div class="footer">
                <div class="item">
                    <input type="checkbox" name="" id="all-check" v-model="isAllChecked">
                    <label for="all-check">全選</label>
                </div>
                <div class="item">
                    <p>總金額$
                        <span>{{ total }}</span>
                    </p>
                    <button @click="pay()">結帳</button>
                </div>
            </div>
        </ul>
        <div class="empty" v-else>
            <p>目前尚未添加商品</p>
            <router-link to="/home">前往</router-link>
        </div>
    </div>
    <div class="modal" v-show="showModal">
        <div class="content">
            <p>總金額$<span>{{ total }}</span>確定要付款嗎?</p>
            <div class="btn">
                <button class="confrim" @click="confrim()">確定</button>
                <button class="cancel" @click="showModal = false">取消</button>
            </div> 
        </div>
    </div>
    <div class="nothing" v-show="nothing">
        <div class="content">
            <p>請選取商品</p>
            <button @click="nothing = false">確定</button>
        </div>
    </div>
    <Payment v-show="paymentModal" :total="total" @closeModal="closePaymentModal()" @submitPayment="submit()"></Payment>
</template>

<style scoped>
    .cart{
        width: 100%;
        max-width: 1200px;
        margin: auto;
    }
    .cart ul{
        display: flex;
        flex-direction: column;
        list-style: none;
    }
    .cart ul li{
        margin-bottom: 20px;
        background-color: #fff;
        display: flex;
        padding: 5% 8%;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .cart ul li input[type=checkbox]{
        width: 30px;
        height: 30px;
        margin-right: 20px;
    }
    .pic{
        width: 60%;
        height: 400px;
        border: 1px solid #b3b0b0;
    }
    .pic img{
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
    .txt{
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .txt h1{
        font-size: 3rem;
        font-weight: 400;
    }
    .txt p{
        font-size: 2.5rem;
        color: #f66;
    }
    .num{
        display: flex;
    }
    .num input[type=number],
    .num button{
        font-size: 1.5rem;
        text-align: center;
        border-color: #111;
        background-color: #fff;
    }
    .num input[type=number]{
        border-width: 1px 0 1px 0;
        outline: none;
        border-radius: 0;
    }
    .num button{
        padding: 0 20px;
        font-weight: 800;
        cursor: pointer;
    }
    .num button:hover{
        opacity: .8;
    }
    .num .minus{
        border-width: 1px 0px 1px 1px;
        border-radius: 10px 0 0 10px;
    }
    .num .plus{
        border-width: 1px 1px 1px 0;
        border-radius: 0 10px 10px 0;
    }
    .del-btn{
        font-size: 1.25rem;
        padding: 10px 50px;
        background-color: #6e62e0;
        border: none;
        cursor: pointer;
        color: #fff;
        border-radius: 10px;
    }
    .del-btn:hover,
    .empty a:hover{
        transform: scale(1.1);
        opacity: .8;
    }
    .footer{
        display: flex;
        background-color: #897cff;
        margin: auto;
        max-width: 1200px;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .footer .item{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .footer #all-check{
        width: 30px;
        height: 30px;
    }
    .footer label{
        color: #fff;
        font-size: 2rem;
        margin-left: 10px;
    }
    .footer p{
        color: #fff;
        font-size: 2rem;
    }
    .footer span{
        color: #f00;
    }
    .footer button{
        margin-left: 10px;
        padding: 3px 30px;
        font-size: 1.5rem;
        background-color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: #29306d;
    }
    .footer button:hover{
        opacity: .8;
    }
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        -moz-appearance: textfield;
        font-size: initial;
    }
    .empty{
        max-width: 1200px;
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;
        font-size: 2rem;
        flex-direction: column;
    }
    .empty a{
        display: block;
        margin-top: 30px;
        padding: 10px 50px;
        cursor: pointer;
        background-color: #6e62e0;
        color: #fff;
        font-size: 1.25rem;
        border: none;
        border-radius: 10px;
    }
    .modal,
    .nothing{
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
        animation: openModal .4s;
    }
    .modal .content,
    .nothing .content{
        width: 500px;
        height: 300px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border-radius: 10px;
        position: relative;
    }
    .modal .content p{
        font-size: 1.75rem;
    }
    .modal .content p span{
        color: rgb(255, 0, 0);
    }
    .nothing .content p{
        font-size: 1.75rem;
    }
    .modal .content .btn{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
    }
    .modal .content .btn button{
        font-size: 1.25rem;
        padding: 5px 30px;
        color: #fff;
        border-radius: 10px;
        border: none;
        cursor: pointer;
    }
    .confrim{
        background-color: #57b453;
    }
    .cancel{
        background-color: #f66;
    }
    .nothing button{
        padding: 8px 35px;
        background-color: #57b453;
        color: #fff;
        color: #fff;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        margin-bottom: 20px;
    }
    @keyframes openModal{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @media (max-width: 950px) {
        .pic{
            height: 280px;
        }
    }
    @media (max-width: 800px) {
        .txt{
            justify-content: space-evenly;
        }
        .txt p,
        .txt h1{
            font-size: 2rem;
        }
        .del-btn{
            font-size: 1rem;
            padding: 10px 30px;
        }
        .num input[type=number]{
            font-size: initial;
        }
        .num button{
            padding: 0 5px;
        }
    }
    @media (max-width: 658px) {
        .pic{
            height: 250px;
        }
    }
    @media (max-width: 550px) {
        .cart ul li{
            padding: 5% 0% 5% 1%;
        }
        .txt h1{
            font-size: 1.8rem;
        }
        .pic{
            height: 300px;
        }
        .footer p,
        .footer label{
            font-size: 1.5rem;
        }
        .footer button{
            font-size: 1.15rem;
        }
        .num button{
            font-size: 1.15rem;
        }
        .modal .content,
        .nothing .content{
            width: 300px;
            height: 200px;
        }
        .modal .content p{
            font-size: 1.25rem;
        }
        .modal .content .btn button{
            font-size: 1rem;
        }
    }
    @media (max-width: 480px) {
        .pic{
            height: 200px;
        }
    }
    @media (max-width: 420px) {
        .cart ul li input[type=checkbox]{
            width: 20px;
            height: 20px;
        }
        .pic{
            width: 45%;
            height: 180px;
        }
        .txt p,
        .txt h1{
            font-size: 1.25rem;
        }
        .del-btn{
            padding: 5px 20px;
        }
        .footer p,
        .footer label{
            font-size: 1.15rem;
        }
        .footer button{
            font-size: 1rem;
        }
    }
</style>