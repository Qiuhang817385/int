import {ADD,SUB,ADDASYNC} from './../contants'

export const counter=(state={count:0},action={})=>{
    switch(action.type){
        case ADDASYNC:
           console.log("reducer执行了"); 
           return state;
        case ADD:
           return {count:state.count+1};
        case SUB:
           return {count:state.count-1};
        default:
           return state;
    }
}