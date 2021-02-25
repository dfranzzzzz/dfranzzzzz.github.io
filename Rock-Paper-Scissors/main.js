const buttons = document.querySelectorAll('button');
const round = document.getElementById('round');
const match = document.getElementById('match');
const yourScore = document.getElementById('userScore');
const oppScore = document.getElementById('compScore');

let userScore = 0;
let compScore = 0;

buttons.forEach(button => {
button.addEventListener('click', () => {
  playRound(button.id);
  })
});

function disableButton () {
  buttons.forEach(button => {
    button.disabled = true;
  })
}

function computerPick() {
  return Math.floor(Math.random() * (3) + 1);
}

function playRound(userHero) {
  const userImage = document.getElementsByClassName("userPick")[0];
  const compImage = document.getElementsByClassName("compPick")[0];

  if (userHero == 'warrior') {
    userPick = 1;
    userImage.src = "pics/knight.png";
  } else if (userHero == 'bowman') {
    userPick = 2;
    userImage.src = "pics/archer.png";
  } else if (userHero == 'mage') {
    userPick = 3;
    userImage.src = "pics/wizard.png";
  }

  let compPick = computerPick();

  if (compPick === 1) {
    compHero = 'warrior';
    compImage.src = "pics/knight.png";
  } else if (compPick === 2) {
    compHero = 'bowman';
    compImage.src = "pics/archer.png";
  } else if (compPick === 3) {
    compHero = 'mage';
    compImage.src = "pics/wizard.png";
  }

  decision = (((userPick - compPick % 3) + 3) % 3);

  if (decision === 2) {
    round.textContent = `You win! A ${userHero} beats a ${compHero}!`;
    userScore++;
  } else if (decision === 1) {
    round.textContent = `You lose! A ${compHero} beats a ${userHero}..`;
    compScore++;
  } else if (decision === 0) {
    round.textContent = `It's a tie! You both chose a ${userHero}`;
  }

  yourScore.textContent = `Your Score: ${userScore}`; 
  oppScore.textContent = `CPU Score: ${compScore}`;

  if (userScore == 5) {
  match.textContent = "You won the game!";  
  disableButton();  
  } else if (compScore == 5) {
  match.textContent = "You lose the game!! :(";
  disableButton();
  }
}