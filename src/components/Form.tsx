import { useState, type Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions, ActivityState } from "../reducers/activityReducers"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}
export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-Activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white/40 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-slate-200 px-8 py-10 space-y-10 transition-all max-w-2xl mx-auto"
        >
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-slate-800">🧾 Nueva Entrada</h3>
                <p className="text-slate-500 text-sm mt-1">Agrega tu comida o ejercicio al registro de hoy</p>
            </div>

            {/* Input Grid */}
            <div className="grid gap-8 md:grid-cols-2">
                {/* Categoría */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-sm font-medium text-slate-600">
                        Categoría
                    </label>
                    <div className="relative">
                        <select
                            id="category"
                            value={activity.category}
                            onChange={handleChange}
                            className="appearance-none w-full px-4 py-3 rounded-xl bg-white text-slate-800 shadow-inner border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            ⏷
                        </div>
                    </div>
                </div>

                {/* Calorías */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="calories" className="text-sm font-medium text-slate-600">
                        Calorías
                    </label>
                    <div className="relative">
                        <input
                            id="calories"
                            type="number"
                            value={activity.calories === 0 ? '' : activity.calories}
                            onChange={handleChange}
                            placeholder="Ej. 300"
                            className="w-full px-4 py-3 rounded-xl bg-white text-slate-800 shadow-inner border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔥</span>
                    </div>
                </div>
            </div>

            {/* Actividad */}
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-600">
                    Nombre de la Actividad
                </label>
                <input
                    id="name"
                    type="text"
                    value={activity.name}
                    onChange={handleChange}
                    placeholder="Ej. Jugo de naranja, Bicicleta..."
                    className="w-full px-4 py-3 rounded-xl bg-white text-slate-800 shadow-inner border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
            </div>

            {/* Botón */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={!isValidActivity()}
                    className="
                        w-full py-3 bg-gradient-to-r from-pink-400 to-sky-400
                        text-white text-base font-bold rounded-xl uppercase
                        shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300
                        disabled:opacity-40
                    "
                >
                    {activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                </button>
            </div>
        </form>


    )
}
