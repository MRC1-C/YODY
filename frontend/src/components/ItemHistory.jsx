import { Switch,Modal } from 'antd';
import React,{useState} from 'react'
import { useHistory } from "react-router";
import { useStore } from 'hooks/useStore';
import { postRequest } from 'hooks/api';
export default function ItemHistory(props) {
  const [arrItems,addItems,removeItems] = useStore(state=>[state.arrItems,state.addItems,state.removeItems])
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [content,setContent] = useState([])
  const history = useHistory();
  const onChange = (e) => {
    if(e){
      addItems(props.name)
      postRequest('/suggest',{
        "items": [...arrItems,props.name]
      })
      .then(data=>{setContent(data.text);setIsModalVisible(true)})
      .catch(err=>console.log(err))
    }
    else{
      removeItems(props.name)
      let arr = arrItems.filter(e=>e!=props.name)
      if(arr.length!=0){
        postRequest('/suggest',{
        "items": arr
      })
      .then(data=>{setContent(data.text);setIsModalVisible(true)})
      .catch(err=>console.log(err))
      }
    }
  };
  return (
    <div style={{ padding: "10px",display: 'flex', flexDirection: 'row',paddingBottom: 40, borderBottom: "1px solid gray"}}>
      <img src={props.image_url} style={{objectFit: 'cover',height: '220px', width: "220px", marginRight: 38}} onClick={()=>history.push(`/${props.id}`)}/>
        <div>
            <h2 style={{fontSize: 30, fontWeight: 600}}>{props.name}</h2>
            <h3 style={{fontSize: 24, fontWeight: 500}}>Màu: trắng</h3>
            <h3 style={{fontSize: 24, fontWeight: 500}}>Kích thước: 2XL</h3>
            <h4 style={{color: '#FCAF17', fontSize: 24, fontWeight: 500}}>{props.price}đ</h4>
            {
              props.cart?
              <Switch onChange={onChange} />:<></>
            }
        </div>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <ul>
            {
              content?.map((e,index)=><li key={index}>{e}</li>)
            }
          </ul>
      </Modal>
    </div>
  )
}
