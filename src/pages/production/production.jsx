import React, { Component } from 'react';
import PublicHeader from '@/components/header/header'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {getProData, editPro, togSelectPro} from '@/store/production/action'
import PublicAlert from '@/components/alert/alert'
import './production.less'

class Production extends Component{
    static propTypes = {
        proData: PropTypes.object.isRequired,
        getProData: PropTypes.func.isRequired,
        editPro: PropTypes.func.isRequired,
        togSelectPro: PropTypes.func.isRequired
    }
    state = {
        alertStatus: false,
        alertTip: ''
    }
    componentDidMount(){
        if(!this.props.proData.dataList.length){
            this.props.getProData()
        }
    }
    togSelect = (index) => {
        this.props.togSelectPro(index)

    }
    handleEdit = (index, num) => {
        let currentNum = this.props.proData.dataList[index].selectNum + num
        if(currentNum < 0){
            return
        }else if(currentNum > 10) {
            this.setState({
                alertStatus: true,
                alertTip: '数量应小于10'
            })
            return
        }
        this.props.editPro(index, num)
    }
      // 关闭弹窗
      closeAlert = () => {
        this.setState({
            alertStatus: false,
            alertTip: ''
        })
    }
    render() {
        return(
            <main className="common-con-top">
                <PublicHeader title="首页" confirm />
                <selection className="pro-list-con">
                    <ul className="pro-list-ul">
                        {
                            this.props.proData.dataList.map((item, index) => {
                                return <li className="pro-item" key={item.product_id}>
                                     <div className="pro-item-select" onClick={this.togSelect.bind(this, index)}>
                                        <span className={`icon-xuanze1 pro-select-status ${item.selectStatus? 'pro-selected': ''}`}></span>
                                        <span className="pro-name">{item.product_name}</span>
                                    </div>
                                    <div className="pro-item-edit">
                                        <span className={`icon-jian ${item.selectNum > 0? 'edit-active':''}`} onClick={this.handleEdit.bind(this, index, -1)}></span>
                                        <div className="pro-num">{item.selectNum}</div>
                                        <span className={`icon-jia`} onClick={this.handleEdit.bind(this, index, 1)}></span>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </selection>
                <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus}></PublicAlert>
            </main>
        )
    }
}

export default connect(state =>({
    proData: state.proData
}),{
    getProData,
    editPro,
    togSelectPro
})(Production)