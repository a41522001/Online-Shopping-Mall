<script setup>
    import { ref, computed, watch } from "vue";
    import { useAuthStore } from "@/stores/authStore";
    const authStore = useAuthStore();
    const showModal = ref(false);
    const signupName = ref("");
    const signupEmail = ref("");
    const signupPassword = ref("");
    const userError = ref(false);
    const emailError = ref(false);
    const passwordError = ref(false);
    const signupErrorMessage = computed(() => authStore.signupErrorMessage)
    const signupSuccessModal = ref(false);
    function openSignupModal(){
        showModal.value = true;
        userError.value = false;
        emailError.value = false;
        passwordError.value = false;
    }
    function closeSignupModal(){
        showModal.value = false;
        signupEmail.value = "";
        signupPassword.value = "";
        signupName.value = "";
        userError.value = false;
        emailError.value = false;
        passwordError.value = false;
    }
    const signup = async () =>{
        if(signupName.value === "" || signupEmail.value === "" || signupPassword.value === ""){
            userError.value = true;
            return;
        }
        try{
            await authStore.signup(signupEmail.value, signupPassword.value, signupName.value);
            if(signupErrorMessage.value.includes("密碼")){
                emailError.value = false;
                passwordError.value = true;
                return;
            }else if(signupErrorMessage.value.includes("電子")){
                passwordError.value = false;
                emailError.value = true;
                return;
            }else{
                emailError.value = false;
                passwordError.value = false;
            }
            signupSuccessModal.value = true;
            setTimeout(() => {
                signupSuccessModal.value = false;
                closeSignupModal();
            }, 2000) 
        }catch(err){
            console.log(err);
        }
    }
   
</script>

<template>
    <p @click="openSignupModal()">註冊</p>
    <div class="signup-modal" v-if="showModal">
        <div class="modal-content">
            <span @click="closeSignupModal()">&times;</span>
            <form class="signup-form">
                <label for="signup-name">用戶名
                    <span v-show="userError">請填寫正確的資訊</span>
                </label>
                <input type="text" id="signup-name" v-model="signupName">
                <label for="signup-email">電子郵件
                    <span v-show="emailError">{{ signupErrorMessage }}</span>
                </label>
                <input type="text" id="signup-email" v-model="signupEmail">
                <label for="signup-password">密碼
                    <span v-show="passwordError">{{ signupErrorMessage }}</span>
                </label>
                <input type="password" id="signup-password" v-model="signupPassword">
                <button @click.prevent="signup()">註冊</button>
            </form>
            <div class="success-modal" v-show="signupSuccessModal">
                <div class="success-modal-content">
                    <p>成功註冊!!</p>
                    <p>請等待跳轉...</p>
                </div>
            </div>
        </div>    
    </div>
</template>

<style scoped>
    p{
        cursor: pointer;
        font-size: 1rem;
    }
    .signup-modal{
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
        height: 300px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        border-radius: 20px;
        position: relative;
    }
    .modal-content span{
        position: absolute;
        top: -5px;
        right: 10px;
        color: #000;
        font-size: 1.75rem;
        cursor: pointer;
    }
    .signup-form{
        display: flex;
        color: #000;    
        flex-direction: column;
        gap: 5px;
    }
    .signup-form label{
        position: relative;
        margin-top: 10px;
    }
    .signup-form label span{
        color: #f00;
        font-size: .85rem;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
    .signup-form input{
        border-radius: 5px;
        padding: 2px 5px;
        border: 1px #222121 solid;
    }
    .signup-form button{
        align-self: center;
        margin-top: 20px;
        padding: 5px 50px;
        border: none;
        border-radius: 8px;
        background-color: #6e62e0;
        color: #fff;
        cursor: pointer;
        font-size: 1.15rem;
    }
    .success-modal{
        border-radius: 20px;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .8);
        z-index: 11;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .success-modal-content{
        width: 50%;
        height: 50%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .success-modal-content p{
        color: #000;
        font-size: 1.25rem;
    }
</style>