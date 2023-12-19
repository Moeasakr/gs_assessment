// Function to calculate the start and end times based on the selected time range
export const calculateTimeRange = (selectedTimeline) => {
    const now = new Date();
    const nowUTC = new Date(now.toUTCString());
    let startTime, endTime;

    switch (selectedTimeline) {
      case '15M':
        startTime = new Date(nowUTC.getTime() - 15 * 60 * 1000); // 15 minutes ago
        break;
      case '1H':
        startTime = new Date(nowUTC.getTime() - 60 * 60 * 1000); // 1 hour ago
        break;
      case '1D':
        startTime = new Date(nowUTC.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
        break;
      case '1W':
        startTime = new Date(nowUTC.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago
        break;
      case '1M':
        startTime = new Date(nowUTC.getTime() - 30 * 24 * 60 * 60 * 1000); // 1 month ago
        break;
      default:
        startTime = nowUTC;
    }

    endTime = nowUTC;
    return { startTime, endTime };
  };
  
  // Function to format date and time as "YYYY-mm-dd HH:MM" for the fetch request
  export const formatDateTime = (dateTime, selectedTimeline) => {
    const year = dateTime.getUTCFullYear();
    const month = String(dateTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getUTCDate()).padStart(2, '0');
    let formattedDateTime = `${year}-${month}-${day}`;

    if (selectedTimeline === '15M' || selectedTimeline === '1H') {
      const hours = String(dateTime.getUTCHours()).padStart(2, '0');
      const minutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
      formattedDateTime += ` ${hours}:${minutes}`;
    }
    return formattedDateTime;
  };
  
  // Function to get api call parameters based on the selected time range, start time, end time, and currency pair
  export const getTimeRangeParams = (selectedTimeline, startTime, endTime, currencyPair) => {
    let params = {
        currency: currencyPair,
        format: 'records',
        start_date: formatDateTime(startTime, selectedTimeline),
        end_date: formatDateTime(endTime, selectedTimeline),
      };
  
      switch (selectedTimeline) {
        case '15M':
          params.interval = 'minute';
          params.period = 1;
          break;
        case '1H':
          params.interval = 'minute';
          params.period = 5;
          break;
        case '1D':
          params.interval = 'hourly';
          params.period = 1;
          break;
        case '1W':
        case '1M':
          params.interval = 'daily';
          params.period = 1;
          break;
        default:
          break;
      }
  
      return params;
  };