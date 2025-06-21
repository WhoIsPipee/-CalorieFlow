import type { Activity } from "../types"

export type ActivityActions = 
{type : 'save-Activity', payload : {newActivity : Activity}} //Se ejecuta cuando se manda el formulario, payload es que tiene la informacion 

type ActivityState = {
    activities: Activity[]
}

export const initialState: ActivityState = {
    activities: []
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if(action.type === 'save-Activity') {
        //Este codigo maneja logica para update state
        console.log('desde el type de save-Activity' )
    }

    return state
}
