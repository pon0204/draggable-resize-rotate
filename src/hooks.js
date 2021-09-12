import { useRef, useEffect, useState } from 'react'
import interact from 'interactjs'

export const useInteractJS = () => {

  const [_position,setPosition] = useState({
    x: 500,
    y: 100,
    width: 10,
    height: 10,
  })

  const [_origin,setOrigin] = useState({
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

  let { x, y, width, height } = _position
  let Left = '#resize_upperLeft,#resize_lowerLeft'
  let Right = '#resize_upperRight,#resize_lowerRight'
  let Top = '#resize_upperLeft,#resize_upperRight'
  let Bottom = '#resize_lowerRight,#resize_lowerLeft'

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
      edges: { left: Left, right: Right, bottom: Bottom, top: Top},

      onstart: (event) =>{
      },
      onmove: (event) => {
        const box = event.target
        const angle = box.getAttribute('data-angle');
        //  角度によって、リサイズする向きを変更

          width += event.deltaRect.width / 5
          height += event.deltaRect.height / 5
          width = 2  > width ? 2 : width
          height = 2  > height ? 2 : height
        setPosition({
          x,
          y,
          width,
          height,
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
      })
    }

    const dragOnMove = (event) => {
      const angle = getDragAngle(event);
      setAngle(angle)
    }
    
    const dragOnEnd = (event) => {
      const box = event.target.parentElement;
      box.setAttribute('data-angle', getDragAngle(event));
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
    transformOrigin: `${_origin.originX} ${_origin.originY}`
  },
  styleResize: {
    transform: 'scale(0.1,0.1)',
    // outline: '2px solid #4EA0EC',
    // backgroundColor:'#ffffff'
  },
  styleRotate: {
    transform: `scale(0.1,0.1)`,
    // transform: `scale(${_position.width / 100},${_position.height / 100})`,
    // outline: '2px solid #4EA0EC',
    // backgroundColor:'#ffffff',
  },
  isEnabled,
  enable: () => setEnable(true),
  disable: () => setEnable(false)
}
}