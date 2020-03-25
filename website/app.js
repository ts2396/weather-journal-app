////////////////////////////////////////////////////
// Create a new date instance dynamically with JS //
////////////////////////////////////////////////////
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();

////////////////////////////////////////////
// Personal API Key for OpenWeatherMap API//
////////////////////////////////////////////
const baseURL =
  'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
const apiKey = '&appid=ce58fc8133b676ecc82cb35306506d86';

// http://api.openweathermap.org/data/2.5/weather?q=us&APPID=ce58fc8133b676ecc82cb35306506d86

////////////////////////////////////////////////////////////////
// Event listener to add function to existing HTML DOM element//
////////////////////////////////////////////////////////////////

/* Function called by event listener */

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  // select the input feelings to include in POST
  let feelingText = document.getElementById('feelings').value;
  // get the API data
  getWeather(baseURL, document.getElementById('zip').value, apiKey).then(
    function (newTemperature) {
      postData('/add', {
        _temperature: newTemperature,
        get temperature() {
          return this._temperature;
        },
        set temperature(value) {
          /////////////////////////////////////
          this._temperature = value;
        },
        date: newDate,
        userAction: feelingText
      });
      // update UI
      updateUI();
    }
  );
}

let getWeather = async (baseURL, zip, apiKey) => {
  let resGet = await fetch(`${baseURL + zip},us&appid=${apiKey}`);
  try {
    const webData = await resGet.json();
    newTemperature = webData.main.temp;
    return newTemperature;
  } catch (error) {
    console.log('error', error);
  }
};

let retrieveData = async (url = '') => {
  const req = await fetch(url);
  try {
    // Transform into JSON
    const reqData = await req.json();
    return reqData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

let postData = async (url = '', data = {}) => {
  console.log(data);

  let response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  try {
    let newData;
    newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

let updateUI = async () => {
  let reqPost;
  reqPost = await fetch('/all');
  try {
    const allData = await reqPost.json();
    const newLocal = 1;
    const recentEntry = allData[allData.length - newLocal];
    document.getElementById('date').innerHTML = 'Date: ' + recentEntry.date;
    document.getElementById('temp').innerHTML =
      'Temperature: ' + recentEntry.temperature + ' &#8457;';
    document.getElementById('content').innerHTML =
      'Feelings: ' + recentEntry.userAction;
  } catch (error) {
    console.log('error', error);
  }
};