const TimelineButton = ({ selectedTimeline, handleTimelineChange, option }) => {
  return (
    <button className={`p-1 max-w-full md:px-4 rounded-md ${selectedTimeline === option ? 'bg-button-color' : ''}`} value={option} onClick={handleTimelineChange}>{option}</button>
  )
}

export default TimelineButton