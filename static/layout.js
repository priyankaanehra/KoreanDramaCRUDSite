
$(document).ready(function() {
    $( "#form_element" ).submit(function(event) {
        if ($("#search").val().trim() == "") {
            $("#search").val('');
            $("#search").focus();
            event.preventDefault();
        }        
      });
    
})