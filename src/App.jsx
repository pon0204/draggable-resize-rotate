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
        ref={interact.ref}
        onMouseEnter={() => interact.enable()}
        className={styles.box}
        style={{
          ...interact.styleBox,
        }}
        >
        {interact.isEnabled &&
        <>
          <div className={styles.corner} id='resize_upperLeft'></div>
          <div className={styles.corner} id='resize_upperRight'></div>
          <div className={styles.corner} id='resize_lowerLeft'></div>
          <div className={styles.corner} id='resize_lowerRight'></div>
          <div className={styles.edge_left} id='resize_Left'></div>
          <div className={styles.edge_right} id='resize_Right'></div>
          <div className={styles.edge_top} id='resize_Top'></div>
          <div className={styles.edge_bottom} id='resize_Bottom'></div>
          <div className={styles.rotate} ref={interact.refRotate_1} ></div>
          <div className={styles.rotate} ref={interact.refRotate_2} ></div>
          <div className={styles.rotate} ref={interact.refRotate_3} ></div>
          <div className={styles.rotate} ref={interact.refRotate_4} ></div>
        </>
        }
      </div>  
    </div>
  )
}

export default App;
