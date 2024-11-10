let skorPemain, skorSaatIni, pemainAktif, permainanBerjalan;

const mulaiPermainan = () => {
  skorPemain = [0, 0];
  skorSaatIni = 0;
  pemainAktif = 0;
  permainanBerjalan = true;

  document.getElementById("score-0").textContent = '0';
  document.getElementById("score-1").textContent = '0';
  document.getElementById("current-0").textContent = '0';
  document.getElementById("current-1").textContent = '0';
  document.querySelector(".dice").classList.add("hidden");

  document.querySelector("#section-0").classList.add("player-active");
  document.querySelector("#section-1").classList.remove("player-active");
  document.querySelector("#section-0").classList.remove("player-winner");
  document.querySelector("#section-1").classList.remove("player-winner");
  document.querySelector(".giliran-main").value = "Giliran: Pemain 1";
};

const gantiPemain = () => {
  document.getElementById(`current-${pemainAktif}`).textContent = '0';
  skorSaatIni = 0;
  pemainAktif = pemainAktif === 0 ? 1 : 0;

  document.getElementById("section-0").classList.toggle("player-active");
  document.getElementById("section-1").classList.toggle("player-active");

  document.querySelector(".giliran-main").value = `Giliran: Pemain ${pemainAktif + 1}`;
};

document.getElementById("btn-putar").addEventListener("click", () => {
  if (permainanBerjalan) {
    const angkaDadu = Math.trunc(Math.random() * 6) + 1;

    const elemenDadu = document.querySelector(".dice");
    elemenDadu.classList.remove("hidden");
    elemenDadu.src = `./images/dadu-${angkaDadu}.png`;

    if (angkaDadu !== 1) {
      skorSaatIni += angkaDadu;
      document.getElementById(`current-${pemainAktif}`).textContent = skorSaatIni;
    } else {
      skorSaatIni = 0;
      document.getElementById(`current-${pemainAktif}`).textContent = skorSaatIni;
      gantiPemain();
    }
  }
});

document.getElementById("btn-tahan").addEventListener("click", () => {
  if (permainanBerjalan) {
    skorPemain[pemainAktif] += skorSaatIni;
    document.getElementById(`score-${pemainAktif}`).textContent = skorPemain[pemainAktif];

    if (skorPemain[pemainAktif] >= 100) {
      permainanBerjalan = false;
      document.querySelector(".giliran-main").value = `Pemain ${pemainAktif + 1} Menang!`;
      document.querySelector(".dice").classList.add("hidden");
      document.getElementById(`section-${pemainAktif}`).classList.add("player-winner");
    } else {
      skorSaatIni = 0;
      document.getElementById(`current-${pemainAktif}`).textContent = skorSaatIni;
      gantiPemain();
    }
  }
});

document.getElementById("btn-baru").addEventListener("click", mulaiPermainan);
mulaiPermainan();