import styles from './App.module.css'
import { useInteractJS } from './useInteract'

const App = () => {
  const interact = useInteractJS()  

  const onClose = (e) =>{
    if(e.target === e.currentTarget){
      interact.disable()
    }
  }

  return (
    <div onClick={(e) => onClose(e)} style={{height: '100vh'}}>
      <div
        onMouseEnter={() => interact.enable()}
        ref={interact.ref}
        style={{
          ...interact.styleBox,
          // outline: interact.isEnabled && '2px solid #4EA0EC'
        }}
        className={styles.box}
        >
        {interact.isEnabled &&
        <>
          <div className={styles.corner} id='resize_upperLeft' style={{...interact.styleCorner}}></div>
          <div className={styles.corner} id='resize_upperRight' style={{...interact.styleCorner}}></div>
          <div className={styles.corner} id='resize_lowerLeft' style={{...interact.styleCorner}}></div>
          <div className={styles.corner} id='resize_lowerRight' style={{...interact.styleCorner}}></div>
          <div className={styles.edge_left} id='resize_Left' style={{...interact.styleEdge}}></div>
          <div className={styles.edge_right} id='resize_Right' style={{...interact.styleEdge}}></div>
          <div className={styles.edge_top} id='resize_Top' style={{...interact.styleEdge}}></div>
          <div className={styles.edge_bottom} id='resize_Bottom' style={{...interact.styleEdge}}></div>
          <div ref={interact.refRotate_1} className={styles.rotate} style={{...interact.styleRotate}}></div>
          <div ref={interact.refRotate_2} className={styles.rotate} style={{...interact.styleRotate}}></div>
          <div ref={interact.refRotate_3} className={styles.rotate} style={{...interact.styleRotate}}></div>
          <div ref={interact.refRotate_4} className={styles.rotate} style={{...interact.styleRotate}}></div>
        </>
        }
      </div>  
    </div>
  )
}

export default App;
