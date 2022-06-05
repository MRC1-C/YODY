import React from 'react'
import Item from './Item'
import Slider from "react-slick";


export default function (props) {
    function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray",borderRadius: 50,height: 50, width: 50,display: 'flex',alignItems: 'center',justifyContent: 'center'}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
     style={{ ...style, display: "block", background: "gray",borderRadius: 50,height: 50, width: 50,display: 'flex',alignItems: 'center',justifyContent: 'center',zIndex: 2}}
      onClick={onClick}
    />
  );
}
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
  return (
    <div>
        <h2 style={{fontSize: 28,fontWeight: 500, paddingTop: 30}}>Sản phẩm bạn có thể thích</h2>
        <div>
            <Slider {...settings}>
                {
                    props.data?props.data.map(e=><Item id={e.id} image_url={e.image_url} mota={e.mota} name={e.name} price={e.price}/>):<div>Loading</div>
                }
            </Slider>
        </div>
    </div>
  )
}
