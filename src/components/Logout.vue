<script setup>
    import { ref, computed } from "vue";
    import { useAuthStore } from "@/stores/authStore";
    import { useRouter } from "vue-router";
    const router = useRouter();
    const authStore = useAuthStore();
    const showModal = ref(false);
    function openLogoutModal(){
        showModal.value = true;
    }
    function closeLogoutModal(){
        showModal.value = false;
    }

    const logout = async () => {
        try{
            await authStore.logout();
            showModal.value = false;
            router.push({path: "/"});
        }catch(err){
            console.log(err);
        }
    }
</script>

<template>
    <p @click="openLogoutModal()">登出</p>
    <Teleport to="body">
        <div class="logout-modal" v-if="showModal">
            <div class="modal-content">
                <span @click="closeLogoutModal()">&times;</span>
                <p>確定登出嗎?</p>
                <button @click="logout()">確定</button>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
    p{
        cursor: pointer;
        font-size: 1rem;
    }
    .logout-modal{
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
        height: 180px;
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
    .modal-content p{
        color: #000;
        font-size: 2rem;
        cursor: auto;
    }
    .modal-content button{
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