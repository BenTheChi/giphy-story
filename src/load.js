const fs = require('fs')
const electron = require('electron');
const remote = electron.remote;

const startBtn = document.getElementById('startBtn')
const cancelBtn = document.getElementById('cancelBtn')

const filePath = document.getElementById('loadFile')


startBtn.addEventListener('click', (event) => {
    let story = fs.readFileSync('truman-show.json')
    story = JSON.parse(story)
    console.log(story)
})

cancelBtn.addEventListener('click', (event) => {
    console.log("Triggered")
    let window = remote.getCurrentWindow()
    window.close()
})
