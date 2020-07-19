import React, { Component } from 'react'

export default class Err extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }
  static getDerivedStatrFromProps (error) {
    return { hasError: true }
  }
  componentDidCatch (error, info) {
    console.log(error, info);
  }
  render () {

    if (this.state.hasError) {
      return <h1>出错了</h1>
    }

    return this.props.children
  }
}
