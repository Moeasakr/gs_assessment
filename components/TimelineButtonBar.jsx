import TimelineButton from './TimelineButton'

const TimelineButtonBar = ({ selectedTimeline, handleTimelineChange}) => {
  // Defining the options for the timeline buttons
  const timlineOptions = ["15M", "1H", "1D", "1W", "1M"]; 
  
  return (
    <div className='flex flex-row justify-evenly md:justify-around mb-2 font-medium'>
        {
            timlineOptions.map((option, index) => (
                <TimelineButton key={index} option={option} selectedTimeline={selectedTimeline} handleTimelineChange={handleTimelineChange}/>
            ))
        }
    </div>
  )
}

export default TimelineButtonBar