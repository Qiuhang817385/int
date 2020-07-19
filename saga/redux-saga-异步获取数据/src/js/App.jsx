import React, { Component } from 'react'
import {connect} from 'react-redux'
import {add,sub,addAsync,fetchUser,fetchTodo} from './actions'
 class App extends Component {
  render() {
    let {addAsync,sub,counter,fetchUser,fetchTodo}=this.props;
    let {isLoading,error,user}=this.props.users;
    let data;
    if(isLoading){
      data="Loading.....";
    }else if(error){
      data=error;
    }else{
      data=user && user.data[0].email;
    }
    return (
      <div>
        App组件
        <p>{counter.count}</p>
        <button onClick={()=>addAsync()}>+</button>
        <button onClick={()=>sub()}>-</button>
        <p>{data}</p>
        <button onClick={()=>fetchUser()}>获取用户信息</button>
        <button onClick={()=>fetchTodo()}>获取Todo信息</button>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
    return {
        counter: state.counter,
        users:state.users
    }
}
export default connect(mapStateToProps,{addAsync,sub,fetchUser,fetchTodo})(App);
