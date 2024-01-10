
$(document).ready(function() {
    view(show)
    $("#editbut").click(function(){
        console.log(show.id)
        window.location.replace("/edit/" + show["id"])
    })
})


function view(show){

    $("#newShow").empty()
    let row2 = $("<div class='row'>")
    let row = $("<div class='row'>")

    let div8 = $("<div class='col-8'>")
    let div4 = $("<div class='col-4'>")
    let div82 = $("<div class='col-8 titlepad'>")
    let div42 = $("<div class='col-4 titlepad'>")

    let name = $("<span class='titleName'>")
    $(name).append(show["name"])
    
    let rating = $("<span class='colorRating'>")
    $(rating).append("IMDB Rating: ")
    let starrating = $("<span class='fa fa-star checked'>")
    $(rating).append(starrating)
    $(starrating).append(" " + show["rating"])


    let img = $("<img src= '"+show["image"]+"' alt='"+show["name"]+" drama photo' Drama Picture' id ='imgsize'><br>")
    let vid = $("<iframe src='"+show["trailer"]+"'title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen aria-label:'"+show["name"]+"' Drama Trailer'>")

    let synopsis = $("<div class='color_words line'>")
    $(synopsis).append("Synopsis: " + show["synopsis"])

    let genre = $("<div class='darkk'>")
    $.each(show["genre"],function(index,value){
        let spn = $("<span class='genrebox'>")
        let genree = $("<a href= /search?searchbox="+value+" class='darkk'>")

        $(spn).append(genree)
        $(genree).append(value)
        $(genre).append(spn)
    })

    let actors = $("<div class='color_words line'>")
    $(actors).append("Actors: "+ show["stars"].join(", "))

    let director = $("<div class='color_words line'>")
    $(director).append("Directors: "+ show["director"].join(", "))

    let episodes = $("<div class='color_words line'>")
    $(episodes).append("Episodes: "+ show["episodes"])

    let trailer_name = $("<div class='color_words trailer'>")
    $(trailer_name).append("Trailer")

    $(div82).append(name)

    $(div8).append(img)
    $(div8).append("<br>")
    $(div8).append(rating)
    $(div8).append("<br>")

    $(div42).append(trailer_name)
    $(div4).append(vid)
    $(div8).append(synopsis)
    $(div8).append("<br>")
    $(div8).append("<button class='btn-success btn-sm rounded-0 changebutedit' type='button' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit' id='editbut'>")

    $(div4).append(episodes)
    $(div4).append("<br>")

    $(div4).append(director)
    $(div4).append(actors)
    $(div4).append(genre)


    $(row).append(div82)
    $(row).append(div42)
    $(row).append(div8)
    $(row).append(div4)

    $('#newShow').append(row)
    $('#newShow').append(row2)

}