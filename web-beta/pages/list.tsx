import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { getQuestionPassRate, getQuestions } from '../requests';
import styles from '../styles/List.module.css'

interface DataType {
  name: string,
  index: number,
  rate: number
}

const columns: ColumnsType<DataType> = [
  {
    title: '题号',
    dataIndex: 'index',
    align: 'center',
    width: 80,
    key: 'index',
  },
  {
    title: '题目',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '通过率',
    key: 'rate',
    align: 'center',
    dataIndex: 'rate',
    sorter: (a, b) => a.rate > b.rate ? 1 : -1,
    render: (rate) => {
      return <a>{rate}%</a>
    }
  }
];

export default function Home() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    getQuestions()
      .then(async res => {
        let arr: any[] = [];
        for(let i in res) {
          arr[i] = {
            index: parseInt(i) + 1,
            name: res[i],
            rate: await getQuestionPassRate(res[i])
          };
        }
        setList(arr);
      });
  }, []);

  return (
    <>
      <Head>
        <title>题目列表</title>
      </Head>
      <Table className={styles.container} columns={columns} dataSource={list} />
    </>
  )
}