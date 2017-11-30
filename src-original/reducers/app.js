import deepFreeze from 'deep-freeze-es6';

const setLocal = (state) => {
    window.localStorage.setItem('app', JSON.stringify(state));
}

function app(state = deepFreeze([]), action) {
    switch (action.type) {

    case 'LOGG_IN': {
        console.log(`User is ${action.bool ? 'logged in' : 'not logged in'}`);
        const newState = Object.assign({}, state, {
            logged_in: action.bool,
        });
        setLocal(newState);
        return newState;
    }
    default:
        return state;
    }
}
export default app;
