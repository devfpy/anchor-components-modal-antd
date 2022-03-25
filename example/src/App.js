/*
 * @Author: devfpy
 * @Date: 2022-03-25 15:13:13
 * @LastEditors: devfpy
 * @LastEditTime: 2022-03-25 21:04:02
 * @FilePath: /anchor-components-modal-antd/example/src/App.js
 * @Description:
 */
import React, { Component } from 'react';
import { Button } from 'antd';
import { ModalComponents } from 'anchor-components-modal-antd';

export default class App extends Component {
    handleButtonOnClick = () => {
        this.myModal.openModal();
    };

    handleModalOnClosed = () => {
        console.log('.......... modal closed');
    };

    handleModalOnOk = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ message: '' });
            }, 2000);
        });
    };

    render() {
        return (
            <div style={{ padding: 16 }}>
                <Button type={'primary'} onClick={this.handleButtonOnClick}>
                    弹窗
                </Button>

                <ModalComponents
                    ref={(node) => (this.myModal = node)}
                    title={'弹窗标题'}
                    hasMask={true}
                    width={'760px'}
                    height={'380px'}
                    okText={'确定'}
                    cancelText={'关闭'}
                    // okButtonLoading={confirming}
                    onClose={this.handleModalOnClosed}
                    onCancel={this.handleModalOnClosed}
                    onClosed={this.handleModalOnClosed}
                    onOk={this.handleModalOnOk}
                >
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>
                    <div>我是弹窗内容</div>

                    <div>我是弹窗内容</div>

                    <div>我是弹窗内容</div>
                </ModalComponents>
            </div>
        );
    }
}
