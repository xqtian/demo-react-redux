import * as pro from './action-type';
import Immutable from 'immutable';

let defaultState = {
/**
   * 商品数据
   * @type {Array}
   * example: [{
   *    product_id: 1, 商品ID 
   *    product_name: "PaiBot（2G/32G)", 商品名称
   *    product_price: 2999, 商品价格
   *    commission: 200, 佣金
   *    selectStatus: false, 是否选择
   *    selectNum: 0, 选择数量
   * }]
   */
  dataList: [],
}

export const proData = (state = defaultState, action) => {
    let imuDataList;
    let imuItem;
    switch(action.type){
        case pro.GETPRODUCTION:
            return {...state, ...action}
        case pro.EDITPRODUCTION:
            state.dataList.forEach((item, index) => {
                if(index == action.index){
                    item.selectNum += action.selectNum
                }
            })
            return {...state, ...{dataList: state.dataList}}
        case pro.TOGGLESELECT:
            state.dataList.forEach((item, index) => {
                if(index == action.index){
                    item.selectStatus = !item.selectStatus
                }
            })
            return {...state, ...{dataList: state.dataList}}
        case pro.CLEARSELECTED:
            state.dataList.forEach((item) => {
                item.selectStatus = false
                item.selectNum = 0
            })
            return {...state, ...{dataList: state.dataList}}
        default:
            return state;
    }
}