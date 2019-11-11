let TS = {};

TS.SPARQLQUERY = "https://java-dev.rgzm.de/rdf4j-server/repositories/linkedpipes";
TS.SPARQLQUERY_WIKIDATA = "https://query.wikidata.org/sparql";
TS.SPARQLQUERY_WIKIDATA_ENTITY = "https://www.wikidata.org/wiki/Special:EntityData/{ENTITY}.json";

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
                            val = val.replace("http://rsetools.squirrel.link#", "rset:");
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
                response.results.bindings = bindings_copy;
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 100);
};

TS.queryWikidata = (sparql, callback) => {
    setTimeout(function() {
        console.log(sparql);
        $.ajax({
            type: 'GET',
            url: TS.SPARQLQUERY_WIKIDATA,
            data: {
                query: TS.PREFIXES + sparql,
                format: 'json'
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
                response.results.bindings = bindings_copy;
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 100);
};

TS.queryWikidataEntity = (entity, callback) => {
    setTimeout(function() {
        console.log(entity);
        $.ajax({
            type: 'GET',
            url: TS.SPARQLQUERY_WIKIDATA_ENTITY.replace("{ENTITY}", entity),
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
                $("#inp-wikidata").val("null");
                $("#inp-wikidata").css("background-color", "#892a69");
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 100);
};
