//Got this from stackoverflow.
//Makes the 'holder' attribute work like html5 placeholder
//Kinda buggy
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
