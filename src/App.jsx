import React, { useEffect , useState} from 'react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeandLocation from './components/TimeandLocation'
import TempandDetails from './components/TempandDetails'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/weatherService'
import { ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  //state management
  const [query, setQuery] = useState({q:'hyderabad'}); //location
  //metrics are °C or °F
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState('');

  const getWeather = async ()=>{
    const cityName = query.q ||  "current location";
    toast.info(`Fetching weather data for ${cityName}`);
    try{
    const data = await getFormattedWeatherData({...query, units});
    toast.success(`Fetched data for ${data.name}, ${data.country}`);
    setWeather(data);
   }catch(error){
    toast.error(`Error fetching weather data : ${error.message}`);
   }
   
  };

  //effect hook , update state when the query and unit changes

  useEffect(()=>{
    getWeather();
  }, [query,units]);

  const formatBackground = ()=> {
    if(!weather) return "from-cyan-600 to-blue-700"
    const threshold = units ==="metric" ? 20:60;
    if(weather.temp <= threshold) return "from-cyan-600 to-blue-700"
    return "from-yellow-600 to-orange-700";


  }
  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
    <TopButtons setQuery={setQuery}/>
    <Inputs setQuery={setQuery} setUnits={setUnits}/>
    {weather && (
     <>
    <TimeandLocation weather = {weather} />
    <TempandDetails weather = {weather} units={units}/>
    <div className="mt-4">
    <Forecast title='3 hour step forecast' data={weather.hourly} />
    <Forecast title='Daily forecast' data={weather.daily} />
    </div>
     </>
    )} 
    
    <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />

    </div>
  )
}

export default App
