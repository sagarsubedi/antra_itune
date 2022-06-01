
const inputField = document.querySelector('#search')
const searchButton = document.querySelector('#search-button')
const loadButton = document.querySelector('.load-more-btn')
let originalData
let currentAlbumsNumber = 5
const resultStat = document.createElement('h1')
resultStat.classList.add("result-h1")

// add eventhandler for enter key on inputField
inputField.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    searchButton.click()
  }
})


searchButton.addEventListener('click', function (e) {

  let artistName = inputField.value
  artistName = artistName.trim()

  if (artistName.length < 1) {
    alert("Please enter a search term")
    return
  }

  const url = `https://itunes.apple.com/search?term=${artistName  }&media=music&entity=album&attribute=artistTerm&limit=200`
  document.querySelector(".loader").style.display = "block"

  fetch(url)
    .then(response => response.json()).
    then(response => originalData = response)
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


  resultStat.innerHTML = `${currentAlbumsNumber}/${numberOfAlbums} albums found for "${inputField.value}"`
  document.querySelector('.results-stat').appendChild(resultStat)

  if (document.querySelector('.grid-container')) {
    document.querySelector('.grid-container').remove()
  }

  // build new one
  const gridContainer = document.createElement('div')
  gridContainer.classList.add("grid-container")
  document.querySelector('.results').appendChild(gridContainer)

    // dsisplaay first five albums
  for (let i = 0; i < 5; i++) { 
    
    const albumDiv = document.createElement('div')
    albumDiv.classList.add('album')


    const albumImage = document.createElement('img')
    albumImage.classList.add('album-image')
    albumImage.src = data[i].artworkUrl100
    albumDiv.appendChild(albumImage)

    const albumTitle = document.createElement('h5')
    albumTitle.classList.add('album-title')
    albumTitle.innerText = data[i].collectionName
    albumDiv.appendChild(albumTitle)

    
    document.querySelector('.grid-container').appendChild(albumDiv)
  }
  
  // make the load button visible
 loadButton.style.display = "block"
}

loadButton.addEventListener('click', function (e) {

  displayFiveAlbums(originalData.results)

})

function displayFiveAlbums(data) {
  let lastRender = false
  const currentStartIndex = currentAlbumsNumber - 1

  for (let i = currentStartIndex; i < currentStartIndex+5; i++) {
    if (i >= data.length) {
      break
    }
    const albumDiv = document.createElement('div')
    albumDiv.classList.add('album')


    const albumImage = document.createElement('img')
    albumImage.classList.add('album-image')
    albumImage.src = data[i].artworkUrl100
    albumDiv.appendChild(albumImage)

    const albumTitle = document.createElement('h5')
    albumTitle.classList.add('album-title')
    albumTitle.innerText = data[i].collectionName
    albumDiv.appendChild(albumTitle)

    
    document.querySelector('.grid-container').appendChild(albumDiv)
  }
  currentAlbumsNumber += 5
  if (currentAlbumsNumber >= data.length) { 
    loadButton.style.display = "none"
    currentAlbumsNumber = data.length
  }
  resultStat.innerHTML = `${currentAlbumsNumber}/${originalData.results.length} albums found for "${inputField.value}"`
}
