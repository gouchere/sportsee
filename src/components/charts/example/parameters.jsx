export const parameters={
    "fonts":{
        // Font style for chart title
        "title": {
        "family": "Courier New", // Monospace font. Used in all font-based calculations
        "size": 14
      },
        // Font style for chart buttons
        "buttons": {
            "family": "Courier New",
            "size": 9
        },
        // Font style for axes
        "axes": {
            "family": "Courier New",
            "size": 8,
            "maxCharacters": { // maximum charcters to show
            "x": 10
            }
        },
        // Font style for tooltip
        "tooltip": {
            "family": "Times",
            "size": 12
        }
    },
    // COLORS
    "colors": {
        // Color styles for bars
        "bars": {
        "low": "cyan",
        "high": "blue",
        "hover": { // on hover colors
            "low": "coral",
            "high": "orangered"
        }
        },
        // Color styles for buttons
        "buttons": {
        "stroke": "black",
        "fill": {
            "notSelected": "white",
            "selected": "blue"
        }
        },
        // Color styles for tooltip
        "tooltip": {
        "fill": "rgb(51, 51, 51)",
        "stoke": "rgb(51, 51, 51)",
        "opacity": "0.8",
        "text": "cyan",
        "emphasis": "white"
        }
    },
    // TEXT
  "text": {
    "title": { // Pre and Post text (of selected data) for chart title
      "pretext": "Largest cities in ",
      "posttext": " by population"
    }
  },
    // DATA
    "data": {
        "selected": "None", // Currently selected data. Used during resize events
        "numberToShow": 8, // Max number of bars to show
        "tooltipKeys": ["city", "population"], // keys from within data to play in tooltip
        "x": "city", // Key within the data to be used to extract data for x axes
        "y": "population" // Key within data to be used for y values of bars
    },
    // CANVAS
    "canvas": { // default x and y
        "x": 450,
        "y": 240,
        "match": { // match width / height of the specified ID if it exists
        "x": "body",
        "y": "body"
        }
    },
    "tooltip": {
        "curve": 5, // curavture of corners
        "point": 10 // the bottom triangle
    }
}