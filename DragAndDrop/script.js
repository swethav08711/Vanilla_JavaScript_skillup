const draggable_list = document.getElementById("draggable-list")
const check = document.getElementById("check")
const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
]
//store the list Item
const listItems = []

let dragsStartIndex
createList()
//insert List item in to dom
function createList() {
  ;[...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      console.log(person)
      const listItem = document.createElement("li")

      listItem.setAttribute("data-index", index)
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name"> ${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div> 
        `
      listItems.push(listItem)

      draggable_list.appendChild(listItem)
    })
  addEventListener()
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable")
  const dragListItems = document.querySelectorAll(".draggable-list li")
  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart)
  })
  dragListItems.forEach(item => {
    item.addEventListener("dragover", dragOver)
    item.addEventListener("drop", dragDrop)
    item.addEventListener("dragenter", dragEnter)
    item.addEventListener("dragleave", dragLeave)
  })
}

function dragStart() {
  dragsStartIndex = this.closest("li").getAttribute("data-index")
  console.log(dragsStartIndex)
}
function dragOver(e) {
  e.preventDefault()
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index")
  swapItems(dragsStartIndex, dragEndIndex)
  this.classList.remove("over")
}
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable")
  const itemtwo = listItems[toIndex].querySelector(".draggable")
  listItems[fromIndex].appendChild(itemtwo)
  listItems[toIndex].appendChild(itemOne)
}
function dragEnter() {
  this.classList.add("over")
}
function dragLeave() {
  this.classList.remove("over")
}
//check order
check.addEventListener("click", checkOrder)
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim()

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong")
    } else {
      listItem.classList.remove("wrong")
      listItem.classList.add("right")
    }
  })
}
