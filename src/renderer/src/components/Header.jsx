export function Header ({ pomodoros, descansos, descansosLargos }) {
  return (
    <nav className="flex justify-between mt-4">
      <h1 className="text-xl font-black">Mafifa Pomodoro</h1>
      <div className="gap-x-3">
        <span className="mx-2 p-2 border border-white border-solid rounded-lg">
          <span className="font-bold">{pomodoros}</span>
          Pomodoros
        </span>
        <span className="mx-2 p-2 border border-white border-solid rounded-lg">
          <span className="font-bold">{descansos}</span>
          Descansos
        </span>
        <span className="mx-2 p-2 border border-white border-solid rounded-lg">
          <span className="font-bold">{descansosLargos}</span>
          Descansos Largos
        </span>
      </div>

    </nav>
  )
}
