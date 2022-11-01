import React from 'react'
import { useRouter } from 'next/router'

import style from './nav.module.css'
console.log(style)

const Nav = () => {
  const router = useRouter()
  const menu = [
    {
      key: '/',
      label: '首页'
    },
    {
      key: '/rank',
      label: '排名'
    },
    {
      key: '/list',
      label: '题目列表'
    }
  ]

  const handleClick = (key: string) => {
    router.push(key)
  }
  return (
    <div className={style.navList}>
      {menu.map((item) => (
        <div key={item.key} className={style.navItem} onClick={() => handleClick(item.key)}>
          {item.label}
        </div>
      ))}
    </div>
  )
}
export default Nav
