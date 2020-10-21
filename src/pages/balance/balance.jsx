import React, { Component } from 'react';
import PublicHeader from '@/components/header/header'
import './balance.less'

class Balance extends Component{
    state = {}

    render() {
        return(
            <main className="common-con-top">
                <PublicHeader title="提现" record />
                <div>提现</div>
            </main>
        )
    }
}

export default Balance