import {INCREMENT, DECREMENT, CHANGE_THEME, DISABLE_BUTTONS, ENABLE_BUTTONS} from './type';

export function increment() {
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}
export function disableButtons() {
    return {
        type: DISABLE_BUTTONS
    }
}
export function enableButtons() {
    return {
        type: ENABLE_BUTTONS
    }
}
export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}
export function asyncIncrement() {
    return function(dispatch) {
        dispatch(disableButtons());
        setTimeout(() => {
            dispatch(increment()); // Возвращаем объект из строки 4.
            dispatch(enableButtons());
        }, 1000);
    }
}