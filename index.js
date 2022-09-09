const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"]

let passwordOneEl = document.getElementById("password-one-el")
let passwordTwoEl = document.getElementById("password-two-el")
let toggleNumEl = document.getElementById("toggle-num")
let toggleSymbolEl = document.getElementById("toggle-symbol")
let form = document.getElementById("options-form")

let useNumber = false
let useSymbol = false

form.addEventListener("submit",generatePassword)
passwordOneEl.addEventListener("click", copyPassword)
passwordTwoEl.addEventListener("click", copyPassword)


function setCharactersArray() {
    let newCharacters = Array.from(characters)
    if(!useNumber){
        newCharacters = newCharacters.filter(char => /\D/.test(char))
    }
    if(!useSymbol){
        newCharacters = newCharacters.filter(char => /[A-Za-z0-9]/.test(char))
    }
    return newCharacters
}


function generatePassword() {
    let passwordLength = form.elements["password-length"].value
    if(!passwordLength){
        passwordLength = 15
    }
    let passwordOne = ""
    let passwordTwo = ""
    let editedCharacters = setCharactersArray()
    for (let i = 0; i < passwordLength ; i++){
        let randomNumOne = Math.floor(Math.random() * editedCharacters.length)
        let randomNumTwo = Math.floor(Math.random() * editedCharacters.length)
        passwordOne += editedCharacters[randomNumOne]
        passwordTwo += editedCharacters[randomNumTwo]
    }
    passwordOneEl.textContent = passwordOne
    passwordTwoEl.textContent = passwordTwo
    event.preventDefault();
}

function toggleNum() {
    useNumber = toggleNumEl.checked
}

function toggleSymbol() {
    useSymbol = toggleSymbolEl.checked
}

function copyPassword(event){
    let copyText = document.getElementById(event.target.id).textContent
    navigator.permissions.query({ name: 'clipboard-write' })
        .then(result => {
            console.log(result.state)
        })
    navigator.clipboard.writeText(copyText).then(() => {
        console.log("success")
    }, err => {
        console.log("Failed")
        console.log(err)
    })
}



