import { Avatar, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { getQuestionsLen, getRankingList } from '../requests';
import styles from '../styles/List.module.css'
import { orderBy } from 'lodash';


interface DataType {
  rank?: number,
  avatar: string,
  details: any,
  grades: any,
  name: string,
  repo_url: string
}

export default function RankPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<DataType[]>([]);
  const [questionsNumber, setQuestionsNumber] = useState<number>(1);

  useEffect(() => {
    getRankingList()
      .then(res => {
        let students: DataType[] = orderBy(res, function(o) {
          return o.details.default;
        }, 'asc');
        for(let i = 0; i < students.length; i++) {
          students[i].rank = i + 1;
        }
        return students;
      })
      .then(res => {
        setInitLoading(false);
        setList(res as DataType[]);
      });
    getQuestionsLen().then((value) => setQuestionsNumber(value));
  }, []);



  return (
    <List
      className={styles.container}
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={list}
      pagination={{
        position: 'bottom'
      }}
      renderItem={item => {
        let description = "";
        if(item.details.default) {
          description = `${Object.values(item.details.default).filter((value: any) => value == true).length}`;
        } else {
          description = "0";
        }
        return (
          <List.Item>
            <div>{item.rank}</div>
            <Skeleton avatar title={false} active loading={false}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={`https://github.com/${item.name}`}>{item.name}</a>}
                description={`Pass ${description} questions`}
              />
              <div>完成度： {(parseInt(description) / questionsNumber * 100).toFixed(2)}%</div>
            </Skeleton>
          </List.Item>
        );
      }}
    />
  );
};