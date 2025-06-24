import type { Activity } from "../types"

export type ActivityActions =
    { type: 'save-Activity', payload: { newActivity: Activity } } | //Se ejecuta cuando se manda el formulario, payload es que tiene la informacion 
    { type: 'set-ActiveId', payload: { id: Activity['id'] } } |
    { type: 'delete-Activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' }

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if (action.type === 'save-Activity') {
        let updatedActivities: Activity[] = []
        if (state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if (action.type === 'set-ActiveId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-Activity') {
        return {
            ...state,
            activities: state.activities.filter(Activity => Activity.id !== action.payload.id)
        }
    }

    if (action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }
    return state
}
