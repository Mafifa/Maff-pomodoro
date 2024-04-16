/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Container } from './Container'
import { Header } from './Header'
import Restart from '../assets/icos/restart.svg'
import Pause from '../assets/icos/pause.svg'
import Start from '../assets/icos/start.svg'
import '../assets/Button.css'
import '../assets/Popular.css'
import '../assets/Medio.css'
import '../assets/Largo.css'

function StartImage () {
  return (
    <img src={Start} alt='Start' />
  )
}

function PauseImage () {
  return (
    <img src={Pause} alt='Pause' />
  )
}
function Timer ({ isOverlay }) {
  const [isActive, setIsActive] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [tipo, setTipo] = useState('pomodoro') // pomodoro - descanso - descansoLargo
  const [ciclosCompletados, setCiclosCompletados] = useState(0)
  const [descansosLargosTime, setDescansosLargosTime] = useState()
  const [descansosTime, setDescansosTime] = useState()
  const [pomodorosTime, setPomodorosTime] = useState()
  const [descansosLargos, setDescansosLargos] = useState(0)
  const [descansos, setDescansos] = useState(0)
  const [pomodoros, setPomodoros] = useState(0)

  let intervalID

  // Recuperar objetos de elemento datos  => Esto lo dejare para despues
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const fields = Object.fromEntries(new window.FormData(event.target))
  //   console.log(fields)
  // }

  // Reiniciar cronometro [Reset timer] -> TODO NO FUNCIONA [DO NOT WORKS]
  const restart = () => {
    setIsActive(false)
    clearInterval(intervalID)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
    setDescansosLargosTime(0)
    setDescansosTime(0)
    setPomodorosTime(0)
  }

  // Cuenta regresiva
  useEffect(() => {
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
              setTipo('pomodoro') // Cambia al tipo "pomodoro" después de un descanso largo
            }

            // Reiniciar el temporizador al inicio de cada tipo
            if (tipo === 'pomodoro') {
              setMinutes(pomodorosTime)
              setPomodoros(pod => pod + 1)
              setIsActive(true)
            } else if (tipo === 'descanso') {
              setMinutes(descansosTime)
              setDescansos(desc => desc + 1)
              setIsActive(true)
            } else if (tipo === 'descansoLargo') {
              setMinutes(descansosLargosTime)
              setDescansosLargos(descLargos => descLargos + 1)
              setIsActive(false) // Desactiva el temporizador después de un descanso largo
              clearInterval(intervalID)
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
    clearInterval(intervalID)
    setDescansosLargosTime(15)
    setDescansosTime(5)
    setPomodorosTime(20)
    setIsActive(true)
  }

  // Opciones predefinidas
  const largo = () => {
    clearInterval(intervalID)
    setDescansosLargosTime(25)
    setDescansosTime(10)
    setPomodorosTime(60)
    setIsActive(true)
  }

  // Opciones predefinidas
  const medio = () => {
    clearInterval(intervalID)
    setDescansosLargosTime(20)
    setDescansosTime(8)
    setPomodorosTime(40)
    setIsActive(true)
  }

  return (
    <main className={`${isOverlay ? 'bg-transparent' : 'bg-black/50'}`}>
      <Container>
        <div>
          <div className={isOverlay ? 'hidden' : 'visible'}>
            <Header descansos={descansos} descansosLargos={descansosLargos} pomodoros={pomodoros} />
          </div>
          <section className={`${isOverlay ? '' : 'pt-4'}`}>
            <p className={`text-center font-semibold text-8xl 
            ${tipo === 'pomodoro' ? 'text-orange-400/70' : tipo === 'descanso' ? 'text-white/50' : 'text-green-400/70'}
            `}
            >
              {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </p>
            <div>
              <div className={`flex ${isOverlay ? 'hidden' : 'visible'}`}>
                <button onClick={() => setIsActive(!isActive)} className='button mx-3'>{isActive ? (<PauseImage />) : (<StartImage />)}</button>
                <button type='reset' onClick={() => restart} className='button mx-3'>
                  <img src={Restart} alt='restart' />
                </button>
              </div>
            </div>
          </section>
          <section className={`mx-auto max-w-80 ${isOverlay ? 'hidden pt-7' : 'pt-7 visible'}`}>
            <div className='flex gap-x-16 items-center justify-center mb-3'>
              <button onClick={popular} className='Button'>
                <span className='Span'>Popular</span>
                <div className='top div' />
                <div className='left div' />
                <div className='bottom div' />
                <div className='right div' />
              </button>

              <button onClick={medio} className='ButtonM'>
                <span className='SpanM'>Medio</span>
                <div className='topM divM' />
                <div className='leftM divM' />
                <div className='bottomM divM' />
                <div className='rightM divM' />
              </button>

              <button onClick={largo} className='ButtonL'>
                <span className='SpanL'>Largo</span>
                <div className='topL divL' />
                <div className='leftL divL' />
                <div className='bottomL divL' />
                <div className='rightL divL' />
              </button>

              {/* SECCION DE PERSONALIZADO AQUI SE DEBEN DE MEJROAR MUCHAS COSAS, HACIENDO OTRAS */}
            </div>
            {/* <div className='flex justify-around'>
              <div>
                <p className='text-3xl font-bold'>Personalizado</p>
                <form onSubmit={handleSubmit} className='flex w-full flex-col max-w-sm'>
                  <label htmlFor='Pomodoro'>Pomodoro
                    <input className='mx-14' min={0} max={120} type='range' name='Pomodoro' id='Pomodoro' />
                  </label>
                  <label htmlFor='Descanso'>
                    Descanso
                    <input className='mx-14' min={0} max={60} type='range' name='Descanso' id='Descanso' />
                  </label>
                  <label htmlFor='DescansoLargo'>
                    Descanso Largos
                    <input className='mx-2' min={0} max={60} type='range' name='DescansoLargo' id='DescansoLargo' />
                  </label>
                  <button className='mx-2 p-2 border border-white border-solid rounded-lg' type='submit'>Comenzar</button>
                </form>
              </div>
              <div>
                <h2>aqui va algo ma</h2>
              </div>
            </div> */}
          </section>
        </div>
      </Container>
    </main>
  )
}

export default Timer
