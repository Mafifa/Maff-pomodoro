import React from 'react'
import '../assets/Button.css'

function StartPause (isActive) {
  return (
    <button>
      {isActive ? '⏸' : '▶'}
    </button>
  )
}

export default StartPause
