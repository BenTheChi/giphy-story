const {remote, ipcRenderer} = require('electron');
const axios = require('axios')

const startBtn = document.getElementById('startBtn')
const cancelBtn = document.getElementById('cancelBtn')
const storyBody = document.getElementById('storyBody')
const storyTitle = document.getElementById('storyTitle')

const parser = (body) => {
    body = body.replace(/\(/g,".(")
    body = body.replace(/\)/g,").")
    body = body.replace(/\n/g, ".")
    body = body.replace(/\!/g,"!.")
    body = body.replace(/\?/g,"?.")
    let sections = body.split(/[.,]/)

    for(let i=0; i<sections.length; i++){
        let section = sections[i]
        section = section.trim()
        if(section.length < 1){
            sections.splice(i,1)
            continue;
        }
        if(section.toUpperCase() == section){
            continue;
        }

        let subSections = section.split(" ")
        let newSection = ""
        let changes = 0

        for(let x=0; x<subSections.length; x++){
            
            let subSection = subSections[x]
            
            if(subSection.toUpperCase() === subSection && subSection !== "I" && subSection !== "A"){
                if(newSection != ""){
                    sections.splice(i+changes,0,newSection) 
                    changes++
                    sections.splice(i+changes,0,subSection)
                    changes ++
                    newSection = ""
                }
                else{
                    sections.splice(i,0,subSection)
                    changes++
                }
            }
            else{
                newSection += subSection + " "
            }
        }

        if(changes != 0){
            i += changes
            sections.splice(i,1,newSection.trim())
        }
    }

    return sections
}

const buildSlides = async (sections) => {
    let promises = []

    for(let i=0; i < sections.length; i++){
        if(sections[i].trim() === ""){
            sections.splice(i,1)
            i--
            continue
        }

        let keywords = sections[i]

        // IMPLEMENT IMAGES HERE FOR ALL CAPS    
        promises.push(axios.get(`http://api.giphy.com/v1/gifs/search?q=${keywords.split(' ').join('+')}&api_key=G5mb3AgMEZjKJQoTTsZWoAbC841cxpzw&limit=1`)
            .then((response) => {
                return {"keywords": keywords.trim(),
                        "embed_url": response.data.data[0].embed_url}
            })
            .catch((error) => {
                console.log(error)
            }))
    }

    return await Promise.all(promises)
}

startBtn.addEventListener('click', async (event) => {
    let story = {}
    story.title = storyTitle.value
    buildSlides(parser(storyBody.value))
    .then((finalStory) => {
        story.body = finalStory
        ipcRenderer.send('load-story', story)
        
        let window = remote.getCurrentWindow();
        window.close();
    })
    .catch((error) => {
        console.log(error)
    })
})


cancelBtn.addEventListener('click', (event) => {
    let window = remote.getCurrentWindow();
    window.close();
})