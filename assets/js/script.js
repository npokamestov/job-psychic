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
        // getJobsJooble(formObj);
        getJobsAdzuna(formObj);
};

// function getJobsJooble (formObj) {
//     var apiUrlJooble = "https://jooble.org/api/" + apiKeyJooble + "/?keywords=" + formObj.titleForm;
//     fetch(apiUrlJooble)
//         .then(function(response) {
//             if (response.ok) {
//                 response.json().then(function(data) {
//                     console.log(response)
//                     console.log(data)
//                 })
//             }
//         })
// };

function getJobsAdzuna (formObj) {
    var apiUrlAdzuna = "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=" + appIdAdzuna + "&app_key=" + apiKeyAdzuna + "&what=" + formObj.titleForm + "&where=" + formObj.cityForm + "&distance=" + formObj.radiusForm
    fetch(apiUrlAdzuna)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(response)
                console.log(data)
            })
        }
    })
}

searchBtnLandingEl.addEventListener("click", searchJobHandler);