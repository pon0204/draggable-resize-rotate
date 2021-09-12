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
          ...interact.style,
          // outline: interact.isEnabled && '2px solid #4EA0EC'
        }}
        className={styles.box}
        >
        {interact.isEnabled &&
        <>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
          {/* <div className={styles.resize} style={{outline: '2px solid #4EA0EC',backgroundColor:'#ffffff'}}></div>
          <div className={styles.resize} style={{outline: '2px solid #4EA0EC',backgroundColor:'#ffffff'}}></div>
          <div className={styles.resize} style={{outline: '2px solid #4EA0EC',backgroundColor:'#ffffff'}}></div>
          <div className={styles.resize} style={{outline: '2px solid #4EA0EC',backgroundColor:'#ffffff'}}></div> */}
          <div ref={interact.refRotate} className={styles.rotate}></div>
          <div ref={interact.refRotate} className={styles.rotate}></div>
          <div ref={interact.refRotate} className={styles.rotate}></div>
          <div ref={interact.refRotate} className={styles.rotate}></div>
        </>
        }
      </div>  
    </div>
  )
}

export default App;
