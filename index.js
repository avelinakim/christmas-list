
$(document).ready(function() {
  //removes what removeItem is triggered on 
  function removeItem() {
    $(this).parent().remove();
  }

  //create list item and add to list
  function createItem(name, notes, link) {
    var newItem = $("<li>" + name + " </li>");
    var notesSpan = $("<span>" + notes + "</span>");
    var itemLink = $("<a href='" + link + "'> Link </a>"); 
    var newButton = $("<button class='remove-item-btn'>remove</button>");
    newButton.click(removeItem);
    
    //append data to item and add to list 
    newItem.append(notesSpan); 
    if (link != "")
      newItem.append(itemLink);
    newItem.append(newButton);
    $("ul").append(newItem);
  }

  //collect data from form and calls createItem
  $("#submit-btn").click(function(event) {
    event.preventDefault();
   
    var itemName =  $("form [name='item-name']").val(); 
    var notes = $("form [name='notes']").val();
    var link = $("form [name='link']").val(); 
    createItem(itemName, notes, link);
  });
});