const searchBtn=document.querySelector('.searchBox')
const input=document.querySelector('input')
const resultDiv=document.querySelector('.result')

//Sab se pehle hum ne API ko use kr k waha ka data lena ha
async function getWordData(word)
{
  const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  try
  {
    const res=await fetch(url)
    const data=await res.json()
    return data
  }
  catch(err)
  {
    console.log("Error:",err)
    return null
  }
}


// Word aur Phonetics render
function renderWord(data)
{
  resultDiv.innerHTML=`<p class="word">${data[0].word}</p> <p class="phonetics">${data[0].phonetics[0]?.text||""}</p>`
  
}

// First Meaning Synonyms and Antonyms render
function renderMeaning(data)
{
  const meaning=data[0].meanings[0]
    let html = `<h3>${meaning.partOfSpeech}</h3>`; 
  const def=meaning.definitions[0]
    html += `<p><strong>Definition:</strong> ${def.definition}</p>`;  
  // html+=<p><strong>Definitions:</strong>${def.definition}</p>
  if(def.example) html+=`<p><em>Example</em>${def.example}</p>`
  if(meaning.synonyms?.length>0)
    html+=`<p class="synonyms"><strong>synonyms:</strong>${meaning.synonyms.join(', ')}</p>`
    if(meaning.antonyms?.length>0)
    html+=`<p class="antonyms"><strong>Antonyms:</strong>${meaning.antonyms.join(', ')}</p>`
    resultDiv.innerHTML+=html
}


//AudioSetUp
function setupAudio(data)
{
  const audioUrl=data[0].phonetics[0]?.audio;
  if(audioUrl)
  {
    resultDiv.innerHTML+=`<button class="audioBtn">Listen</button> <audio id="audio" src="${audioUrl}"></audio>`
  }
  const audioBtn=document.querySelector(".audioBtn")
  const audio=document.querySelector("#audio")
  audioBtn.addEventListener('click',()=>
    audio.play()
  )
}


//SearchBtn Event
searchBtn.addEventListener('click',async()=>
{
    const word=input.value.trim()
    if(!word)
      return console.log("Enter the Word ...")
    const data=await getWordData(word)
    if(!data) 
      return
    renderWord(data)
    renderMeaning(data)
    setupAudio(data)
  }
)