$(document).ready(function() {
    prepopulate()

    $(".editbut").click(function(){
        submitChange()
        window.location.replace('/view/' + drama.id)
    })

    function fnOpenNormalDialog() {
        $("#dialog-confirm").html("If you want to discard your changes, click yes.");
        $("#dialog-confirm").dialog({
            resizable: false,
            modal: true,
            title: "Are you sure?",
            height: 150,
            width: 450,
            buttons: {
                "Yes": function () {
                    $(this).dialog('close');
                    callback(true);
                },
                "No": function () {
                $(this).dialog('close');
                    callback(false);
                }
            }
        });
    }
    
    $('#btnOpenDialog').click(fnOpenNormalDialog);
    
    function callback(value) {
        if (value) {
            window.location.replace("/view/" + drama.id)
        }
    }
})

function prepopulate(){
    $("#titleinput").val(drama["name"]);
    $("#genres").val(drama["genre"]);
    $("#ImageURL").val(drama["image"]);
    $("#synopsis").val(drama["synopsis"]);
    $("#rating").val(drama["rating"]);
    $("#episodes").val(drama["episodes"]);
    $("#actors").val(drama["stars"]);
    $("#director").val(drama["director"]);
    $("#trailer").val(drama["trailer"]);
}

function submitEditedDrama(new_drama) {
    let data_to_save = new_drama
    $.ajax({
        type: "POST",
        url: '/edit/'+drama.id,             
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result) {
            id = result["id"]
            window.location.replace("/view/" + id)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}



function submitChange(){

    $(".warningtitle").empty()
    $(".warninginput").empty()
    $(".warningimg").empty()
    $(".warningsynopsis").empty()
    $(".warningrating").empty()
    $(".warningepisodes").empty()
    $(".warningactors").empty()
    $(".warningdirector").empty()
    $(".warningtrailer").empty()

    let title = $.trim($("#titleinput").val())
    let genres = $.trim($("#genres").val())
    let ImageURL = $.trim($("#ImageURL").val())
    let synopsis = $.trim($("#synopsis").val())
    let rating = $.trim($("#rating").val())
    let episodes = $.trim($("#episodes").val())
    let actors = $.trim($("#actors").val())
    let director = $.trim($("#director").val())
    let trailer = $.trim($("#trailer").val())
    
    let no_error = true
    
    if(director == ""){
        $(".warningdirector").append("Field can't be empty")
        $("#director").val("");
        $("#director").focus();
        no_error = false
    }
    if(actors == ""){
        $(".warningactors").append("Field can't be empty")
        $("#actors").val("");
        $("#actors").focus();
        no_error = false
    }
    if(!(episodes == "") &&!$.isNumeric(episodes)){
        $(".warningepisodes").append("Please enter a number")
        $("#episodes").focus();
        no_error = false
    }
    if(!(rating == "") && !$.isNumeric(rating)){
        $(".warningrating").append("Please enter a number")
        $("#rating").focus();
        no_error = false
    }
    if(synopsis == ""){
        $(".warningsynopsis").append("Field can't be empty")
        $("#synopsis").val("");
        $("#synopsis").focus();
        no_error = false
    }
    if(trailer == ""){
        $(".warningtrailer").append("Field can't be empty")
        $("#trailer").val("");
        $("#trailer").focus();
        no_error = false
    }
    if(ImageURL == ""){
        $(".warningimg").append("Field can't be empty")
        $("#ImageURL").val("");
        $("#ImageURL").focus();
        no_error = false
    }
    if(genres == ""){
        $(".warninggenres").append("Field can't be empty")
        $("#genres").val("");
        $("#genres").focus();
        no_error = false
    }
    if(title == ""){
        $(".warningtitle").append("Field can't be empty")
        $("#titleinput").val("");
        $("#titleinput").focus();
        no_error = false
    }

    if(no_error){
        let new_drama = {
            "name": title,
            "genre": genres.split(','),
            "synopsis":synopsis,
            "image":ImageURL,
            "episodes":episodes,
            "rating":rating,
            "stars":actors.split(','),
            "director":director.split(','),
            "trailer":trailer
        }
        submitEditedDrama(new_drama)
    }
}