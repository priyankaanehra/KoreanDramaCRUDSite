
$(document).ready(function() {
    results()
})


function results(){
        
    $("#searchResults").empty()   
    let searchWords = search.split(" ");
    
    if (dramas.length != 0){
        $("#searchResults").empty()
        $("#searchResults").append("<div class='color_words showresults'>")

        let searchNum = $("<div class='searchNum'>")
        $(searchNum).append("Showing " +dramas.length + " results for \""+search+"\".")
        $("#searchResults").append(searchNum)
        $("#searchResults").append("<br>")

        
        $.each(dramas,function(index,value){
            $.each(searchWords,function(index,searching){

                let row = $("<div class='row spc'>")
                let imgg = $("<img src= '"+value["image"]+"' alt='"+value["name"]+" drama photo' id ='imghome' width='300' height='170'><br>")
                let div1 = $("<div class='col-8 color_words'>")
                let div2 = $("<div class='col-4 color_words'>")
                let sp = $("<a href= 'view/"+value["id"]+"' class='titleResults'>")
                let spimg = $("<a href= 'view/"+value["id"]+"' class='viewMore moree'>")

                let divs = $("<div class='color_words line'>")

                let sum = value["synopsis"];
                sum = sum.substr(0,150) + '...';
                $(divs).text(sum);
                
                $(sp).append(highlight(value["name"], searching))
                $(spimg).append("Read more...")

                let imgLink = $("<a href= 'view/"+value["id"]+"'>")
                $(imgLink).append(imgg)
                $(div2).append(imgLink)

                $(div1).append(sp)
                $(div1).append(divs)
                let spanact = $("<span class='color_words'>")
                let act = $("<span class='boldd'>")
                let names = $("<span class='line'>")

                $(div1).append("<br>")
                $(act).append("Actors: ")
            
                $(names).append(highlight(value["stars"].join(", "), searching))
                $(spanact).append(act)
                $(spanact).append(names)
                $(div1).append(spanact)


            
                let blocksofgenre = $("<div class='color_words'>")
                $(blocksofgenre).append("<span class='color_words'>")
                let genree = $("<span class='boldd'>")
                $(genree).append("Genres:     ")
                $(blocksofgenre).append(genree)
                $.each(value["genre"],function(index,value){
                    let genree = $("<span class='color_words genrebox'>")
                    $(genree).append(highlight(value, searching))
                    $(blocksofgenre).append(genree)
                })

                $(div1).append("<br>")
                $(div1).append(blocksofgenre)
                $(div1).append(spimg)

                $(row).append(div2)
                $(row).append(div1)
                $(row).append("<br><br>")
                $('#searchResults').append(row);
            })

        })
    }
    else{
        let searchNum = $("<div class='searchNum'>")
        $(searchNum).append("No results found. ")
        $("#searchResults").append(searchNum)
        $("#searchResults").append("<br>")
    }

}

// function highlight(data, search){

//     let partData = data.toLowerCase()
//     let partSearch = search.toLowerCase()
    
//     let index = partData.indexOf(partSearch)
//     let prev = data.slice(0,index)
//     let mid = data.slice(index,index+search.length)
//     let after = data.slice(index+search.length)
//     return (prev + "<span class = 'highlight'>" + mid + "</span>" + after)
// }

function highlight(data, search){

    let partData = data.toLowerCase()
    let partSearch = search.toLowerCase()
    let index = partData.indexOf(partSearch)

    if (index>=0){
        let prev = data.slice(0,index)
        let mid = data.slice(index,index+search.length)
        let after = data.slice(index+search.length)
        return (prev + "<span class = 'highlight'>" + mid + "</span>" + after)
    }
    else{
        return data
    }
}
