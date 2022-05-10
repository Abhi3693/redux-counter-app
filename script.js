let counter = document.querySelector('.counter');
let increment = document.querySelector('.inc');
let decrement = document.querySelector('.dec');
let reset = document.querySelector('.reset');
let step = document.querySelectorAll('.step');
let value = document.querySelectorAll('.value');

let store = Redux.createStore(reducer);
let stepValue = 1;
let maxValue = Infinity;

increment.addEventListener('click', () => {
  store.dispatch({ type: 'increment', stepValue });
});

decrement.addEventListener('click', () => {
  store.dispatch({ type: 'decrement', stepValue });
});

reset.addEventListener('click', () => {
  store.dispatch({ type: 'reset' });
});

function addClass(msg) {
  step.forEach((s) => {
    s.classList.remove('active');
    if (s.innerText == stepValue) {
      s.classList.add('active');
    }
  });

  value.forEach((s) => {
    s.classList.remove('active');
    if (s.innerText == maxValue) {
      s.classList.add('active');
    }
  });
}

step.forEach((s) => {
  s.addEventListener('click', (event) => {
    stepValue = Number(event.target.innerText);
    addClass();
  });
});

value.forEach((s) => {
  s.addEventListener('click', (event) => {
    maxValue = Number(event.target.innerText);
    addClass();
  });
});

store.subscribe(() => {
  counter.innerText = store.getState();
});

function reducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      if (state + (action.stepValue || 1) <= maxValue) {
        return state + (action.stepValue || 1);
      }
      alert(`Can not Exceed max value ${maxValue}`);
      maxValue = Infinity;
      stepValue = 1;
      addClass();
      return 0;

      break;
    case 'decrement':
      return state - (action.stepValue || 1);
      break;
    case 'reset':
      maxValue = Infinity;
      stepValue = 1;
      addClass();
      return 0;
      break;
    default:
      return state;
      break;
  }
}
