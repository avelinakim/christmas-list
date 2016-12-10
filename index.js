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

var list = {};
var currentListId = "default";

// load document and lists
$(document).ready(function() {
  getAllLists();
  subscribeToList();
  $("#create-new-list").click(createNewList);

  // adds gifter to database list item and removes item from site
  function removeItem() {
    var input = $("<input type='text'></input>"); 
    $(this).parent().append("<br>Gifter: "); 
    $(this).parent().append(input);
    $(this).off("click", removeItem);
    $(this).on("click", saveGiftedItem);
  }

  // save item and gifter and removes from list
  function saveGiftedItem() {
    var key = $(this).parent().attr("id");
    var item = list[key];
    item.gifter = $("#" + key + " input").val();
    database.ref("gifted/" + currentListId).push(item);
    database.ref("lists/" + currentListId + "/" + key).remove();
    delete list[key];
    $(this).parent().remove();
  }

  // load list
  function subscribeToList(listId) {
    database.ref("lists/" + listId).on("child_added", function (snapshot) {
      var item = snapshot.val();
      createItem(item.name, item.price, item.notes, item.link, snapshot.key);
    });
  }

  // change list
  function switchList(listId) {
    $("#submit-btn").attr("disabled", false);

    if (!listId || typeof listId !== 'string') {
      listId =  $(this).attr("id");
    }

    currentListId = listId;
    list = {};
    $("ul").empty();
    subscribeToList(listId);

    $("#list-title").empty();
    $("#list-title").append(listId);
  }

  // load lists 
  function getAllLists() {
    database.ref("lists").on("child_added", function (snapshot) {
      var newList = snapshot.val();
      var listId = snapshot.key;

      var link = $("<a style='display:block;' href='#' id='" + listId + "'>" + listId + "</a>");
      link.on("click", switchList);
      $("#lists").append(link);
    });
  }

  // create new list
  function createNewList() {
    var listId = $("#new-list").val();
    switchList(listId);
  }

  // create list item and add to list
  function createItem(name, price, notes, link, key) {
    list[key] = { name: name, price: price, notes: notes, link: link, key: key };

    var newItem = $("<li id='" + key + "'></li>");
    var itemPrice = $("<span id='price'>(" + price + ") </span>");
    var notesSpan = $("<span>" + notes + "</span>");
    var itemLink = $("<a href='" + link + "'> Link </a>"); 
    var newButton = $("<button class='remove-item-btn'>remove</button>");
    newButton.on("click", removeItem);
    
    // append data to item and add to list 
    newItem.append(newButton);
    newItem.append(" " + name + " ");
    newItem.append(itemPrice);
    newItem.append(notesSpan); 
    if (link != "")
      newItem.append(itemLink);
    $("ul").append(newItem);
  }

  // collect data from form and calls createItem
  $("#submit-btn").click(function(event) {
    event.preventDefault();
    var itemName =  $("form [name='item-name']").val(); 
    var price = $("form [name='price']").val();
    var notes = $("form [name='notes']").val();
    var link = $("form [name='link']").val();
    database.ref("lists/" + currentListId).push({
      name: itemName,
      price: price,
      notes: notes,
      link: link,
    }, function (snapshot) {
      createItem(itemName, notes, link, snapshot.key);
    });
  });
});