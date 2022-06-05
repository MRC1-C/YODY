import { Avatar } from 'antd'
import React from 'react'

export default function () {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{marginTop: 10, marginRight: 20}}>
            <Avatar >A</Avatar>
        </div>
        <div>
            <h2>Trania Wyman</h2>
            <h4>Hàng đẹp. Đúng màu đúng size đã đặt. Chất luôn thì khỏi bàn luôn. Lần thứ N mua hàng của shop vô cùng hài lòng luôn</h4>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0 40px 0 0'}}>
                <h4>13:23 15/04/2022</h4>
                <h4>Thích</h4>
                <h4>Gửi trả lời</h4>
            </div>
        </div>
    </div>
  )
}
