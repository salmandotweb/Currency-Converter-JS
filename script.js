const dateEl = document.querySelector(".date");
const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const currencyOneInput = document.querySelector("#currency-one__input");
const currencyTwoInput = document.querySelector("#currency-two__input");
const shuffle = document.querySelector('.shuffle')


// setting date
function settingDate(){
    let date = new Date()
    let today = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    dateEl.innerHTML = `
    ${today}<span>/</span>${month}<span>/</span>${year}
    `
}

// calculate
function calculate(){  
    const currencyOneValue = currencyOne.value
    const currencyTwoValue = currencyTwo.value

    fetch(`https://v6.exchangerate-api.com/v6/e1cb18394a1562b747d84146/latest/${currencyOneValue}`)
    .then(res => res.json())
    .then(data =>{
        const rates = data.conversion_rates[currencyTwoValue]

        currencyTwoInput.value = (currencyOneInput.value * rates).toFixed(2)
    })
}

// event listeners
currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
currencyOneInput.addEventListener('input', calculate)
currencyTwoInput.addEventListener('input', calculate)

// shuffle
shuffle.addEventListener('click',()=>{
    const one = currencyOne.value
    const two = currencyTwo.value
    currencyOne.value = two
    currencyTwo.value = one

    calculate()
})

// run funtions
settingDate()
calculate()

