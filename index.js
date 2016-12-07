
$(document).ready(function() {
  function removeItem() {
    console.log("remove clicked");
    $(this).parent().remove();
  }

  $("#add-item-btn").click(function() {
    var newButton = $("<button class='remove-item-btn'>remove</button>");
    newButton.click(removeItem);
    var newItem = $("<li>Added item</li>");
    newItem.append(newButton);
    $("ul").append(newItem);
  });
});