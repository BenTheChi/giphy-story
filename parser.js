let body = "Truman pulls the top over his head. As he does so, a closer\nshot focuses on the manufacturer's name.\nMERYL\nI thought you could wear them when\nyou do your exercises.\n(afterthought)\nPre-shrunk. And they breathe.\nEXT. TRUMAN'S HOUSE. DAY.\nWearing a business suit, briefcase in hand, TRUMAN emerges\nfrom his pleasant, Victorian-inspired, picket-fenced house\ninto an idyllic suburban street of similarly picturesque\nhomes. A neighbor, SPENCER, is taking in trashcans,\nwhistling a tune. Spencer breaks off abruptly as Truman\napproaches his car. His license plate reads, 'Seahaven - A\nA Nice Place To Live'.\nSPENCER\nMorning, Truman.\nTRUMAN\nMorning, Spencer. And in case I don't\nsee you, good afternoon, good evening\nand good night.\nSpencer's dog, PLUTO, bounds happily over to Truman.\nTRUMAN\n(petting the dog)\nHey, Pluto.\nTruman exchanges a polite nod with the WASHINGTON's, an\nAfrican-American family across the street. MR. WASHINGTON\nis farewelled by his WIFE and CHILD.\nTruman is about to climb into his car when he is distracted\nby a high-pitched whistling sound. Suddenly, a large\nspherical glass object falls from the sky and lands with a\ndeafening crash on the street, several yards from his car.\nThe startled Truman looks to Spencer but he has abruptly\ndisappeared inside his house with Pluto. Mrs. Washington and\nWashington Junior have also made themselves scarce.\nTruman investigates. Amidst a sea of shattered glass are the\nremains of a light mechanism.\nHe looks around him but the street is deserted. He checks\nthat all the surrounding street lights are accounted for,\neven though the fallen fixture is far larger. He looks up\ninto the sky but there is no plane in sight. With some\n"
body = body.replace(/\(/g,".(")
body = body.replace(/\)/g,").")
body = body.replace(/\n/g, ".")
body = body.replace(/\!/g,"!.")
body = body.replace(/\?/g,"?.")
let sections = body.split(/[.,]/)

for(let i=0; i<sections.length; i++){
    let section = sections[i]
    section = section.trim()
    if(section.length < 1 || section.includes("INT") || section.includes("EXT")){
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

console.log(sections)