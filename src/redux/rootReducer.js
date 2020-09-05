import { combineReducers } from 'redux';
import {INCREMENT, DECREMENT, ASYNC_INCREMENT, CHANGE_THEME, DISABLE_BUTTONS, ENABLE_BUTTONS} from '../type';
// reducers нужны для того, чтобы менять состояние. А далее паттерн observer обновляет компоненты на основании этих изменений.


function counterReducer(state = 0, action) {
    if(action.type === INCREMENT) {
        return state + 1;
    } else if(action.type === DECREMENT) {
        return state - 1;
    } else if(action.type === ASYNC_INCREMENT) {
        return state + 1;
    }
    return state;
}
const initialTheme = {
    value: 'ligth',
    disabled: false
}
function themeReducer(state = initialTheme, action) {
    switch(action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload}
        case ENABLE_BUTTONS:
            return {...state, disabled: false}
        case DISABLE_BUTTONS:
            return {...state, disabled: true}
        default: return state;
    }
}

export const rootReducer = combineReducers({ // для экспорта всех reducers используется combineReducers
    counter: counterReducer,
    theme: themeReducer
});