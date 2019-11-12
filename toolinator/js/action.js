var obj;
var split;
var FJS;
var map;
var markers;
var levelListGUI = [];
var consumesListGUI = [];
var producesListGUI = [];
var inListGUI = [];
var outListGUI = [];

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
        split = obj[i].input;
        for (var j = 0; j < split.length; j++) {
            if (split[j] != "") {
                inListGUI.push(split[j]);
            }
        }
        split = obj[i].output;
        for (var j = 0; j < split.length; j++) {
            if (split[j] != "") {
                outListGUI.push(split[j]);
            }
        }
        levelListGUI.push(obj[i].level);
        consumesListGUI.push(obj[i].consumes);
        producesListGUI.push(obj[i].produces);
    }
    // fill Filter GUI values
    levelListGUI = remDoub(levelListGUI);
    for (var i = 0; i < levelListGUI.length; i++) {
        var string = "<div class='checkbox'><label><input type='checkbox' value='" + levelListGUI[i] + "' id='level_criteria-" + i + "'><span>" + levelListGUI[i] + "</span></label></div>";
        $(string).appendTo("#level_criteria");
    }
    consumesListGUI = remDoub(consumesListGUI);
    for (var i = 0; i < consumesListGUI.length; i++) {
        var string = "<div class='checkbox'><label><input type='checkbox' value='" + consumesListGUI[i] + "' id='consumes_criteria-" + i + "'><span>" + consumesListGUI[i] + "</span></label></div>";
        $(string).appendTo("#consumes_criteria");
    }
    producesListGUI = remDoub(producesListGUI);
    for (var i = 0; i < producesListGUI.length; i++) {
        var string = "<div class='checkbox'><label><input type='checkbox' value='" + producesListGUI[i] + "' id='produces_criteria-" + i + "'><span>" + producesListGUI[i] + "</span></label></div>";
        $(string).appendTo("#produces_criteria");
    }
    inListGUI = remDoub(inListGUI);
    for (var i = 0; i < inListGUI.length; i++) {
        var string = "<div class='checkbox'><label><input type='checkbox' value='" + inListGUI[i] + "' id='input_criteria-" + i + "'><span>" + inListGUI[i] + "</span></label></div>";
        $(string).appendTo("#input_criteria");
    }
    outListGUI = remDoub(outListGUI);
    for (var i = 0; i < outListGUI.length; i++) {
        var string = "<div class='checkbox'><label><input type='checkbox' value='" + outListGUI[i] + "' id='output_criteria-" + i + "'><span>" + outListGUI[i] + "</span></label></div>";
        $(string).appendTo("#output_criteria");
    }
    // show number of elements
    $('#total_data').text(obj.length);
    console.log(obj.length);
    // init
    initFiltersHTML();
};

function initFiltersHTML() {
    $('#level_criteria :checkbox').prop('checked', false);
    $('#consumes_criteria :checkbox').prop('checked', false);
    $('#produces_criteria :checkbox').prop('checked', false);
    $('#input_criteria :checkbox').prop('checked', false);
    $('#output_criteria :checkbox').prop('checked', false);
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
    let q = "SELECT DISTINCT * WHERE { ?s a rset:LinkedTool. ?s rset:name ?name. ?s rset:description ?description. ?s rset:dateOfEntry ?date. ?s rset:entryLevel ?level. ?s rset:consumesLOD ?consumes. ?s rset:producesLOD ?produces. ?s rset:inputFormat ?input. ?s rset:outputFormat ?output. ?s rset:wikidataid ?id. ?s rset:link ?link. } ORDER BY ASC(?name)";
    TS.query(q, setData);
});
