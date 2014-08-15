$( "#searchButton" ).click(function() {
  $( "#error" ).remove();
  var address = $( "#searchText" ).val();
  if(address === ""){
	$( "#searchGroup" ).append( '<div id="error"><br/><div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> Please enter an address </div></div>');
  } else{
	var url = "#/homes";
	window.location = url;
  }  
});

$(function()
{
  $('input').each(function() 
  {
     $(this).val($(this).attr('holder'));
  });
  
  $('input').focus(function()
  {
    if($(this).attr('holder')==$(this).val())
    {
      $(this).val('');
    }
  });
});