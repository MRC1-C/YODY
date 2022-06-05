import Banner from 'components/Banner'
import ListItems from 'components/ListItems'
import { getRequest } from 'hooks/api'
import React, {useState, useEffect} from 'react'
import {Space} from 'antd'
import Item from 'components/Item'
import { useStore } from "hooks/useStore";

export default function Home() {
  const [dataSuggest, setDataSuggest] = useState([])
  const [dataAll, setDataAll] = useState([])
  const isLogin = useStore(state=>state.isLogin)
  useEffect(()=>{
    let isLogin = localStorage.getItem("accessToken")
    const call = async ()=>{
      if(!isLogin){
        await getRequest('/getItemHome')
        .then(data => setDataSuggest(data))
        .catch(err=>console.log(err))
      }
      else{
        await getRequest('/getDataSuggest')
        .then(data => setDataSuggest(data))
        .catch(err=>console.log(err))
      }
      await getRequest('/getData')
      .then(data=>setDataAll(data))
      .catch(err=>console.log(err))
    }
    call()
  },[isLogin])
  return (
    <div style={{margin: "18px 49px"}}>
      <div style={{height: "150px"}}></div>
      <Banner size="1"/>
      <ListItems data={dataSuggest}/>
      <Banner size="2" />
      <h1>Sản phẩm</h1>
        <Space wrap>
          {
            dataAll?dataAll.map(e=><Item width="440px" id={e.id} image_url={e.image_url} mota={e.mota} name={e.name} price={e.price}/>):<div>Loading</div>
          }
        </Space>
      
    </div>
  )
}
