import React, { useEffect, useState } from 'react'
import { Container } from './components/Container'
import { Header } from './components/Header'
import { usePodomoro } from './hooks/usePodomoro'
import './assets/Button.css'
import './assets/Popular.css'
import './assets/Medio.css'
import './assets/Largo.css'

function App () {
  const [isActive, setIsActive] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [tipo, setTipo] = useState('pomodoro') // pomodoro - descanso - descansoLargo
  const [ciclosCompletados, setCiclosCompletados] = useState(0)
  const [descansosLargosTime, setDescansosLargosTime] = useState()
  const [descansosTime, setDescansosTime] = useState()
  const [pomodorosTime, setPomodorosTime] = useState()
  const { Pomodoro } = usePodomoro({ descansosLargosTime, descansosTime, pomodorosTime })

  // Recuperar objetos de elemento datos
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = Object.fromEntries(new window.FormData(event.target))
    console.log(fields)
  }

  // Reiniciar cronometro [Reset timer] -> TODO NO FUNCIONA [DO NOT WORKS]
  const restart = () => {

  }

  // Cuenta regresiva
  useEffect(() => {
    let intervalID

    if (isActive) {
      intervalID = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else {
          if (minutes === 0 && hours === 0) {
            // audio
            clearInterval(intervalID)
            setIsActive(false)
            // logica del pomodoro
            if (tipo === 'pomodoro') {
              if (ciclosCompletados < 3) {
                setTipo('descanso')
              } else {
                setTipo('descansoLargo')
                setCiclosCompletados(0)
              }
            } else if (tipo === 'descanso') {
              setTipo('pomodoro')
              setCiclosCompletados(prev => prev + 1)
            } else if (tipo === 'descansoLargo') {
              setTipo('pomodoro')
              setIsActive(false)
            }
            // Reiniciar el temporizador al inicio de cada tipo
            if (tipo === 'pomodoro') {
              setMinutes(pomodorosTime)
              setIsActive(true)
            } else if (tipo === 'descanso') {
              setMinutes(descansosTime)
              setIsActive(true)
            } else if (tipo === 'descansoLargo') {
              setMinutes(descansosLargosTime)
              setIsActive(true)
            }
          } else {
            if (minutes === 0) {
              setHours((hours) => hours - 1)
              setSeconds(59)
            } else {
              setMinutes((minutes) => minutes - 1)
            }
            setSeconds(59)
          }
        }
      }, 1000)
    } else {
      clearInterval(intervalID)
    }
    return () => clearInterval(intervalID)
  }, [isActive, hours, minutes, seconds])

  // Opciones predefinidas
  const popular = () => {
    setDescansosLargosTime(3)
    setDescansosTime(2)
    setPomodorosTime(1)
    setIsActive(true)
  }

  return (
    <main>
      <Container>
        <Header descansos={1} pomodoros={1} descansosLargos={1} />
        <section className='py-20'>
          <p className='text-center font-black text-8xl'>
            {`
            ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
            `}
          </p>
          <div>
            <button onClick={() => setIsActive(!isActive)} className='button'>{isActive ? '⏸' : '▶'}</button>

            <button onClick={() => restart} className='mx-2 p-2 border border-white border-solid rounded-lg' type='button'>🔁</button>
          </div>
        </section>
        <section className='grid grid-cols-2 bottom-0'>
          <div className='flex flex-col max-w-52 gap-y-3'>
            <button onClick={popular} className='Button'>
              <span className='Span'>Popular</span>
              <div className='top div' />
              <div className='left div' />
              <div className='bottom div' />
              <div className='right div' />
            </button>

            <button className='ButtonM'>
              <span className='SpanM'>Medio</span>
              <div className='topM divM' />
              <div className='leftM divM' />
              <div className='bottomM divM' />
              <div className='rightM divM' />
            </button>

            <button className='ButtonL'>
              <span className='SpanL'>Largo</span>
              <div className='topL divL' />
              <div className='leftL divL' />
              <div className='bottomL divL' />
              <div className='rightL divL' />
            </button>

          </div>
          <div className='flex flex-col items-center'>
            <p className='text-3xl font-bold'>Personalizado</p>
            <form onSubmit={handleSubmit} className='flex w-full flex-col max-w-sm'>
              <input min={0} max={120} type='range' name='Pomodoro' id='Pomodoro' />
              <input min={0} max={60} type='range' name='Descanso' id='Descanso' />
              <input min={0} max={60} type='range' name='DescansoLargo' id='DescansoLargo' />
              <button className='mx-2 p-2 border border-white border-solid rounded-lg' type='submit'>Comenzar</button>
            </form>
          </div>
        </section>
      </Container>

    </main>
  )
}

export default App
