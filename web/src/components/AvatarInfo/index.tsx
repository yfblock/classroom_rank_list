import React from 'react'
import { Modal } from 'antd'

const contactInfo = {};

interface IProps {
  rank?: number
  avatarURL?: string
  name: string
}

const CONFIRM_SALT = 'T1NUcmFpbmluZ0NhbXA='

const showEasterEgg = () => {
  const params = new URLSearchParams(window.location.search)
  const easterEgg = params.get('easterEgg')
  return easterEgg && btoa(easterEgg) === CONFIRM_SALT
}

export const MobileAvatarInfo = ({ name, avatarURL }: { name: string; avatarURL?: string }) => {
  const showWechat = () => {
    const contact = (contactInfo as Record<string, any>)[name]
    if (contact && showEasterEgg()) {
      Modal.info({
        centered: true,
        width: 260,
        title: <span>微信号</span>,
        content: contact.wechat
      })
    }
  }
  return <img src={avatarURL} alt="avatar" onClick={showWechat} />
}

export const AvatarInfo = ({ rank, avatarURL, name }: IProps) => {
  const showWechat = () => {
    const contact = (contactInfo as Record<string, any>)[name]
    if (contact && showEasterEgg()) {
      Modal.info({
        title: <span>微信号</span>,
        content: contact.wechat
      })
    }
  }
  return (
    <span className={`link student-info ${rank && rank < 4 ? 'top-three' : ''}`}>
      {avatarURL && <img src={avatarURL} alt="avatar" onClick={showWechat} />}
      <span
        title={name}
        className="student-info-name"
        onClick={() => window.open(`https://github.com/${name}`)}
      >
        {name}
      </span>
    </span>
  )
}
