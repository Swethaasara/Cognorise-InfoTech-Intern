let height = document.getElementById("height");
let weight= document.getElementById("weight");
let bmiShow = document.getElementById("bmi");
let calculate= document.getElementById("calculate");
let reload = document.getElementById("reload");

calculate.addEventListener("click",function()
{
    // formula BMI = kg/m*m
    let meter = height.value * 0.3048;
    let squareMeter = meter*meter;
    let bmiCal = (weight.value/squareMeter).toFixed(2);
    console.log(bmiCal);
    bmiShow.innerHTML="Your BMI is : " +bmiCal;


if(bmiCal<18){
    document.getElementById("category").innerHTML="You are Underweight";
}
 else if(bmiCal>=18 && bmiCal<24){
    document.getElementById("category").innerHTML="You are Normal Weight";
}
else if(bmiCal>=24 && bmiCal<30){
    document.getElementById("category").innerHTML="You are Above weight";
}
else if (bmiCal>=30){
    document.getElementById("category").innerHTML="Obese";
}

})
reload.addEventListener("click",function(){
    window.location.reload();
})
