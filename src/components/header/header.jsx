import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {is, fromJS} from 'immutable'
import './header.less';
import { NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class PublicHeader extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        record: PropTypes.any,
        confirm: PropTypes.any
    }
    state = {
        navState: false
    }
    toggleNav = ()=> {
        this.setState({navState: !this.state.navState})
    }
    // css动画组件设置为目标组件
    FirstChild = props => {
        const childrenArray = React.Children.toArray(props.children);
        return childrenArray[0] || null;
    }
    shouldComponentUpdate(nextProps, nextState){
        return !is(fromJS(this.props), fromJS(nextProps)) ||  !is(fromJS(this.state), fromJS(nextState))
    }

    render(){
        
        return(
            <header className="header-container">
                <span className="header-slide-icon icon-catalog" onClick={this.toggleNav}></span>
                <span className="header-title">{this.props.title}</span>
                {
                    this.props.record &&<NavLink to="/record" exact className="header-link icon-jilu"/>
                }
                {
                    this.props.confirm &&<NavLink to="/" exact className="header-link header-link-confim">确定</NavLink>
                }
                <ReactCSSTransitionGroup 
                    component={this.FirstChild}
                    transitionName="nav"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                        {
                            this.state.navState && <aside key="nav-slide" className="nav-slide-list" onClick={this.toggleNav}>
                                <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
                                <NavLink to="/balance" exact className="nav-link icon-jiantou-copy-copy">提现</NavLink>
                                <NavLink to="/helpcenter" exact className="nav-link icon-jiantou-copy-copy">帮助中心</NavLink>
                            </aside>
                        }
                </ReactCSSTransitionGroup>
            </header>
        )
    }
}