const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const caracters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag,className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disableCards = document.querySelectorAll('.disable-card');

    if(disableCards.length == 20){
        clearInterval(this.loop);
        alert(`Parabens, ${spanPlayer.innerHTML}! Seu tempo foi:${timer.innerHTML} `);
        window.location = '../index.html';
    } 
}

const checkCards = () => {
    const firsCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firsCharacter === secondCharacter){
        setTimeout(() => {
            firstCard.firstChild.classList.add('disable-card');
            secondCard.firstChild.classList.add('disable-card');

            firstCard = '';
            secondCard = '';

            checkEndGame();
        }, 500);
           
    }else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        },500);
    }
}

const revealCard = ({target}) => {
    console.log(target.classList);

    if(target.parentNode.className.includes('grid')){
        return;
        console.log('entrouuu');
    }

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === ''){

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    }else if(secondCard === ''){

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    
}

const creatCard = (character) => {
    const card = createElement('div' , 'card');
    const front = createElement('div' , 'face front');
    const back = createElement('div' , 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click' , revealCard);

    card.setAttribute('data-character' , character);

    return card;
}

const loadGame = () => {
    const duplicateCharacters = [ ...caracters,...caracters ];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);


    shuffledArray.forEach((caracter) => {
       const card = creatCard(caracter);
       grid.appendChild(card);
    });
}

const startTimer = () =>{
    this.loop = setInterval(()=>{
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    },1000);
}

window.onload = () =>{

    spanPlayer.innerHTML = localStorage.getItem('Player');
    startTimer();
    loadGame();
}
