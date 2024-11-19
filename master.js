// HTML Elements
const textArea = document.getElementById('text-area');
const fileInput = document.getElementById('file-input');
const output = document.getElementsByTagName('output')[0];
const allowSpacesCheckbox = document.getElementById('allow-spaces');
const dialogClose = document.getElementById('dialog-close');
const dialog = document.getElementsByTagName('dialog')[0];
const wordDisplay = document.getElementById('word-display');
const numSpellings = document.getElementById('num-spellings');
const spellingList = document.getElementsByTagName('spelling-list')[0];
const analysisList = document.getElementById('analysis-list');

// Inputs
let allowSpaces = () => document.getElementById('allow-spaces').checked;
let showMatches = () => document.getElementById('show-matches').checked;
let showNonMatches = () => document.getElementById('show-non-matches').checked;

// Handle File Input
fileInput.addEventListener('change', () => {
    let reader = new FileReader();
    reader.readAsText(fileInput.files[0]);
    reader.addEventListener('load', ()=> {
        if (window.confirm("Replace existing word list with file contents?")) 
            textArea.value = reader.result;
        updateOutput()
    });
    
});

// Event Listeners
textArea.addEventListener('change', updateOutput);
allowSpacesCheckbox.addEventListener('change', updateOutput);
dialogClose.addEventListener('click', () => dialog.classList.remove('show'));

// Take text and process to output
function updateOutput () {
    
    let matchesList = []
    let wordList = textArea.value.split('\n');
    output.innerHTML = '';
    wordList.forEach(word => {
        word = word.trim();
        if (word == "")
            return;
        let wordElement = document.createElement('p');
        wordElement.textContent = word;
        let wordMatches = periodicMatch(word, allowSpaces());
        wordElement.classList.add(wordMatches ? 'match' : 'non-match')
        output.appendChild(wordElement);

        if (!wordMatches) 
            return

        matchesList.push(word)
        wordElement.setAttribute('tabindex', 0)

        wordElement.addEventListener('click', () => {
            showDialog(word);
        })
    });

    matchesList.sort((a,b) => {
        return b.length - a.length
    })

    analysisList.innerHTML = '';
    let analysisItem;

    analysisItem = document.createElement('li');
    analysisItem.textContent = matchesList.length + (matchesList.length == 1 ? " match":" matches")
    analysisList.appendChild(analysisItem);
    analysisItem = document.createElement('li');
    analysisItem.textContent = Math.round(matchesList.length/wordList.length*100) + "% matching";
    analysisList.appendChild(analysisItem);
    if (matchesList.length < 1) return
    analysisItem = document.createElement('li');
    analysisItem.textContent = "The longest match is \"" + matchesList[0] + "\"";
    analysisList.appendChild(analysisItem);

    


}

function showDialog(word) {
    dialog.classList.remove('show')

    elementSpellList = Array.from(elements);
    elementSpellList.push(" ");

    let spellings = periodicSpell(word, allowSpaces());
    wordDisplay.textContent = word;
    numSpellings.textContent = spellings.length + " possible " + (spellings.length == 1 ? "spelling" : "spellings");

    spellingList.innerHTML = '';

    spellings.forEach(spelling => {
        let spellingElement = document.createElement('spelling');

        spelling.nums.forEach(element => {
            elementElement = document.createElement('element');

            elementElement.textContent = elements[element-1]

            let series
            if (alkali.includes(element))
                series = "alkali"
            else if (alkaliEarth.includes(element))
                series = "alkali-earth";
            else if (lanthanoid.includes(element))
                series = "lanthanoid";
            else if (actinoid.includes(element))
                series = "actinoid";
            else if (transition.includes(element))
                series = "transition";
            else if (postTransition.includes(element))
                series = "post-transition";
            else if (metalloid.includes(element))
                series = "metalloid";
            else if (reactiveNonmetal.includes(element))
                series = "reactive-nonmetal";
            else if (noble.includes(element))
                series = "noble";
            else if (space.includes(element))
                series = "space";

            elementElement.classList.add(series);

            spellingElement.appendChild(elementElement);
        });


        spellingList.appendChild(spellingElement);
    });


    dialog.classList.add('show');
}

// Call function to initialize
updateOutput();



Array.from(output.childNodes)[0].click()