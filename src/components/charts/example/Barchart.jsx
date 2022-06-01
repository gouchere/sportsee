import { useEffect, useState } from "react"
import * as d3 from "d3"
import { parameters } from "./parameters";

export function Barchart(){
    const [size, setSize]=useState(0);
    //default canvas size
    const canvas={
        "x":parameters.canvas.x,
        "y":parameters.canvas.y
    }
     // Margins
    const margins = {
        "x": {
            "left": canvas.x * 0.04,
            "right": canvas.x * 0.08
            },
        "y": {
            "top": canvas.y * 0.04,
            "bottom": canvas.y * 0.04
            },
        "title": parameters.fonts.title.size * 2,
        "buttons": parameters.fonts.buttons.size * 2,
        "axes": {
            "x": (parameters.fonts.axes.size * parameters.fonts.axes.maxCharacters.x),
            "y": 40
            }
    }
     // Max free values to draw chart in
  const maxDrawingValues = {
        "x": canvas.x - margins.x.left - margins.x.right - margins.axes.y,
        "y": canvas.y - margins.y.top - margins.y.bottom - margins.axes.x - margins.title - margins.buttons
    };
    const bar = {
        "spacing": 2 // spacing between bars
    } 
    const drawer=(incomingData)=>{
        if (!d3.selectAll("g.buttonsGroup").empty()) {
            d3.select("svg").selectAll("g").remove()
        }

        // Make group for the entire chart
         d3.select("svg")
            .attr("viewBox", "0 0 "+canvas.x.toString()+" "+canvas.y.toString())
            .attr("fill", "red")
            .classed("svg-content-responsive", true)
            .append("g")
            .attr("id", "chartGroup")
            .data(incomingData)

         // Make buttons for each key in JSON
        const buttonKeys = Object.keys(incomingData)
        // Default chart drawn is first of all data. If from resizing then it will matain
        // the data the user already selected
        if (parameters.data.selected === "None") {
            parameters.data.selected = buttonKeys[0]
            var maxY = d3.max(incomingData[parameters.data.selected], function(d) {return d[parameters.data.y]})
            margins.axes.y = maxY.toString().length * parameters.fonts.axes.size
            maxDrawingValues.x = canvas.x - margins.x.left - margins.x.right - margins.axes.y
        }
        // buttons are made first as they may require an increase in margin
        makeButtons(buttonKeys)
        // Adds title, axes and bars
        drawChart(parameters.data.selected, incomingData)

    } 
    async function loadData(){  
         d3.json("result.json").then((d)=>{
             drawer(d)
         })
    }
    function drawChart(dataPoint, incomingData){
        parameters.data.selected=dataPoint;
        const data=incomingData[dataPoint]
        const currentNumberOfRectangles = document.querySelectorAll("rect").length;
        // Color in buttons based off of selected data
        d3.selectAll("circle.button").each(
            (d, i)=> {
                if (d === dataPoint) {
                    d3.select(this).attr("fill", parameters.colors.buttons.fill.selected)
                } else {
                    d3.select(this).attr("fill", parameters.colors.buttons.fill.notSelected)
                }
            })
            data.sort((a, b)=> {return b[parameters.data.y] - a[parameters.data.y]});
            // Get Subset of top numberToShow data points
            // JS is kind and will not throw an error if dataParameters.numberToShow is
            // greater than the actual number of elements in the array
            const subset = data.slice(0, parameters.data.numberToShow);
            // Get min / max values of y
            const dataExtent = d3.extent(subset, (d)=> {return d[parameters.data.y]})
            // Update y-axis margin to fit text of longest y-axis label
            // This will affect the space available for making the Title
            margins.axes.y = dataExtent[1].toString().length * parameters.fonts.axes.size
            maxDrawingValues.x = canvas.x - margins.x.left - margins.x.right - margins.axes.y
            // Determine bar widths (subset.length may be less than the desired number of data to show)
            bar.width = maxDrawingValues.x / (subset.length) - bar.spacing;            
            makeTitle()
            makeAxes(subset, dataExtent[1])
    }

    // Makes radio buttons for changing chart
    function makeButtons(buttonArray) {
            var buttonCXs = [] // x coordinates for buttons
            var buttonCYs = [] // y corrdinates for buttons
            var radius = parameters.fonts.buttons.size / 2 // radius is half button font size
            var x = margins.axes.y + margins.x.left + radius / 2 // starting x locations
            console.log("X="+x)
            var yShift = 0 // how many line drops are made by button

            for (var i = 0; i < buttonArray.length; i++) {
                // If too far right, drop down and adjust margins (calculated using monospace font)
                if (x + buttonArray[i].length * parameters.fonts.buttons.size > canvas.x - margins.x.right) {
                // increase space preserved for buttons: enough space for a line of font
                //  and padding by radius length
                margins.buttons += parameters.fonts.buttons.size + radius
                // reset current x to left position
                x = margins.axes.y + margins.x.left + radius / 2
                // update max y drawing value to corespond to increase space demand
                // of buttons
                maxDrawingValues.y = canvas.y - margins.y.top - margins.y.bottom - margins.axes.x - margins.title - margins.buttons
                    yShift += 1
                }

                const y = margins.buttons / 2 + yShift * radius + margins.y.top

                buttonCXs.push(x-15)
                buttonCYs.push(y-10)
                if (i === 0) {
                    x += (buttonArray[i].length * parameters.fonts.buttons.size) + radius * (i + 1)
                } else {
                    x += (buttonArray[i].length * parameters.fonts.buttons.size) + radius * (i)
                }

            }

            var buttonGroup = d3.select("svg")
                                .append("g") // group for all buttons
                                .attr("class", "buttonsGroup")
                                .selectAll("g.buttonsGroup")
                                .data(buttonArray)
                                .enter()
                                .append("g") // group for each button (circle and text)
                                .attr("class", "buttonGroup")

            // Add the radial buttons
            buttonGroup.append("circle")
            buttonGroup.select("circle")
                    .attr("r", radius)
                    .attr("cx", function(d, i) {return buttonCXs[i]})
                    .attr("cy", function(d, i) {return buttonCYs[i]})
                    .attr("stroke", parameters.colors.buttons.stroke)
                    .attr("fill", parameters.colors.buttons.fill.notSelected)
                    .on("click", drawChart)
                    .attr("class", "button")

            // Add the text (using monospace font)
            buttonGroup.append("text")
            buttonGroup.select("text")
                    .text(function(d) {return d})
                    .attr("x", function(d, i) {return buttonCXs[i] + radius + radius / 2})
                    .attr("y", function(d, i) {return buttonCYs[i] + radius / 2})
                    .attr("font-family", parameters.fonts.buttons.family)
                    .attr("font-size", parameters.fonts.buttons.size)
                    .on("click", drawChart)
    }
    // Makes axes / updates axes if they already exist
    function makeAxes(subset, yMax) {
        // y-axis
            var yAxisScale = d3.scaleLinear().domain([0, yMax]).range([maxDrawingValues.y, 0])
            var yAxis = d3.axisLeft().scale(yAxisScale).tickSize(margins.x.left / 4).ticks(5)

            // x-axis
            var xAxisScale = d3.scaleBand()
                                .domain(subset.map(function(d) {
                                    if (d[parameters.data.x].length > parameters.fonts.axes.maxCharacters.x) {
                                        return d[parameters.data.x].slice(0, parameters.fonts.axes.maxCharacters.x - 3) + "..."
                                    }
                                     return d[parameters.data.x].slice(0, parameters.fonts.axes.maxCharacters.x)
                                }))
                                .range([0, maxDrawingValues.x])
                                .align([0.5])

            var xAxis = d3.axisBottom().scale(xAxisScale)

            // First call position axes
            if (d3.select("#yAxisGroup").empty()) {
                // add and position y axis
                d3.select("svg").append("g").attr("id", "yAxisGroup").call(yAxis)
                d3.selectAll("#yAxisGroup").attr("transform", "translate(" + (margins.axes.y + margins.x.left / 2) + "," + (margins.y.top + margins.title + margins.buttons) + ")")
                // add and position x axis
                d3.select("svg").append("g").attr("id", "xAxisGroup").call(xAxis)
                d3.selectAll("#xAxisGroup").attr("transform", "translate(" + (margins.axes.y + margins.x.left) + "," + (margins.y.top + maxDrawingValues.y + margins.title + margins.buttons + margins.y.bottom / 2) + ")")
            } else { // not first call - use transitions
                // y axis
                d3.select("#yAxisGroup").transition().duration(500).call(yAxis)
                d3.selectAll("#yAxisGroup").transition().duration(500).attr("transform", "translate(" + (margins.axes.y + margins.x.left / 2) + "," + (margins.y.top + margins.title + margins.buttons) + ")")
                // x axis
                d3.select("#xAxisGroup").transition().duration(500).call(xAxis)
                d3.selectAll("#xAxisGroup").transition().duration(500).attr("transform", "translate(" + (margins.axes.y + margins.x.left) + "," + (margins.y.top + maxDrawingValues.y + margins.title + margins.buttons + margins.y.bottom / 2) + ")")
            }

            // Adjust text to angle, fontsize and fontfamily
            d3.selectAll("#xAxisGroup")
            .selectAll('text')
            .attr("text-anchor", "end")
            .attr("font-size", parameters.fonts.axes.size)
            .attr("transform", "rotate(-45)").transition().duration(500)
            .attr("x", -parameters.fonts.axes.size)
            .attr("y", parameters.fonts.axes.size)

            d3.selectAll("#yAxisGroup")
            .selectAll('text')
            .attr("font-size", parameters.fonts.axes.size)
    }

    function makeTitle(){
        // Does chart title already exist?
        if (!d3.select("g.chartTitleGroup").empty()) {
            // Yes. Clear Title
            d3.select("g.chartTitleGroup").remove()
            // Reset Margins
            margins.title = parameters.fonts.title.size * 2
        }
            // Construct full title
            let fullTitle = parameters.text.title.pretext + parameters.data.selected + parameters.text.title.posttext
           console.log(fullTitle)
            // Store title lines
            const titleLines = []
             // Max line length
            const charactersPerLine = Math.max(Math.floor(maxDrawingValues.x / parameters.fonts.title.size), 2)
            console.log(charactersPerLine)
            while (fullTitle.length > 0) {
                    let slicePos = charactersPerLine - 1
                    // get title string splice
                    let tempSlice = fullTitle.slice(0, slicePos)
                
                    // get position of last space
                    let lastSpace = tempSlice.lastIndexOf(" ")
                
                    if (tempSlice[0] == " ") { // space is first character, drop it
                    fullTitle = fullTitle.slice(1, fullTitle.length)
                    tempSlice = fullTitle.slice(0, slicePos)
                    lastSpace = tempSlice.lastIndexOf(" ")
                    }
                
                    if (fullTitle[slicePos + 1] != " " & slicePos < fullTitle.length) {
                    // the leading character of next splice is not a space (e.g. breaks a word)
                    // and there is more in the title to come
                    if (lastSpace == -1) {
                        tempSlice = fullTitle.slice(0, slicePos - 1) + "-"
                        slicePos -= 1
                    } else {
                        slicePos = lastSpace
                        tempSlice = fullTitle.slice(0, slicePos)
                    }
                    lastSpace = tempSlice.lastIndexOf(" ")
                    } else if (slicePos < fullTitle.length & lastSpace < tempSlice.length) {
                    // last word is split, so add a hypen
                    tempSlice = fullTitle.slice(0, slicePos - 1)
                    slicePos -= 1
                    lastSpace = tempSlice.lastIndexOf(" ")
                
                    // if the word is a two letter word, e.g. the last letter in the string is
                    // the first letter of the two letter word, then that letter is droped for
                    // a hypen before a space. That makes no sense, so drop the entire 2 letter word
                    if (lastSpace == slicePos -  1) {
                        // if space is last character drop it
                        tempSlice = fullTitle.slice(0, slicePos - 1)
                        slicePos -= 1
                    } else {
                        tempSlice += "-"
                        slicePos -= 1
                    }
                    lastSpace = tempSlice.lastIndexOf(" ")
                    }
                
                    if (lastSpace == slicePos) {
                    // if space is last character drop it
                    tempSlice = fullTitle.slice(0, slicePos - 1)
                    slicePos -= 1
                    }
                
                
                    titleLines.push(tempSlice)
                    fullTitle = fullTitle.slice(slicePos, fullTitle.length)
              }
              console.log(titleLines)            
            
            
              // // Add Chart Title group
              var chartTitle = d3.select("svg")
                                  .append("g")
                                  .attr("class", "chartTitleGroup")
            
            
              for (var i = 0; i < titleLines.length; i++) {
                chartTitle.append("text")
                .attr("class", "chartTitle")
                .attr("id", "chartTitle")
                .text(titleLines[i])
                .attr("text-anchor", "middle")
                .attr("font-size", parameters.fonts.title.size)
                .attr("font-family", parameters.fonts.title.family)
                .attr("x", margins.axes.y + margins.x.left + maxDrawingValues.x / 2)
                .attr("y", margins.y.top + margins.buttons + (parameters.fonts.title.size / 2) + ((i + 1) *  parameters.fonts.title.size))
            
                margins.title += parameters.fonts.title.size
                maxDrawingValues.y = canvas.y - margins.y.top - margins.y.bottom - margins.axes.x - margins.title - margins.buttons
            
              }
        
    }

    useEffect(()=>{
        window.addEventListener("resize",drawer);    
        loadData()
        return ()=>window.removeEventListener("resize", drawer)
    },[size]); 
    return (
        <div id="root-chart">
            <svg style={{border:"1px lightgray solid"}} />
        </div>
    )
}