import { useMemo } from "react"
import type { Activity } from "../types"
import { CalorieDisplay } from "./CalorieDisplay"


type CalorieTrackerProps = {
    activities: Activity[]

}
export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    //Contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-bold text-white text-center mb-10 tracking-wide">
                🔥 Tu resumen calórico de hoy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                    type="consumed"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Quemadas"
                    type="burned"
                />
                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                    type="net"
                />
            </div>
        </>

    )
}
