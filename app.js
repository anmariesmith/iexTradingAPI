//Global scope variables and functions//
const stockList = ["aapl", "msft", "ibm", "goog"];

const showAPI = function() {
  const buttonVal = $(this).text(); //this gets the text from the button that was just clicked
  console.log(buttonVal); //this logs it to console so you can see

   var apiurl = `https://api.iextrading.com/1.0/stock/${buttonVal}/batch?types=quote,logo,price,news`;
  $.ajax({
    url: apiurl,
    method: "GET"
  }).done(function(r) {
    console.log(r);

    const stockInfoExpand = $(".stockInfoExpand");
    stockInfoExpand.html("");
    const companyLogo = r.logo.url;
    stockInfoExpand.append(`<img src="${companyLogo}" class="ml-3" width="100px"></img><br>`);
    const companyName = r.quote.companyName;
    stockInfoExpand.append(`<h1 class="ml-3">${companyName}</h1>`);
    const companyPrice = r.price;
    stockInfoExpand.append(`<h4 class="ml-3 mb-3">Current Price: $${companyPrice}(USD)</h4>`);

    for (let i = 0; i < r.news.length; i++) {
      newsHeadline = r.news[i].headline;
      newsSource = r.news[i].source;
      newsURL = r.news[i].url;
      newsSummary = r.news[i].summary;
      stockInfoExpand.append(
        `<a href="${newsURL}" target="blank"><div class="newsbox"><h3>${newsHeadline}</h3><p>${newsSource}</p><p>${newsSummary}</p></div></a>`
      );
    }
  }); 
};

const makeStockButtons = function() {
  for (let i = 0; i < stockList.length; i++) {
    var upperCase = stockList[i].toUpperCase();
    let buttonHTML = $(`<button class="btn ml-2 id = "stockButton" val="${upperCase}">${upperCase}</button>`);
    buttonHTML.on("click", showAPI);
    $(".contentStock").append(buttonHTML);
  }
};

makeStockButtons();

const makeButton= function() {
  const userSymbol = $("#userSymbol").val();
  const userSymbolUC = userSymbol.toUpperCase();
  var apiSymbols = "https://api.iextrading.com/1.0/ref-data/symbols";
  $.ajax({
    url: apiSymbols,
    method: "GET"
  }).done(function(response) {
    const validationList = response;
    for (let i = 0; i < validationList.length; i++) {
      if (userSymbolUC === validationList[i].symbol) {
        console.log(userSymbolUC);
        let newButtonHTML= $(
          `<button class="btn ml-2 mb-3" id="stockButton" val="${userSymbolUC}">${userSymbolUC}</button>&nbsp;`
        );
        newButtonHTML.on("click", showAPI);
        $(".newButtons").append(newButtonHTML);
        return;
      } else {
        $("#userSymbol").val("");
      }
    }
  });
};
$("#addButton").on("click", makeButton);
