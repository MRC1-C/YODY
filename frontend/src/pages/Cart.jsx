import React, { useState } from 'react'
import { Row, Col, Space, Button } from 'antd'
import ItemHistory from 'components/ItemHistory'
import { DataGioHang } from 'mockData'
import { useStore } from 'hooks/useStore'

export default function Cart() {
  const arrItems = useStore(state=>state.arrItems)
  return (
    <div style={{margin: "0px 49px"}}>
      <div style={{height: "150px"}}></div>
        <Row>
            <Col span={18}>
                  <h1>Áp dụng thuật toán tối ưu giỏ hàng</h1>
                  {
                    DataGioHang.map((e,index)=>
                      <ItemHistory cart key={index}  width="220px" height="303px" name={e.name} image_url={e.url} price="30000" />                    )
                  }
            </Col>
            <Col span={6} style={{position: 'fixed',height: '900px',right: 20,border: '1px solid gray', height: 500, padding: 30,width: 500,borderRadius: 10,backgroundColor: '#f4f4f4'}}>
              <h1 style={{fontSize: '30px', fontWeight: '600'}}>Tóm tắt đơn hàng</h1>
              <div style={{ padding: 20}}>
                <h2>Tạm tính     {arrItems.length*30000}</h2>
                <h2>Khuyến mãi     0</h2> 
                <h2>Tổng cộng     {arrItems.length*30000}</h2>
                <Button type='primary' block style={{fontSize: 30, height: 60, marginTop: 20, backgroundColor: "#FCAF17", marginTop: 100}}>Đặt hàng</Button>
              </div>
            </Col>
        </Row>
    </div>
  )
}
