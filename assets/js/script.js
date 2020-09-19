var apiKeyJooble = "59249837-731a-40d4-8f77-87656a08d596"
var apiKeyAdzuna = "a340c7044ad462ad2595c48c2fc727af"
var appIdAdzuna = "16a1e151"

var formInputArr = JSON.parse(localStorage.getItem("formInputObj")) || [];
var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistoryObj")) || [];

var jobTitleEl = document.querySelector("#job-title");
var cityEl = document.querySelector("#city")
var radiusEl = document.querySelector("#radius")
var searchBtnLandingEl = document.querySelector("#search-btn-landing")

function searchJobHandler (event) {
    event.preventDefault();
    if (!jobTitleEl.value) {
        // console.log(jobTitleEl.value);
        alert("You must enter a job title!");
        return;
    }
    else {
        var jobTitle = $("#job-title")
            .val()
            .trim();
        var city = $("#city")
            .val()
            .trim();
            // console.log(city)
            if (!cityEl.value) {
                city = ""
            }
        var radius = $("#radius")
            .val()
            .trim();
            if (!radiusEl.value) {
                radius = ""
            }
        var formObj = {
            titleForm: jobTitle,
            cityForm: city,
            radiusForm: radius
        };
        // console.log(formObj.titleForm)
        formInputArr.push(formObj);
        // console.log(formInputArr)
        localStorage.setItem("formInputObj", JSON.stringify(formInputArr));
    };
        getJobsJooble(formObj);
        getJobsAdzuna(formObj);
};

function getJobsJooble (formObj) {
    var url = "https://jooble.org/api/";
    var key = apiKeyJooble;
    var params = "{keywords: '" + formObj.titleForm + "', location: '" + formObj.cityForm + "', radius: '" + formObj.radiusForm + "'}"

    //create xmlHttpRequest object
    var http = new XMLHttpRequest();
    //open connection. true - asynchronous, false - synchronous
    http.open("POST", url + key, true);

    //Send the proper header information
    http.setRequestHeader("Content-type", "application/json");
        
    //Callback when the state changes
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var data = http.response;
            var jsonResponse = JSON.parse(data);
            // console.log(jsonResponse);
            var jobs = jsonResponse.jobs;
            // console.log(formObj)
            // console.log(jobs);
            displayJobsJooble(formObj, jobs);
        }
    }
    //Send request to server
    http.send(params);
};

function getJobsAdzuna (formObj) {
    var apiUrlAdzuna = "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=" + appIdAdzuna + "&app_key=" + apiKeyAdzuna + "&what=" + formObj.titleForm + "&where=" + formObj.cityForm + "&distance=" + formObj.radiusForm
    fetch(apiUrlAdzuna)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // console.log(response)
                console.log(data)
                displayJobsAdzuna(formObj, data)
            });
        }
        else {
            console.log("Error: Input " + response.statusText)
        }
    })
}

function displayJobsJooble(formObj, jobs) {
    for (var i = 0; i < jobs.length;i++) {
        var jobTitle = jobs[i].title
        // console.log(jobTitle)
        var jobLocation = jobs[i].location
        // console.log(jobLocation)
    };
};

function displayJobsAdzuna(formObj, data) {
    var jobResults = data.results
    console.log(jobResults)
    for (var i = 0; i < jobResults.length; i++) {
        var jobTitleResult = jobResults[i].title
        const regex = /(<([^>]+)>)/ig;
        const jobTitle = jobTitleResult.replace(regex,'');
        // console.log(jobTitle)
        var location = jobResults[i].location
        var area = location.area
        var locationName = area[3] + " " + area[1]
        if (!area[3] && !area[1]) {
            var locationName = area[0]
            // console.log(locationName)
        }
        else if (!area[3]) {
            var locationName = area[1]
            // console.log(state)
        }
        console.log(locationName)
    }
}




searchBtnLandingEl.addEventListener("click", searchJobHandler);
