var formInputArr = JSON.parse(localStorage.getItem("formInputObj")) || [];
var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistoryObj")) || [];

var jobTitleEl = document.querySelector("#job-title");
// console.log(jobTitleEl)
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
        var state = $("#state-selector")
            .val()
            .trim();
            // console.log(state)
        var radius = $("#radius")
            .val()
            .trim();
            // console.log(radius)
        var formObj = {
            titleForm: jobTitle,
            cityForm: city,
            stateForm: state,
            radiusForm: radius
        };
        // console.log(formObj)
        formInputArr.push(formObj);
        // console.log(formInputArr)
        localStorage.setItem("formInputObj", JSON.stringify(formInputArr));
    };
        getJobsMonster(formObj);
        getJobsIndeed(formObj);
        getjobsGlass(formObj);
};



searchBtnLandingEl.addEventListener("click", searchJobHandler);