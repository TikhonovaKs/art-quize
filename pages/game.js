function addPlayerName() {
  const nameFromStorage = JSON.parse(localStorage.getItem('playerName'));
  console.log(nameFromStorage);

  const playerNameElement = document.querySelector('#player-name');

  playerNameElement.textContent = nameFromStorage;
}

addPlayerName();

let rounds;
let score = 0;
let currentRound = 0;
// ---------------------------------------------------------------------------------------------
// Get items/arrays from local storage and create a new varaible where this array will be stored
// ---------------------------------------------------------------------------------------------
let getStorageArray = localStorage.getItem('latestCardsList');
let retrievedArray = JSON.parse(getStorageArray);
let artworksArray = Object.values(retrievedArray);
let roundEl = document.querySelector('.title__artist');
let playerScore = document.querySelector('#player-score');
function getCards() {
  let chunks = [];
  let chunk = [];
  for (let i = 0; i < artworksArray.length; i++) {
    let artwork = artworksArray[i];
    chunk.push(artwork);
    if (chunk.length === 3) {
      chunks.push(chunk);
      chunk = [];
    }
  }
  return chunks;
}
function renderRound(round) {
  roundEl.innerHTML = '';
  let correctAnswerIndex = Math.floor(Math.random() * round.length);
  let correctAnswer = round[correctAnswerIndex];
  roundEl.innerHTML = `<h3>${correctAnswer.artist_title}</h3>`;
  let imageContainers = document.querySelectorAll('.card__image-container');
  imageContainers.forEach((container) => {
    container.innerHTML = '';
  });
  for (let i = 0; i < round.length; i++) {
    let artwork = round[i];
    let artworkEl = document.createElement('img');
    artworkEl.className = 'card__image';
    artworkEl.src = 'https://www.artic.edu/iiif/2/' + artwork.image_id + '/full/200,/0/default.jpg';
    imageContainers[i].appendChild(artworkEl);
    artworkEl.addEventListener('click', function () {
      if (i === correctAnswerIndex) {
        score += 1;
      }
      playerScore.innerHTML = score;
      currentRound += 1;
      renderRound(getCards()[currentRound]);
    });
  }
}
renderRound(getCards()[currentRound]);
