import React from 'react'
import { Tag } from 'antd'

interface IProps {
  score: number
}

const scoreColors = [
  [230, 26, 11], // 0+
  [230, 77, 11], // 10+
  [196, 103, 22], // 20+
  [209, 155, 17], // 30+
  [201, 171, 36], // 40+
  [232, 192, 16], // 50+
  [215, 237, 175], // 60+
  [140, 173, 80], // 70+
  [52, 145, 79], // 80+
  [45, 117, 66] // 90+
]
const AssignmentBar = ({ score }: IProps) => {
  // const rand = Math.floor(Math.random() * 100)
  // score = rand
  const decimal = Math.floor(score / 10) - 1
  const mod = (score % 10) + 1
  const opacity = 1 - mod / 10

  const backgroundColor = `rgba(${scoreColors[decimal]}, ${opacity})`
  if(score === 0) {
    return <span>0</span>
  }


  return <Tag className="assignment-bar" style={{ width: `${score}%`}}  color={backgroundColor}>{score}</Tag>
}

export default AssignmentBar
