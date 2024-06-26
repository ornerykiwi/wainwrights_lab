
//global variable
let data = [];  

const getAllWainwrights = async () => {
    const response = await fetch('https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json'); 
    data = await response.json();
    return data; 
}

const fetchDataAndDisplay = async () => {

    try{
        // load all the data

        const allWainwrightsPromise = await getAllWainwrights(); 
        console.log(data);
    
        //display Wainwright information
        displayWainwrights(data);
    } catch(error) {
        console.error('Error fetching data: ', error); 
    }
}

//below methods do not need to be async because they are taking data from the HTML doc and updating it. no 'asynchronous operations' like fetching data from a server is happening here. 

// function to display updated Wainwrights when filtered

const displayWainwrights = (wainwrights) => {
    const wainwrightsContainer = document.getElementById("wainwrights-list");
    wainwrightsContainer.innerHTML = ""; // Clear existing content

    wainwrights.forEach(wainwright => {
         //create new ul element for each wainwright
        const wainwrightsList = document.createElement("li");

        //create list items
        const wainwrightName = document.createElement("h2");
        wainwrightName.innerHTML = `<strong>Name:</strong> ${wainwright.name}`;
        wainwrightsList.appendChild(wainwrightName);

        const wainwrightHeight = document.createElement("h3");
        wainwrightHeight.innerText = `Height: ${wainwright.heightMetres}`;
        wainwrightsList.appendChild(wainwrightHeight);

        const wainwrightArea = document.createElement("h4");
        wainwrightArea.innerText = `Area: ${wainwright.area.areaName}`;
        wainwrightsList.appendChild(wainwrightArea);

        // add the new ul to the wainright container
        wainwrightsContainer.appendChild(wainwrightsList);
    });
}

const handleFormSubmit = (event) => {
    event.preventDefault(); 
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    console.log("Search Input:", searchInput);
    filterWainwrights(searchInput); 
}

const filterWainwrights = (word) => {
    console.log(word);
    if (word === "" || word.length < 1){
        displayWainwrights(data); 
    } else{
        const filteredWainwrights = data.filter(wainwright => 
            wainwright.name.toLowerCase().includes(word));
        
        displayWainwrights(filteredWainwrights); 
    }
    
}

document.getElementById("searchForm").addEventListener('submit', handleFormSubmit); 
// document.getElementById("searchInput").addEventListener('change', handleFormSubmit); 

fetchDataAndDisplay(); 