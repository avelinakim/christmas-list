
$(document).ready(function() {
  function removeItem() {
    $(this).parent().remove();
  }

  $("#submit-btn").click(function(event) {
    event.preventDefault();
    $("form [name='item-name']").val(); 
    var newButton = $("<button class='remove-item-btn'>remove</button>");
    newButton.click(removeItem);
    var str =  $("form [name='item-name']").val(); 
    var newItem = $("<li>" + str + "</li>");
    newItem.append(newButton);
    $("ul").append(newItem);
  });
});