$(document).ready(function() {
    $("#addbut").click(function(){
        submitData()
    })
    $('#director').keypress(function(e){
        if(e.which ==13){
            submitData()
        }
    })

})

function addDrama (new_drama){
    
    let data_to_save = new_drama 
    $.ajax({
        type: "POST",
        url: "addDrama",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(newData){ 
            let id = newData["newData"]["id"]
            console.log(id)
            $("#titleinput").val('');
            $("#genres").val('');
            $("#ImageURL").val('');
            $("#synopsis").val('');
            $("#rating").val('');
            $("episode").val('');
            $("#actors").val('');
            $("#director").val('');
            $("#trailer").val('');
            $("#titleinput").focus();

            let alertcontainer = $("<div class='alert alert-success alert-dismissible fade show alertcolor' role='alert'>")
            $(alertcontainer).append("Successfully added a new drama! Check it out at ")
            $(alertcontainer).append("<a href='/view/"+id+ "' class='alert-link'>/view/'"+id+ "'>")
            $(alertcontainer).append("<button type='button' class='close' data-dismiss='alert' aria-label='Close'>")
            $('#alertContainer').append(alertcontainer)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });

}

function submitData(){

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
    if((episodes == "")){
        $(".warningepisodes").append("Please enter a number")
        $("#episodes").focus();
        no_error = false
    }
    if(!(rating == "") && !$.isNumeric(rating)){
        $(".warningrating").append("Please enter a number")
        $("#rating").focus();
        no_error = false
    }
    if((rating == "")){
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
        addDrama(new_drama)
    }
}

            