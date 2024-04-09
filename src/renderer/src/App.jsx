import { useEffect, useState } from "react"
import { Container } from "./components/Container"
import { Header } from "./components/Header"
import './assets/Button.css'
import './assets/Popular.css'
import './assets/Medio.css'
import './assets/Largo.css'

function App () {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [descansos, setDescansos] = useState(0)
  const [pomodoros, setPomodoros] = useState(0)
  const [descansosLargos, setDescansosLargos] = useState(0)
  const [isActive, setIsActive] = useState(false)

  //Recuperar objetos de elemento datos
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = Object.fromEntries(new window.FormData(event.target))
    console.log(fields)
  }

  //Cuenta regresiva
  useEffect(() => {
    let intervalID

    if (isActive) {
      intervalID = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else {
          if (minutes === 0 && hours === 0) {
            //audio
            clearInterval(intervalID)
            setIsActive(false)
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
  }, [isActive, hours, minutes, seconds, pomodoros])

  //Reiniciar cronometro [Reset timer] -> TODO NO FUNCIONA [DO NOT WORKS]
  const restart = () => {
    setIsActive(false)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  //Opciones predefinidas
  const popular = () => {
    setMinutes(20)
    setIsActive(true)
  }

  return (
    <>
      <Container>
        <Header descansos={descansos} pomodoros={pomodoros} descansosLargos={descansosLargos} />
        <section className="py-20">
          <p className="text-center font-black text-8xl">
            {`
            ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}
            `}
          </p>
          <div>
            <button onClick={() => setIsActive(!isActive)} className="button">{isActive ? '⏸' : "▶"}</button>

            <button onClick={() => restart} className="mx-2 p-2 border border-white border-solid rounded-lg" type="button">🔁</button>
          </div>
        </section>
        <section className="grid grid-cols-2 bottom-0">
          <div className="flex flex-col max-w-52 gap-y-3">
            <button className="Button">
              <span className="Span">Popular</span>
              <div className="top div"></div>
              <div className="left div"></div>
              <div className="bottom div"></div>
              <div className="right div"></div>
            </button>

            <button className="ButtonM">
              <span className="SpanM">Medio</span>
              <div className="topM divM"></div>
              <div className="leftM divM"></div>
              <div className="bottomM divM"></div>
              <div className="rightM divM"></div>
            </button>

            <button className="ButtonL">
              <span className="SpanL">Largo</span>
              <div className="topL divL"></div>
              <div className="leftL divL"></div>
              <div className="bottomL divL"></div>
              <div className="rightL divL"></div>
            </button>

          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold">Personalizado</p>
            <form onSubmit={handleSubmit} className="flex w-full flex-col max-w-sm">
              <input min={0} max={120} type="range" name="Pomodoro" id="Pomodoro" />
              <input min={0} max={60} type="range" name="Descanso" id="Descanso" />
              <input min={0} max={60} type="range" name="DescansoLargo" id="DescansoLargo" />
              <button className="mx-2 p-2 border border-white border-solid rounded-lg" type="submit">Comenzar</button>
            </form>
          </div>
        </section>
      </Container >

    </>
  )
}

export default App
