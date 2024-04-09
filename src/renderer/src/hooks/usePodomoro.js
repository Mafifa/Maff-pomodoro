import { useRef, useState, useEffect } from 'react'

export function usePodomoro ({ pomodorosTime, descansosTime, descansosLargosTime }) {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [tipo, setTipo] = useState('pomodoro') // pomodoro - descanso - descansoLargo
  const [ciclosCompletados, setCiclosCompletados] = useState(0)

  const POMODOROS_TIME = useRef(pomodorosTime)
  const DESCANSOS_TIME = useRef(descansosTime)
  const DESCANSOS_LARGOS_TIME = useRef(descansosLargosTime)

  const StartPause = () => {
    setIsActive(!isActive)
  }

  // Esto es el temporizador
  const Pomodoro = () => {
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
                setMinutes(POMODOROS_TIME)
                setIsActive(true)
              } else if (tipo === 'descanso') {
                setMinutes(DESCANSOS_TIME)
                setIsActive(true)
              } else if (tipo === 'descansoLargo') {
                setMinutes(DESCANSOS_LARGOS_TIME)
                setIsActive(true)
              }

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
  }

  return { hours, minutes, seconds, isActive, Pomodoro, StartPause }
}
