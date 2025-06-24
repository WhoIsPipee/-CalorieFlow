import Form from "./components/Form"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activityReducers"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"


function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  //Dejar en localStorage
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])
  return (
    <>
      {/* HEADER */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <h1 className="text-xl font-semibold tracking-tight text-slate-800">
            CalorieFlow
          </h1>
        </div>

        <button
          className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-all disabled:opacity-30"
          disabled={!canRestartApp()}
          onClick={() => dispatch({ type: 'restart-app' })}
        >
          Reiniciar
        </button>
      </header>

      {/* FORM */}
      <section className="bg-gradient-to-br from-white to-slate-100 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Agrega tu actividad 📝</h2>
          <p className="text-slate-500">Registra tus comidas o ejercicios para mantener el control calórico</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      {/* TRACKER */}
      <section className="bg-gradient-to-r from-indigo-900 via-slate-900 to-black py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      {/* ACTIVITY LIST */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-slate-800">📋 Actividades Registradas</h2>
            <p className="text-slate-500 mt-2">
              Visualiza y gestiona tus entradas calóricas de forma fácil y visual.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-8 transition-all">
            <ActivityList activities={state.activities} dispatch={dispatch} />
          </div>
        </div>
      </section>
    </>


  )
}

export default App
