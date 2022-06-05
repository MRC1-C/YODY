import { Rate } from 'antd';
import React from 'react'
import { useHistory } from "react-router";
export default function Item(props) {
        const history = useHistory();
  return (
    <div style={{ padding: "10px", width: props.width?props.width :"450px", marginRight: props.marginRight?props.marginRight:0}}>
        <img src={props.image_url} style={{objectFit: 'cover',height: '392px', width: props.width?props.width :"425px", cursor: 'pointer'}} onClick={()=>history.push(`/${props.id}`)}/>
        <div>
            <h2>{props.name}</h2>
            <p style={{color: "#656565"}}>{props.price}đ</p>
            <Rate defaultValue={3.5}/>
        </div>
    </div>
  )
}
