function playSound (e) {
  const audio = document.querySelector(`audio[data-key = "${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key = "${e.keyCode}"]`);
  if (!audio) return; //wont produce error if wrong key is pressed
  audio.currentTime = 0; // rewind audio to the start
  audio.play();
  key.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName != 'transform') return; 
  this.classList.remove('playing'); // removes the class of 'playing' after transition has ended
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
