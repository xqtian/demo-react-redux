import * as home from './action-type'

let defaultState = {
    formData: {
        orderSum: '', //金额
        name: '', //姓名
        phoneNo: '', //手机号
        imgpath: '', //图片地址
    }
}
export const formData = (state = defaultState.formData, action={}) => {
    switch(action.type){
        case home.SAVEFORMDATA:
            return {...state, ...{[action.datatype]: action.value}}
        case home.SAVEIMG: 
            return {...state, ...{imgpath: action.path}}
        case home.CLEARDATA:
            return { ...state, ...defaultState.formData}
        default:
            return state
    }
}