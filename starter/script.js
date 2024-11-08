let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document.getElementById("score-0");
  document.getElementById("score-1");
  document.getElementById("current-0");
  document.getElementById("current-1");
  document.querySelector(".dice").classList.add("hidden");

  document.querySelector("#section-0").classList.add("player-active");
  document.querySelector("#section-1").classList.remove("player-active");

  document.querySelector(".giliran-main").value = "Giliran: Pemain 1";
};

const switchPlayer = () => {
  document.getElementById(`current-${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.getElementById("section-0").classList.toggle("player-active");
  document.getElementById("section-1").classList.toggle("player-active");

  document.querySelector(".giliran-main").value = `Giliran: Pemain ${activePlayer + 1}`;
};

document.getElementById("btn-putar").addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    const diceEl = document.querySelector(".dice");
    diceEl.classList.remove("hidden");
    diceEl.src = `./images/dadu-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current-${activePlayer}`).textContent = currentScore;
      switchPlayer();
    }
  }
});

document.getElementById("btn-tahan").addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(".giliran-main").value = `Pemain ${activePlayer + 1} Menang!`;
      document.querySelector(".dice").classList.add("hidden");
    } else {
      currentScore = 0;
      document.getElementById(`current-${activePlayer}`).textContent = currentScore;
      switchPlayer();
    }
  }
});

document.getElementById("btn-baru").addEventListener("click", init);

init();