var apiKeyJooble = "59249837-731a-40d4-8f77-87656a08d596"
var apiKeyAdzuna = "a340c7044ad462ad2595c48c2fc727af"
var appIdAdzuna = "16a1e151"

var formInputArr = JSON.parse(localStorage.getItem("formInputObj")) || [];
// console.log(formInputArr)
var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistoryObj")) || [];
console.log(searchHistoryArr)

var copyrightYearEl = document.querySelector(".footer-copyright");
var copyrightYearText = document.querySelector("#copyright-year")
var jobTitleEl = document.querySelector("#job-title");
var cityEl = document.querySelector("#city");
var radiusEl = document.querySelector("#radius");
var searchBtnLandingEl = document.querySelector("#search-btn-landing");
var searchBtnEl = document.querySelector("#search-btn")

var listingContainerEl = document.querySelector("#listing-container");
var joblistHeaderEl = document.querySelector("#joblist-header")
var listingsListEl = document.querySelector("#listings");

function displayCopyrightYear() {
    $(copyrightYearText).text(new Date().getFullYear())
    // console.log(copyrightYearText)
}

function searchFormHandler (event) {
    // jobTitleEl.value = formInputArr.titleForm
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
        window.location.href="listings.html"
    };
};

// function loadListingPage() {
//     window.location.href = "listings.html"
// };


// searchBtnLandingEl.addEventListener("mousedown", loadListingPage);
searchBtnLandingEl.addEventListener("click", searchFormHandler)
displayCopyrightYear();