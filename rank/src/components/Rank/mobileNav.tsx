import React, { useState } from 'react'
import { Drawer } from 'antd'
import Icon from '../../components/Icon'

const Nav = React.forwardRef((props: React.PropsWithChildren<{}>, ref) => {
  const [visible, setVisible] = useState(false)
  const open = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  React.useImperativeHandle(ref, () => ({
    changeVisible: (visible: boolean) => {
      setVisible(visible)
    }
  }))
  return (
    <>
      <Icon symbol="icon-autos-fold" className="classroom-toggle" onClick={open} />
      <Drawer
        title={
          <span className="back" onClick={onClose}>
            <Icon symbol="icon-autoarrow-down" /> 返回
          </span>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={220}
        height={300}
        className="classroom-nav-drawer"
        bodyStyle={{ padding: 0 }}
      >
        {props.children}
      </Drawer>
    </>
  )
})

export default Nav
