var apiKeyJooble = "8148bd6e-0a33-4ebf-9010-ef628b78d3a7"
var apiKeyAdzuna = "a340c7044ad462ad2595c48c2fc727af"
var appIdAdzuna = "16a1e151"

var formInputArr = JSON.parse(localStorage.getItem("formInputObj")) || [];
console.log(formInputArr)
var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistoryObj")) || [];
console.log(searchHistoryArr)
var joobleJobsArr = JSON.parse(localStorage.getItem("joobleJobsObj")) || [];
console.log(joobleJobsArr)
var adzunaJobsArr = JSON.parse(localStorage.getItem("adzunaJobsObj")) || [];
console.log(adzunaJobsArr)

var copyrightYearEl = document.querySelector(".footer-copyright");
var copyrightYearText = document.querySelector("#copyright-year");

var errorMessageEl = document.querySelector("#error-message");
var jobTitleEl = document.querySelector("#job-title");
var cityEl = document.querySelector("#city");
var radiusEl = document.querySelector("#radius");
var searchBtnLandingEl = document.querySelector("#search-btn-landing");

var listingContainerEl = document.querySelector("#listing-container");
var joblistHeaderEl = document.querySelector("#joblist-header");
var listingsListEl = document.querySelector("#listings");

function displayCopyrightYear() {
    $(copyrightYearText).text(new Date().getFullYear());
    // console.log(copyrightYearText)
};

function displayOnLoad(event) {
    event.preventDefault();
    $(listingsListEl).empty();
    var jobTitle = formInputArr.titleForm
    var city = formInputArr.cityForm
    var radius = formInputArr.radiusForm
    var formObj = {
        titleForm: jobTitle,
        cityForm: city,
        radiusForm: radius
    };
    displayJobsHeader(formObj);
    for (var i=0;i<joobleJobsArr.length;i++) {
        var joobleTitle = joobleJobsArr[i].title;
        var joobleLocation = joobleJobsArr[i].location;
        var joobleLink = joobleJobsArr[i].link
        var joobleJobsObj = {
            title: joobleTitle,
            location: joobleLocation,
            link: joobleLink
        };
        displayJobsJooble(joobleJobsObj);
    };
    for (var i=0;i<adzunaJobsArr.length;i++) {
        var adzunaTitle = adzunaJobsArr[i].title;
        var adzunaLoaction = adzunaJobsArr[i].location;
        var adzunaLink = adzunaJobsArr[i].link
        var adzunaJobsObj = {
            title: adzunaTitle,
            location: adzunaLoaction,
            link: adzunaLink
        };
        displayJobsAdzuna(adzunaJobsObj);
    };
};

function searchJobHandler (event) {
    event.preventDefault();
    if (!jobTitleEl.value) {
        // console.log(jobTitleEl.value);
        $(errorMessageEl).addClass("red-text")
        $(errorMessageEl).text("You must enter at least a job title!")
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
    }

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
        else {
            $(errorMessageEl).addClass("red-text")
            $(errorMessageEl).text("Job Title/City Not Found")
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
                console.log(response)
                // console.log(data)
                collectJobsAdzuna(formObj, data)
            });
        }
        else {
            $(errorMessageEl).addClass("red-text")
            $(errorMessageEl).text("Job Title/City Not Found")
        }
    })
};

function collectJobsJooble(formObj, jobs) {
    localStorage.removeItem("joobleJobsObj")
    joobleJobsArr.length = 0;
    for (var i = 0; i < jobs.length; i++) {
        var jobTitle = jobs[i].title
        console.log(jobTitle)
        var jobLocation = jobs[i].location
        console.log(jobLocation)
        var jobUrl = jobs[i].link
        console.log(jobUrl)
        var joobleJobsObj = {
            title: jobTitle,
            location: jobLocation,
            link: jobUrl
        };
        console.log(formObj.titleForm)
        joobleJobsArr.push(joobleJobsObj);
        console.log(formInputArr)
        localStorage.setItem("joobleJobsObj", JSON.stringify(joobleJobsArr));
        displayJobsJooble(joobleJobsObj)
        console.log(joobleJobsObj)
    };
    displayJobsHeader(formObj)
};

function collectJobsAdzuna(formObj, data) {
    localStorage.removeItem("adzunaJobsObj")
    adzunaJobsArr.length = 0;
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
        var adzunaJobsObj = {
            title: jobTitle,
            location: locationName,
            link: jobURL
        };
        adzunaJobsArr.push(adzunaJobsObj);
        localStorage.setItem("adzunaJobsObj", JSON.stringify(adzunaJobsArr));
        displayJobsAdzuna(adzunaJobsObj)
        // console.log(adzunaJobs);
        window.location.href="listings.html"
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

function displayJobsJooble(joobleJobsObj) {
    var joobleListingItem = $("<li>");
        joobleListingItem.addClass("listing-item")
    var joobleListingItemText= joobleJobsObj.title;
    var joobleListingLocation = joobleJobsObj.location;

    var joobleListingLink = $("<a>");
        joobleListingLink.attr("href", joobleJobsObj.link);
        joobleListingLink.attr("target", "_blank");
        joobleListingLink.text(joobleListingItemText + " - " + joobleListingLocation);

        $(listingsListEl).append(joobleListingItem);
        $(joobleListingItem).append(joobleListingLink);
        // console.log(joobleListingItem)
    // var historyLinks = document.querySelector(".listing-item");
    //     console.log(historyLinks)
};

function displayJobsAdzuna(adzunaJobsObj) {
    var adzunaListingItem = $("<li>");
        adzunaListingItem.addClass("listing-item")
    var adzunaListingItemText = adzunaJobsObj.title;
    var adzunaListingLocation = adzunaJobsObj.location;

    var adzunaListingLink = $("<a>");
        adzunaListingLink.attr("href", adzunaJobsObj.link);
        adzunaListingLink.attr("target", "_blank");
        adzunaListingLink.text(adzunaListingItemText + " - " + adzunaListingLocation);

        $(listingsListEl).append(adzunaListingItem);
        $(adzunaListingItem).append(adzunaListingLink);
}

$(listingsListEl).on("click", "a", function(event) {
    var title = $(this).text();
    // console.log(title);
    var link = $(this).attr("href");
    // console.log(link);
    var listingsObj = {
        title: title,
        link: link
    };
    // console.log(listingsObj);
    searchHistoryArr.push(listingsObj);
    localStorage.setItem("searchHistoryObj", JSON.stringify(searchHistoryArr));
});

searchBtnLandingEl.addEventListener("click", searchJobHandler);
displayCopyrightYear();
window.addEventListener("load", displayOnLoad)