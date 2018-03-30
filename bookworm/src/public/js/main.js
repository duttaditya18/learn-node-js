var cardList = document.querySelectorAll(".card.bg-dark");
var fullList = [];
for(let i = 0; i < cardList.length; i++) {
  fullList[i] = {
    name: document.querySelectorAll("#user-name")[i].innerHTML,
    favorite: document.querySelectorAll("#user-fav")[i].innerHTML,
    mail: document.querySelectorAll("#user-mail")[i].innerHTML
  }
}

function searchuser() {
  var options = {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name",
      "favorite",
      "mail"
    ]
  };
  var fuse = new Fuse(fullList, options);
  var searchkey = document.getElementById("searchfield").value;
  var result = fuse.search(searchkey);
  var myRow = document.createElement("div");
  myRow.id = "row-search";
  myRow.className = "row";
  for(var i = 0; i < result.length; i++) {
    myRow.innerHTML += "<div class=\"card mb-3 bg-dark\"><div class=\"card-header\" id=\"user-name\">" + result[i].name + "</div><div class=\"card-body\"><p class=\"card-text\">Favorite Book : <span id=\"user-fav\">" + result[i].favorite + "</span></p><p class=\"card-text\"><small class=\"text-muted\" id=\"user-mail\">" + result[i].mail + "</small></p></div></div>";
  }
  console.log(result);
  console.log(myRow);
  document.getElementById('outer-div-search').replaceChild(myRow, document.getElementById('outer-div-search').childNodes[0]);
}