////////////////////////////////////////////////////
// Create a new date instance dynamically with JS //
////////////////////////////////////////////////////
const d = new Date();
const newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

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

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const feelText = document.getElementById('feelings').value;
  getApiData(baseURL, document.getElementById('zip').value, apiKey).then(
    function(JTempData) {
      postData('./add', {
        temperature: JTempData,
        date: newDate,
        feelings: feelText
      });
      updateUI();
    }
  );
}

/* Function to GET Web API Data*/
const getApiData = async (baseURL, zip, apiKey) => {
  const response = await fetch(baseURL + zip + apiKey);
  try {
    const webData = await response.json();
    JTempData = webData.main.temp;
    return JTempData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data */
const retrieveData = async (url = '') => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    return allData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

/* Update UI */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    const newAPIData = allData[allData.length - 1];
    document.getElementById('date').innerHTML = 'Date: ' + newAPIData.date;
    document.getElementById('temp').innerHTML =
      'Temperature: ' + newAPIData.temperature + ' &#8457;';
    document.getElementById('content').innerHTML =
      'Feelings: ' + newAPIData.feelings;
  } catch (error) {
    console.log('error', error);
  }
};
