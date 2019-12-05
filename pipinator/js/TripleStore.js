let TS = {};

TS.SPARQLQUERY = "http://sandbox.mainzed.org/hungrysquirrels/sparql";

TS.PREFIXES =
    "PREFIX rset: <http://rsetools.squirrel.link#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX wd: <http://www.wikidata.org/entity/> PREFIX wdt: <http://www.wikidata.org/prop/direct/> PREFIX pipe: <http://linkedpipes.xyz/pipes#>";

TS.query = (sparql, callback) => {
    setTimeout(function() {
        console.log(sparql);
        $.ajax({
            type: 'POST',
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
                console.log(bindings);
                /*for (var item in bindings) {
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
                }*/
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
                    let arrTool = [];
                    for (var item in bindings) {
                        if (bindings[item]['date'].value.includes(arrItems[d])) {
                            obj.name = bindings[item]['name'].value;
                            obj.description = bindings[item]['description'].value;
                            obj.date = bindings[item]['date'].value;
                            obj.author = bindings[item]['author'].value;
                            obj.id = bindings[item]['s'].value;
                            obj.url = bindings[item]['s'].value;
                            obj.step1 = "";
                            if (typeof bindings[item]['toolname'] !== 'undefined') {
                                arrTool.push(bindings[item]['toolname'].value);
                                let tmp = {};
                                tmp.tool = bindings[item]['toolname'].value;
                                tmp.state = bindings[item]['state'].value.replace("http://rsetools.squirrel.link#", "");
                                tmp.in = bindings[item]['inputdesc'].value;
                                tmp.out = bindings[item]['outputdesc'].value;
                                obj.step1 = JSON.stringify(tmp);
                            }
                            obj.step2 = "";
                            if (typeof bindings[item]['toolname2'] !== 'undefined') {
                                arrTool.push(bindings[item]['toolname2'].value);
                                let tmp = {};
                                tmp.tool = bindings[item]['toolname2'].value;
                                tmp.state = bindings[item]['state2'].value.replace("http://rsetools.squirrel.link#", "");
                                tmp.in = bindings[item]['inputdesc2'].value;
                                tmp.out = bindings[item]['outputdesc2'].value;
                                obj.step2 = JSON.stringify(tmp);
                            }
                            obj.step3 = "";
                            if (typeof bindings[item]['toolname3'] !== 'undefined') {
                                arrTool.push(bindings[item]['toolname3'].value);
                                let tmp = {};
                                tmp.tool = bindings[item]['toolname3'].value;
                                tmp.state = bindings[item]['state3'].value.replace("http://rsetools.squirrel.link#", "");
                                tmp.in = bindings[item]['inputdesc3'].value;
                                tmp.out = bindings[item]['outputdesc3'].value;
                                obj.step3 = JSON.stringify(tmp);
                            }
                            obj.step4 = "";
                            if (typeof bindings[item]['toolname4'] !== 'undefined') {
                                arrTool.push(bindings[item]['toolname4'].value);
                                let tmp = {};
                                tmp.tool = bindings[item]['toolname4'].value;
                                tmp.state = bindings[item]['state4'].value.replace("http://rsetools.squirrel.link#", "");
                                tmp.in = bindings[item]['inputdesc4'].value;
                                tmp.out = bindings[item]['outputdesc4'].value;
                                obj.step4 = JSON.stringify(tmp);
                            }
                            obj.step5 = "";
                            if (typeof bindings[item]['toolname5'] !== 'undefined') {
                                arrTool.push(bindings[item]['toolname5'].value);
                                let tmp = {};
                                tmp.tool = bindings[item]['toolname5'].value;
                                tmp.state = bindings[item]['state5'].value.replace("http://rsetools.squirrel.link#", "");
                                tmp.in = bindings[item]['inputdesc5'].value;
                                tmp.out = bindings[item]['outputdesc5'].value;
                                obj.step5 = JSON.stringify(tmp);
                            }
                        }
                    }
                    arrTool = remDoub(arrTool);
                    obj.tool = arrTool;
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
