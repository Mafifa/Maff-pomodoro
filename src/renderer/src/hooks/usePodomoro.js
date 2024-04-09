import {useState} from "react";
import { PODOMOROS, DESCANSOS, DESCANSOS_LARGOS } from "../utils";

export function usePodomoro({descansosLogrados}) {
  const [podomoros, setPodomoros] = useState(0)
  const [descansos, setDescansos] = useState(0)
  const [descansosLargos, setDescansosLargos] = useState(0)

  const counterPodomoros = () =>{
    setPodomoros((podomoros)=>podomoros + 1)
    if () {
      
    }
  }
  
}
