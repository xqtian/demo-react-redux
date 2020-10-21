import React, { Component } from 'react';
import PublicHeader from '@/components/header/header'
import './helpcenter.less'

class Helpcenter extends Component{
    state = {}

    render() {
        return(
            <main className="common-con-top">
                <PublicHeader title="帮助中心" record />
                <div>记录</div>
            </main>
        )
    }
}

export default Helpcenter