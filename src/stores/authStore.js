import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { auth } from "@/firebase.js";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
export const useAuthStore = defineStore("auth", () => {
    const memberName = ref("");
    const errorMessage = ref("");
    const signupErrorMessage = computed(() => {
        if(errorMessage.value.includes("email-already")){
            return "電子郵件已被使用";
        }
            
        if(errorMessage.value.includes("invalid-email")){
            return "無效的電子郵件";
        }
        if(errorMessage.value.includes("weak-password")){
            return "密碼最少需要6個字";
        }
        if(!errorMessage.value){
            return "";
        }        
    })
    const loginErrorMessage = computed(() => {
        if(errorMessage.value !== ""){
            return "錯誤的帳號或密碼";
        }
    })

    onAuthStateChanged(auth, (firebaseUser) => {
        if(firebaseUser){
            memberName.value = firebaseUser.displayName;
        }else{
            memberName.value = "";
        }
    })

    async function signup(email, password, userName){
        try{
            errorMessage.value = "";
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user);
            if(res.user){
                await updateProfile(res.user, {
                    displayName: userName
                });
            }
            await signOut(auth);
        }catch(err){
            errorMessage.value = err.code;
            console.log("註冊失敗", signupErrorMessage.value);
        }   
    }

    async function login(email, password){
        errorMessage.value = "";
        try{
            const res = await signInWithEmailAndPassword(auth, email, password);
            memberName.value = res.user.displayName;
            console.log(res.user);
        }catch(err){
            errorMessage.value = err.code;
            console.log("登入失敗:", err.message);
        }
    }
    
    async function logout(){
        try{
            await signOut(auth);
            memberName.value = "";
            console.log("登出成功");
        }catch(err){
            console.log("登出失敗:", err.message);
        }
    }
    return { signupErrorMessage, loginErrorMessage, memberName, signup, login, logout }
})