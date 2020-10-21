import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '@/components/header/header'
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity'
import PublicAlert from '@/components/alert/alert'
import { is, fromJS } from 'immutable';
import {connect} from 'react-redux'
import envconfig from '@/envconfig/envconfig';
import {saveFormData, saveImg, clearData} from '@/store/home/action'
import {clearSelected} from '@/store/production/action'
import './home.less'
import PropTypes from 'prop-types'
import { padStr } from '@/utils/mixin'
import API from '@/api/api';

// @mixin({padStr})
class Home extends Component {
    static propTypes = {
        formData: PropTypes.object.isRequired,
        saveFormData: PropTypes.func.isRequired,
        saveImg: PropTypes.func.isRequired,
        clearSelected: PropTypes.func.isRequired,
        clearData: PropTypes.func.isRequired
    }

    state = {
        alertTip: '',
        alertStatus: false
    };

    // 已选择的商品数据
    selectedProList = []

    // 初始化数据，获取以选择的商品
    initData = props => {
        this.selectedProList = []
        props.proData.dataList.forEach(item => {
            if(item.selectStatus && item.selectNum){
                this.selectedProList.push(item)
            }
        })
        
    }
    componentWillReceiveProps(nextProps) {
        if(!is(fromJS(this.props.proData), fromJS(nextProps.proData))){
            this.initData(nextProps)
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    async componentWillMount(){
        this.initData(this.props)
    }

    handleInput(type, event ) {
        let value = event.target.value
        switch(type){
            case 'orderSum': 
                value = value.replace(/\D/g,'')
            break;
            case 'name':
            break;
            case 'phoneNo':
                value = padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
            break;
            default:;
        }
        this.props.saveFormData(value, type)
    }

    uploadImg = async event => {
        try {
            let formdata = new FormData()
            formdata.append('file', event.target.files[0]);
            console.log(111,  event.target.files[0], formdata)
            let result = await API.uploadImg({data:formdata})
            this.props.saveImg(envconfig.imgUrl + result.image_path)
            console.log(222, result)
        } catch (error) {
            console.error(error)
        }
    }
    // 提交表单
    submitForm = () => {
        const {orderSum, name, phoneNo} = this.props.formData
        let alertTip = ''
        if(!orderSum.toString().length){
            alertTip = '请填写金额'
        }else if(!name.toString().length) {
            alertTip = '请填写姓名'
        }else if(!phoneNo.toString().length) {
            alertTip = '请填写正确手机号'
        }else {
            alertTip = '添加数据成功'
            this.props.clearSelected();
            this.props.clearData()
        }
        this.setState({
            alertStatus: true,
            alertTip
        })
    }

    // 关闭弹窗
    closeAlert = () => {
        this.setState({
            alertStatus: false,
            alertTip: ''
        })
    }
  
    render() {
        console.log(222, this.props.formData)
        return (
            <main className="home-container common-con-top">
                <PublicHeader title='首页'  record/>
                <div>
                    <p className="common-title">请录入你的信息</p>
                    <form className="home-form">
                        <div className="home-form-item">
                            <span>销售金额：</span>
                            <input type="text" placeholder="请输入订单金额" value={this.props.formData.orderSum} onChange={this.handleInput.bind(this, 'orderSum')}/>
                        </div>
                        <div className="home-form-item">
                            <span>客户姓名：</span>
                            <input type="text" placeholder="请输入客户姓名" value={this.props.formData.name} onChange={this.handleInput.bind(this, 'name')}/>
                        </div>
                        <div className="home-form-item">
                            <span>请输入客户电话：</span>
                            <input type="text" maxLength="13" placeholder="请输入客户电话" value={this.props.formData.phoneNo} onChange={this.handleInput.bind(this, 'phoneNo')}/>
                        </div>
                    </form>
                    <div>
                        <p className="common-title">请选择销售的产品</p>
                        <Link to="/production" className="common-select-btn">
                            {
                                this.selectedProList.length ? <ul className="selected-pro-list">
                                    {
                                        this.selectedProList.map((item, index)=>{
                                        return <li key={index} className="selected-pro-item ellipsis">{item.product_name}x{item.selectNum}</li>
                                        })
                                    }
                                </ul> : '选择产品'
                            }
                        </Link>
                    </div>
                    <div className="upload-img-con">
                        <p className="common-title">请上传发票凭证</p>
                        <div className="file-lable">
                            <span className="common-select-btn">上传图片</span>
                            <input type="file" onChange={this.uploadImg}/>
                        </div>
                        <img src={this.props.formData.imgPath} alt="" className="select-img"/>
                    </div>
                    <TouchableOpacity className='submit-btn' clickCallBack={this.submitForm} text="提交"></TouchableOpacity>
                    <PublicAlert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus}></PublicAlert>
                </div>
               
            </main>
        )
    }
}
export default connect(state =>({
    formData: state.formData,
    proData: state.proData
}),{
    saveFormData,
    saveImg,
    clearSelected,
    clearData
})(Home);