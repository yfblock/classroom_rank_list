import { Col, MenuProps, Row } from 'antd';
import { Layout, Menu } from "antd"
import { useRouter } from 'next/router';

const { Header } = Layout;

const routerPath: MenuProps['items'] = [
  {
    key: '/',
    label: '首页',
  },
  {
    key: '/rank',
    label: '排名'
  },
  {
    key: '/list',
    label: '题目列表'
  },
];


export default function LayoutHeader() {

  const router = useRouter();

  const routeHandler = ({key}: {key: string}) => {
    console.log(router.push(key))
  }

  return <Header className="header">
  <Row justify="space-around">
    <Col xs={14} sm={12} md={12} lg={8} xl={4}>
      <div className="logo"><h2>开源操作系统社区</h2></div>
    </Col>
    <Col xs={10} sm={8} md={6} lg={8} xl={10}>
      <Menu onClick={routeHandler} theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={routerPath} />
    </Col>
  </Row>
</Header>
}