import React, { useState } from 'react'
import { Tree } from 'antd'
import { isEmpty, map, pick, find } from 'lodash'
import type { DataNode, DirectoryTreeProps } from 'antd/lib/tree'
import RankList from './rank'
import ClassRankList from './classRank'
import { TAssignment, TClassroom, IWorkflowInfo, TStudentHomework } from './types'
import data from '../../data.json'
import MobileNav from './mobileNav'
import Icon from '../Icon'

import './index.less'

const { DirectoryTree } = Tree
export const connector = '~@~'

// @ts-ignore
const classroomData = data.classrooms as TClassroom[]
const latestUpdatedAt = data.latest_updated_at
const apiUseCount = data.apiUseCount

const findClassroom = (key: string): TClassroom | undefined => {
  return classroomData.find(({ id }) => id === key)
}

const findAssignment = (key: string): TAssignment | undefined => {
  const [assigmentId, branch] = key.split(connector)
  let asssignmentIdx: number = -1
  const classroomIdx = classroomData.findIndex((item) => {
    const idx = item.assignments.findIndex((assignment) => assignment.id === assigmentId)
    const findIdx = idx > -1
    if (findIdx) {
      asssignmentIdx = idx
    }
    return findIdx
  })
  if (classroomIdx > -1 && asssignmentIdx > -1) {
    const assigment = classroomData[classroomIdx].assignments[asssignmentIdx]
    if (branch) {
      const { student_repositories } = assigment
      const student_branch_repositories: TStudentHomework[] = map(
        student_repositories,
        (repository) => {
          const currentBranchInfo: Partial<IWorkflowInfo> =
            find(repository.branches, (br) => br.branchName === branch) || {}
          return {
            ...pick(repository, ['name', 'avatar', 'studentInfo', 'repoURL', 'languages']),
            ...currentBranchInfo
          }
        }
      )
      return { ...assigment, student_repositories: student_branch_repositories }
    }
    return assigment
  }
}

// const defaultSelectedAssignment = classRoom[0].assignments[0].id
const defaultSelectedClass = classroomData?.[0]?.id
const Rank = ({ isMobile }: { isMobile?: boolean }) => {
  const navRef = React.useRef<{ changeVisible: (visible: boolean) => void }>()
  const [hideNav, setHideNav] = useState(true)

  const treeData: DataNode[] = classroomData.map((item) => {
    return {
      title: item.title,
      key: item.id,
      isClass: true,
      icon: <Icon symbol="icon-autolouyufangyuanshezhi" />,
      children: item.assignments.map((assignment) => {
        return {
          title: assignment.title,
          key: assignment.id,
          icon: <Icon symbol="icon-autowj-rz" />,
          isLeaf: isEmpty(assignment.branches),
          children: map(assignment.branches, (br) => {
            return {
              title: br,
              key: `${assignment.id}${connector}${br}`,
              icon: <Icon symbol="icon-autobranches" />,
              isLeaf: true
            }
          })
        }
      })
    }
  })

  const [treeNodeId, setTreeNodeId] = useState<string>(defaultSelectedClass)
  const [isClassNode, setIsClassNode] = useState(true)

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    setTreeNodeId(keys[0] as string)
    //@ts-ignore
    setIsClassNode(info.node.isClass)
    if (isMobile) {
      navRef.current?.changeVisible(false)
    }
  }

  return (
    <div className="rank-container">
      {isMobile ? (
        <MobileNav ref={navRef}>
          <DirectoryTree
            className="classroom-tree"
            multiple
            expandAction={false}
            defaultSelectedKeys={[treeNodeId]}
            defaultExpandAll
            onSelect={onSelect}
            treeData={treeData}
          />
        </MobileNav>
      ) : (
        <div className={`classroom-tree-area ${hideNav ? 'classroom-tree-tree-hidden' : ''}`}>
          <div className="fold-toggle" onClick={() => setHideNav(!hideNav)}>
            <Icon symbol="icon-autos-fold" />
          </div>
          <DirectoryTree
            className="classroom-tree"
            multiple
            expandAction={false}
            defaultSelectedKeys={[treeNodeId]}
            defaultExpandAll
            onSelect={onSelect}
            treeData={treeData}
          />
        </div>
      )}
      <main className="rank-list">
        {isClassNode ? (
          <ClassRankList
            isMobile={isMobile}
            latestUpdatedAt={latestUpdatedAt}
            apiUseCount={Number(apiUseCount)}
            classroom={findClassroom(treeNodeId)}
          />
        ) : (
          <RankList
            isMobile={isMobile}
            assignment={findAssignment(treeNodeId)}
            treeNodeId={treeNodeId}
          />
        )}
      </main>
    </div>
  )
}

export default Rank
