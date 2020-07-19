import React, { useState } from 'react'
import promiseBindDispatch from '../../utils/promiseBindDispatch';
@connect(({ pl, ba }) => ({ pl, ba }));
export default function Page1 (props) {



  const Dispatch = promiseBindDispatch(props.dispatch)
  const [imgKey, setImgKey] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const getImg = () => {
    Dispatch({
      type: 'REQUIRE_IMG'
    }).then((res) => {
      setImgKey(res.imgKey);
      setImgUrl(res.imgUrl);
    })
  }

  return (
    <div>
    </div>
  )
}
