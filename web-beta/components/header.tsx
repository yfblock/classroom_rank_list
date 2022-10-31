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
    key: '/list',
    label: '列表'
  }
];


export default function() {

  const router = useRouter();

  const routeHandler = ({key}: {key: string}) => {
    console.log(router.push(key))
  }

  return <Header className="header">
  <Row justify="space-around">
    <Col span={4}><div className="logo"><h2>rustlings 排行榜</h2></div></Col>
    <Col span={10}><Menu onClick={routeHandler} theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={routerPath} /></Col>
  </Row>
</Header>
}