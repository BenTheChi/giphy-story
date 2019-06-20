const {ipcRenderer} = require('electron');

const textArea = document.getElementById('story-text')
const storyGif = document.getElementById('story-gif')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const pageCounter = document.getElementById('pageCounter')

var title, slides, counter, max

ipcRenderer.on('story', (event, story) => {
    title = story.title
    slides = story.body
    counter = 0
    max = slides.length - 1

    storyGif.setAttribute('src', slides[0].embed_url)
    textArea.textContent = slides[0].keywords
    pageCounter.textContent = "Page " + counter+1
})

prevBtn.addEventListener('click', (event) => {
    if(counter > 0){
        counter--
        storyGif.setAttribute('src', slides[counter].embed_url)
        textArea.textContent = slides[counter].keywords
        pageCounter.textContent = counter+1
    }
})

nextBtn.addEventListener('click', (event) => {
    if(counter < max){
        counter++
        storyGif.setAttribute('src', slides[counter].embed_url)
        textArea.textContent = slides[counter].keywords
        pageCounter.textContent = counter+1
    }
})