let TS = {};

TS.SPARQLQUERY = "http://sandbox.mainzed.org/hungrysquirrels/sparql";

TS.PREFIXES =
    "PREFIX rset: <http://rsetools.squirrel.link#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX wd: <http://www.wikidata.org/entity/> PREFIX wdt: <http://www.wikidata.org/prop/direct/> PREFIX pipe: <http://linkedpipes.xyz/pipes#>";

TS.query = (sparql, callback) => {
    setTimeout(function() {
        console.log(sparql);
        $.ajax({
            type: 'GET',
            //async: false,
            url: TS.SPARQLQUERY,
            dataType: 'jsonp',
            data: {
                queryLn: 'SPARQL',
                query: TS.PREFIXES + sparql,
                Accept: 'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                var vars = response.head.vars;
                var bindings = response.results.bindings;
                const bindings_copy = Object.assign({}, bindings);
                for (var item in bindings) {
                    for (var varstr in vars) {
                        var tblTxt = "";
                        if (bindings[item][vars[varstr]].type === "uri") {
                            var val = bindings[item][vars[varstr]].value;
                            val = val.replace("http://rsetools.squirrel.link#", "");
                            bindings_copy[item][vars[varstr]].value = val;
                        } else if (bindings[item][vars[varstr]]["xml:lang"]) {
                            //bindings_copy[item][vars[varstr]].value = bindings[item][vars[varstr]].value + "@" + bindings[item][vars[varstr]]["xml:lang"];
                        } else if (bindings[item][vars[varstr]].type === "bnode") {
                            bindings_copy[item][vars[varstr]].value = "_:" + bindings[item][vars[varstr]].value;
                        } else {
                            bindings_copy[item][vars[varstr]].value = bindings[item][vars[varstr]].value
                        }
                    }
                }
                let arrItems = [];
                for (var item in bindings) {
                    arrItems.push(bindings[item]['date'].value);
                }
                arrItems = remDoub(arrItems);
                console.log(arrItems);
                let arr = [];
                console.log(bindings);
                for (var d in arrItems) {
                    let obj = [];
                    let arrLevel = [];
                    let arrCons = [];
                    let arrProd = [];
                    let arrIn = [];
                    let arrOut = [];
                    let arrLinks = [];
                    for (var item in bindings) {
                        if (bindings[item]['date'].value.includes(arrItems[d])) {
                            obj.level = bindings[item]['level'].value;
                            obj.name = bindings[item]['name'].value;
                            obj.description = bindings[item]['description'].value;
                            obj.date = bindings[item]['date'].value;
                            obj.consumes = bindings[item]['consumes'].value;
                            obj.produces = bindings[item]['produces'].value;
                            obj.id = bindings[item]['id'].value;
                            obj.url = "http://www.wikidata.org/entity/" + bindings[item]['id'].value;
                            arrIn.push(bindings[item]['input'].value);
                            arrOut.push(bindings[item]['output'].value);
                            arrLinks.push("<br>" + bindings[item]['link'].value);
                        }
                    }
                    arrIn = remDoub(arrIn);
                    arrOut = remDoub(arrOut);
                    arrLinks = remDoub(arrLinks);
                    obj.input = arrIn;
                    obj.output = arrOut;
                    let links = arrLinks.toString();
                    obj.link = links.replace(",", "");
                    arr.push(obj);
                }
                console.log(arr);
                response.results.bindings = bindings_copy;
                if (typeof callback === 'function') {
                    callback(arr);
                } else {
                    return arr;
                }
            }
        });
    }, 100);
};
