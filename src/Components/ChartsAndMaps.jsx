import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Chart from 'chart.js/auto';
import "leaflet/dist/leaflet.css"
import "../css/ChartsAndMaps.css"
import Sidebar from '../SideBar';
const fetchChartData = async () => {
  return await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
};

const ChartsAndMaps = () => {
  const [chartData, setChartData] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [windwindth,setWindwidth]=useState({wid:window.innerWidth})
  const [content, setContent] = useState(false);

  const toggle = () => {
    setContent(!content);
  };


const fetchCountryData = async () => {
    const res = await axios.get('https://disease.sh/v3/covid-19/countries');
    const data = res.data;
  
    const countryData = data.map((country) => ({
      name: country.country,
      lat: country.countryInfo.lat,
      long: country.countryInfo.long,
      active: country.active,
      recovered: country.recovered,
      deaths: country.deaths,
    }));
  
    setCountryData(countryData);
  };
useEffect(()=>{
  fetchChartData().then((res)=>setChartData({
    labels:Object.keys(res.data.cases),
    datasets:[
      {
        label:"COVID-19 Cases",
        data:Object.values(res.data.cases),
        backgroundColor:"red",
      }
    ]
  }))
  fetchCountryData()
},[])

console.log(content)
useEffect(() => {
  const chartConfig = {
    type: 'line',
    data: chartData,
  };

  const myChart = new Chart(document.getElementById('myChart'), chartConfig);
  return () => {
    myChart.destroy();
  };
}, [chartData]);

  return (
    <div className="flex lg:flex-row flex-col">
    <Sidebar />
    <div className="lg:w-[1190px] w-full flex flex-col justify-center items-center">
        {!content ? (
          <div className="flex items-center gap-5">
            <p className="p-4 text-base text-cyan uppercase cursor-pointer font-medium">
              Line Graph
            </p>
            <p
              className="p-4 text-base text-primary uppercase cursor-pointer font-medium"
              onClick={toggle}
            >
              Leaflet Map
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <p
              className="p-4 text-base text-primary uppercase cursor-pointer font-medium"
              onClick={toggle}
            >
              Line Graph
            </p>
            <p className="p-4 text-base text-cyan uppercase ursor-pointer font-medium">
              Leaflet Map
            </p>
          </div>
        )}

        {!content ? (
          <div className="w-full">
             <Heading>COVID-19 Dashboard</Heading>
             <Box >
                {window.innerWidth>900?<canvas id="myChart" width="800" height="300"></canvas>:<canvas id="myChart" width="400" height="300"></canvas>}
             </Box>
          </div>
        ) : (
          <>
            <MapContainer center={[0, 0]} zoom={2}  >
                    <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NLe8DG6CVIhkI4PpAXR1" />
                    {countryData.map((country) => (
                        <Marker key={country.name} position={[country.lat, country.long]}>
                           <Popup>
                             <h4>Name: {country.name}</h4>
                             <p>Active Cases: {country.active}</p>
                             <p>Recovered Cases: {country.recovered}</p>
                             <p>Deaths: {country.deaths}</p>
                           </Popup>
                         </Marker>
                     ))}
                 </MapContainer>
          </>
        )}
      </div>
   
  </div>
  )
}

export default ChartsAndMaps