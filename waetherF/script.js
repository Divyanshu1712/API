document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input'); 
    const cityName = document.getElementById('city-name');
    const waetherInfo = document.getElementById('Weather-info');
    const temparture = document.getElementById('temp');
    const descCity = document.getElementById('desc-city');
    const btnSubmit = document.getElementById('btn-sumbit');
    const errorMessage = document.getElementById('error-message');
    // const hinnderclass = document.getElementsByClassName('hidden');
    const API_KEy = "ad1044e37329ae3c6cb63e519a43a111"

     
    // btn function is here to access the data.
    btnSubmit.addEventListener('click', async () => {
        const city = cityInput.value.trim(); // taking the data from input and it will trim and remove the extra spaces 
        if (!city) return alert("please enter the city name")   // if there is nothing input return a alert format.
        // it may throw some error
        // server/db is always in another continent.

        //using try catch to  better way of wrting the code
        try {
            const waetherData = await fetchWeatherdata(city); // this is aysnc await function 
            getsWeatherData(waetherData);
        } catch (error) {
            showError(); // here this show error 
        }
    });
   
    // fetching the data from API
    async function fetchWeatherdata(city) {
        // gets the data
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&unit=metric&APPID=${API_KEy}`; // the url of api
        
        const response = await fetch(url) // here using fetch function to get/fetch  data from api
        console.log(`yes url is wokring for ${city}`); // logging data to check it working or not 
        console.log(response);

        const data = await response.json(); // here data is converted into json format to access esaily
        console.log(data);
        return data; // export data 
        
    }
     
    // display the data after fetching from APi
    function getsWeatherData(data) {
        //display the dtaa 
        console.log(data);
        
        const {name, main, weather} = data // take these data from json file

        cityName.textContent = name
        temparture.textContent = main.temp
        descCity.textContent = weather[0].description
        // unlock the hidden data

        waetherInfo.classList.remove('hidden');  // in html we hide/hidden the the class list and by using classList.remove('hidden') this will toggle to acces the  
        errorMessage.classList.add('hidden'); // 

    }

    function showError() {
        waetherInfo.classList.remove('hidden'); // remove the part of the weather info data
        errorMessage.classList.add('hidden'); // add the error the pharse into display the data.
    }

});



