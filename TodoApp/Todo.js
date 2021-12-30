var form = document.getElementById("addForm")
var itemList = document.getElementById("items")
var filter = document.getElementById("filter")
//Form submit
form.addEventListener("submit", addItem)
//delete item
itemList.addEventListener("click", removeItem)
//filter event
filter.addEventListener("keyup", filterItems)
//add item
function addItem(e) {
  e.preventDefault()

  //Get input Value

  var newItem = document.getElementById("item").value

  //create new li element
  var li = document.createElement("li")
  //Add Class name
  li.className = "list-group-item"
  console.log(li)
  //Add Text node with input value
  li.appendChild(document.createTextNode(newItem))
  //create delete button element
  var deleteBtn = document.createElement("button")
  //add classes
  deleteBtn.className = "btn btn-danger btn-sm float-right delete"
  //append text
  deleteBtn.appendChild(document.createTextNode("X"))
  //append button to li
  li.appendChild(deleteBtn)
  //append li to list
  itemList.appendChild(li)
}
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you Sure?")) {
      let li = e.target.parentElement
      itemList.removeChild(li)
    }
  }
}

function filterItems(e) {
  //convert to lowercase
  var text = e.target.value.toLowerCase()
  // Get lis
  var items = itemList.getElementsByTagName("li")
  // Convert to an array
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent
    if (itemName.toLowerCase().indexOf(text) !== -1) {
      item.style.display = "block"
    } else {
      item.style.display = "none"
    }
  })
}
