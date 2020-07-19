const promiseBindDispatch = (dispatch) => (params) => {
  return new Promise((resolve, reject) => {
    dispatch({
      ...params,
      resolve,
      reject
    })
  })

}
export default promiseBindDispatch