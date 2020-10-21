import React, { Component } from 'react';
// import { is, fromJS } from 'immutable';
import API from '@/api/api';
import './recordList.less';

export default class RecordList extends Component{
    state = {
        recordList: []
    }

    getRecord = (type) => {
        try {
            let result = API.getRecord({type})
            this.setState({
                recordList: result
            })
        } catch (error) {
            console.error(error)
        }
    }
    componentWillReceiveProps(nextProps){
        // 
        let currentType = this.props.location.pathname.split('/')[2]
        let type = nextProps.location.pathname.split('/')[2]
        if(currentType != type){
            this.getRecord(type)
        }
    }
    componentDidMount(){
        let type = this.props.location.pathname.split('/')[2]
        this.getRecord(type)
    }

    render(){
        return(
            <div>
                <ul className="record-list-con">
                {
                this.state.recordList.map((item, index) => {
                    return <li className="record-item" key={index}>
                    <section className="record-item-header">
                        <span>创建时间：{item.created_at}</span>
                        <span>{item.type_name}</span>
                    </section>
                    <section className="record-item-content">
                        <p><span>用户名：</span>{item.customers_name} &emsp; {item.customers_phone}</p>
                        <p><span>商&emsp;品：</span>{item.product[0].product_name}</p>
                        <p><span>金&emsp;额：</span>{item.sales_money} &emsp; 佣金：{item.commission}</p>
                    </section>
                    <p className="record-item-footer">等待管理员审核，审核通过后，佣金将结算至账户</p>
                    </li>
                })
                }
                </ul>
            </div>
        )
    }
}