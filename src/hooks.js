import { useRef, useEffect, useState } from 'react'
import interact from 'interactjs'

export const useInteractJS = () => {

  const [_position,setPosition] = useState({
    x: 500,
    y: 100,
    width: 5,
    height: 5,
    originX: 'center',
    originY: 'center'
  })

  const [angle,setAngle] = useState(0)
  const [isEnabled, setEnable] = useState(false)

  const interactRef = useRef(null)
  const rotateBtn_1 = useRef(null)
  const rotateBtn_2 = useRef(null)
  const rotateBtn_3 = useRef(null)
  const rotateBtn_4 = useRef(null)

  let { x, y, width, height,originX,originY} = _position

  const enable = () => {
    interact(interactRef.current)
    .draggable({
      onmove: (event) => {
      x += event.dx
      y += event.dy
      setPosition({
        width,
        height,
        x,
        y,
      })
      }
    })
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },
      onmove: (event) => {
        let box = event.target
        let angle = box.getAttribute('data-angle');
        // originX = 'left'
        // originY = 'top'
        //  角度によって、リサイズする向きを変更
        if( 45 > angle || 225 > angle && angle >= 136 || angle >= 316){
          console.log(event.deltaRect)
          console.log(width)
          width += event.deltaRect.width / 5
          height += event.deltaRect.height / 5
          


          // width = event.rect.width 
          // height = event.rect.height
          // leftの方向にずれ続ける
          // x += event.deltaRect.left
          // topの方向にずれ続ける
          // y += event.deltaRect.top
        }else{
          width += event.deltaRect.height / 5
          height += event.deltaRect.width / 5
          // width = event.rect.height
          // height = event.rect.width
          // そっちの方向にずれ続けるんや
          // console.log(event.deltaRect)
          // x += event.deltaRect.left
          // y += event.deltaRect.top
        }
        // top -
        // right +
        // bottom + 
        // left -
        setPosition({
          x,
          y,
          width,
          height,
          originX,
          originY
        })
      }
    })

    interact(rotateBtn_1.current)
    .draggable({
        onstart: (event) => dragOnStart(event),
        onmove: (event) => dragOnMove(event),
        onend: (event) => dragOnEnd(event),
      })
    interact(rotateBtn_2.current)
    .draggable({
        onstart: (event) => dragOnStart(event),
        onmove: (event) => dragOnMove(event),
        onend: (event) => dragOnEnd(event),
      })
    interact(rotateBtn_3.current)
    .draggable({
        onstart: (event) => dragOnStart(event),
        onmove: (event) => dragOnMove(event),
        onend: (event) => dragOnEnd(event),
      })
    interact(rotateBtn_4.current)
    .draggable({
        onstart: (event) => dragOnStart(event),
        onmove: (event) => dragOnMove(event),
        onend: (event) => dragOnEnd(event),
      })

    const dragOnStart = (event) =>{
      let box = event.target.parentElement;
      let rect = box.getBoundingClientRect();
    // 四角形の中心座標
      box.setAttribute('data-center-x', rect.left + rect.width / 2);
      box.setAttribute('data-center-y', rect.top + rect.height / 2);    
      // スタート時の角度保存
      box.setAttribute('data-angle', getDragAngle(event));
      // originX = 'center'
      // originY = 'center'
      setPosition({
        x,
        y,
        width,
        height,
        originX,
        originY
      })
    }

    const dragOnMove = (event) => {
      const angle = getDragAngle(event);
      setAngle(angle)
      
    }
    
    const dragOnEnd = (event) => {
      const box = event.target.parentElement;
      const rect = box.getBoundingClientRect();
      box.setAttribute('data-angle', getDragAngle(event));
      // x = rect.x
      // y = rect.y
      // console.log(rect)
      // console.log(y)
      // // width = rect.width
      // // height = rect.height
      // setPosition({
      //   x,
      //   y,
      //   width,
      //   height,
      // })
    }
  }

  const getDragAngle = (event) => {
  const box = event.target.parentElement;
  // 保存した角度を取得
  const startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
  // 座標を取得
  const center = {
    x: parseFloat(box.getAttribute('data-center-x')) || 0,
    y: parseFloat(box.getAttribute('data-center-y')) || 0
  };

  const radian = Math.atan2(center.y - event.clientY,
    center.x - event.clientX);
  // 角度に変換
  let degree = radian * ( 180 / Math.PI ) ;
  
  degree -= startAngle
  // 角度を+の値に変換
  degree = degree % 360.0
  if(0 > degree ){
    degree += 360
  }
return degree
}

  const disable = () => {
    interact(interactRef.current).unset()
  }

  useEffect(() => {
    if(isEnabled){
      enable()
    }else{
      disable()
    }
  }, [isEnabled])

  useEffect(()=>{
    return disable
  },[])

return {
  ref: interactRef,
  refRotate_1: rotateBtn_1,
  refRotate_2: rotateBtn_2,
  refRotate_3: rotateBtn_3,
  refRotate_4: rotateBtn_4 ,
  styleBox: {
    transform: `translate3D(${_position.x}px, ${_position.y}px, 0) rotate(${angle}deg) scale(${_position.width},${_position.height})`,
    // width: _position.width + 'px',
    // height: _position.height + 'px',
    // width: '100px',
    // height:'100px',
    position: 'absolute',
    transformOrigin: `${_position.originX} ${_position.originY}`
  },
  styleResize: {
    transform: `scale(${_position.width / 100},${_position.height / 100})`,
    // outline: '2px solid #4EA0EC',
    // backgroundColor:'#ffffff'
  },
  styleRotate: {
    transform: `scale(${_position.width / 100},${_position.height / 100})`,
  },
  isEnabled,
  enable: () => setEnable(true),
  disable: () => setEnable(false)
}
}