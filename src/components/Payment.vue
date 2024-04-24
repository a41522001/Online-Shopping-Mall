<script setup>
    import { ref, onMounted } from "vue";
    defineProps(["total"]);
    const emit = defineEmits(["closeModal", "submitPayment"]);
    const years = ref([]);
    const cardNumber = ref("");
    const payer = ref("");
    const expmonth = ref("");
    const expyear = ref("");
    const cvv = ref("");
    const successModal = ref(false);
    onMounted(() => {
        for(let i = 2024; i <= 2040; i++){
            years.value.push(i);
        }
    })
    function clearForm(){
        cardNumber.value = "";
        payer.value = "";
        expmonth.value = "";
        expyear.value = "";
        cvv.value = "";
    }
    function close(){
        emit("closeModal");
        clearForm();
    }
    function payment(){
        emit("submitPayment");
        successModal.value = true;
        setTimeout(() => {
            successModal.value = true;
        }, 1000)
        setTimeout(() => {
            clearForm();
            successModal.value = false;
        }, 2000);    
    }
</script>

<template>
    <div class="payment-modal">
        <div class="modal-content">
            <span class="close-modal" @click="close()">&times;</span>
            <div class="credit-card-pic">
                <img src="https://www.mastercard.co.nz/content/dam/public/mastercardcom/nz/en/consumers/find-a-card/2024/ma_card_hrz_jmc_standard_wht.png" alt="">
            </div>
            <form class="credit-card-form" @submit.prevent="payment()">
                <div class="card-number">
                    <label for="card-number">信用卡卡號</label>
                    <input type="text" id="card-number" required maxlength="16" pattern="\d{16}" title="請輸入16位的數字" v-model="cardNumber">
                </div>
                <div class="payer">
                    <label for="payer">持卡人姓名</label>
                    <input type="text" id="payer" required v-model="payer">
                </div>
                <div class="expdate-cvv">
                    <div class="expmonth">
                        <label for="expmonth">到期月份</label>
                        <select id="expmonth" required v-model="expmonth">
                            <option disabled value="">選擇月份</option>
                            <option v-for="n in 12" :value="n">0{{ n }}</option>
                        </select>
                    </div>
                    <div class="expyear">
                        <label for="expyear">到期年份</label>
                        <select id="expyear" required v-model="expyear">
                            <option disabled value="">選擇年份</option>
                            <option v-for="year in years" :value="year">{{ year }}</option>
                        </select>
                    </div>
                    <div class="cvv">
                        <label for="cvv">安全碼</label>
                        <input type="text" id="cvv" required maxlength="3" pattern="\d{3}" v-model="cvv">
                    </div>
                </div>
                <div class="total-btn">
                    <p>總金額<span> {{ total }}</span></p>
                    <button type="submit">送出</button>
                </div>
            </form>
            <div class="success-modal" v-show="successModal">
                <div class="success-modal-content">
                    <p>結帳成功!!</p>
                    <p>請等待跳轉...</p>
                </div> 
            </div>
        </div>
    </div>
</template>

<style scoped>
    .success-modal{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
    }
    .success-modal-content{
        width: 50%;
        height: 100px;
        background-color: #2f962f;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 5px;
        border-radius: 10px;
    }
    .payment-modal{
        font-weight: 500;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(196, 192, 192, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    .modal-content{
        color: #fff;
        width: 360px;
        height: 600px;
        background-color: #363636;
        border-radius: 20px;
        position: relative;
    }
    .modal-content .close-modal{
        position: absolute;
        top: 0;
        right: 8px;
        color: #fff;
        font-size: 1.75rem;
        cursor: pointer;
    }
    .credit-card-pic{
        margin: auto;
        width: 90%;
        margin-top: 40px;
    }
    .credit-card-pic img{
        width: 100%;
    }
    .credit-card-form{
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 10px 20px;
    }
    .card-number, .payer{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    #card-number, #payer{
        width: 250px;
        align-self: flex-start;
        padding: 2px 5px;
    }
    .expdate-cvv{
        display: flex;
        width: 250px;
        justify-content: space-between;
        gap: 8px;
    }
    .expdate-cvv input,
    .expdate-cvv select{
        width: 100%;
    }
    .expdate-cvv input{
        padding: 1px 5px;
    }
    .expyear, .expmonth, .cvv{
        flex: 1;
    }
    .total-btn{
        width: 250px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .total-btn button{
        padding: 8px 30px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: #2f962f;
        cursor: pointer;
    }
    .total-btn p {
        font-size: 1.25rem;
    }
    .total-btn p span{
        margin-left: 10px;
        color: rgb(248, 42, 42);
        font-size: 1.25rem;
    }
    input{
        font-size: 16px;
    }
</style>