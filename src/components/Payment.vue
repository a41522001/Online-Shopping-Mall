<script setup>

</script>

<template>
    <div class="payment-modal">
        <div class="modal-content">
            <span>&times;</span>
            <div class="credit-card">
                <img src="" alt="">
            </div>
            <form class="payment-form">
                <div class="card-number">
                    <label for="">卡號</label>
                    <input type="text">
                    <input type="text">
                    <input type="text">
                    <input type="text">
                </div>
                <div class="payer">
                    <label for="payer">持卡人姓名</label>
                    <input type="text" id="payer">
                </div>
                <div class="expdate">
                    <div class="expyear">
                        <label for="expyear">到期年份</label>
                        <select name="" id="expyear">
                        <option value=""></option>
                    </select>
                    </div>
                    <div class="expmonth">
                        <label for="expmonth">到期月份</label>
                        <select name="" id="expmonth">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .payment-modal{
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
    .modal-content{
        width: 360px;
        height: 500px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        border-radius: 20px;
        position: relative;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }
    .modal-content span{
        position: absolute;
        top: -5px;
        right: 10px;
        color: #000;
        font-size: 1.75rem;
        cursor: pointer;
    }
</style>