var savedInput = JSON.parse(localStorage.getItem("formInputObj"));
console.log(savedInput)


if (savedInput.length <= 0){
    // tell them there is nothing 
} else {

    for (var i = 0; i < savedInput.length; i++){
        console.log(savedInput[i]);

        var resultPage = document.getElementById("results");
        var listDiv = document.createElement("div");

        var listUl = document.createElement("ul");

        var listCity = document.createElement("p");
        listCity.setAttribute("class", "city");

        var listTitle = document.createElement("p");
        listTitle.setAttribute("class", "title");

        var listRadius = document.createElement("p");
        listRadius.setAttribute("class", "radius");

        listCity.append("City: " + savedInput[i].cityForm);
        listTitle.append("Title: " + savedInput[i].titleForm);
        listRadius.append("Radius: " + savedInput[i].radiusForm);

        listDiv.append(listCity);
        listDiv.append(listTitle);
        listDiv.append(listRadius);
       
 
        resultPage.append(listDiv)
    

    }

}

