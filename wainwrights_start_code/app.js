
//global variable
let data = [];  

const getAllWainwrights = async () => {
    const response = await fetch('https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json'); 
    data = await response.json();
    return data.results; 
}

const fetchDataAndDisplay = async () => {

    try{
        // load all the data

        const allWainwrightsPromise = await getAllWainwrights(); 
        console.log(data);
    
        //display Wainwright information
        const wainwrightsContainer = document.getElementById("wainwrightsContainer"); 

        data.forEach((wainwright) => {

            //create new ul element for each wainwright
            const wainwrightsList = document.createElement("ul"); 

            //create list items
            const wainwrightName = document.createElement("li");
            wainwrightName.innerText = `Name: ${wainwright.name}`; 
            wainwrightsList.appendChild(wainwrightName);

            const wainwrightHeight = document.createElement("li");
            wainwrightHeight.innerText = `Height: ${wainwright.heightMetres}`
            wainwrightsList.appendChild(wainwrightHeight); 

            const wainwrightArea = document.createElement("li");
            wainwrightArea.innerText = `Area: ${wainwright.area}`;
            wainwrightsList.appendChild(wainwrightArea);

            // add the new ul to the wainright container
            wainwrightsContainer.appendChild(wainwrightsList)

        })

    } catch(error) {
        console.error('Error fetching data: ', error); 
    }
}

//below methods do not need to be async because they are taking data from the HTML doc and updating it. no 'asynchronous operations' like fetching data from a server is happening here. 

// function to display updated Wainwrights when filtered

const displayWainwrights = (wainwrights) => {
    const wainwrightsContainer = document.getElementById("wainwrights-list");
    wainwrightsContainer.innerHTML = ""; // to clear the existing content

    data.forEach(wainwright => {

        const filteredList = document.createElement("ul"); 
        
        const filteredName = document.createElement("li");
        filteredName.innerText = `Name: ${wainwright.name}`; 
        filteredList.appendChild(filteredName);

            const filteredHeight = document.createElement("li");
            filteredHeight.innerText = `Height: ${wainwright.heightMetres}`
            filteredList.appendChild(filteredHeight); 

            const filteredArea = document.createElement("li");
            filteredArea.innerText = `Area: ${wainwright.area}`;
            filteredList.appendChild(filteredArea);

            wainwrightsContainer.appendChild(filteredList)
    })

}
fetchDataAndDisplay(); 