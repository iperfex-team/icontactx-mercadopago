import { tokenIsInvalid } from "@/helpers";
import { useAuthStore } from "@/store/auth/auth.store";
import axios from "axios";

const getCookie = (name : string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  
  const onSubmit = async (token : string, icid: string) => {
    const loginUser = useAuthStore((state) => state.loginUser);
    
    
    await loginUser(token, icid);
    
  }

const coreApi = axios.create({
    baseURL: import.meta.env.VITE_CORE_API_URL as string,
    timeout: 10000,
});

coreApi.interceptors.request.use((config) => {
    let cookieValue = ""
    let cookieToken= ""
    let cookieIcid = ""
    if(!useAuthStore.getState().token || !useAuthStore.getState().icid){
         cookieValue = String(getCookie('auth-store'));
        if(!cookieValue){
            
                const logout = useAuthStore((state) => state.logout);
                
                 logout();
                
           
        }
        // setAuth(String(cookieValue))
         console.log("cookieValue")
         console.log(cookieValue)
         if(cookieValue){
           
           const cookie = JSON.parse(cookieValue)
           console.log(cookie)
        
           if(cookie.token && cookie.icid){
            cookieToken= cookie.token
            cookieIcid = cookie.icid
        
             onSubmit(cookie.token,cookie.icid)
           }
           
         }
        
    }
    let token = ""
    let icid = ""
    if(!useAuthStore.getState().token){
        token = String(cookieToken)
    }else{

        token = String(useAuthStore.getState().token)
    }

    if(!useAuthStore.getState().icid){
        icid = String(cookieIcid)
    }else{

        icid = String( useAuthStore.getState().icid)
    }
   
    

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.icid = icid;

        // Check if token has expired
        if (tokenIsInvalid(token)) {
            console.log("is invalid");
            useAuthStore.getState().logout();
        }
    }

    return config;
});

export { coreApi };
