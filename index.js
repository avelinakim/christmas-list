// Initialize Firebase
var config = {
  apiKey: "AIzaSyAkL2aLLV6UOLbYguuEUxyQ36GM19h9WZM",
  authDomain: "christmas-list-aedc4.firebaseapp.com",
  databaseURL: "https://christmas-list-aedc4.firebaseio.com",
  storageBucket: "christmas-list-aedc4.appspot.com",
  messagingSenderId: "872134012302"
};
firebase.initializeApp(config);
var database = firebase.database();

//var list = []; 

$(document).ready(function() {
  // adds gifter to database list item and removes item from site
  function removeItem() {
    var input = $("<input type='text'></input>"); 
    $(this).parent().append("Gifter: "); 
    $(this).parent().append(input);
    // database.ref('list').
    //$(this).parent().remove();
  }

  // create list item and add to list
  function createItem(name, notes, link) {
    var JSItem = { name: name, notes: notes, link: link };
    //database.ref('list/' + list.length).set(JSItem);
    database.ref('list/').push(JSItem);
   // console.log(key);
    var newItem = $("<li></li>");
    var notesSpan = $("<span>" + notes + "</span>");
    var itemLink = $("<a href='" + link + "'> Link </a>"); 
    var newButton = $("<button class='remove-item-btn'>remove</button>");
    newButton.click(removeItem);
    
    // append data to item and add to list 
    newItem.append(newButton);
    newItem.append(" " + name + " ");
    newItem.append(notesSpan); 
    if (link != "")
      newItem.append(itemLink);
    $("ul").append(newItem);
  }

  // collect data from form and calls createItem
  $("#submit-btn").click(function(event) {
    event.preventDefault();
    var itemName =  $("form [name='item-name']").val(); 
    var notes = $("form [name='notes']").val();
    var link = $("form [name='link']").val(); 
    createItem(itemName, notes, link);
  });
});