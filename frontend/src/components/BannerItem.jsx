import React from 'react'
import banner from '../image/banner.png'
import banner1 from '../image/banner1.png'
import banner2 from '../image/banner2.png'

export default function BannerItem(props) {
  return (
    <div>
      {
        props.size === "1"?
          <div style={{height: "511px", backgroundColor: "#B4B4B4"}}>
          <img src={banner} style={{width: "100%", height: "511px", objectFit: 'cover'}}/>
        </div>:
        <div style={{display: 'flex',flexDirection: 'row',width: "100%"}}>
            <div style={{height: "511px", backgroundColor: "#B4B4B4"}}>
          <img src={banner1} style={{width: "100%", height: "511px",objectFit: 'cover'}}/>
        </div>
        <div style={{height: "511px", backgroundColor: "#B4B4B4"}}>
          <img src={banner2} style={{width: "100%", height: "511px",objectFit: 'cover'}}/>
        </div>
        </div>
      }
    </div>
  )
}
