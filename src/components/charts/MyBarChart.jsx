import * as d3 from "d3"
import {useEffect} from "react"

export default function MyBarChart(){
    const dataSet=[2000,2500,3300,7089,8445,3200,1600,4000]
    const chartWidth = 300
    const chartHeight = 200
    const padding = 2
    const heightScalingFactor = chartHeight / getMax(dataSet)
                                       
    function getMax(collection) {
        let max = 0
        collection.forEach(function (element) {
            max = element > max ? element : max
        })
        return max
    }

    useEffect(()=>{
    console.log("display chart... ")
    const svg=d3.select("#chart").append('svg').attr("width", chartWidth).attr("height", chartHeight);         
    svg.append('rect')
          .attr("width", chartWidth+20).attr("height", chartHeight+100)
          .attr("fill", "gray")
          .attr("padding",2)
          svg.selectAll('circle').data(dataSet).enter()
                                        .append('rect')
                                        .attr('x', (value,idx)=>{
                                            return (idx*(chartWidth/dataSet.length))+padding
                                        }).attr('y', (value,idx)=>{
                                            return chartHeight-(value*heightScalingFactor)
                                        })
                                        .attr('width', (chartWidth / dataSet.length) - padding)
                                        .attr('height', (value, index)=> {           
                                            return value * heightScalingFactor
                                          })
                                          .attr('fill', 'pink')
     
    },[dataSet.length])

    

    return(
        <div id="chart">
            
        </div>
    );
}