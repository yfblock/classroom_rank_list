import React from 'react'
import Icon from '../components/Icon'
import dayjs from 'dayjs'
import MobileDetect from 'mobile-detect'
import Contact from '../components/Contact'
import 'dayjs/locale/zh-cn'

import './DefaultLayout.less'
import './responsive.less'
import ClassRoomRank from '../components/ClassRoomRank'

import jsonData from '../data.json'
// import DefaultLayout from './layouts/DefaultLayout'
// import MobileLayout from './layouts/MobileLayout'

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
      <ClassRoomRank 
        refreshKey="default"
        columns={Object.keys(jsonData.available)}
        students={jsonData.students}
        latestUpdatedAt={jsonData.latestUpdatedAt}
      />
    </div>
  )
}

export default App
