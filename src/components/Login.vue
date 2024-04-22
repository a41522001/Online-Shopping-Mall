<script setup>
    import { ref, computed } from "vue";
    import { useAuthStore } from "@/stores/authStore";
    const authStore = useAuthStore();
    const showModal = ref(false);
    const loginEmail = ref("");
    const loginPassword = ref("");
    const userError = ref(false);
    const loginError = ref(false);
    const loginErrorMessage = computed(() => authStore.loginErrorMessage);
    const loginSuccessModal = ref(false);
    const login = async () => {
        if(loginEmail.value === "" || loginPassword.value === ""){
            userError.value = true;
            return;
        }else{
            userError.value = false;
        }
        try{
            await authStore.login(loginEmail.value, loginPassword.value);
            console.log(loginErrorMessage.value);
            if(loginErrorMessage.value){
                loginError.value = true;
                return;
            }else{
                loginError.value = false;
            }
            loginSuccessModal.value = true;
            setTimeout(() => {
                loginSuccessModal.value = false;
                closeLoginModal();
            }, 2000)  
        }catch(err){
            console.log(err);
        }
    }
    function openLoginModal(){
        showModal.value = true;
        loginEmail.value = "";
        loginPassword.value = "";
        userError.value = false;
        loginError.value = false;
    }
    function closeLoginModal(){
        showModal.value = false;
        loginEmail.value = "";
        loginPassword.value = "";
        userError.value = false;
        loginError.value = false;
    }
</script>

<template>
    <p @click="openLoginModal()">登入</p>
    <div class="login-modal" v-if="showModal">
        <div class="modal-content">
            <span @click="closeLoginModal()">&times;</span>
            <form class="login-form">
                <label for="login-email">電子郵件
                    <span v-show="userError">請填寫帳號或密碼</span>
                </label>
                <input type="text" id="login-email" v-model="loginEmail">
                <label for="login-password">密碼
                    <span v-show="loginError">{{ loginErrorMessage }}</span>
                </label>
                <input type="password" id="login-password" v-model="loginPassword">
                <button @click.prevent="login()">登入</button>
            </form>
            <div class="success-modal" v-show="loginSuccessModal">
                <div class="success-modal-content">
                    <p>成功登入!!</p>
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
    .login-modal{
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
        width: 300px;
        height: 250px;
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
    .login-form{
        display: flex;
        color: #000;    
        flex-direction: column;
        gap: 5px;
    }
    .login-form label{
        position: relative;
        margin-top: 10px;
    }
    .login-form label span{
        color: #f00;
        font-size: .85rem;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
    .login-form input{
        border-radius: 5px;
        padding: 2px 5px;
        border: 1px #222121 solid;
    }
    .login-form button{
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