/*
 * @Author: devfpy
 * @Date: 2022-03-25 15:21:03
 * @LastEditors: devfpy
 * @LastEditTime: 2022-03-25 21:06:08
 * @FilePath: /anchor-components-modal-antd/src/Modal/ModalComponents.jsx
 * @Description:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Modal, message } from 'antd';

export default class ModalComponents extends Component {
    static propTypes = {
        title: PropTypes.string, // 标题
        width: PropTypes.string, // 宽度
        height: PropTypes.string, // 高度

        hasMask: PropTypes.bool, // 是否显示遮罩层
        maskClosable: PropTypes.bool, // 点击蒙层是否允许关闭
        okText: PropTypes.string, // 确定按钮显示的文字
        cancelText: PropTypes.string, // 取消按钮显示的文字
        draggable: PropTypes.bool, // 是否允许拖拽

        // footerAlign: PropTypes.string,
        footerActions: PropTypes.array, // 底部需要显示的按钮
        okButtonLoading: PropTypes.bool, // 当okButtonLoading属性设置后，okButton的loading状态通过该属性管理
        onClose: PropTypes.func, // onCancel onClose 弹窗关闭事件
        onClosed: PropTypes.func, // afterClose 弹窗已经关闭
        onOk: PropTypes.func, // parent component return a promise, success后 关闭modal

        bodyStyle: PropTypes.object,
        children: PropTypes.any,
        footer: PropTypes.any,
        destroyOnClose: PropTypes.bool
    };

    static defaultProps = {
        hasMask: true,
        maskClosable: true,
        draggable: true,
        destroyOnClose: true,
        width: '400',
        height: '320'
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false,
            disabled: true,
            bounds: { left: 0, top: 0, bottom: 0, right: 0 }
        };

        this.draggleRef = React.createRef();
    }

    openModal = () => {
        this.setState({
            visible: true
        });
    };

    closeModal = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
        this.setState({
            visible: false,
            loading: false
        });
    };

    handleCloseButtonOnClick = () => {
        this.closeModal();
    };

    handleOnAfterClose = () => {
        if (this.props.onClosed) {
            this.props.onClosed();
        }
    };

    handleOkButtonOnClick = () => {
        if (this.props.onOk) {
            if (typeof this.props.okButtonLoading == 'undefined') {
                this.setState({
                    loading: true
                });
                this.props.onOk() &&
                    this.props
                        .onOk()
                        .then((data) => {
                            if (data) {
                                let dataMsg = data?.message || '';
                                if (dataMsg && dataMsg != '') {
                                    message.success(dataMsg);
                                }
                            }
                            this.setState(
                                {
                                    loading: false
                                },
                                () => {
                                    this.handleCloseButtonOnClick();
                                }
                            );
                        })
                        .catch((error) => {
                            if (error) {
                                let errorMsg = error?.message || '';
                                if (errorMsg && errorMsg != '') {
                                    message.error(errorMsg);
                                }
                            }

                            this.setState({
                                loading: false
                            });
                        });
            } else {
                this.props.onOk && this.props.onOk();
            }
        }
    };

    handleDraggerOnStart = (event, uiData) => {
        console.log('........... on start');
        console.log(event);
        console.log(uiData);
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = this.draggleRef.current?.getBoundingClientRect();

        console.log(clientWidth, clientHeight);
        console.log(this.draggleRef);
        console.log(targetRect);

        if (!targetRect) {
            return;
        }
        this.setState({
            bounds: {
                left: -targetRect.left + uiData.x,
                right: clientWidth - (targetRect.right - uiData.x),
                top: -targetRect.top + uiData.y,
                bottom: clientHeight - (targetRect.bottom - uiData.y)
            }
        });
    };

    render() {
        let modalWidth = '';
        let modalHeight = '';

        const { visible, loading, disabled, bounds } = this.state;
        const { title, width, height, bodyStyle, okText, cancelText, draggable } = this.props;

        if (width.indexOf('%') > 0 || width.indexOf('px') > 0 || width.indexOf('PX') > 0) {
            modalWidth = width;
        } else {
            modalWidth = width + 'px';
        }

        if (height.indexOf('%') > 0 || height.indexOf('px') > 0 || height.indexOf('PX') > 0) {
            modalHeight = height;
        } else {
            modalHeight = height + 'px';
        }

        const draggableTitle = (
            <div
                style={{
                    width: '100%',
                    cursor: 'move'
                }}
                onMouseOver={() => {
                    if (disabled) {
                        this.setState({
                            disabled: false
                        });
                    }
                }}
                onMouseOut={() => {
                    this.setState({
                        disabled: true
                    });
                }}
                onFocus={() => {}}
                onBlur={() => {}}
            >
                {title}
            </div>
        );

        return (
            <Modal
                title={draggable ? draggableTitle : title}
                width={modalWidth}
                height={modalHeight}
                visible={visible}
                okText={okText}
                cancelText={cancelText}
                centered={true}
                confirmLoading={loading}
                onOk={this.handleOkButtonOnClick}
                onCancel={this.handleCloseButtonOnClick}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => this.handleDraggerOnStart(event, uiData)}
                    >
                        <div ref={this.draggleRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <div
                    style={{
                        width: '100%',
                        height: modalHeight,
                        overflow: 'auto',
                        ...bodyStyle
                    }}
                    className="scrollbar"
                >
                    {this.props.children}
                </div>
            </Modal>
        );
    }
}
