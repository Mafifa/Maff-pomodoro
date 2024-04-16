import React from 'react'

export function Header ({ pomodoros, descansos, descansosLargos }) {
  return (
    <nav className='flex items-center justify-center'>
      <div className='gap-x-3 mt-4'>
        <span className='mx-2 p-2 border border-white border-solid rounded-lg'>
          <span className='font-bold'>{pomodoros}</span>
          Pomodoros
        </span>
        <span className='mx-2 p-2 border border-white border-solid rounded-lg'>
          <span className='font-bold'>{descansos}</span>
          Descansos
        </span>
        <span className='mx-2 p-2 border border-white border-solid rounded-lg'>
          <span className='font-bold'>{descansosLargos}</span>
          Descansos Largos
        </span>
      </div>
    </nav>
  )
}
