// use d3 to read in samples.json from "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending, store data
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

//Populate dropdown menu
function dropdown() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then(function(data) {
        console.log(data);
    let names = data.names
    console.log(names);

    //For loop
    names.forEach((sample) => {
        dropdownMenu
            .append("option")
            .text(sample)
            .property("value", sample);
    });
    charts(names[0])
    table(names[0])
      });
  }
  dropdown()


  function charts(sample_id) {
    // Use D3 to select the dropdown menu
   
    d3.json(url).then(function(data) {
        console.log(data);
    let samples = data.samples

//Filtering Samples
    let sampleArray = samples.filter(x => x.id == sample_id)[0];

let otu_ids = sampleArray.otu_ids
let sample_values = sampleArray.sample_values
let otu_labels = sampleArray.otu_labels

//Creating Bar Chart with top 10 OTUs
var barData = [{
    x:sample_values.slice(0,10).reverse(),
    //Slicing and label for the values
    y:otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
    text:otu_labels.slice(0,10).reverse(),
    orientation: 'h',

    type: 'bar'
  }];
  
  //Set layout
  var barlayout = {
    title: {
      text: "<b>Top Ten OTU's</b>",
      font: {size: 20,},
    },
    xaxis: {title: "<b>Number of Found Samples</b>"},
  };
  //Plot
  Plotly.newPlot('bar', barData, barlayout);
 
// Creating Bubble Chart
  var bubble_data = [{
    x:otu_ids,
    y:sample_values,
    text:otu_labels,
    mode: 'markers',
    marker: {
      color:otu_ids,
      size:sample_values,
      colorscale: "Picnic",
    }
  }];
  
  //Layout for Bubble Chart
  var bubble_layout = {
      title: {
        text: "<b>Bubble Chart</b>",
        font: {size: 20,},
      },
      xaxis: {title: `<b>OTU ID</b>`},
    };
    
  //Plot
  Plotly.newPlot('bubble', bubble_data, bubble_layout);
  
      });
    
  }
//Retrireve all sample data
  function optionChanged(sample_id){
    charts(sample_id)
    table(sample_id)
  }

  function table(sample_id) {
    // Use D3 to select the dropdown menu
    let metadata_tag = d3.select("#sample-metadata");

//Filter out the Data
    d3.json(url).then(function(data) {
        console.log(data);
        let metadata = data.metadata

        let metaArray = metadata.filter(x => x.id == sample_id)[0];
        metadata_tag.html("")
Object.entries(metaArray).forEach(entry => {
    const [key, value] = entry;

    //Checking data in the console
    console.log(key, value);
    metadata_tag
    .append("h5")
    .text(`${key}: ${value}`)

  });

      }); 
  }
