import {FETCHUSER,FETCHUSERERROR,FETCHUSERSUCCESS} from './../contants'
const InitialState={
    isLoading:false,
    error:null,
    user:null
}
export const users=(state=InitialState,action={})=>{
    switch(action.type){
        case FETCHUSER:
           return {
            isLoading:true,
            error:null,
            user:null
        }
        case FETCHUSERSUCCESS:
           return {
            isLoading:false,
            error:null,
            user:action.user
        }

        case FETCHUSERERROR:
           return {
            isLoading:false,
            error:action.error,
            user:null
        }
        default:
          return state;
    }
}