
const cityName=document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name=document.getElementById('city_name');

const temp_real_value= document.getElementById('temp_real_value');
const temp_status=document.getElementById('temp_status');

const datahide=document.querySelector('.middle_layer');


function updateTime() {
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    const year = currentDate.getFullYear();
  
    dateElement.textContent = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  setInterval(updateTime, 1000);
  

const getInfo=async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value;
    if(cityVal===""){
         city_name.innerText=`please write the name of city before search`;
         datahide.classList.add('data_hide');
    }else{
        try{
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&APPID=62f85f34e9b4fe8efbc120b658aad6b2`
        const response=await fetch(url);
        const data=await response.json();
        const arrData=[data];
        // console.log(arrData);


        city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`;
        temp_real_value.innerText=arrData[0].main.temp;
        // temp_status.innerText=arrData[0].weather[0].main;

        const tempphoto=arrData[0].weather[0].main;
        
        // condition to check sunny or cloudy or not..
        if(tempphoto=='Clear'){
            temp_status.innerHTML=
           " <i class='fas fa-sun' style='color:#eccc68;'></i>"
        }else if(tempphoto=='Clouds'){
            temp_status.innerHTML=
            "<i class='fas fa-cloud' style='color:#f1f2f6'></i>"
        }else if(tempphoto=='Rain'){
            temp_status.innerHTML=
            "<i class='fas fa-cloud-rain' style='color:#a4b0be'></i>"
        }else if(tempphoto=='haze'){
            temp_status.innerHTML=
            "<i class='fas fa-cloud-haze' style='color:#0047AB'></i>"
        }else{
            temp_status.innerHTML=
            "<i class='fas fa-sun' style='color:#eccc68'></i>"
        }
          datahide.classList.remove('data_hide');

        }catch{
            city_name.innerText=`please enter the city name correct`;
            datahide.classList.add('data_hide');
        }
     }
}

submitBtn.addEventListener('click',getInfo);