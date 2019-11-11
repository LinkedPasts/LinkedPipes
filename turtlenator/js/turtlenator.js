let initModalCreateTool = (result) => {
    let modal = document.getElementById('modalCreateTool');
    let btn = document.getElementById("btn-create-tool");
    btn.onclick = function() {
        TS.query("SELECT * WHERE { ?s a rset:EntryLevel. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillLevel);
        TS.query("SELECT * WHERE { ?s a rset:InputFormat. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillInputFormat);
        TS.query("SELECT * WHERE { ?s a rset:OutputFormat. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillOutputFormat);
        TS.queryWikidata("SELECT * WHERE { ?s wdt:P31 wd:Q73899440; rdfs:label ?label. FILTER((LANG(?label)) = 'en') } ORDER BY (?label)", fillWikidata);
        modal.style.display = "block";
    }
    $("#btn-modal-create-tool-close").click(function() {
        modal.style.display = "none";
    });
    $("#btn-modalCreateTool").on('click', () => {
        createToolTTL();
        copyToClipboard('#hiddenclipboard');
        //let modal = document.getElementById('modalCreateTool');
        //modal.style.display = "none";
    });
};

let initModalCreatePipe = (result) => {
    let modal = document.getElementById('modalCreatePipe');
    let btn = document.getElementById("btn-create-pipe");
    btn.onclick = function() {
        //$("#inp-invno").val("");
        //$("#inp-label").val("");
        modal.style.display = "block";
    }
    $("#btn-modal-create-pipe-close").click(function() {
        modal.style.display = "none";
    });
    $("#btn-modalCreatePipe").on('click', () => {
        //RDF4J.createObject(UUID.getUUIDv4(), $("#inp-invno").val(), $("#inp-label").val(), $("#inp-thumbnail").val(), $("#sel-objecttype option:selected").val(), openModalSaveResponse);
        let modal = document.getElementById('modalCreatePipe');
        //modal.style.display = "none";
    });
};

let fillLevel = (response) => {
    $("#sel-level").html("");
    $("#sel-level").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-level").append(opt);
    }
};

let fillInputFormat = (response) => {
    $("#sel-informat1").html("");
    $("#sel-informat1").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-informat1").append(opt);
    }
    $("#sel-informat2").html("");
    $("#sel-informat2").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-informat2").append(opt);
    }
    $("#sel-informat3").html("");
    $("#sel-informat3").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-informat3").append(opt);
    }
    $("#sel-informat4").html("");
    $("#sel-informat4").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-informat4").append(opt);
    }
    $("#sel-informat5").html("");
    $("#sel-informat5").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-informat5").append(opt);
    }
};

let fillOutputFormat = (response) => {
    $("#sel-outformat1").html("");
    $("#sel-outformat1").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-outformat1").append(opt);
    }
    $("#sel-outformat2").html("");
    $("#sel-outformat2").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-outformat2").append(opt);
    }
    $("#sel-outformat3").html("");
    $("#sel-outformat3").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-outformat3").append(opt);
    }
    $("#sel-outformat4").html("");
    $("#sel-outformat4").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-outformat4").append(opt);
    }
    $("#sel-outformat5").html("");
    $("#sel-outformat5").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-outformat5").append(opt);
    }
};

let fillWikidata = (response) => {
    $("#sel-wikidata").html("");
    $("#sel-wikidata").append(new Option("", null));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-wikidata").append(opt);
    }
};

$("#sel-wikidata").change(function() {
    $("#inp-wikidata").val("");
    $("#inp-wikidata").val($("#sel-wikidata option:selected").val().replace("http://www.wikidata.org/entity/", ""));
});

$("#btn-entitysearch").click(function() {
    TS.queryWikidataEntity($("#inp-wikidatastr").val(), fillWikidataEntity);
});

let fillWikidataEntity = (response) => {
    $("#inp-wikidata").val("");
    let eid = Object.keys(response.entities)[0];
    $("#inp-wikidata").val(response.entities[eid].id + " | " + response.entities[eid].labels.en.value).attr("uri", "wd:" + response.entities[eid].id);
    $("#inp-wikidata").css("background-color", "LIGHTGREEN");
};

let copyToClipboard = (element) => {
    var text = $("#hiddenclipboard").clone().find('br').prepend('\r\n').end().val();
    element = $('<textarea>').appendTo('body').val(text).select();
    document.execCommand('copy');
    element.remove();
};

let createToolTTL = () => {
    // check input fields
    let valide = true;
    if ($("#inp-wikidata").val().includes("null")) {
        valide = false;
        console.log(false, "wikidata");
    }
    if ($("#inp-name").val().length === 0) {
        valide = false;
        console.log(false, "name");
    }
    if ($("#inp-description").val().length === 0) {
        valide = false;
        console.log(false, "description");
    }
    if ($("#sel-level option:selected").val() === "-1") {
        valide = false;
        console.log(false, "level");
    }
    if ($("#sel-consumeslod option:selected").val() === "-1") {
        valide = false;
        console.log(false, "consumeslod");
    }
    if ($("#sel-produceslod option:selected").val() === "-1") {
        valide = false;
        console.log(false, "produceslod");
    }

    if (valide == false) {
        $("#alertdiv").show();
        $("#hiddenclipboard").val("");
    } else {
        $("#alertdiv").hide();
        // create triples
        let ttl = "";
        ttl += "@prefix rset: <http://rsetools.squirrel.link#> .\r\n";
        ttl += "@prefix wd: <http://www.wikidata.org/entity/> .\r\n";
        ttl += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\r\n\r\n";
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        ttl += $("#inp-wikidata").attr("uri") + " rset:rset:dateOfEntry " + "'" + formatted_date + "'" + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " a " + " rset:Tool " + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " a " + " rset:LinkedTool " + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " rset:name " + "'" + $('#inp-name').val() + "'" + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " rset:description " + "'" + $('#inp-description').val() + "'" + ".\r\n";
        if ($("#inp-link1").val().includes("http")) {
            ttl += $("#inp-wikidata").attr("uri") + " rset:link " + "<" + $('#inp-link1').val() + ">" + ".\r\n";
        }
        if ($("#inp-link2").val().includes("http")) {
            ttl += $("#inp-wikidata").attr("uri") + " rset:link " + "<" + $('#inp-link2').val() + ">" + ".\r\n";
        }
        if ($("#inp-link2").val().includes("http")) {
            ttl += $("#inp-wikidata").attr("uri") + " rset:link " + "<" + $('#inp-link3').val() + ">" + ".\r\n";
        }
        ttl += $("#inp-wikidata").attr("uri") + " rset:entryLevel " + "" + $("#sel-level option:selected").val() + "" + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " rset:consumesLOD " + "'" + $("#sel-consumeslod option:selected").val() + "'" + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " rset:producesLOD " + "'" + $("#sel-produceslod option:selected").val() + "'" + ".\r\n";
        if ($("#sel-informat1 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:inputFormat " + "" + $("#sel-informat1 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-informat2 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:inputFormat " + "" + $("#sel-informat2 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-informat3 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:inputFormat " + "" + $("#sel-informat3 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-informat4 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:inputFormat " + "" + $("#sel-informat4 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-informat5 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:inputFormat " + "" + $("#sel-informat5 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-outformat1 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:outputFormat " + "" + $("#sel-outformat1 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-outformat2 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:outputFormat " + "" + $("#sel-outformat2 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-outformat3 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:outputFormat " + "" + $("#sel-outformat3 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-outformat4 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:outputFormat " + "" + $("#sel-outformat4 option:selected").val() + "" + ".\r\n";
        }
        if ($("#sel-outformat5 option:selected").val() != "-1") {
            ttl += $("#inp-wikidata").attr("uri") + " rset:outputFormat " + "" + $("#sel-outformat5 option:selected").val() + "" + ".\r\n";
        }
        $("#hiddenclipboard").val(ttl);
    }
};

// INIT
initModalCreateTool();
initModalCreatePipe();
$("#alertdiv").hide();
$("#hiddenclipboard").hide();
