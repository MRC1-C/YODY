import React, {useEffect,useState} from 'react'
import {Row, Col, Button, Rate} from 'antd'
import { Image, Avatar,Space,InputNumber,Spin } from 'antd';
import Item from 'components/Item';
import CommentItem from 'components/CommentItem';
import { useParams } from 'react-router-dom';
import { postRequest } from 'hooks/api';

export default function Product() {
    const [suggest,setSuggest] = useState([])
    const [item,setItem] = useState([])
    const [loading, setLoading] = useState(false)
  let {id} = useParams()
  useEffect(()=>{
    const call = async()=>{
        await postRequest('/getDataItem',{"id": id})
        .then(data=>setSuggest(data))
        .catch(err=>console.log(err))
        setLoading(true)
        await postRequest('/getItem',{"id": id})
        .then(data=>setItem(data))
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false))
    }
    call()
  },[id])
  return (
      <div style={{margin: "18px 40px"}}>
          <div style={{height: "147px"}}></div>
          <div>
          <Row>
              <Col span={16}>
                    <Row>
                        <Col span={12} ><Spin spinning={loading}><Image width={580} height={580} style={{objectFit: 'cover'}} src={item[0]?item[0].image_url:''}/></Spin></Col>
                        <Col span={12}><Spin spinning={loading}><Image width={580} height={580} style={{objectFit: 'cover'}} src={item[0]?item[0].image_url:''}/></Spin></Col>
                    </Row>
                    <Spin spinning={loading}><Image width={1187} height={300} style={{objectFit: 'cover'}} src={item[0]?item[0].image_url:''}/></Spin>
                    <div>
                 <div style={{width: "97%", marginTop: 40, border: "1px solid gray", borderRadius: "20px", padding: 20}}>
                      <h2 style={{fontSize: 20, fontWeight: 600}}>Chi tiet san pham:</h2>
                      <p style={{fontSize: 20, fontWeight: 400}}>
                          {
                              item[0]?item[0].mota:'Công nghệ S.Cafe đẩy nhanh quá trình làm khô bằng cách lan tỏa và hấp thụ độ ẩm trên bề mặt của vải Cafe. Diện tích hấp thụ trên bề mặt tăng lên giúp phân tán làm bay hơi hiệu quả độ ẩm, mồ hôi khỏi vải.Công nghệ S.Cafe đẩy nhanh quá trình làm khô bằng cách lan tỏa và hấp thụ độ ẩm trên bề mặt của vải Cafe. Diện tích hấp thụ trên bề mặt tăng lên giúp phân tán làm bay hơi hiệu quả độ ẩm, mồ hôi khỏi vải.Công nghệ S.Cafe đẩy nhanh quá trình làm khô bằng cách lan tỏa và hấp thụ độ ẩm trên bề mặt của vải Cafe. Diện tích hấp thụ trên bề mặt tăng lên giúp phân tán làm bay hơi hiệu quả độ ẩm, mồ hôi khỏi vải.Công nghệ S.Cafe đẩy nhanh quá trình làm khô bằng cách lan tỏa và hấp thụ độ ẩm trên bề mặt của vải Cafe. Diện tích hấp thụ trên bề mặt tăng lên giúp phân tán làm bay hơi hiệu quả độ ẩm, mồ hôi khỏi vải.Công nghệ S.Cafe đẩy nhanh quá trình làm khô bằng cách lan tỏa và hấp thụ độ ẩm trên bề mặt của vải Cafe. Diện tích hấp thụ trên bề mặt tăng lên giúp phân tán làm bay hơi hiệu quả độ ẩm, mồ hôi khỏi vải.Công nghệ S.Cafe đẩy nhanh quá trình làm khô bằng cách lan tỏa và hấp thụ độ ẩm trên bề mặt của vải Cafe. Diện tích hấp thụ trên bề mặt tăng lên giúp phân tán làm bay hơi hiệu quả độ ẩm, mồ hôi khỏi vải.'
                          }
                      </p>
                  </div>
              <h2>Co the ban muon mua</h2>
              <div >

              <Space wrap >
                  {
                    suggest.map(e=>(
                        <Item key={e.id} id={e.id} image_url={e.image_url} mota={e.mota} name={e.name} price={e.price} width="255px" marginRight= "40px"/>
                    ))
                  }
              </Space>
              </div>
          </div>
              </Col>
              <Col span={8}>
                  <h2 style={{fontSize: 32, fontWeight: 600}}>{item[0]?item[0].name:'Áo Polo Nam Cafe Phối Nẹp Thấm Hút Mồ Hôi'}</h2>
                  <h1 style={{color: "#FCAF17"}}>289.000đ</h1>
                  <h4 style={{fontSize: 24, fontWeight: 500, marginTop: 60}}>Màu sắc: Trắng nâu</h4>
                  <div style={{margin: "30px 0"}}>
                      <Space>
                       <Avatar size={50} style={{backgroundColor: '#9D5932'}}></Avatar>
                       <Avatar size={50} style={{backgroundColor: '#D3D3D3'}}></Avatar>
                        <Avatar size={50} style={{backgroundColor: '#212641'}}></Avatar>
                         <Avatar size={50} style={{backgroundColor: '#F2F1F1', border: '1px solid gray'}}></Avatar>
                           <Avatar size={50} style={{backgroundColor: '#EFBE6B'}}></Avatar>
                       <Avatar size={50} style={{backgroundColor: '#9D5932'}}></Avatar>
                      </Space>
                  </div>
                  <h4 style={{fontSize: 24, fontWeight: 500, marginTop: 80}}>Kích thước:</h4>
                  <div>
                      <Space>
                      <Button size='large'>M</Button>
                      <Button size='large'>L</Button>
                      <Button size='large'>XL</Button>
                      <Button size='large'>2XL</Button>
                      <Button size='large'>3XL</Button>
                      <Button size='large'>4XL</Button>
    
                      </Space>
                  </div>
                  <h1 style={{marginTop: 30}}>SỐ LƯỢNG</h1>
                  <InputNumber min={1} max={10} defaultValue={1} />
                  <Button type='primary' block style={{fontSize: 30, height: 60, marginTop: 20, backgroundColor: "#FCAF17"}}>MUA NGAY
                  </Button>
                  <h1>BÀI ĐÁNH GIÁ</h1>
                  <h3>
                      Hãy là người đầu tiên xem qua Tất cả quyền truy cập
                  </h3>
                  <Rate defaultValue={4}/>
                      <CommentItem />
                      <CommentItem />
                  <div>
                  </div>
              </Col>
          </Row>
          </div>
          
         
      </div>
  )
}
