import React, { Component } from 'react'
import {connect} from 'react-redux'
import {add,sub,addAsync} from './actions'
 class App extends Component {
  render() {
    let {addAsync,sub,counter}=this.props;
    return (
      <div>
        App组件
        <p>{counter.count}</p>
        <button onClick={()=>addAsync()}>+</button>
        <button onClick={()=>sub()}>-</button>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
    return {
        counter: state.counter
    }
}
export default connect(mapStateToProps,{addAsync,sub})(App);
