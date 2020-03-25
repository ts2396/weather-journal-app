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
const apiKey = 'ce58fc8133b676ecc82cb35306506d86';

// http://api.openweathermap.org/data/2.5/weather?q=us&APPID=ce58fc8133b676ecc82cb35306506d86

////////////////////////////////////////////////////////////////
// Event listener to add function to existing HTML DOM element//
////////////////////////////////////////////////////////////////

/* Function called by event listener */

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  e.preventDefault();
  const feelingText = document.getElementById('feelings').value;
  getWeather(baseURL, document.getElementById('zip').value, apiKey).then(
    newTemperature => {
      postData('/add', {
        temperature: newTemperature,
        date: newDate,
        userAction: feelingText
      });
      updateUI();
    }
  );
}

/* Function to GET Web API Data*/

const getWeather = async (baseURL, zip, apiKey) => {
  let res = await fetch(`${baseURL + zip},us&appid=${apiKey}`);
  try {
    const webData = await res.json();
    newTemperature = webData.main.temp;
    return newTemperature;
  } catch (error) {
    console.log("error", error);
  }
}

const retrieveData = async (url = '') => {
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

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log(error);
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
    console.log("error", error);
  }
};