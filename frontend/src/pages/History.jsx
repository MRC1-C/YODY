import React,{useEffect, useState} from 'react'
import { Row, Col, Space } from 'antd'
import Item from 'components/Item'
import ItemHistory from 'components/ItemHistory'
import { getRequest } from 'hooks/api'
import { useStore } from 'hooks/useStore'

export default function History() {
  const [data,setData] = useState([])
  const [datasuggest, setDatasuggest] = useState([])
  const isLogin = useStore(state=>state.isLogin)
  useEffect(()=>{
    const call = async()=>{
      await getRequest('/getHistory')
      .then(data=>setData(data))
      .catch(err=>console.log(err))
      await getRequest('/getDataSuggest')
      .then(data=>setDatasuggest(data))
      .catch(err=>console.log(err))
    }
    call()
  },[isLogin])
  return (
    <div style={{margin: "0px 49px"}}>
      <div style={{height: "150px"}}></div>
        <Row>
            <Col span={18}>
                  <h1>LỊCH SỬ MUA HÀNG CỦA TÔI</h1>
                  {
                    data.map(e=>(
                      <ItemHistory id={e.id} key={e.id} width="220px" height="303px" name={e.name} image_url={e.image_url} price={e.price}/>
                    ))
                  }
    
            </Col>
            <Col span={6} style={{position: 'fixed', right: 20}}>
              <h1 style={{fontSize: '30px', fontWeight: '600'}}>Sản phẩm bạn có thể yêu thích</h1>
              <Space wrap style={{height: "800px", overflowY: 'auto'}}>
                {
                  datasuggest.map(e=>(
                    <Item key={e.id} id={e.id} width="220px" height="303px" name={e.name} image_url={e.image_url} price={e.price}/>
                  ))
                }
          
              </Space>
            </Col>
        </Row>
    </div>
  )
}
