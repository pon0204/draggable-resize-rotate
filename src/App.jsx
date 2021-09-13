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
        edges-left='#resize_upperLeft,#resize_lowerLeft'
        edges-right='#resize_upperRight,#resize_lowerRight'
        edges-top='#resize_upperLeft,#resize_upperRight'
        edges-bottom='#resize_lowerRight,#resize_lowerLeft'
        >
        {interact.isEnabled &&
        <>
          <div className={styles.resize} id='resize_upperLeft' style={{...interact.styleResize}}>左上</div>
          <div className={styles.resize} id='resize_upperRight' style={{...interact.styleResize}}>右上</div>
          <div className={styles.resize} id='resize_lowerLeft' style={{...interact.styleResize}}>左下</div>
          <div className={styles.resize} id='resize_lowerRight' style={{...interact.styleResize}}>右下</div>
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
