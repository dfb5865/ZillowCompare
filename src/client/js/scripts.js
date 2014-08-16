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