import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './alert.less';

export default class Alert extends Component {
    static propTypes = {
        closeAlert: PropTypes.func.isRequired,
        alertTip: PropTypes.string.isRequired,
        alertStatus: PropTypes.bool.isRequired
    }
    confirm = () => {
        this.props.closeAlert()
    }

    render(){
        const {alertTip, alertStatus} = this.props
        return(
            <ReactCSSTransitionGroup
                transitionName="alert"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {
                    alertStatus && <div className="alert-con">
                        <div className="alert-context">
                            <div className="alert-content-detail">{alertTip}</div>
                            <TouchableOpacity clickCallBack={this.confirm} className="confirm-btn" ></TouchableOpacity>
                        </div>
                    </div>
                }

            </ReactCSSTransitionGroup>
        )
    }
} 