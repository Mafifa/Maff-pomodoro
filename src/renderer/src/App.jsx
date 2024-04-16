import React, { useEffect, useState } from 'react'
import Timer from './components/Timer'
import TopBar from './components/TopBar'

function App () {
  const [isOverlay, setIsOverlay] = useState(false)
  useEffect(() => {
    window.electron.ipcRenderer.on('overlay-mode', () => {
      setIsOverlay((prevState) => !prevState)
    })
    return () => {
      window.electron.ipcRenderer.removeAllListeners('overlay-mode')
    }
  }, [])

  return (
    <>
      <div className={isOverlay ? 'hidden' : 'visible'}>
        <TopBar />
      </div>
      <Timer isOverlay={isOverlay} />
    </>
  )
}

export default App
