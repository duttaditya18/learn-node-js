document.addEventListener("DOMContentLoaded", function() {
  var floaElems = document.querySelectorAll(".fixed-action-btn");
  M.FloatingActionButton.init(floaElems, {
    direction: "left"
  });
  var toolElems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(toolElems, {});
});
