import React, { useEffect, useState } from 'react';
import { CardContent, FormControl, MenuItem, Select, Card } from '@material-ui/core';
import InfoBox from '../InfoBoxComponent/InfoBox';
import Map from '../MapComponent/Map';
import Table from '../LiveCaseCountyTable/Table';
import LineGraph from '../Graphs/LineGraph';
import 'leaflet/dist/leaflet.css';
import './Tracker.css';
import { sortData, prettyPrintStat } from '../Utils/util';

// https://disease.sh/v3/covid-19/countries
function Tracker() 
{
  const [countries, setCountries] = useState([]);  //overall countries list
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 11.1271, lng: 78.6569 }); //lat: 20.5937, lng: 78.9629  lat: 34.80746, lng: -40.4796
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  },[]);

  useEffect(() => {
     const getCountriesDate = async () => {
       await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
          .then((data) => {
            const countries =  data.map((country) => (
              {
                name : country.country,
                value : country.countryInfo.iso2
              }
            ))

            const sortedDate = sortData(data);
            setTableData(sortedDate);
            setCountries(countries);
            setMapCountries(data);
          })
     }
     getCountriesDate(); 
  },[])

  const onCountryChange = async (event) => { 
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = (countryCode === 'worldwide') ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`; 
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      })
  };
  console.log(countryInfo);
  return (
    <div className="tracker">
      <div className="app_left">
        <div className="app_header">
            <h1>Covid-19 Tracker</h1>
            <FormControl className="app_dropdown">
              <Select variant="outlined" value={country} onChange={onCountryChange}>
                <MenuItem value="worldwide">Overall World</MenuItem>
                {
                  countries.map(country => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="app_stats">
            <InfoBox isRed active={casesType === "cases"} onClick={(e) => setCasesType("cases")} title="Active" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
            <InfoBox isGreen active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} title="Recoverd" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
            <InfoBox isGray active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} title="Death" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
          </div>
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
        </div>      
      
        {/* Right side Part */}
      <Card className="app_right">
        <CardContent>
            <h1>Live Cases by Country</h1>
            <Table countries={tableData}/>
            <h3 className="graph-title">Rate of {casesType}</h3>
            <LineGraph className="linegraph" casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default Tracker;
