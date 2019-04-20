$(document).ready(function() {
    $('.deleteUser').click(function(ev) {
        //get the id of the item to delete
        id = $(this).attr('data-id');//alternatively we could use $(this).data('id')
        if(id){
        var confirmation= confirm("Are you sure you want to proceed deleting the user?");
        if(confirmation)
        {
            $.ajax({
                type: "DELETE",
                url: "/users/delete/"+id,
                }).done(function (response) {
                //redirect when done handling the request
                 window.location.replace('/')
              });
               window.location.replace('/')
        }else{
            return false;
        }
    }
    })
})