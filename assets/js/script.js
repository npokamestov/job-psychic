var apiKeyJooble = "59249837-731a-40d4-8f77-87656a08d596"
var apiKeyAdzuna = "a340c7044ad462ad2595c48c2fc727af"
var appIdAdzuna = "16a1e151"

var formInputArr = JSON.parse(localStorage.getItem("formInputObj")) || [];
console.log(formInputArr)
var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistoryObj")) || [];
// console.log(searchHistoryArr)

var copyrightYearEl = document.querySelector(".footer-copyright");
var copyrightYearText = document.querySelector("#copyright-year")
var jobTitleEl = document.querySelector("#job-title");
var cityEl = document.querySelector("#city");
var radiusEl = document.querySelector("#radius");
var searchBtnLandingEl = document.querySelector("#search-btn-landing");

var listingContainerEl = document.querySelector("#listing-container");
var joblistHeaderEl = document.querySelector("#joblist-header")
var listingsListEl = document.querySelector("#listings");


function displayCopyrightYear() {
    $(copyrightYearText).text(new Date().getFullYear())
    // console.log(copyrightYearText)
}

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
        formInputArr.pop(formObj)
        localStorage.setItem("formInputObj", JSON.stringify(formInputArr));
        // console.log(formObj.titleForm)
        formInputArr.push(formObj);
        // console.log(formInputArr)
        localStorage.setItem("formInputObj", JSON.stringify(formInputArr));
    };

        $(listingsListEl).empty();
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
            collectJobsJooble(formObj, jobs);
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
                // console.log(data)
                collectJobsAdzuna(formObj, data)
            });
        }
        else {
            console.log("Error: Input " + response.statusText)
        }
    })
};

function collectJobsJooble(formObj, jobs) {
    for (var i = 0; i < jobs.length; i++) {
        var jobTitle = jobs[i].title
        // console.log(jobTitle)
        var jobLocation = jobs[i].location
        // console.log(jobLocation)
        var jobUrl = jobs[i].link
        // console.log(jobUrl)
        var joobleJobs = {
            title: jobTitle,
            location: jobLocation,
            link: jobUrl
        };
        displayJobsJooble(joobleJobs)
        // console.log(joobleJobs)
    };
    displayJobsHeader(formObj)
};

function collectJobsAdzuna(formObj, data) {
    var jobResults = data.results
    // console.log(jobResults)
    for (var i = 0; i < jobResults.length; i++) {
        var jobTitleResult = jobResults[i].title
        var regex = /(<([^>]+)>)/ig;
        var jobTitle = jobTitleResult.replace(regex,'');
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
        var jobURL = jobResults[i].redirect_url;
        // console.log(jobURL)
        // console.log(locationName)
        var adzunaJobs = {
            title: jobTitle,
            location: locationName,
            link: jobURL
        };
        displayJobsAdzuna(adzunaJobs);
        // console.log(adzunaJobs);
    }
};

function displayJobsHeader(formObj) {
    // $(listingContainerEl).empty();
    var jobsListHeader = $("#joblist-header");
        jobsListHeader.addClass("capitalize");
        jobsListHeader.text("Showing listings for: " + formInputArr[0].titleForm)
        // console.log(jobsListHeader);
        $(listingContainerEl).prepend(jobsListHeader);
};

function displayJobsJooble(joobleJobs) {
    // $(listingsListEl).empty();
    var joobleListingContainer = $("<div>");
    var joobleListingList = $("<ul>");
    var joobleListingItem = $("<li>");
    var joobleListingItemText= joobleJobs.title;
    var joobleListingLocation = joobleJobs.location
    var joobleListingLink = $("<a>")
        joobleListingLink.attr("href", joobleJobs.link)
        joobleListingLink.text(joobleListingItemText + " - " + joobleListingLocation)
        // console.log(joobleListingLink)
    
        // console.log(joobleListingItemText)
        // console.log(joobleJobs.title);
    
        // console.log(joobleListingLocation)
        // $(listingContainerEl).append(joobleListingContainer)
        // $(joobleListingContainer).append(joobleListingList)
        $(listingsListEl).append(joobleListingItem)
        $(joobleListingItem).append(joobleListingLink)
        console.log(joobleListingItem)
};

function displayJobsAdzuna(adzunaJobs) {
    var jobListingContainer = $("<div>");
    var jobListingList = $("<ul>");
    var jobListingLink = $("<a>")
        jobListingLink.attr("href", adzunaJobs.link)
        // console.log(jobListingLink)
    var jobListingItem = $("<li>");
        jobListingItem.text(adzunaJobs.title)
        // console.log(adzunaJobs.title)
    var jobListingLocation = adzunaJobs.location
        // console.log(jobListingLocation)
}

searchBtnLandingEl.addEventListener("click", searchJobHandler);
displayCopyrightYear();
