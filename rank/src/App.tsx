import React from 'react'
import Icon from './components/Icon'
import Rank from './components/Rank'
import dayjs from 'dayjs'
import MobileDetect from 'mobile-detect'
import Contact from './Contact'
import 'dayjs/locale/zh-cn'

import './app.less'
import './responsive.less'
import DefaultLayout from './layouts/DefaultLayout'
import MobileLayout from './layouts/MobileLayout'

dayjs.locale('zh-cn')

const md = new MobileDetect(window.navigator.userAgent)
export function isMobile() {
  return !!md.mobile()
}

function App() {
  const mobile = isMobile()

  return (
    <div className={`container ${mobile ? 'container-mobile' : ''}`}>
      <header>
        <div id="logo-box">
          <Icon symbol="icon-autojiangbei" id="logo" />
          <div className="logo-title">
            {/* <span>{websiteTitle}</span> */}
            <span>训练营</span>
          </div>
        </div>
        <Contact isMobile={mobile} />
      </header>
      {
        mobile ? <MobileLayout /> : <DefaultLayout />
      }
    </div>
  )
}

export default App
