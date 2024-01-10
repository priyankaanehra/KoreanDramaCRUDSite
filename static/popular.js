$(document).ready(function() {
    popular(top3)
    
})

function popular(top3){
    $("#newTop").empty()
    let row = $("<div class='row'>")
    $.each(top3,function(index,value){

        let col = $("<div class ='col-4'>")
        let divv = $("<div class='aref'>")
        let sp = $("<a href= 'view/"+value["id"]+"' class='aref'>")
        let img = $("<img src= '"+value["image"]+"' alt='"+value["name"]+" drama photo' id ='imghome'  width='300' height='150'><br>")
        let star = $("<span class='fa fa-star checked'>")

        $(col).append(divv)
        $(divv).append(img)
        $(sp).append(img)
        $(sp).append(value["name"]+ " | ")
        $(star).append(" " + value["rating"])

        $(divv).append(sp)
        $(divv).append(star)
        $(row).append(col)

        $('#newTop').append(row);

    })
}