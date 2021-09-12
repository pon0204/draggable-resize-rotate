import styles from './App.module.css'
import { useInteractJS } from './hooks'

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
          <div className={styles.resize} style={{...interact.styleResize}}></div>
          <div className={styles.resize} style={{...interact.styleResize}}></div>
          <div className={styles.resize} style={{...interact.styleResize}}></div>
          <div className={styles.resize} style={{...interact.styleResize}}></div>
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
