import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button } from 'antd'
// import {connect} from 'react-redux'
// import {} from '@actions/xxx'
// import Socket from '@configs/socket'

// @connect((storeState)=>({}))

export default class app extends Component {
  static defaultProps = {
  }

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() { } // 在渲染前调用
  componentDidMount() { } // 在第一次渲染后调用，只作用于客户端
  componentWillUpdate() { } // 在组件接收到新的props参数或者state状态、但还没有渲染时会调用，初始化不调用
  componentDidUpdate() { } // 在组件完成更新后立即调用，初始化不调用
  componentWillUnmount() { } // 在组件被移除之前调用

  // #region vscode 1.17的收缩代码块功能  业务代码


  // #endregion

  // 发送socket数据
  onClickSend = () => {
    // Socket.send({ type: 'receive/hello3', data: { name: 'dupi' } })
  }

  render() {
    return (
      <div className="page">
        示范页面
        <div>
          <Button onClick={this.onClickSend}>发送</Button>
        </div>
      </div>
    )
  }
}
