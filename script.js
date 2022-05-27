
const inputField = document.querySelector('#search')
const searchButton = document.querySelector('#search-button')

// add eventhandler for enter key on inputField
inputField.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    searchButton.click()
  }
})


searchButton.addEventListener('click', function (e) {
  const artistName = inputField.value
  const url = `https://itunes.apple.com/search?term=${artistName  }&media=music&entity=album&attribute=artistTerm&limit=200`
  document.querySelector(".loader").style.display = "block"

  fetch(url)
    .then(response => response.json())
    .then(response => {
      displayAlbums(response.results)
    })
})

function displayAlbums(data) {
  document.querySelector(".loader").style.display = "none"
  let numberOfAlbums = data.length

  // if there is previous stat, delete it
  const previousStat = document.querySelector('.result-h1')
  if (previousStat) {
    previousStat.remove()
  }

  const resultStat = document.createElement('h1')
  resultStat.classList.add("result-h1")
  resultStat.innerHTML = `${numberOfAlbums} albums found for "${inputField.value}"`
  document.querySelector('.results-stat').appendChild(resultStat)

  if (document.querySelector('.grid-container')) {
    document.querySelector('.grid-container').remove()
  }

  // build new one
  const gridContainer = document.createElement('div')
  gridContainer.classList.add("grid-container")
  document.querySelector('.results').appendChild(gridContainer)

  

  data.forEach(album => {

    const albumDiv = document.createElement('div')
    albumDiv.classList.add('album')


    const albumImage = document.createElement('img')
    albumImage.classList.add('album-image')
    albumImage.src = album.artworkUrl100
    albumDiv.appendChild(albumImage)

    const albumTitle = document.createElement('h5')
    albumTitle.classList.add('album-title')
    albumTitle.innerText = album.collectionName
    albumDiv.appendChild(albumTitle)

    
    document.querySelector('.grid-container').appendChild(albumDiv)
  })
}