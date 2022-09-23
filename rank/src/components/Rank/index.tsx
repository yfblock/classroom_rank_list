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
// const classroomData = data.classrooms as TClassroom[]
const availables = data.available;
const latestUpdatedAt = data.latest_updated_at

function findWork(treeNodeId: string) {
  console.log(treeNodeId);
}

// const defaultSelectedAssignment = classRoom[0].assignments[0].id
const Rank = ({ isMobile }: { isMobile?: boolean }) => {
  const navRef = React.useRef<{ changeVisible: (visible: boolean) => void }>()
  const [hideNav, setHideNav] = useState(true)

  console.log(availables)

  // const treeData: DataNode[] = Object.entries(availables).map((item) => {
  //   return {
  //     title: item.title,
  //     key: item.id,
  //     isClass: true,
  //     icon: <Icon symbol="icon-autolouyufangyuanshezhi" />,
  //     children: item.assignments.map((assignment) => {
  //       return {
  //         title: assignment.title,
  //         key: assignment.id,
  //         icon: <Icon symbol="icon-autowj-rz" />,
  //         isLeaf: isEmpty(assignment.branches),
  //         children: map(assignment.branches, (br) => {
  //           return {
  //             title: br,
  //             key: `${assignment.id}${connector}${br}`,
  //             icon: <Icon symbol="icon-autobranches" />,
  //             isLeaf: true
  //           }
  //         })
  //       }
  //     })
  //   }
  // })
  const treeData: DataNode[] = Object.keys(availables).map((item, index) => {
    return {
      title: item,
      key: index,
      isClass: true,
      icon: <Icon symbol="icon-autowj-rz" />,
    }
  })

  const [treeNodeId, setTreeNodeId] = useState<string>('default')
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
        <ClassRankList
          isMobile={isMobile}
          latestUpdatedAt={latestUpdatedAt}
          classroom={findWork(treeNodeId)}
        />
        {/* {isClassNode ? (
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
        )} */}
      </main>
    </div>
  )
}

export default Rank
