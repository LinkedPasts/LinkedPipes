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
    });
};

let initModalCreatePipe = (result) => {
    let modal = document.getElementById('modalCreatePipe');
    let btn = document.getElementById("btn-create-pipe");
    btn.onclick = function() {
        TS.query("SELECT * WHERE { ?s a rset:LinkedTool. ?s rset:name ?label.} ORDER BY ASC(?label)", fillPipeTools);
        TS.query("SELECT * WHERE { ?s a rset:PipeState. ?s rdfs:label ?label.} ORDER BY ASC(?label)", fillPipeStates);
        modal.style.display = "block";
    }
    $("#btn-modal-create-pipe-close").click(function() {
        modal.style.display = "none";
    });
    $("#btn-modalCreatePipe").on('click', () => {
        createPipeTTL();
        copyToClipboardP('#hiddenclipboardp');
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

let fillPipeTools = (response) => {
    $("#sel-pipetool1").html("");
    $("#sel-pipetool1").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value.replace("http://www.wikidata.org/entity/", "wd:");
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri.replace("http://www.wikidata.org/entity/", "wd:")).attr("label", label);
        $("#sel-pipetool1").append(opt);
    }
    $("#sel-pipetool2").html("");
    $("#sel-pipetool2").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value.replace("http://www.wikidata.org/entity/", "wd:");
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri.replace("http://www.wikidata.org/entity/", "wd:")).attr("label", label);
        $("#sel-pipetool2").append(opt);
    }
    $("#sel-pipetool3").html("");
    $("#sel-pipetool3").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value.replace("http://www.wikidata.org/entity/", "wd:");
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri.replace("http://www.wikidata.org/entity/", "wd:")).attr("label", label);
        $("#sel-pipetool3").append(opt);
    }
    $("#sel-pipetool4").html("");
    $("#sel-pipetool4").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value.replace("http://www.wikidata.org/entity/", "wd:");
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri.replace("http://www.wikidata.org/entity/", "wd:")).attr("label", label);
        $("#sel-pipetool4").append(opt);
    }
    $("#sel-pipetool5").html("");
    $("#sel-pipetool5").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value.replace("http://www.wikidata.org/entity/", "wd:");
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri.replace("http://www.wikidata.org/entity/", "wd:")).attr("label", label);
        $("#sel-pipetool5").append(opt);
    }
};

let fillPipeStates = (response) => {
    $("#sel-pipestate1").html("");
    $("#sel-pipestate1").append(new Option("", -1));
    let values = response.results.bindings;
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-pipestate1").append(opt);
    }
    $("#sel-pipestate2").html("");
    $("#sel-pipestate2").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-pipestate2").append(opt);
    }
    $("#sel-pipestate3").html("");
    $("#sel-pipestate3").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-pipestate3").append(opt);
    }
    $("#sel-pipestate4").html("");
    $("#sel-pipestate4").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-pipestate4").append(opt);
    }
    $("#sel-pipestate5").html("");
    $("#sel-pipestate5").append(new Option("", -1));
    for (item in values) {
        let uri = values[item].s.value;
        let label = values[item].label.value;
        let opt = $(new Option(label, uri));
        opt.attr("uri", uri).attr("label", label);
        $("#sel-pipestate5").append(opt);
    }
};

let copyToClipboard = (element) => {
    var text = $("#hiddenclipboard").clone().find('br').prepend('\r\n').end().val();
    element = $('<textarea>').appendTo('body').val(text).select();
    document.execCommand('copy');
    element.remove();
};

let copyToClipboardP = (element) => {
    var text = $("#hiddenclipboardp").clone().find('br').prepend('\r\n').end().val();
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
        $("#successdiv").hide();
        $("#hiddenclipboard").val("");
    } else {
        $("#alertdiv").hide();
        $("#successdiv").show();
        // create triples
        let ttl = "";
        ttl += "@prefix rset: <http://rsetools.squirrel.link#> .\r\n";
        ttl += "@prefix wd: <http://www.wikidata.org/entity/> .\r\n";
        ttl += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\r\n\r\n";
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        ttl += "# " + $('#inp-name').val() + "\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " a " + "rset:Tool " + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " a " + "rset:LinkedTool " + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " rset:name " + "'" + $('#inp-name').val() + "'" + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " rset:wikidataid " + "'" + $("#inp-wikidata").attr("uri").replace("wd:", "") + "'" + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " rset:description " + "'" + $('#inp-description').val() + "'" + ".\r\n";
        ttl += $("#inp-wikidata").attr("uri") + " rset:dateOfEntry " + "'" + formatted_date + "'" + ".\r\n";
        if ($("#inp-link1").val().includes("http")) {
            ttl += $("#inp-wikidata").attr("uri") + " rset:link " + "<" + $('#inp-link1').val() + ">" + ".\r\n";
        }
        if ($("#inp-link2").val().includes("http")) {
            ttl += $("#inp-wikidata").attr("uri") + " rset:link " + "<" + $('#inp-link2').val() + ">" + ".\r\n";
        }
        if ($("#inp-link3").val().includes("http")) {
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

let createPipeTTL = () => {
    // check input fields
    let valide = true;
    if ($("#inp-namep").val().length === 0) {
        valide = false;
        console.log(false, "name");
    }
    if ($("#inp-descriptionp").val().length === 0) {
        valide = false;
        console.log(false, "description");
    }
    if ($("#inp-authorp").val().length === 0) {
        valide = false;
        console.log(false, "author");
    }
    if ($("#pipe1").prop('checked')) {
        if ($("#sel-pipestate1 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipestate1");
        }
        if ($("#sel-pipetool1 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipetool1");
        }
        if ($("#inp-pipein1").val().length === 0) {
            valide = false;
            console.log(false, "pipein1");
        }
        if ($("#inp-pipeout1").val().length === 0) {
            valide = false;
            console.log(false, "pipeout1");
        }
    }
    if ($("#pipe2").prop('checked')) {
        if ($("#sel-pipestate2 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipestate2");
        }
        if ($("#sel-pipetool2 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipetool2");
        }
        if ($("#inp-pipein2").val().length === 0) {
            valide = false;
            console.log(false, "pipein2");
        }
        if ($("#inp-pipeout2").val().length === 0) {
            valide = false;
            console.log(false, "pipeout2");
        }
    }
    if ($("#pipe3").prop('checked')) {
        if ($("#sel-pipestate3 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipestate3");
        }
        if ($("#sel-pipetool3 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipetool3");
        }
        if ($("#inp-pipein3").val().length === 0) {
            valide = false;
            console.log(false, "pipein3");
        }
        if ($("#inp-pipeout3").val().length === 0) {
            valide = false;
            console.log(false, "pipeout3");
        }
    }
    if ($("#pipe4").prop('checked')) {
        if ($("#sel-pipestate4 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipestate4");
        }
        if ($("#sel-pipetool4 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipetool4");
        }
        if ($("#inp-pipein4").val().length === 0) {
            valide = false;
            console.log(false, "pipein4");
        }
        if ($("#inp-pipeout4").val().length === 0) {
            valide = false;
            console.log(false, "pipeout4");
        }
    }
    if ($("#pipe5").prop('checked')) {
        if ($("#sel-pipestate5 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipestate4");
        }
        if ($("#sel-pipetool5 option:selected").val() === "-1") {
            valide = false;
            console.log(false, "pipetool4");
        }
        if ($("#inp-pipein5").val().length === 0) {
            valide = false;
            console.log(false, "pipein4");
        }
        if ($("#inp-pipeout5").val().length === 0) {
            valide = false;
            console.log(false, "pipeout4");
        }
    }

    if (valide == false) {
        $("#alertdivp").show();
        $("#successdivp").hide();
        $("#hiddenclipboardp").val("");
    } else {
        $("#alertdivp").hide();
        $("#successdivp").show();
        // create triples
        let pipeID = UUID.getHashDigits(8);
        let ttl = "";
        ttl += "@prefix rset: <http://rsetools.squirrel.link#> .\r\n";
        ttl += "@prefix pipe: <http://linkedpipes.xyz/pipes#> .\r\n";
        ttl += "@prefix wd: <http://www.wikidata.org/entity/> .\r\n";
        ttl += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\r\n\r\n";
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        ttl += "pipe:" + pipeID + " a " + "rset:Pipe " + ".\r\n";
        ttl += "pipe:" + pipeID + " rset:name " + "'" + $('#inp-namep').val() + "'" + ".\r\n";
        ttl += "pipe:" + pipeID + " rset:description " + "'" + $('#inp-descriptionp').val() + "'" + ".\r\n";
        ttl += "pipe:" + pipeID + " rset:author " + "'" + $('#inp-authorp').val() + "'" + ".\r\n";
        ttl += "pipe:" + pipeID + " rset:dateOfEntry " + "'" + formatted_date + "'" + ".\r\n";
        let pipeStepID1 = UUID.getHashDigits(6);
        let pipeStepID2 = UUID.getHashDigits(6);
        let pipeStepID3 = UUID.getHashDigits(6);
        let pipeStepID4 = UUID.getHashDigits(6);
        let pipeStepID5 = UUID.getHashDigits(6);
        if ($("#pipe1").prop('checked')) {
            ttl += "pipe:" + pipeID + " rset:next " + "_:" + pipeStepID1 + " .\r\n";
            ttl += "_:" + pipeStepID1 + " a " + "rset:PipeStep " + ".\r\n";
            ttl += "_:" + pipeStepID1 + " rset:pipeState " + $("#sel-pipestate1 option:selected").val() + " .\r\n";
            ttl += "_:" + pipeStepID1 + " rset:uses " + $("#sel-pipetool1 option:selected").val() + " .\r\n";
            let pipeStepObjInID = UUID.getHashDigits(6);
            let pipeStepObjOutID = UUID.getHashDigits(6);
            ttl += "_:" + pipeStepID1 + " rset:hasInput " + "_:" + pipeStepObjInID + " .\r\n";
            ttl += "_:" + pipeStepID1 + " rset:hasOutput " + "_:" + pipeStepObjOutID + " .\r\n";
            ttl += "_:" + pipeStepObjInID + " rset:description " + "'" + $('#inp-pipein1').val() + "'" + ".\r\n";
            ttl += "_:" + pipeStepObjOutID + " rset:description " + "'" + $('#inp-pipeout1').val() + "'" + ".\r\n";
        }
        if ($("#pipe2").prop('checked')) {
            ttl += "_:" + pipeStepID1 + " rset:next " + "_:" + pipeStepID2 + " .\r\n";
            ttl += "_:" + pipeStepID2 + " a " + "rset:PipeStep " + ".\r\n";
            ttl += "_:" + pipeStepID2 + " rset:pipeState " + $("#sel-pipestate2 option:selected").val() + " .\r\n";
            ttl += "_:" + pipeStepID2 + " rset:uses " + $("#sel-pipetool2 option:selected").val() + " .\r\n";
            let pipeStepObjInID = UUID.getHashDigits(6);
            let pipeStepObjOutID = UUID.getHashDigits(6);
            ttl += "_:" + pipeStepID2 + " rset:hasInput " + "_:" + pipeStepObjInID + " .\r\n";
            ttl += "_:" + pipeStepID2 + " rset:hasOutput " + "_:" + pipeStepObjOutID + " .\r\n";
            ttl += "_:" + pipeStepObjInID + " rset:description " + "'" + $('#inp-pipein2').val() + "'" + ".\r\n";
            ttl += "_:" + pipeStepObjOutID + " rset:description " + "'" + $('#inp-pipeout2').val() + "'" + ".\r\n";
        }
        if ($("#pipe3").prop('checked')) {
            ttl += "_:" + pipeStepID2 + " rset:next " + "_:" + pipeStepID3 + " .\r\n";
            ttl += "_:" + pipeStepID3 + " a " + "rset:PipeStep " + ".\r\n";
            ttl += "_:" + pipeStepID3 + " rset:pipeState " + $("#sel-pipestate3 option:selected").val() + " .\r\n";
            ttl += "_:" + pipeStepID3 + " rset:uses " + $("#sel-pipetool3 option:selected").val() + " .\r\n";
            let pipeStepObjInID = UUID.getHashDigits(6);
            let pipeStepObjOutID = UUID.getHashDigits(6);
            ttl += "_:" + pipeStepID3 + " rset:hasInput " + "_:" + pipeStepObjInID + " .\r\n";
            ttl += "_:" + pipeStepID3 + " rset:hasOutput " + "_:" + pipeStepObjOutID + " .\r\n";
            ttl += "_:" + pipeStepObjInID + " rset:description " + "'" + $('#inp-pipein3').val() + "'" + ".\r\n";
            ttl += "_:" + pipeStepObjOutID + " rset:description " + "'" + $('#inp-pipeout3').val() + "'" + ".\r\n";
        }
        if ($("#pipe4").prop('checked')) {
            ttl += "_:" + pipeStepID3 + " rset:next " + "_:" + pipeStepID4 + " .\r\n";
            ttl += "_:" + pipeStepID4 + " a " + "rset:PipeStep " + ".\r\n";
            ttl += "_:" + pipeStepID4 + " rset:pipeState " + $("#sel-pipestate4 option:selected").val() + " .\r\n";
            ttl += "_:" + pipeStepID4 + " rset:uses " + $("#sel-pipetool4 option:selected").val() + " .\r\n";
            let pipeStepObjInID = UUID.getHashDigits(6);
            let pipeStepObjOutID = UUID.getHashDigits(6);
            ttl += "_:" + pipeStepID4 + " rset:hasInput " + "_:" + pipeStepObjInID + " .\r\n";
            ttl += "_:" + pipeStepID4 + " rset:hasOutput " + "_:" + pipeStepObjOutID + " .\r\n";
            ttl += "_:" + pipeStepObjInID + " rset:description " + "'" + $('#inp-pipein4').val() + "'" + ".\r\n";
            ttl += "_:" + pipeStepObjOutID + " rset:description " + "'" + $('#inp-pipeout4').val() + "'" + ".\r\n";
        }
        if ($("#pipe5").prop('checked')) {
            ttl += "_:" + pipeStepID4 + " rset:next " + "_:" + pipeStepID5 + " .\r\n";
            ttl += "_:" + pipeStepID5 + " a " + "rset:PipeStep " + ".\r\n";
            ttl += "_:" + pipeStepID5 + " rset:pipeState " + $("#sel-pipestate5 option:selected").val() + " .\r\n";
            ttl += "_:" + pipeStepID5 + " rset:uses " + $("#sel-pipetool5 option:selected").val() + " .\r\n";
            let pipeStepObjInID = UUID.getHashDigits(6);
            let pipeStepObjOutID = UUID.getHashDigits(6);
            ttl += "_:" + pipeStepID5 + " rset:hasInput " + "_:" + pipeStepObjInID + " .\r\n";
            ttl += "_:" + pipeStepID5 + " rset:hasOutput " + "_:" + pipeStepObjOutID + " .\r\n";
            ttl += "_:" + pipeStepObjInID + " rset:description " + "'" + $('#inp-pipein5').val() + "'" + ".\r\n";
            ttl += "_:" + pipeStepObjOutID + " rset:description " + "'" + $('#inp-pipeout5').val() + "'" + ".\r\n";
        }
        $("#hiddenclipboardp").val(ttl);
    }
};

// INIT
initModalCreateTool();
initModalCreatePipe();
$("#alertdiv").hide();
$("#successdiv").hide();
$("#alertdivp").hide();
$("#successdivp").hide();
$("#hiddenclipboard").hide();
$("#hiddenclipboardp").hide();
