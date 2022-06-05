import React, {useState,useEffect} from "react";
import { Input, Button, Modal, Form,Avatar, Row, Col, Popover, message } from 'antd';
import logo from '../image/logo.png'
import icon1 from '../image/icon1.png'
import icon2 from '../image/icon2.png'
import icon3 from '../image/icon3.png'
import { getRequest, postRequest } from "hooks/api";
import { useStore } from "hooks/useStore";
import { useHistory } from "react-router";

const { Search } = Input;


const NavBar = () => {
  const history = useHistory()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useStore((state)=>[state.isLogin,state.setIsLogin])
  useEffect(()=>{
    getRequest('/getuser')
    .then(data => setIsLogin(true))
    .catch(err=> setIsLogin(false))
  },[])
  const content = (
<div>
  <Button onClick={()=>history.push("/history")} block>Lịch sử mua hàng</Button>
  <Button onClick={()=>{console.log('first');localStorage.clear();setIsLogin(false)}} block>Đăng xuất</Button>
</div>
);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const Login = ()=>{
  const onFinish = async (values) => {
    await postRequest("/login",values)
    .then(data=> {localStorage.setItem("accessToken", data?.access_token);handleCancel();setIsLogin(true);})
    .catch(err=>{message.error('Tai khoan khong chinh xac');handleCancel()})
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
}
  return (
    <div style={{height: "147px", position: 'fixed',width: "100vw", backgroundColor: "white", top: "0", zIndex: 3}}>
      <div style={{ height: "27px", backgroundColor: "#434343" }}></div>
      <div style={{ height: "85px", display: 'flex', flexDirection: "row", justifyContent: 'space-between',alignItems: 'center',padding: "0 50px" }}>
        <div style={{width: "370px"}}>
          <img src={logo} style={{width: "93px", height: "45px", cursor: 'pointer'}} onClick={()=>history.push("/")}/>
        </div>
        <div style={{color: 'red', fontWeight: 700, fontSize: 22}}>
          Bản demo xây dựng hệ gợi ý cho Yody
        </div>
      <div>
          <Search placeholder="Tim kiem nhanh" style={{ width: 210, borderRadius: "20",marginRight: "24px" }} />
          <img src={icon1} style={{ height: "30px", marginRight: "24px", cursor: 'pointer' }} onClick={()=>history.push('/cart')}/>
          <img src={icon3} style={{ height: "30px", marginRight: "24px" }}/>
          {
            isLogin?<Popover placement="bottom" content={content} title="Thông tin" trigger="click"><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ height: "30px", marginRight: "24px", cursor: 'pointer' }}/></Popover>:
          <img src={icon2} style={{ height: "30px", marginRight: "24px", cursor: 'pointer' }}  onClick={showModal}/>
          }
      </div>
      </div>
      <div style={{ height: "35px", borderBottom: "1px solid #E7E7E7",borderTop:"1px solid #E7E7E7",  display: "flex",flexDirection: "row",justifyContent: 'center'}}>
        <Button ghost style={{color: 'black'}}>NAM</Button>
        <Button ghost style={{color: 'black'}}>NỮ</Button>
        <Button ghost style={{color: 'black'}}>TRẺ EM </Button>
        <Button ghost style={{color: 'black'}}>POLO YODY</Button>
        <Button ghost style={{color: 'black'}}>BỘ SƯU TẬP</Button>
        <Button ghost style={{color: 'black'}}>YODY LOVE</Button>
        <Button ghost style={{color: 'black'}}>ĐỒNG PHỤC</Button>
      </div>
      <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Row >
          <Col span={7} style={{borderRight: '1px solid #A4A4A4'}}>
              <img src={logo} style={{width: "100px", marginLeft: 20, marginTop: 30}}/>
          </Col>
          <Col span={16}>
            <Login />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default NavBar;
