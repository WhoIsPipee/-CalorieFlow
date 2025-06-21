import { useState, type Dispatch } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions } from "../reducers/activityReducers"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

export default function Form({dispatch} : FormProps) {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    })


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }
        const isValidActivity = () =>{
            const {name , calories } = activity
            return name.trim() !== '' && calories > 0 
        }

        
        const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch({type: 'save-Activity', payload:{newActivity: activity}})
        }

    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg"
               onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3 ">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3 ">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input id="name" type="text" onChange={handleChange} value={activity.name} className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicletas" />
            </div>

            <div className="grid grid-cols-1 gap-3 ">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input id="calories" type="number" onChange={handleChange} value={activity.calories} className="border border-slate-300 p-2 rounded-lg" placeholder="Calorias Ej. 300 o 500" />
            </div>

            <input
                type="submit"
                className="
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    hover:from-indigo-700 hover:to-purple-700
                    w-full p-3 
                    font-semibold uppercase 
                    text-white 
                    cursor-pointer 
                    rounded-lg
                    shadow-lg hover:shadow-xl
                    transition-all duration-300
                    transform hover:scale-[1.02]
                    active:scale-100
                    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                    disabled:opacity-60
                "
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />

        </form>
    )
}
