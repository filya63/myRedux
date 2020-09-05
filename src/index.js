import './styles.css';
import {createStore, applyMiddleware} from 'redux'; //аналог локального createStore
import thunk from 'redux-thunk';
import {rootReducer} from './redux/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import {increment, decrement, asyncIncrement, changeTheme} from './actions';

const theme = document.querySelector('#theme'),
      addBtn = document.querySelector('#add'),
      subBtn = document.querySelector('#sub'),
      asyncBtn = document.querySelector('#async'),
      counter = document.querySelector('#counter');

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
    );
window.store = store;

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});
subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});
asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement());
});
theme.addEventListener('click', () => {
    let newTheme = document.body.classList.contains('dark') // тернарный оператор ? для легкости восприятия
    ? 'light'
    : 'dark';
    console.log(newTheme);
    store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    counter.textContent = state.counter;
    document.body.classList = state.theme.value;
    [addBtn, subBtn, asyncBtn, theme].forEach(btn => btn.disabled = state.theme.disabled)
});

store.dispatch({type: 'INIT_APPLICATION'}); // изначально диспатчим несуществующий type, чтобы указать первоначальное значение на страницу

// Redux не привязан ни к какому фреймворку.
// Состояние всего приложение - это единый объект, например store
// Actions это обычные объекты, которые мы можем диспатчить в сторе
// Состояние меняем через reducers
// reducer - мы всегда должны вернуть какой-то state и если что-то измененно меняем в возвращаемом объекте
// Изменения отрисовываются за счет паттерна observer