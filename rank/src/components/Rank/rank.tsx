import React, { useState, useMemo } from 'react'
import { Table, Tag, Button, Progress } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { ColumnsType } from 'antd/lib/table'
import { orderBy } from 'lodash'
import Icon from '../../components/Icon'
import type { TAssignment, TStudentHomework } from './types'
import Search, { ISearchProps } from './search'
import { connector } from '.'
import { AvatarInfo, MobileAvatarInfo } from './AvatarInfo'

// const languageColorArra = [
//   'red',
//   'volcano',
//   'orange',
//   'gold',
//   'lime',
//   'green',
//   'cyan',
//   'blue',
//   'geekblue',
//   'purple'
// ]

dayjs.extend(relativeTime)

const sortBoolean = (key: keyof TStudentHomework) => {
  return (a: TStudentHomework) => (a[key] ? -1 : 1)
}

interface IRankListProps {
  assignment?: TAssignment
  isMobile?: boolean
  treeNodeId: string
}

const RankList = (props: IRankListProps) => {
  const [query, setQuery] = useState<Partial<ISearchProps>>({})
  const { treeNodeId } = props

  // eslint-disable-next-line
  const [_assignmentId, branch] = treeNodeId.split(connector)

  const columns: ColumnsType<TStudentHomework> = useMemo(
    () => [
      {
        title: '排名',
        dataIndex: 'rank',
        fixed: true,
        width: 80,
        align: 'center',
        key: 'rank',
        render(text: number) {
          let content: React.ReactNode = text
          switch (text) {
            case 1:
              content = <Icon symbol="icon-autojiangbei-" />
              break
            case 2:
              content = <Icon symbol="icon-autojiangbei-1" />
              break
            case 3:
              content = <Icon symbol="icon-autojiangbei-2" />
              break
            default:
              break
          }
          return <span className="rank-modal">{content || '-'}</span>
        }
      },
      {
        title: '学生',
        align: 'center',
        fixed: true,
        width: 120,
        dataIndex: 'name',
        render(text: string, record: TStudentHomework) {
          return (
            <AvatarInfo rank={record.rank} avatarURL={record.studentInfo.avatar_url} name={text} />
          )
        }
      },
      {
        title: '分数',
        align: 'center',
        width: 100,
        dataIndex: 'points_awarded',
        key: 'score',
        render(text, record: TStudentHomework) {
          return record.hasSubmited ? (
            <span className={`${record.rank && record.rank < 4 ? 'top-three' : ''}`}> {text} </span>
          ) : (
            '-'
          )
        }
      },
      {
        title: '最新提交状态',
        align: 'center',
        width: 100,
        dataIndex: 'points_available',
        key: 'points_available',
        render(_text: string, record: TStudentHomework) {
          if (record.hasSubmited) {
            const passed =
              Number(record.points_awarded) > 0 && record.points_awarded === record.points_available
            return <Tag color={passed ? 'green' : 'red'}>{passed ? '成功' : '失败'}</Tag>
          } else {
            return '-'
          }
        }
      },
      {
        title: '版本',
        align: 'center',
        width: 100,
        dataIndex: 'commits',
        key: 'commits',
        render(_text: any, record: TStudentHomework) {
          if (!record.hasSubmited) {
            return '-'
          }
          const count = record.commitCount
          return count !== undefined ? (
            <Button
              type="link"
              onClick={() => {
                branch
                  ? window.open(`${record.repoURL}/commits/${branch}`)
                  : window.open(`${record.repoURL}/commits`)
              }}
            >
              {count} {count > 1 ? 'commits' : 'commit'}
            </Button>
          ) : (
            '-'
          )
        }
      },
      {
        title: '耗时',
        align: 'center',
        width: 100,
        dataIndex: 'executeTime',
        key: 'executeTime',
        render(text: string, record: TStudentHomework) {
          if (!record.hasSubmited) {
            return '-'
          }
          if (text) {
            return `${text}s`
          }
          return '-'
        }
      },
      {
        title: '更新时间',
        align: 'center',
        width: 150,
        dataIndex: 'latestUpdatedAt',
        key: 'latestUpdatedAt',
        render(text, record) {
          if (!record.hasSubmited) {
            return '-'
          }
          return text ? dayjs(text).fromNow() : '-'
        }
      },
      {
        title: '首次成功时间',
        align: 'center',
        width: 150,
        dataIndex: 'firstSuccessAt',
        key: 'firstSuccessAt',
        render(text, record) {
          if (!record.hasSubmited) {
            return '-'
          }
          return text ? dayjs(text).fromNow() : '-'
        }
      },
      {
        title: 'Action',
        align: 'center',
        dataIndex: 'actions',
        width: 80,
        key: 'actions',
        render(_text: never, record: TStudentHomework) {
          if (!record.hasSubmited) {
            return '-'
          }
          const url = record.autoGradingJob?.html_url
          if (url) {
            return (
              <Icon
                style={{ cursor: 'pointer' }}
                symbol="icon-autowj-rz"
                onClick={() => window.open(url)}
              />
            )
          }
          return '-'
        }
      },
      {
        title: '仓库',
        align: 'center',
        width: 50,
        dataIndex: 'operate',
        key: 'operate',
        render(_text: any, record: TStudentHomework) {
          if (!record.hasSubmited) {
            return '-'
          }
          return (
            <Icon
              style={{ cursor: 'pointer' }}
              symbol="icon-autogithub"
              onClick={() => {
                branch
                  ? window.open(`${record.repoURL}/tree/${branch}`)
                  : window.open(record.repoURL)
              }}
            />
          )
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [treeNodeId]
  )

  // const branchName = props.assignment?.branchName
  let dataSource: TStudentHomework[] = useMemo(
    () => {
      let currentRank = 1
      return orderBy(
        props.assignment?.student_repositories,
        [sortBoolean('hasSubmited'), sortBoolean('isSuccess'), 'firstSuccessAt'],
        ['asc', 'asc', 'asc']
      ).map((item) => {
        let rank
        if (item.hasSubmited) {
          rank = currentRank
          currentRank += 1
        }
        return {
          ...item,
          rank
        }
      })
    },

    // eslint-disable-next-line
    [treeNodeId]
  )
  dataSource = dataSource.filter((item: TStudentHomework) => {
    let searchName = true
    let searchAssignment = true
    let searchLuanage = true
    if (query.name) {
      searchName = item.name.toLowerCase().includes(query.name.toLowerCase())
    }

    // if (query.assignment) {
    //   searchAssignment = item.assignmentTitle.toLowerCase().includes(query.assignment.toLowerCase())
    // }

    // if (!isEmpty(query.language)) {
    //   searchLuanage = item.languages.some((l) => query.language?.includes(l))
    // }

    return searchName && searchAssignment && searchLuanage
  })

  const renderComplateStatus = () => {
    const passRepos = props.assignment?.student_repositories.filter(
      (item) => item.submission_timestamp && item.points_awarded === '100'
    )

    const percent = (passRepos!.length / props.assignment!.student_repositories.length) * 100
    if (props.isMobile) {
      return (
        <div className="total-passed-info">
          <Progress
            strokeColor={'rgb(82, 196, 26)'}
            trailColor="#ff4d4f"
            type="circle"
            width={40}
            style={{ fontSize: '12px' }}
            format={() => passRepos?.length}
            percent={percent}
          />
        </div>
      )
    }

    return (
      <div className="total-passed-info">
        <div className="passed-count">
          <span>完成作业</span>
          <span>
            {passRepos?.length}/{props.assignment?.student_repositories.length}
          </span>
        </div>
        <Progress
          strokeColor={'rgb(82, 196, 26)'}
          trailColor="#ff4d4f"
          percent={percent}
          showInfo={false}
        />
      </div>
    )
  }

  const setClassname = (rank: number) => {
    const ranks = ['championship', 'second-place', 'third-place']
    return ranks[rank] || ''
  }

  const renderMobileRankList = () => {
    const renderStatus = (item: TStudentHomework) => {
      const passed =
        Number(item.points_awarded) > 0 && item.points_awarded === item.points_available
      return <span className={passed ? 'green' : 'red'}>{passed ? '成功' : '失败'}</span>
    }
    const renderCommits = (record: TStudentHomework) => {
      const count = record.commitCount
      return count !== undefined ? (
        <span
          onClick={() => {
            branch
              ? window.open(`${record.repoURL}/commits/${branch}`)
              : window.open(`${record.repoURL}/commits`)
          }}
        >
          {count} {count > 1 ? 'commits' : 'commit'}
        </span>
      ) : (
        '-'
      )
    }
    const renderExecuteSpendTime = (record: TStudentHomework) => {
      return record.executeTime ? `${record.executeTime}s` : '-'
    }
    const renderSubmission = (record: TStudentHomework) => {
      return record.submission_timestamp
        ? dayjs(record.submission_timestamp.replace(/\s|UTC/g, '')).fromNow()
        : '-'
    }

    const renderAction = (record: TStudentHomework) => {
      const url = record.autoGradingJob?.html_url
      if (url) {
        return (
          <Icon
            style={{ cursor: 'pointer' }}
            symbol="icon-autowj-rz"
            onClick={() => window.open(url)}
          />
        )
      }
      return '-'
    }

    return (
      <ul className="rank-table-mobile">
        {dataSource.map((item) => {
          return (
            <li
              className={`rank-table-row rank-table-row-assigment ${setClassname(
                (item.rank || 0) - 1
              )}`}
              key={item.name + item.rank}
            >
              <span className="list-order-index">{item.rank}</span>
              <span className="info-avartar">
                {(item.rank || 1000) <= 3 && (
                  <Icon className="order-hat" symbol="icon-autorexiao-huangguan" />
                )}
                <MobileAvatarInfo avatarURL={item.studentInfo.avatar_url} name={item.name} />
              </span>
              <div className="rank-info rank-info-more">
                <span
                  className="rank-info-name"
                  onClick={() => window.open(`https://github.com/${item.name}`)}
                >
                  {item.name}
                </span>
                <span className="rank-info-status">
                  {item.hasSubmited ? renderStatus(item) : '-'}
                </span>
                <span className="rank-info-detail">
                  <span className="commits">{item.hasSubmited ? renderCommits(item) : '-'}</span>
                  <span className="executeSpend-time">
                    {item.hasSubmited ? renderExecuteSpendTime(item) : '-'}
                  </span>
                  <span className="submission-time">
                    {item.hasSubmited ? renderSubmission(item) : ''}
                  </span>
                </span>
              </div>
              <span className="rank-action">{item.hasSubmited ? renderAction(item) : '-'}</span>
              <span
                className={`rank-score ${
                  item.points_awarded === '100' ? 'rank-score-success' : ''
                }`}
              >
                {item.points_awarded}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <>
      <div className="classrank-header">
        <Search
          isMobile={props.isMobile}
          defaultQuery={query}
          onChange={(query) => setQuery(query)}
          langs={dataSource[0]?.languages}
        />
        {renderComplateStatus()}
      </div>

      {props.isMobile ? (
        renderMobileRankList()
      ) : (
        <Table
          className="rank-table"
          scroll={{ x: 1440 }}
          rowKey="name"
          dataSource={dataSource}
          columns={columns}
          size="middle"
        />
      )}
    </>
  )
}

export default RankList
