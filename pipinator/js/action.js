var obj;
var split;
var FJS;
var map;
var markers;
var toolListGUI = [];

// get single elements in array
let remDoub = (arr) => {
    var temp = new Array();
    arr.sort();
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i + 1]) {
            continue
        }
        temp[temp.length] = arr[i];
    }
    return temp;
}

// get data from server
let setData = (response) => {
    console.log("call", "setData");
    try {
        response = JSON.parse(response);
    } catch (e) {}
    obj = response;
    console.log(obj);
    for (var i = 0; i < obj.length; i++) {
        split = obj[i].tool;
        for (var j = 0; j < split.length; j++) {
            if (split[j] != "") {
                toolListGUI.push(split[j]);
            }
        }
    }
    // fill Filter GUI values
    toolListGUI = remDoub(toolListGUI);
    for (var i = 0; i < toolListGUI.length; i++) {
        var string = "<div class='checkbox'><label><input type='checkbox' value='" + toolListGUI[i] + "' id='tool_criteria-" + i + "'><span>" + toolListGUI[i] + "</span></label></div>";
        $(string).appendTo("#tool_criteria");
    }
    // show number of elements
    $('#total_data').text(obj.length);
    console.log(obj.length);
    // init
    initFiltersHTML();
};

function initFiltersHTML() {
    $('#tool_criteria :checkbox').prop('checked', false);
    initFilters();
}

function initFilters() {
    FJS = FilterJS(obj, '#data', {
        template: '#main_template',
        criterias: [{
            field: 'level',
            ele: '#level_criteria input:checkbox'
        }, {
            field: 'consumes',
            ele: '#consumes_criteria input:checkbox'
        }, {
            field: 'produces',
            ele: '#produces_criteria input:checkbox'
        }, {
            field: 'input',
            ele: '#input_criteria input:checkbox'
        }, {
            field: 'output',
            ele: '#output_criteria input:checkbox'
        }],
        search: {
            ele: '#searchbox'
        },
        callbacks: {
            afterFilter: function(result, jQ) {
                //console.log(result);
                $('#total_data').text(result.length);
            }
        }
    });
    window.FJS = FJS;
    // init filters
}

var highlight = function(id, opt) {
    var thumbnails = document.getElementsByClassName("thumbnail");
    for (var i = 0; i < thumbnails.length; i++) {
        if (id === thumbnails[i].id) {
            $(thumbnails[i]).addClass("active");
        } else {
            $(thumbnails[i]).removeClass("active");
        }
    }
}

var resethighlight = function() {
    var thumbnails = document.getElementsByClassName("thumbnail");
    for (var i = 0; i < thumbnails.length; i++) {
        $(thumbnails[i]).removeClass("active");
    }
}

$(document).ready(function() {
    let q = "SELECT DISTINCT ?s ?name ?description ?date ?author ?toolname ?toolname2 ?toolname3 ?toolname4 ?toolname5 ?state ?state2 ?state3 ?state4 ?state5 ?inputdesc ?inputdesc2 ?inputdesc3 ?inputdesc4 ?inputdesc5 ?outputdesc ?outputdesc2 ?outputdesc3 ?outputdesc4 ?outputdesc5 WHERE { ?s a rset:Pipe. ?s rset:name ?name. ?s rset:description ?description.?s rset:dateOfEntry ?date. ?s rset:author ?author. ?s ?o ?pipestep. ?pipestep rset:uses ?tool . ?pipestep rset:pipeState ?state . ?pipestep rset:hasInput ?input . ?input rset:description ?inputdesc . ?pipestep rset:hasOutput ?output . ?output rset:description ?outputdesc . ?tool rset:name ?toolname . OPTIONAL { ?pipestep ?o ?pipestep2. ?pipestep2 rset:uses ?tool2 . ?pipestep2 rset:pipeState ?state2 . ?pipestep2 rset:hasInput ?input2 . ?input2 rset:description ?inputdesc2 . ?pipestep2 rset:hasOutput ?output2 . ?output2 rset:description ?outputdesc2 . ?tool2 rset:name ?toolname2 . OPTIONAL { ?pipestep2 ?o ?pipestep3. ?pipestep3 rset:uses ?tool3 . ?pipestep3 rset:pipeState ?state3 . ?pipestep3 rset:hasInput ?input3 . ?input3 rset:description ?inputdesc3 . ?pipestep3 rset:hasOutput ?output3 . ?output3 rset:description ?outputdesc3 . ?tool3 rset:name ?toolname3 . OPTIONAL { ?pipestep3 ?o ?pipestep4. ?pipestep4 rset:uses ?tool4 . ?pipestep4 rset:pipeState ?state4 . ?pipestep4 rset:hasInput ?input4 . ?input4 rset:description ?inputdesc4 . ?pipestep4 rset:hasOutput ?output4 . ?output4 rset:description ?outputdesc4 . ?tool4 rset:name ?toolname4 . OPTIONAL { ?pipestep4 ?o ?pipestep5. ?pipestep5 rset:uses ?tool5 . ?pipestep5 rset:pipeState ?state5 . ?pipestep5 rset:hasInput ?input5 . ?input5 rset:description ?inputdesc5 . ?pipestep5 rset:hasOutput ?output5 . ?output5 rset:description ?outputdesc5 . ?tool5 rset:name ?toolname5 . } } } } } ORDER BY ASC(?name)";
    TS.query(q, setData);
});
