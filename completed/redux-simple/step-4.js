function createStore(reducer, initalState) {
  let state = initalState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);

    listeners.forEach(listener => listener());

    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);

      listeners.splice(index, 1);
    };
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}

function count(state, action) {
  switch (action.type) {
    case 'COUNT_UP':
      return state + 1;
    default:
      return state;
  }
}

var store = createStore(count, 0);

console.log(store.getState());

store.subscribe(() => {
  console.log(store.getState())
});

store.dispatch({
  type: 'COUNT_UP'
});


