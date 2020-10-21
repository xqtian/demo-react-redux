import * as pro from './action-type';
import API from '@/api/api';

// 初始化获取商品数据 保存到redux
export const getProData = () => {
    // 返回函数 异步dispatch
    return async dispatch => {
        try {
            let result = await API.getProduction()
            result.map(item => {
                item.selectStatus = true;
                item.selectNum = 0;
                return item
            })
            dispatch({
                type: pro.GETPRODUCTION,
                dataList: result
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export const clearSelected = () => {
    return {
        type: pro.CLEARSELECTED
    }
}

export const editPro = (index, selectNum) => {
    return{
        type: pro.EDITPRODUCTION,
        index,
        selectNum
    }

}

export const togSelectPro = (index) => {
    return{
        type: pro.TOGGLESELECT,
        index
    }
}