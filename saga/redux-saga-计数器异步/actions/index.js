import {ADD,SUB,ADDASYNC} from './../contants'

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