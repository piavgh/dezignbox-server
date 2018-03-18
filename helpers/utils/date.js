"use strict";

function setZeros(number){
    if(parseInt(number) < 10){
        return '0' + number;
    }
    return number;
}

module.exports = {
    getUTCDate: ()=>{
        let date = new Date();
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    },
    toDBDate: (date)=>{
        date = new Date(date);
        return date.getFullYear() + '-' + setZeros(date.getMonth() + 1) + '-' + setZeros(date.getDate());
    }
}