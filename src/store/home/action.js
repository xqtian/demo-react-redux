import * as home from './action-type';

//保存表单数据
export const saveFormData = (value, datatype) => {
    return {
        type: home.SAVEFORMDATA,
        value,
        datatype
    }
}

export const saveImg = (path) =>{
    return {
        type: home.SAVEIMG,
        path,
        
    }
}

export const clearData = ()=> {
    return {
        type: home.CLEARDATA
    }
}