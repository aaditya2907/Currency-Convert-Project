const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll('.dropdown select')
const btn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

const updateExchange = async () =>{
  let amount = document.querySelector('.amount input')
  let amtValue = amount.value
  if(amtValue==="" || amtValue<0){
    alert("Please type correct input!")
    amount.value="1"
    amtValue=1
  }

  // console.log(fromCurr.value)

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  // let answer = URL[toCurr.value.toLowerCase()];
  let response = await fetch(URL);
  let data= await response.json();
  let rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount=amount.value*rate;
  msg.innerHTML= `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
  console.log(response)
}

for(let select of dropdowns){
  //creating dropdown
  for (CurrCode in countryList) {
    //creating element
    let newOption = document.createElement("option")
    newOption.innerText = CurrCode 
    newOption.value = CurrCode

    //default values in select
    if(select.name === 'from' && CurrCode === "USD"){
      newOption.selected='selected';
    }else if(select.name === 'to' && CurrCode === "INR"){
      newOption.selected='selected';
    }

    select.append(newOption)
  }

  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target)
    // console.log(evt.target.name)
  })
}



const updateFlag = (element) =>{
  let CurrCode=element.value
  let CountryCode = countryList[CurrCode]
  let newSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img")
  img.src=newSrc;
} 

btn.addEventListener("click", (evt)=>{
  evt.preventDefault();
  updateExchange();
})

window.addEventListener("load", ()=>{
  updateExchange();
})
