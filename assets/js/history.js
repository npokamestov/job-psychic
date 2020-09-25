var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistoryObj")) || [];
var historyListEl = document.querySelector("#history");
var clearBtn = document.querySelector("#clear-history");

function clearHistory(searchHistoryArr) {
    localStorage.removeItem("searchHistoryObj");
    displayHistory(searchHistoryArr)
};

function displayHistory(searchHistoryArr) {
    $(historyListEl).empty();
    for (var i=0;i<searchHistoryArr.length;i++) {
        var historyListingItem = $("<li>");
            historyListingItem.addClass("listing-item")
        var historyListingItemText= searchHistoryArr[i].title;

        var historyListingLink = $("<a>");
            historyListingLink.attr("href", searchHistoryArr[i].link);
            historyListingLink.attr("target", "_blank");
            historyListingLink.text(historyListingItemText);

            $(historyListEl).append(historyListingItem);
            $(historyListingItem).append(historyListingLink);
            // console.log(joobleListingItem)
    };
}

clearBtn.addEventListener("click", clearHistory);
displayHistory(searchHistoryArr)