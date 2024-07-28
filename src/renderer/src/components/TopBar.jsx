import React from 'react'
import '../assets/TopBar.css'
function TopBar () {
  const closeButton = () => {
    window.electron.ipcRenderer.send('close-window')
  }
  const maximizeButton = () => {
    window.electron.ipcRenderer.send('maximize-window')
  }
  const minizeButton = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  return (
    <div className='ui-titlebar'>
      <div className='ui-titletext'>Cronometro Pomodoro</div>

      <div className='ui-titlecontrols'>
        <button className='ui-btn minimize' onClick={minizeButton}>
          <svg x='0px' y='0px' viewBox='0 0 10.2 1'><rect x='0' y='50%' width='10.2' height='1' /></svg>
        </button>

        <button className='ui-btn maximize' onClick={maximizeButton}>
          <svg viewBox='0 0 10 10'><path d='M0,0v10h10V0H0z M9,9H1V1h8V9z' /></svg>
        </button>

        <button className='ui-btn close' onClick={closeButton}>
          <svg viewBox='0 0 10 10'><polygon points='10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1' /></svg>
        </button>
      </div>
    </div>
  )
}
export default TopBar
