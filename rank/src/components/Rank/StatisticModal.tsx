import React, { useRef } from 'react'
import { map } from 'lodash'
import { Modal, ModalProps, Table } from 'antd'
import type { TClassroom } from './types'

interface IProps extends Partial<ModalProps> {
  classroom?: TClassroom
}

const floatToPercent = (floatToPercent: number, fixed = 2) => {
  const percent = parseFloat((floatToPercent * 100).toFixed(fixed))
  return `${percent}%`
}
const StatisticModal = (props: IProps) => {
  const ARef = useRef<number[]>([])
  const BRef = useRef<number[]>([])
  const columns = [
    {
      title: '作业名称',
      dataIndex: 'title',
      key: 'title',
      render(text: string) {
        return <span style={{ fontWeight: 'bold' }}>{text}</span>
      }
    },
    {
      title: 'A(完成通过人数)',
      dataIndex: 'A',
      key: 'A'
    },
    {
      title: 'B(认领作业人数)',
      dataIndex: 'B',
      key: 'B'
    },
    {
      title: 'C(有提交作业但未通过人数)',
      dataIndex: 'C',
      key: 'C'
    },
    {
      title: 'A/B(通过率)',
      dataIndex: 'passRate',
      key: 'passRate'
    },
    {
      title: 'C/B(失败率)',
      dataIndex: 'failRate',
      key: 'failRate'
    },
    {
      title: 'A+C/B(动手率)',
      dataIndex: 'doingRate',
      key: 'doingRate'
    },
    {
      title: 'A的通关率A2/A1',
      dataIndex: 'APassRate',
      key: 'APassRate'
    },
    {
      title: 'B的通关率B2/B1',
      dataIndex: 'BPassRate',
      key: 'BPassRate'
    },
    {
      title: 'A的每关通关率An/A1',
      dataIndex: 'AEachPassRate',
      key: 'AEachPassRate'
    },
    {
      title: 'B的每关通关率Bn/B1',
      dataIndex: 'BEachPassRate',
      key: 'BEachPassRate'
    }
  ]

  const dataSource = map(props.classroom?.assignments, (assignment, index) => {
    const B = assignment.student_repositories.length
    const A = assignment.student_repositories.filter((repo) => repo.isSuccess).length
    const C = assignment.student_repositories.filter(
      (repo) => repo.hasSubmited && !repo.isSuccess
    ).length

    const passRate = floatToPercent(A / B)
    const failRate = floatToPercent(C / B)
    const doingRate = floatToPercent((A + C) / B)

    ARef.current![index] = A
    BRef.current![index] = B

    const APassRate =
      index > 0 ? floatToPercent(ARef.current![index] / ARef.current![index - 1]) : undefined
    const BPassRate =
      index > 0 ? floatToPercent(BRef.current![index] / BRef.current![index - 1]) : undefined

    const AEachPassRate =
      index > 0 ? floatToPercent(ARef.current![index] / ARef.current![0]) : undefined
    const BEachPassRate =
      index > 0 ? floatToPercent(BRef.current![index] / BRef.current![0]) : undefined

    return {
      key: assignment.id,
      title: assignment.title,
      A,
      B,
      C,
      passRate,
      failRate,
      doingRate,
      APassRate,
      BPassRate,
      AEachPassRate,
      BEachPassRate
    }
  })

  return (
    <Modal title={`排行榜数据统计分析(${props.classroom?.title})`} width={'90%'} footer={null} {...props} >
          <Table scroll={{ x: 1080 }} dataSource={dataSource} columns={columns} />
    </Modal>
  )
}

export default StatisticModal
