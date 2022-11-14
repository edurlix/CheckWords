
const url = 'https://api.datamuse.com/words?';

const input = document.getElementById('input');
const submit = document.getElementById('submit');
const responseField = document.getElementById('responseField');
let query = document.getElementById('select');

const getWord = async () =>{
    let queryParams = query.value;
    console.log(queryParams);
    
    const wordQuery = input.value;
    const endpoint = url+queryParams+wordQuery;

    try{
        const response = await fetch(endpoint, {cache: 'no-cache'})
        if(response.ok){
            const jsonResponse = await response.json();
            let wordlist = [];
            for(let i = 0; i < Math.min(jsonResponse.length, 20); i++){
                wordlist.push(`<li>${jsonResponse[i].word}</li>`)
            }
            wordlist = wordlist.join("");
            responseField.innerHTML = `<ol>${wordlist}</ol>`;
        }
    }catch(error){
        console.log(error);
    }
}


const displaySuggestion = (event) =>{
    event.preventDefault();
    while(responseField.firstChild){
        responseField.removeChild(responseField.firstChild);
    }
    getWord();
}

submit.addEventListener('click', displaySuggestion);