import React, { Component } from 'react'
import { Switch, Modal } from 'antd';
export default class SwitchTest extends Component {
    state = {
        status: true,
        arr: [
            {
                id: 1,
                status: true
            },
            {
                id: 2,
                status: true
            },
            {
                id: 3,
                status: false
            },
            {
                id: 4,
                status: false
            },
            {
                id: 5,
                status: true
            },
        ]
    };
    handleChange = (checked, record) => {
        console.log(checked, record)
        const { id } = record;
        if (checked) {
            Modal.confirm({
                title: '被锁定的用户将不允许登录,请谨慎操作',
                content: <>用户名:<span>usernam</span></>,
                okButtonProps: { type: 'danger', ghost: true },
                onOk: () => {
                    console.log('停止')
                    // ============================================================
                    // 修改远程接口的状态
                    // dispatch一个update
                    // 参数是id和要修改的状态值
                    // ============================================================
                    this.setState((pre) => {
                        const newArr = pre.arr.map(item => {
                            if (item.id === id) {
                                item.status = true
                            }
                            return item
                        })
                        return {
                            arr: newArr
                        }
                    })
                },
                onCancel: () => {
                    return
                }
            });
        } else {
            Modal.confirm({
                title: '解锁用户将允许其登录',
                content: <>用户名:<span>username</span></>,
                onOk: () => {
                    console.log('启用')
                    this.setState((pre) => {
                        const newArr = pre.arr.map(item => {
                            if (item.id === id) {
                                item.status = false
                            }
                            return item
                        })
                        return {
                            arr: newArr
                        }
                    })
                },
                onCancel: () => {
                    return
                }
            });
        }
    }


    render() {

        const { arr } = this.state;
        return (
            <div>
                {
                    arr.map((item) => (<div key={item.id}><Switch checked={item.status} onChange={(e) => { this.handleChange(e, item) }} /></div>))
                }

            </div>
        )
    }
}
