"use client";

import { useEffect, useState } from "react"
import Graph from "@/components/Graph"
import Dropdown from "@/components/Dropdown"
import { calculateTimeRange, getTimeRangeParams } from "@/utils/timeUtils"

const Home = () => {
  // Setting states for timeline and graph data
  const [selectedTimeline, setSelectedTimeline] = useState('15M')
  const [data, setData] = useState([]);
  
  // Setting state for dropdown to default to EUR and USD
  const [selectedOption1, setSelectedOption1] = useState('EUR');
  const [selectedOption2, setSelectedOption2] = useState('USD');

  // Setting options for dropdown, using to avoid using limited api calls for testing
  const optionsDropdown = {
    "AED": "UAE Dirham",
    "ALL": "Albanian Lek",
    "AOA": "Angolan Kwanza",
    "ARS": "Argentine Peso",
    "AUD": "Australian Dollar",
    "BDT": "Bangladeshi Taka",
    "BGN": "Bulgaria Lev",
    "BHD": "Bahraini Dinar",
    "BRL": "Brazilian Real",
    "CAD": "Canadian Dollar",
    "CHF": "Swiss Franc",
    "CLP": "Chilean Peso",
    "CNH": "Chinese Yuan offshore",
    "CNY": "Chinese Yuan onshore",
    "COP": "Colombian Peso",
    "CZK": "Czech Koruna",
    "DKK": "Danish Krone",
    "EGP": "Egyptian Pound",
    "EUR": "Euro",
    "GBP": "British Pound Sterling",
    "GHS": "Ghanaian Cedi",
    "HKD": "Hong Kong Dollar",
    "HRK": "Croatian Kuna",
    "HUF": "Hungarian Forint",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli New Sheqel",
    "INR": "Indian Rupee",
    "ISK": "Icelandic Krona",
    "JOD": "Jordanian Dinar",
    "JPY": "Japanese Yen",
    "KES": "Kenyan Shillings",
    "KRW": "South Korean Won",
    "KWD": "Kuwaiti Dinar",
    "LBP": "Lebanese Pound",
    "LKR": "Sri Lankan Rupee",
    "MAD": "Moroccan Dirham",
    "MUR": "Mauritian Rupee",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "NGN": "Nigerean Naira",
    "NOK": "Norwegian Krone",
    "NZD": "New Zealand Dollar",
    "OMR": "Omani Rial",
    "PEN": "Peruvian Nuevo Sol",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "PLN": "Polish Zloty",
    "QAR": "Qatari Rial",
    "RON": "Romanian Leu",
    "RUB": "Russian Ruble",
    "SAR": "Saudi Arabian Riyal",
    "SEK": "Swedish Krona",
    "SGD": "Singapore Dollar",
    "THB": "Thai Baht",
    "TND": "Tunisian Dinar",
    "TRY": "Turkish Lira",
    "TWD": "Taiwanese Dollar",
    "USD": "US Dollar",
    "VND": "Vietnamese Dong",
    "XAF": "Central African Francs",
    "XAG": "Silver (troy ounce)",
    "XAU": "Gold (troy ounce)",
    "XOF": "West African CFA franc",
    "XPD": "Palladium",
    "XPT": "Platinum",
    "ZAR": "South African Rand",
    "ZWL": "Zimbabwean Dollar"
  }

  // Function to fetch data based on the provided start and end times -- Calls api which handles generating the full api call as to not make my api key public
  // Returns data to be used in graph
  const fetchData = async (params) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`api/my-api/${selectedOption1+selectedOption2}&${queryString}`);
      const data = await response.json();
      setData(data.quotes);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetching data from api for graph render on timeline change
  useEffect(() => {
    const { startTime, endTime } = calculateTimeRange(selectedTimeline);
    const currencyPair = selectedOption1 + selectedOption2;
    const params = getTimeRangeParams(selectedTimeline, startTime, endTime, currencyPair);
    fetchData(params);
  }, [selectedOption1, selectedOption2, selectedTimeline])

  // Handles switching dropdown change
  const handleDropdown1Change = (e) => {
    setSelectedOption1(e.target.value);
  }

  const handleDropdown2Change = (e) => {
    setSelectedOption2(e.target.value);
  }

  // Function that handles changing timeline
  const handleTimelineChange = (e) => {
    setSelectedTimeline(e.target.value);
  }

  // Function that handles switching graph views when there is no graph data
  // Sometimes the api does not have data to return for the default and/or selected timeline, so this function switches the timeline to 1 Month to ensure there is data to return
  const handleButtonClick = () => {
    setSelectedTimeline('1M');
  }

  return (
    <div className="flex flex-col md:flex-row grow p-10">
        <div className="w-full md:w-1/3 flex flex-row md:flex-col md:justify-center md:pr-10">
          <Dropdown options={optionsDropdown} onChange={handleDropdown1Change} selectedOption={selectedOption1}/>
          <Dropdown options={optionsDropdown} onChange={handleDropdown2Change} selectedOption={selectedOption2}/>
        </div>

        <div className="flex-initial flex flex-col shadow-lg rounded-lg md:w-2/3 mt-6 md:mt-0">
          {data.length === 0 ? <div className="flex h-40 md:h-72 justify-center text-center"><div>Loading...<br /> If the issue persists, please click the button below to switch the graph settings. <br /><button className="border-0 rounded-lg box-border text-[#111827] font-semibold text-center shadow py-3 px-4" onClick={handleButtonClick}>Switch views</button></div></div> : <Graph data={data} selectedTimeline={selectedTimeline} handleTimelineChange={handleTimelineChange} flagCountries={[selectedOption1, selectedOption2]}/>
          }
        </div>
    </div>
  )
}

export default Home