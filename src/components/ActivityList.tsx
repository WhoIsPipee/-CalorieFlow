import type { Activity } from "../types"
import { categories } from "../data/categories"
import React, { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { ActivityActions } from "../reducers/activityReducers"

type ActivityListProps = {
  activities: Activity[]
  dispatch: React.Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

  const categoryName = useMemo(() =>
    (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''),
    [activities])

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-800 text-center my-14 tracking-wide">
        Registro Diario 🧾
      </h2>

      {isEmptyActivities ? (
        <p className="text-center text-slate-400 text-lg italic">No has agregado actividades aún...</p>
      ) : (
        <div className="grid gap-8 px-4 max-w-5xl mx-auto md:grid-cols-2 lg:grid-cols-3">
          {activities.map((Activity) => {
            const isFood = Activity.category === 1;
            const Icon = isFood ? "🍽️" : "🏃🏻";

            return (
              <div
                key={Activity.id}
                className="group relative bg-white/50 border border-slate-200 backdrop-blur-md p-6 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Icono flotante */}
                <div className="absolute -top-5 -left-5 bg-white rounded-full p-3 shadow-md text-3xl select-none">
                  {Icon}
                </div>

                {/* Info principal */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-1 tracking-tight">
                    {Activity.name}
                  </h3>
                  <p
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${isFood ? 'bg-sky-200 text-sky-800' : 'bg-pink-200 text-pink-800'
                      }`}
                  >
                    {categoryName(+Activity.category)}
                  </p>
                </div>

                {/* Calorías */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-bold text-emerald-500">
                    {Activity.calories}
                    <span className="ml-1 text-base text-slate-500 font-medium">cal</span>
                  </p>

                  {/* Acciones */}
                  <div className="flex gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => dispatch({ type: 'set-ActiveId', payload: { id: Activity.id } })}
                      className="hover:text-sky-500 transition-colors"
                      aria-label="Editar"
                    >
                      <PencilSquareIcon className="h-6 w-6 text-slate-700" />
                    </button>

                    <button
                      onClick={() => dispatch({ type: 'delete-Activity', payload: { id: Activity.id } })}
                      className="hover:text-red-500 transition-colors"
                      aria-label="Eliminar"
                    >
                      <XCircleIcon className="h-6 w-6 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>


  )

}

