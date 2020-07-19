import React, { Component } from 'react'

export default class Page2 extends Component {

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (this.props.option != nextProps.option) {
      this.setState({
        initData: nextProps.option
      })
    }
  }
  render () {
    return (
      <div>

      </div>
    )
  }
}
