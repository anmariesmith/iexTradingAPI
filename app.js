$(document).ready(function() {

  const stockList = ["goog", "msft", "ibm", "goog"];

  for (let i = 0; i < stockList.length; i++) {
    var UC = stockList[i].toUpperCase();
    $(".content").append(
      `<button id = "stockButton" val="${UC}">${UC}</button>&nbsp;`
    );
  }

  const clickMe = function() {
    const buttonVal = $('#stockButton').text();


    console.log(buttonVal);
  
    var apiurl = `http://api.iextrading.com/1.0/stock/${buttonVal}/batch?types=quote,logo,price,news`;
    $.ajax({
      url: apiurl,
      method: "GET"
    }).done(function(r) {
    console.log(r);

    const stockInfoExpand = $('.stockInfoExpand');
    stockInfoExpand.html("");
    const companyLogo= r.logo.url;
    stockInfoExpand.append(`<img src="${companyLogo}" width="100px"></img><br>`);
    const companyName = r.quote.companyName;
    stockInfoExpand.append(`<h1>${companyName}</h1>`);
    const companyPrice = r.price;
    stockInfoExpand.append(`<h4>Current Price: $${companyPrice}(USD)</h4>`);
    
    for (let i= 0; i< r.news.length; i++){
    newsHeadline= r.news[i].headline;
    newsSource= r.news[i].source;
    newsURL= r.news[i].url
    newsSummary= r.news[i].summary;
    stockInfoExpand.append(`<a href="${newsURL}" target="blank"><div class="newsbox"><h3>${newsHeadline}</h3><p>${newsSource}</p><p>${newsSummary}</p></div></a>`)
    }
    });
 
  };

  $("#stockButton").on("click", clickMe);


const newButton = function () {
  const userSymbol= $('#userSymbol').val();
  const userSymbolUC= userSymbol.toUpperCase();
  var apiSymbols = "https://api.iextrading.com/1.0/ref-data/symbols";
  $.ajax({
    url: apiSymbols,
    method: "GET"
  }).done (function (response){
    const validationList= response; 
    for (let i= 0; i< validationList.length; i++){
      if (userSymbolUC === validationList[i].symbol){
      console.log(userSymbolUC)
      $(".newButtons").append(
        `<button id = "stockButton" val="${userSymbolUC}">${userSymbolUC}</button>&nbsp;`
      ) 
      return;
      } else {
        $('#userSymbol').val("");
      }
    }
  });

};
  $('#addButton').on("click", newButton)

});


