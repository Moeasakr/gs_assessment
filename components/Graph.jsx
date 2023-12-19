import { VictoryChart, VictoryArea, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import TimelineButtonBar from './TimelineButtonBar'
import GraphHeader from './GraphHeader';

const VictoryGraph = ({data, selectedTimeline, handleTimelineChange, flagCountries}) => {
  
  // minYValue and maxYValue are calculated by finding the minimum and maximum y-values in your dataset.
  // A margin is added to the domain (domainY) to ensure some space above and below the actual data points. The margin is set to 1% of the difference between the max and min values.
  // The VictoryChart uses the calculated domainY and a linear scale for the y-axis.
  // This approach dynamically adjusts the chart scale and domain based on the provided data.
  const minYValue = Math.min(...data.map(d => d.close));
  const maxYValue = Math.max(...data.map(d => d.close));
  const margin = 0.01 * (maxYValue - minYValue);
  const domainY = [minYValue - margin, maxYValue + margin];
  
  // Singles out the final close value to send to the graph header
  const finalClose = data[data.length - 1].close;
  // Calculates the price difference between the first and last close values
  const priceDifference = data[0].close - finalClose;

    return (
    <>
    <GraphHeader flagCountries={flagCountries} finalClose={finalClose} priceDifference={priceDifference}/>
    <VictoryChart
     minWidth={200}
     height={150}
     domain={{ y: domainY }} 
     padding={{ top: 40, bottom: 5, left: 1, right: 1 }}
     containerComponent={<VictoryVoronoiContainer/>}
    >
      <VictoryAxis
        crossAxis
        style={{
          axis: { stroke: 'transparent' }, // Hide axis line
          ticks: { stroke: 'transparent' }, // Hide ticks
          tickLabels: { fill: 'transparent' }, // Hide tick labels
        }}
      />
      {/* Y-axis without labels */}
      <VictoryAxis dependentAxis crossAxis
        style={{
          axis: { stroke: 'transparent' }, // Hide axis line
          ticks: { stroke: 'transparent' }, // Hide ticks
          tickLabels: { fill: 'transparent' }, // Hide tick labels
        }}
      />
      <VictoryArea style={{
        data: {
          fill: "#F3F9EB",
          stroke: "#97C75E",
          fillOpacity: 0.7,
          strokeWidth: 2
          },
        }} 
        data={data} 
        x="date" 
        y="close"
        labels={({ datum }) => `Date: ${datum.date}, Close: ${datum.close}`}
        labelComponent={
          <VictoryTooltip style={{ fontSize: 12 }} />
        }
        />
    </VictoryChart>

    <TimelineButtonBar selectedTimeline={selectedTimeline} handleTimelineChange={handleTimelineChange}/>
    </>
  )
}

export default VictoryGraph