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
    return { signupErrorMessage, memberName, signup }
})