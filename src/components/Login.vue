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
    <Teleport to="body">
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
            </div>
        </div>
    </Teleport>
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
        width: 230px;
        border-radius: 5px;
        padding: 2px 5px;
        border: 1px #222121 solid;
        font-size: 16px;
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
</style>