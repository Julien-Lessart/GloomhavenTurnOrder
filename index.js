import data from './data/test.json' assert { type: 'json' };

const buttonStart = document.querySelector('#btn-start');
const buttonSort = document.querySelector('#btn-sort');
const buttonEndTour = document.querySelector('#btn-tour');
const buttonEnd = document.querySelector('#btn-end');
let tour = 1;
let name;
buttonStart.addEventListener('click', () => {
  const id = document.querySelector(`input[type='number']`).value - 1;
  name = data[id].decks.map((element) => {
    return { name: element.name };
  });

  name.push(
    { name: 'Intendent' },
    { name: 'Coeur de Roche' },
    { name: 'Maitre des Betes' },
    { name: 'Berserker' }
  );
  name = name.map((element) => Object.assign(element, { initiative: 99 }));
  const mainDiv = document.querySelector('#main-div');
  name.forEach((element) => {
    const monster = document.createElement('div');
    monster.setAttribute('class', 'line');
    const name = document.createElement('p');
    name.setAttribute('class', 'name');
    name.innerText = element.name;
    const initiative = document.createElement('input');
    initiative.setAttribute('type', 'number');
    initiative.setAttribute('class', 'number-initiative');
    const button = document.createElement('button');
    button.textContent = 'Tour';
    button.setAttribute('class', 'btn-initiative doesnt-played');
    monster.appendChild(name);
    monster.appendChild(initiative);
    monster.appendChild(button);
    mainDiv.appendChild(monster);
    button.addEventListener('click', () => {
      resetPlace(button);
    });
  });
  buttonSort.style.display = 'block';
  buttonEndTour.style.display = 'block';
  buttonEnd.style.display = 'block';
  const nbTour = document.createElement('p');
  nbTour.setAttribute('id', 'nb-tour');
  nbTour.innerText = tour;
  mainDiv.after(nbTour);
  document.querySelectorAll('div')[0].remove();
});

buttonSort.addEventListener('click', () => {
  const nameQuery = document.querySelectorAll('.line');
  const initiativeQuery = document.querySelectorAll('.number-initiative');
  const lastArray = [...name];
  for (let i = 0; i < name.length; i++) {
    const initiativeInput = parseInt(initiativeQuery[i].value) ?? 99;
    name[i].initiative > initiativeInput
      ? (name[i].initiative = initiativeInput)
      : null;
  }
  name.sort((a, b) => a.initiative - b.initiative);
  let arrayOrder = [];
  lastArray.forEach((element) => {
    arrayOrder.push(name.map((element) => element.name).indexOf(element.name));
  });
  console.log('lastArray', lastArray);
  console.log('name', name);
  console.log('arrayOrder', arrayOrder);
  arrayOrder.forEach((order, index) => {
    nameQuery[index].style.order = order;
  });
});

buttonEndTour.addEventListener('click', () => {
  const lineQuery = document.querySelectorAll('.line');
  const initiativeQuery = document.querySelectorAll('.number-initiative');
  const buttonQuery = document.querySelectorAll('.line button');
  tour++;
  const nbTour = document.querySelector('#nb-tour');
  nbTour.innerText = tour;

  for (let i = 0; i < name.length; i++) {
    initiativeQuery[i].value = null;
    lineQuery[i].style.order = 0;
    resetPlace(buttonQuery[i]);
  }
});
buttonEnd.addEventListener('click', () => {
  window.location.reload();
});

function resetPlace(line) {
  if (line.classList.contains('played')) {
    line.classList.replace('played', 'doesnt-played');
  }
}
