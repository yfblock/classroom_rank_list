import DirectoryTree from "antd/lib/tree/DirectoryTree";
import React from "react";
import Icon from "../components/Icon";

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            hideNav: false
        }
    }

    onSelect(keys, info) {
        setTreeNodeId(keys[0] as string)

        //@ts-ignore
        setIsClassNode(info.node.isClass)
        if (isMobile) {
            navRef.current?.changeVisible(false)
        }
    }

    render(): React.ReactNode {
        return <>
        <div className="rank-container">
            <div className={`classroom-tree-area ${this.state.hideNav ? 'classroom-tree-tree-hidden' : ''}`}>
                <div className="fold-toggle" onClick={() => this.setState({hideNav: !this.state.hideNav})}>
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
            <main className="rank-list">
                {/* <ClassRankList
                    isMobile={isMobile}
                    latestUpdatedAt={latestUpdatedAt}
                    classroom={findWork(treeNodeId)}
                /> */}
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
    </>
    }
}