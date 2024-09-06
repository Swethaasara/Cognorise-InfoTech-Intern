const dropList = document.querySelectorAll("form  select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
getButton = document.querySelector("form button");


for(let i = 0; i < dropList.length;i++){
    for( let currency_code in country_list){
     let selected =
     i==0
     ? currency_code == "XOF"
     ? "selected"
     : ""
     : currency_code == "LYD"
     ? "selected" 
     : "" ;
    
        let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
       dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change",(e) =>{
    loadFlag(e.target);//calling loadingflag with passing target element as an argument
   })
}
   
   function loadFlag(element){  //e-element
       for( let code in country_list){
           if(code == element.value){//if currency code of country list is equal to option value
               let imgTag = element.parentElement.querySelector("img");//selecting img tag of particular drop list
               //passing country code of a selected currency code in a img url


              imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64/.png`;
           }
       }
    }



    
window.addEventListener("load",() =>{
    getExchangeRate()

})
getButton.addEventListener("click",(e) =>{
    e.preventDefault()
    getExchangeRate();
 })


const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click",() =>{
 let tempCode = fromCurrency.value; //temporary currency code of FROM drop list
 fromCurrency.value = toCurrency.value; //passing TO currency code to FROM currency code
 toCurrency.value = tempCode; //passing temporary currency code of TO drop list
 loadFlag(fromCurrency) //calling loadflag with passing select element (fromCurrency)of FROM
 loadFlag(toCurrency) //calling loadflag with passing select element (toCurrency)of TO
 getExchangeRate();
})





function getExchangeRate(){
    const amount = document.querySelector("form input");
     const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountval = amount.value;
    if(amountval == "" || amountval == "0"){
        amount.value = "1";
        amountval = 1;
    }

   exchangeRateTxt.innerText = "Getting ready...";
  let url=`https://v6.exchangerate-api.com/v6/cabdfccf39f09e868e1400ba/latest/${fromCurrency.value}`;

    fetch(url).then(response =>response.json())
    .then((result) =>{
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExRate = (amountval*exchangeRate).toFixed(2);
          
               exchangeRateTxt.innerText = `${amountval} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText= "Something went wrong";
    });

}