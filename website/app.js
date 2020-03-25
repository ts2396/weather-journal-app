//////////////////////
// Global Variables //
//////////////////////

////////////////////////////////////////////////////
// Create a new date instance dynamically with JS //
////////////////////////////////////////////////////
let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();

////////////////////////////////////////////
// Personal API Key for OpenWeatherMap API//
////////////////////////////////////////////
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
const apiKey = 'ce58fc8133b676ecc82cb35306506d86';

////////////////////////////////////////////////////////////////
// Event listener to add function to existing HTML DOM element//
////////////////////////////////////////////////////////////////

/* Function called by event listener */

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  // select the input feelings to include in POST
  const feelText = document.getElementById('feelings').value;
  // get the API data
  getWeather(baseURL, document.getElementById('zip').value, apiKey).then(
    function(newTemperature) {
      postData('/add', {
        temperature: newTemperature,
        date: newDate,
        userResponse: feelText
      });
      // update UI
      updatePOST();
    }
  );
}

//////////////////////////////////
// Function to GET Web API Data //
/////////////////////////////////
const getWeather = async (baseURL, zip, key) => {
  const resGet = await fetch(baseURL + zip + ',us&appid=' + key);
  try {
    const webData = await resGet.json();
    newTemperature = webData.main.temp;
    return newTemperature;
  } catch (error) {
    console.log('error', error);
  }
};

//////////////////////////////////
// Function to GET Project Data //
//////////////////////////////////
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

////////////////////////////
// Function to POST data  //
////////////////////////////
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

////////////////
// Update POST//
////////////////
const updatePOST = async () => {
  const reqPost = await fetch('/all');
  try {
    const allData = await reqPost.json();
    const mostRecentRecord = allData[allData.length - 1];
    document.getElementById('date').innerHTML = 'Date: ' + mostRecentRecord.date;
    document.getElementById('temp').innerHTML = 'Temperature: ' + mostRecentRecord.temperature + ' &#8457;';
    document.getElementById('content').innerHTML = 'Feelings: ' + mostRecentRecord.userResponse;
  } catch (error) {
    console.log('error', error);
  }
};
