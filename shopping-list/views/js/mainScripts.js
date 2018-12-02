const electron = require("electron");
const { ipcRenderer } = electron;

const ul = document.querySelector("ul");

// Add Item
ipcRenderer.on("item:add", (e, item) => {
  addItem(item);
});

// Add Item Function
function addItem(item) {
  ul.className = "collection";
  const li = document.createElement("li");
  li.className = "collection-item";
  var div = document.createElement("div");
  div.innerHTML = `${item}<a onclick='removeElement(this)' class="secondary-content"><i class="material-icons">delete</i></a>`;
  console.log(div);
  li.appendChild(div);
  ul.appendChild(li);
  M.toast({ html: "Item Added", displayLength: 750 });
}

// Remove Item
function removeElement(el) {
  el.parentElement.parentElement.outerHTML = "";
  if (ul.children.length == 0) {
    ul.className = "";
  }
  M.toast({ html: "Removed Item", displayLength: 750 });
}

// Open Add Item Window
function openAddItemWindow() {
  ipcRenderer.send("item:openAdd");
}

// Clear Items
function delItems() {
  ul.innerHTML = "";
  ul.className = "";
  M.toast({ html: "Cleared List", displayLength: 750 });
}

// Clear Items
ipcRenderer.on("item:clear", () => {
  delItems();
});

// Materialize
document.addEventListener("DOMContentLoaded", function() {
  // Floating Action Button
  var floaElems = document.querySelectorAll(".fixed-action-btn");
  M.FloatingActionButton.init(floaElems, {
    direction: "left"
  });

  // Tooltip
  var toolElems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(toolElems, {});

  addItem("asd");
  addItem("asd");
  addItem("asd");
  addItem("asd");
  addItem("asd");
  addItem("asd");
  addItem("asd");
  addItem("asd");
  addItem("asd");
  addItem("asd");
});
