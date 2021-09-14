import { useRef, useEffect, useState } from 'react'
import interact from 'interactjs'

export const useInteractJS = () => {
  const Left = '#resize_upperLeft,#resize_lowerLeft'
  const Right = '#resize_upperRight,#resize_lowerRight'
  const Top = '#resize_upperLeft,#resize_upperRight'
  const Bottom = '#resize_lowerRight,#resize_lowerLeft'

  const [_position,setPosition] = useState({
    x: 500,
    y: 100,
    width: 20,
    height: 20,
  })

  const [_origin,setOrigin] = useState({
    originX: 'center',
    originY: 'center'
  })

  const [_corner,setCorner] = useState({
    left: Left,
    right: Right,
    top: Top,
    bottom: Bottom
  })

  const [angle,setAngle] = useState(0)
  const [isEnabled, setEnable] = useState(false)

  const interactRef = useRef(null)
  const rotateBtn_1 = useRef(null)
  const rotateBtn_2 = useRef(null)
  const rotateBtn_3 = useRef(null)
  const rotateBtn_4 = useRef(null)
  

  let { x, y, width, height } = _position
  let { originX,originY} = _origin
  let {left,right,top,bottom} = _corner

  const enable = () => {
    // 並進 //
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
    // 拡大縮小 //
    .resizable({
      // リサイズする向きを角度によって変更
      edges: { 
        left:  left,
        right: right,
        top: top,
        bottom: bottom
      },
      // リサイズ開始時
      // 「処理の流れ】 リサイズの開始位置を取得 → 基準点を変更 → 基準点に合わせてポジションを修正
      onstart: (event) => {
        const box = event.target
        const corner = event.edges
        const rect = box.getBoundingClientRect();  
        const angle = box.getAttribute('data-angle');
        const clientWidth = width * 10
        const clientHight = height * 10
        const radian = angle * ( Math.PI / 180 );
        let heightLineHeight = clientHight * Math.sin(radian)
            heightLineHeight = heightLineHeight > 0 ? heightLineHeight : -(heightLineHeight)
        let heightLineWidth = clientWidth * Math.sin(radian)        
            heightLineWidth = heightLineWidth > 0 ? heightLineWidth : -(heightLineWidth)
        let baseLineHeight = clientHight * Math.cos(radian)
            baseLineHeight = baseLineHeight > 0 ? baseLineHeight : -(baseLineHeight)
        let baseLineWidth = clientWidth * Math.cos(radian)      
            baseLineWidth = baseLineWidth > 0 ? baseLineWidth : -(baseLineWidth)

        switch(true){
        case 45 > angle || angle >= 315:
          switch(true){
            case corner.right === true && corner.top === true :
              originX = 'left'
              originY = 'bottom'
              if(45 > angle){
                x = rect.x
                y = rect.y + rect.height - heightLineWidth - 10
              }else{
                x = rect.x + heightLineHeight
                y = rect.y + rect.height - 10
              }
              break;
            case corner.right === true && corner.bottom === true :
              originX = 'left'
              originY = 'top'
              if(45 > angle){
                x = rect.x + heightLineHeight
                y = rect.y
              }else{
                x = rect.x
                y = rect.y + heightLineWidth
              }
              break;
            case corner.left === true && corner.top === true :
              originX = 'right'
              originY = 'bottom'
              if(45 > angle){
                x = rect.x + rect.width - 10 - heightLineHeight
                y = rect.y + rect.height - 10
              }else{
                x = rect.x + rect.width - 10
                y = rect.y + rect.height - 10 - heightLineWidth
              }
              break;
            case corner.left === true && corner.bottom === true :
              originX = 'right'
              originY = 'top'
              if(45 > angle){
                x = rect.x + rect.width - 10
                y = rect.y + heightLineWidth
              }else{
                x = rect.x + rect.width - 10 - heightLineHeight
                y = rect.y
              }
              break;
              default:
          }  
        break;
        case 135 > angle && angle >= 45:
          switch(true){
          case corner.right === true && corner.top === true:
            originX = 'left'
            originY = 'top'
            if(135 > angle && angle >= 90){
              x = rect.x + rect.width
              y = rect.y + baseLineHeight
            }else{
              x = rect.x + rect.width - baseLineWidth 
              y = rect.y
            }
            break;
          case corner.right === true && corner.bottom === true :
            originX = 'right'
            originY = 'top'
            if(135 > angle && angle >= 90){
              x = rect.x + rect.width - 10 - baseLineWidth
              y = rect.y + rect.height
            }else{
              x = rect.x + rect.width - 10
              y = rect.y + rect.height - baseLineHeight
            }
            break;
          case corner.left === true && corner.top === true :
            originX = 'left'
            originY = 'bottom'
            if(135 > angle && angle >= 90){
              x = rect.x + baseLineWidth
              y = rect.y - 10
            }else{
              x = rect.x
              y = rect.y - 10 + baseLineHeight
            }
            break;
          case corner.left === true && corner.bottom === true :
            originX = 'right'
            originY = 'bottom'
            if(135 > angle && angle >= 90){
              x = rect.x - 10
              y = rect.y + rect.height - 10 - baseLineHeight
            }else{
              x = rect.x - 10 + baseLineWidth
              y = rect.y + rect.height - 10
            }
            break;
            default:
          }
        break
        case 225 > angle && angle >= 135:
          switch(true){
            case corner.right === true && corner.top === true :
              originX = 'right'
              originY = 'top'
              if(225 > angle && angle > 180){
                  x = rect.x - 10
                  y = rect.y + rect.height - heightLineWidth
              }else{
                x = rect.x - 10 + heightLineHeight
                y = rect.y + rect.height
              }
              break;
            case corner.right === true && corner.bottom === true :
              originX = 'right'
              originY = 'bottom'
              if(225 > angle && angle > 180){
                x = rect.x - 10 + heightLineHeight
                y = rect.y - 10
              }else{
                x = rect.x - 10
                y = rect.y - 10 + heightLineWidth
              }
              break;
            case corner.left === true && corner.top === true :
              originX = 'left'
              originY = 'top'
              if(225 > angle && angle > 180){
                x = rect.x + rect.width - heightLineHeight
                y = rect.y + rect.height
              }else{
                x = rect.x + rect.width
                y = rect.y + rect.height - heightLineWidth
              }
              break;
            case corner.left === true && corner.bottom === true :
              originX = 'left'
              originY = 'bottom'
              if(225 > angle && angle > 180){
                x = rect.x + rect.width 
                y = rect.y - 10 + heightLineWidth
              }else{
                x = rect.x + rect.width - heightLineHeight
                y = rect.y - 10
              }
              break;
              default:
          }
        break;
        case 315 > angle && angle >= 225:
          switch(true){
            case corner.right === true && corner.top === true :
              originX = 'right'
              originY = 'bottom'
              if(315 > angle && angle >= 275){
                x = rect.x + rect.width - 10
                y = rect.y - 10 + baseLineHeight
              }else{
                x = rect.x + rect.width - 10 - baseLineWidth 
                y = rect.y - 10
              }
              break;
            case corner.right === true && corner.bottom === true :
              originX = 'left'
              originY = 'bottom'
              if(315 > angle && angle >= 270){
                x = rect.x + rect.width - baseLineWidth
                y = rect.y + rect.height - 10
              }else{
                x = rect.x + rect.width
                y = rect.y + rect.height - 10 - baseLineHeight
              }
              break;
            case corner.left === true && corner.top === true :
              originX = 'right'
              originY = 'top'
              if(315 > angle && angle >= 275){
                x = rect.x - 10 + baseLineWidth
                y = rect.y
              }else{
                x = rect.x - 10
                y = rect.y + baseLineHeight
              }
              break;
            case corner.left === true && corner.bottom === true :
              originX = 'left'
              originY = 'top'
              if(315 > angle && angle >= 275){
                x = rect.x
                y = rect.y + rect.height - baseLineHeight
              }else{
                x = rect.x + baseLineWidth
                y = rect.y + rect.height
              }
              break;
              default:
            }
            break;
            default:
        }
        setOrigin({ 
          originX,
          originY
        })
        setPosition({
          width,
          height,
          x,
          y
        })
      }, 
      // リサイズ中の処理
      onmove: (event) => {
        const angle = event.target.getAttribute('data-angle');
        //  角度によって、リサイズする向きを変更
        switch(true){
          case 45 > angle || angle >= 315:
            width += event.deltaRect.width / 5
            height += event.deltaRect.height / 5
          break;
          case 135 > angle && angle >= 45:
            width += -(event.deltaRect.height) / 5
            height += -(event.deltaRect.width) / 5
          break;
          case 225 > angle && angle >= 135:
            width += event.deltaRect.width / 5
            height += event.deltaRect.height / 5
          break;
          case 315 > angle && angle >= 225:
            width += -(event.deltaRect.height) / 5
            height += -(event.deltaRect.width) / 5
          break;
          default:
        }
        // 最小サイズ
          width = 5 > width ? 5 : width
          height = 5  > height ? 5 : height
        setPosition({
          x,
          y,
          width,
          height,
        })
      },
    })

    // 回転処理 //
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
      const box = event.target.parentElement;
      const rect = box.getBoundingClientRect();      
      originX = 'center'
      originY = 'center'
      setOrigin({ 
        originX,
        originY
      })
    // 四角形の中心座標
      box.setAttribute('data-center-x', rect.left + rect.width / 2);
      box.setAttribute('data-center-y', rect.top + rect.height / 2);    
      // スタート時の角度保存
      box.setAttribute('data-angle', getDragAngle(event));
      // 基準点に合わせてポジションを修正
      x = rect.x - 5 + rect.width / 2 
      y = rect.y - 5 + rect.height / 2
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
    
    const dragOnEnd = async(event) => {
      const angle = getDragAngle(event);
      event.target.parentElement.setAttribute('data-angle', angle);
      // 角度によってコーナーの向きを変更
      switch(true){
        case 45 > angle || angle >= 315:
        setCorners(Left,Right,Top,Bottom)
        break;
        case 135 > angle && angle >= 45:
        setCorners(Top,Bottom,Right,Left)
        break;
        case 225 > angle && angle >= 135:
          setCorners(Right,Left,Bottom,Top)
        break;
        case 315 > angle && angle >= 225:
          setCorners(Bottom,Top,Left,Right)
        break;
        default:
          setCorners(Left,Right,Top,Bottom)
      }
      // interact.jsをリセット
      setEnable(false)
    }
    const getDragAngle = (event) => {
    const box = event.target.parentElement;
    const startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
    const center = {
      x: parseFloat(box.getAttribute('data-center-x')) || 0,
      y: parseFloat(box.getAttribute('data-center-y')) || 0
    };
    // radian計算
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
    const setCorners = (left,right,top,bottom) => {
      setCorner({
        left,
        right,
        top,
        bottom
      })
    }
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
    position: 'absolute',
    transformOrigin: `${_origin.originX} ${_origin.originY}`
  },
  styleResize: {
    transform: 'scale(0.1,0.1)',
  },
  styleRotate: {
    transform: `scale(0.1,0.1)`,
  },
  isEnabled,
  enable: () => setEnable(true),
  disable: () => setEnable(false)
}
}