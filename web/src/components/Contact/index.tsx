import React, { useState } from 'react'
import { Popover, Badge, Drawer } from 'antd'
import Icon from '../Icon'
import contactImg from './teacharContact.jpeg'

interface IProps {
  isMobile?: boolean
}

const hasReadContactKey = 'has-read-contact'

const ContactIcon = ({ onClick, className }: { className?: string; onClick?: () => void }) => {
  return (
    <Badge dot={!localStorage.getItem(hasReadContactKey)} className={`contact ${className || ''}`}>
      <Icon
        symbol="icon-autobell1"
        onClick={() => {
          localStorage.setItem(hasReadContactKey, 'true')
          onClick?.()
        }}
      />
    </Badge>
  )
}

const WeChatQRCode = ({ className }: { className?: string }) => {
  return (
    <div className={`contact-card ${className || ''}`}>
      <img src={contactImg} alt="contact" />
      <div className="contact-notice">
        <span>对这个网站有好的想法和建议</span>
        <span>可以加李明老师的微信，欢迎反馈!</span>
      </div>
    </div>
  )
}

const PCContact = () => {
  return (
    <Popover content={<WeChatQRCode />} trigger="click" placement="bottomRight">
      <ContactIcon />
    </Popover>
  )
}

const MobileContact = () => {
  const [visible, setVisible] = useState(false)

  const onOpen = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <>
      <ContactIcon className="contact-mobile" onClick={onOpen} />
      <Drawer className='contact-drawer' placement="bottom" visible={visible} onClose={onClose} height={280}>
        <span className="close-icon" onClick={onClose}>x</span>
        <WeChatQRCode className="contact-card-mobile" />
      </Drawer>
    </>
  )
}

const Contact = (props: IProps) => {
  return props.isMobile ? <MobileContact /> : <PCContact />
}

export default Contact
