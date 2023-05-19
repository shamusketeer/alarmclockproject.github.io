const currentTime = document.querySelector('.start-time h1');
const content = document.querySelector('.content');
const selectMenu = document.querySelectorAll('select');
const alarmBtn = document.querySelector('.alarm-btn button');
let alarmTime, isAlarmSet = false;

var ringtone = new Audio("./alarm.mp3");

for (let i = 1; i <=12; i++) {
    i = i<10 ? "0" + i : i;
    let opt = `<option value="${i}" >${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", opt);
}
for (let i = 0; i <=59; i++) {
    i = i<10 ? "0" + i : i;
    let opt = `<option value="${i}" >${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", opt);
}
for (let i = 2; i >0; i--) {
    let pmam = i==1 ? "AM" : "PM";
    let opt = `<option value="${pmam}" >${pmam}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", opt);
}

setInterval(()=>{
    //getting hour , min , sec

    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s= date.getSeconds(),
    ampm = "AM";

    if(h>=12){
        h = h-12;
        ampm ="PM"
    }
    
    //If hour value is zero, then reset this value to 12
    
    h = h == 0 ? h = 12 : h;

    //adding 0 before h,m,s if it is less ten 10

    h = h<10 ? "0" + h : h;

    m = m<10 ? "0" + m : m;

    s = s<10 ? "0" + s : s;

    currentTime.innerText =(`${h}:${m}:${s} ${ampm}`);

    if (alarmTime == `${h}:${m} ${ampm}`) {//if alarmTime is == to the SetAlamtime
        ringtone.play();//Then Alarm ringtone will Play in Loop
        ringtone.loop = true;
    }

}, 1000);

//Function to Set the Alarm

function setAlram(){

    if (isAlarmSet) { // if alarm set is true
        alarmTime=""; // let's clear the value of alarmTime
        ringtone.pause();//pause the alarm after click on stop Alarm Button
        content.classList.remove("disable");// remove the class disable 
        alarmBtn.innerText = "Set Alarm";// change innerText of Buttom
        return isAlarmSet = false;// return isAlarmSet Value false
    }
    // getting Hour, minuts, and AM/PM value Using selectMenu
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert('Please Select The Valid Time To Set Alarm');
    }
    isAlarmSet= true;
    alarmTime = time;
    content.classList.add("disable");
    alarmBtn.innerText = "Stop Alarm"
 //   console.log(time);

}
//Adding Click Event Listner on Button
alarmBtn.addEventListener("click", setAlram);