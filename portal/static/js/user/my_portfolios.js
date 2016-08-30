// $( window ).load(function() {
//     $("body").fadeIn(1000);
// });
function goStock(e) {
    $(".statusbar")[0].innerText = "Loading " + e.innerText + "'s Stock Information ..."
    $(".statusbar").show()
    $("#company_name")[0].value = e.innerText;
    document.forms["myForm"].submit();
};
console.log($("span#priceChange") )
//portfolio search functions
let availableTags, portDict, stockDict
    compileData()
    function compileData() {
        availableTags = []
        portDict = [];
        stockDict = {};
        tagStocks(availableTags, portDict, stockDict);
        $( "#tags" ).autocomplete({
          source: availableTags
        });
        $("#ui-id-1").click(function(e){
            // $(".stocked").removecss('border','0px')
            var last = $(".stocked")
            last.removeClass( "stocked" ).css('border','0px')
            search($("#tags")[0].value, portDict, stockDict)
        });
        $("#tags").click(function(e){
            if (e.currentTarget.value == "Search") {
                e.currentTarget.value = ''
            }
        });
    };
    function tagStocks(arr, portDict, stockDict) {
        var stocks = $("a#stockLink")
        for (var key in stocks){
            if (parseInt([key])+1) {
                arr.push(stocks[key].innerText)
                var stockKey = stocks[key].innerText
                var parentNode = stocks[key].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                if (stockDict[stockKey]) {
                    stockDict[stockKey].push(parentNode);
                } else {
                    stockDict[stockKey] = [parentNode]
                }
            }
        }
        var portfolios = $("h2#portfolioName")
        for (var key in portfolios) {
            if (parseInt([key])+1) {
                arr.push(portfolios[key].outerText)
                portDict.push(portfolios[key].outerText)
            }
        }
    };
    function search(str, portDict, stockDict) {
        if (portDict.indexOf(str) > -1 ) {
            sortIt('query',str, '')
        } else {
            sortIt('stock',str, stockDict)
        }
    };
    function sortIt(param, str, arr) {
        if (param == 'query') {
            for (var key in $("h2#portfolioName")) {
                if (parseInt([key]+1)) {
                    if (str == $("h2#portfolioName")[key].outerText) {
                        var thisPort = $("h2#portfolioName")[key].parentNode.parentNode
                        var pin = $("#pin")
                        pin.prepend(thisPort)
                    }
                }
            }
        } else if (param =='stock') {
            stockDict[str].forEach(function(x,i) {
                var tbody = x.children[1].children[0].children[0].children[2].children[1].children
                for (var key in tbody) {
                    if (typeof(tbody[key]) == 'object') {
                        if (str == tbody[key].children[0].outerText) {
                            tbody[0].parentNode.insertBefore(tbody[key], tbody[0].parentNode.firstChild).setAttribute("class","stocked")
                            $(".stocked").css('border','5px solid blue')
                            // tbody[key-1].style.border = "3px solid blue"
                            // tbody[key].setAttribute("id","bordered")
                            var qName = stockDict[str][0].children[0].children[1].outerText
                            sortIt('query',qName,'')
                        }
                    }
                }
            })
        }
    };
    function runScript(e) {
        if (e.keyCode == 13) {  
            var last = $(".stocked")
            last.removeClass( "stocked" ).css('border','0px')
            search($("#tags")[0].value, portDict, stockDict)            
        }
    }    
//calculate percentages    
    var priceChanges = $("span#priceChange") 
    for (var key in priceChanges) {
        var obj = priceChanges[key]
        if (typeof(obj) == 'object' && obj.nodeName == 'SPAN') {
            var percentage = (((parseFloat(obj.parentNode.outerText) - parseFloat(obj.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText)) / parseFloat(obj.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText))*100).toFixed(2)
            if (percentage > 0) {
                obj.innerHTML = "<span style='color:rgba(0,255,0,1)'>" + (" + " + (((parseFloat(obj.parentNode.outerText) - parseFloat(obj.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText)) / parseFloat(obj.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText))*100).toFixed(2) + "%") + "</span>"
            } else {
                obj.innerHTML = "<span style='color:rgba(255,0,0,1)'>" + (" - "+(((parseFloat(obj.parentNode.outerText) - parseFloat(obj.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText)) / parseFloat(obj.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText))*-100).toFixed(2) + "%") + "</span>"
            }
        }
    }
  
//navbar bug fix
$(".page-navigation li a").click(function(e){
    renav(e)       
});
$(".iport").click(function(e) {
    renav(e)
})
function renav(e) {
    var ul = $(this).parent('li').children('ul');
    if (e.currentTarget.id !== 'myPortfolios') {
        $(".statusbar").show()
        setTimeout(function(){ 
            var url = e.currentTarget.id
                console.log(url)
                if (url) {
                location.assign(url)
            }
        }, 500);
    } else {
        console.log("asdf")
    }
};