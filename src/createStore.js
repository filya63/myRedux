export default function createStore(rootReducer, initialState) {
    let state = rootReducer(initialState, { type: '__INIT__'});
    const subscribers = [];

    return {
        dispatch(action) {
            // action = {type == ''}
            state = rootReducer(state, action);
            subscribers.forEach(sub => sub()); // проходим массив со слушатялями и вызываем каждого, чтобы отрисовали новые компоненты
        },
        subscribe(callback) {
            subscribers.push(callback); // Добавляем слушателей в массив
        },
        getState() {
            return state;
        }
    }
}