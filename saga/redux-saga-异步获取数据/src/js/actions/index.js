import {ADD,SUB,ADDASYNC,FETCHUSER,FETCHTODO} from './../contants'

export const add=()=>{
    return {
        type:ADD
    }
}

export const addAsync=()=>{
    return {
        type:ADDASYNC
    }
}

export const sub=()=>{
    return {
        type:SUB
    }
}

export const fetchUser=()=>{
    return {
        type:FETCHUSER
    }
}

export const fetchTodo=()=>{
    return {
        type:FETCHTODO
    }
}