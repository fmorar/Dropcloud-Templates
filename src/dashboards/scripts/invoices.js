document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (event) => {
    inputElement.click(); /*clicking on input element whenever the dropzone is clicked so file browser is opened*/
  });

  inputElement.addEventListener("change", (event) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (event) => {
    event.preventDefault(); /*this along with prevDef in drop event prevent browser from opening file in a new tab*/
    dropZoneElement.classList.add("drop-zone--over");
  });
  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (event) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  dropZoneElement.addEventListener("drop", (event) => {
    event.preventDefault();
    console.log(
      event.dataTransfer.files
    ); /*if you console.log only event and check the same data location, you won't see the file due to a chrome bug!*/
    if (event.dataTransfer.files.length) {
      inputElement.files =
        event.dataTransfer.files; /*asigns dragged file to inputElement*/

      updateThumbnail(
        dropZoneElement,
        event.dataTransfer.files[0]
      ); /*thumbnail will only show first file if multiple files are selected*/
    }
    dropZoneElement.classList.remove("drop-zone--over");
  });
});
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  /*remove text prompt*/
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
    dropZoneElement.querySelector(".drop-zone__text").remove();
  }

  /*first time there won't be a thumbnailElement so it has to be created*/
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add(
      "drop-zone__thumb",
      "w-full",
      "h-full",
      "rounded-md",
      "overflow-hidden",
      "bg-gray-300",
      "bg-cover",
      "relative",
      "after:content-[attr(data-label)]",
      "after:absolute",
      "after:bottom-0",
      "after:left-0",
      "after:w-full",
      "after:p-5",
      "after:text-white",
      "after:bg-black",
      "after:bg-opacity-75",
      "after:text-center",
      "after:font-size-14"
    );
    dropZoneElement.appendChild(thumbnailElement);
  }
  thumbnailElement.dataset.label =
    file.name; /*takes file name and sets it as dataset label so css can display it*/

  /*show thumbnail for images*/
  if (file.type.startsWith("image/")) {
    const reader = new FileReader(); /*lets us read files to data URL*/
    reader.readAsDataURL(file); /*base 64 format*/
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`; /*asynchronous call. This function runs once reader is done reading file. reader.result is the base 64 format*/
      thumbnailElement.style.backgroundPosition = "center";
    };
  } else {
    thumbnailElement.style.backgroundImage =
      null; /*plain background for non image type files*/
  }
}

function handleSelect() {
  const checkedRows = document.querySelectorAll(".checkbox:checked").length;
  if (checkedRows === 0) {
    document
      .getElementById("action-buttons")
      .classList.replace("flex", "hidden");
  } else {
    document
      .getElementById("action-buttons")
      .classList.replace("hidden", "flex");
  }
}

function handleSelectAll() {
  let checkboxes = document.querySelectorAll(".checkbox");
  const selectAllCheckbox = document.getElementById("selectAll");
  checkboxes.forEach(
    (checkbox) => (checkbox.checked = selectAllCheckbox.checked)
  );
  document
    .getElementById("action-buttons")
    .classList.replace(
      selectAllCheckbox.checked ? "hidden" : "flex",
      selectAllCheckbox.checked ? "flex" : "hidden"
    );
}

var table = document.getElementById("myTable");
var input = document.getElementById("default-search");

function debounce(fn, delay) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

input.addEventListener(
  "input",
  debounce(function () {
    var searchValue = input.value.toLowerCase();
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td")[1];
      var match = false;

      if (cells && cells.textContent.toLowerCase().indexOf(searchValue) != -1) {
        match = true;
      }

      if (match) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }, 500)
);


function handleRadioClick(myRadio) {
    var searchValue = myRadio.value.toLowerCase();
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td")[4].getElementsByTagName("button")[0];
      var match = false;

      if (cells && cells.textContent.toLowerCase().indexOf(searchValue) != -1) {
        match = true;
      }

      if (match) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
}

// Get the dropdown button and dropdown menu elements
var dropdownButton = document.getElementById("dropdownRadioButton");
var dropdownMenu = document.getElementById("dropdownDefaultRadio");

// Add a click event listener to the button
dropdownButton.addEventListener("click", function () {
  // Toggle the "hidden" class on the dropdown menu
  dropdownMenu.classList.toggle("hidden");
});

function showModal(option) {
  const selectedModal = document.getElementById(option);
  selectedModal.classList.toggle("hidden");
  const checkedRows = document.querySelectorAll(".checkbox:checked").length;
  console.log(document.querySelectorAll(".checkbox:checked"))
  switch(option){
    case "delete":
        document.getElementById("delete-text").textContent =
        checkedRows > 1
        ? `Are you sure you want to delete these ${
            document.querySelectorAll(".checkbox:checked").length
            } invoices?`
        : `Are you sure you want to delete this invoice?`;
        break
    case "comment":
        document.getElementById("comment-text").textContent =
        `Add a comment to ${[...document.querySelectorAll(".checkbox:checked")].map((row) => row.id).join(', ')}`;
        break
  }
     
  
}

// When the endpoint is available, use this
/*function getData() {
          fetch("https://my-mock-endpoint.com/data")
            .then((response) => response.json())
            .then((data) => {
                let table = document.getElementById("myTable").getElementsByTagName("tbody")[0];
                data.forEach(function(rowData) {
                  var newRow = table.insertRow(table.length);
                  var fileCell = newRow.insertCell(0);
                  var adminCell = newRow.insertCell(1);
                  var commentCell = newRow.insertCell(2);
                  var statusCell = newRow.insertCell(3);
                  var actionsCell = newRow.insertCell(4);
      
                  fileCell.innerHTML = rowData.fileName
                  adminCell.innerHTML = rowData.adminName
                  commentCell.innerHTML = rowData.comment
                  statusCell.innerHTML = rowData.status
                  actionsCell.innerHTML = "<button onclick='deleteRow(this)'>Delete</button>";
                });
            })
            .catch((error) => console.log(error));
        } 
        document.addEventListener("DOMContentLoaded", function(event) { 
          getData()
        });
        
        */

var mockData = [
  {
    fileName: "INV-1",
    adminName: "Wade Warren",
    comment: "Payment for logistics costs",
    status: "Processed",
  },
  {
    fileName: "INV-2",
    adminName: "Brooklyn Simpsons",
    comment: "Payment for office costs",
    status: "Pending",
  },
];

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
}

getData()
  .then((data) => {
    let table = document
      .getElementById("myTable")
      .getElementsByTagName("tbody")[0];
    data.forEach(function (rowData) {
      var newRow = table.insertRow(table.length);
      var checkboxCell = newRow.insertCell(0);
      var fileCell = newRow.insertCell(1);
      var adminCell = newRow.insertCell(2);
      var commentCell = newRow.insertCell(3);
      var statusCell = newRow.insertCell(4);
      var actionsCell = newRow.insertCell(5);

      fileCell.innerHTML = rowData.fileName;
      adminCell.innerHTML = rowData.adminName;
      commentCell.innerHTML = rowData.comment;
      statusCell.innerHTML = `<div class="relative">
                  <button class="${
                    rowData.status === "Pending"
                      ? "bg-[#FFFDEA]"
                      : "bg-[#159300] bg-opacity-10"
                  } text-[#6F6F6F] p-2 w-28 h-7 dropdown rounded-md text-sm border dropdown-svg text-center flex justify-between items-center">
                  ${
                    rowData.status
                  }<svg class="w-4 h-4 ml-1 dropdown-svg" aria-hidden="true" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                  </path>
              </svg>
                  </button>
                  <div class="dropdown-content absolute bg-white rounded-md py hidden z-40">
                  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDividerButton">
                  <li>
                      <a href="#"
                          class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <div class="bg-[#FFFDEA] mr-2 rounded-full w-3 h-3"></div>
                          <p>
                              Pending
                          </p>
                      </a>
                  </li>
                  <li>
                      <a href="#"
                          class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <div class="bg-[#159300] mr-2 bg-opacity-10 rounded-full w-3 h-3"></div>
                          <p>
                              Processed
                          </p>
                      </a>
                  </li>
              </ul>
                  </div>
                  </div>`;
      checkboxCell.innerHTML = `<input type="checkbox" id="${rowData.fileName}" onchange="handleSelect()"  class="checkbox border-[#C0C0CF] flex w-5 h-5 rounded-sm text-gray-600" value="${rowData.name}">`;
      actionsCell.innerHTML = `
                  <div class="relative">
                      <button class="bg-[#E5E5E5] dropdown rounded-md text-sm border h-8 w-8 ">
                          <svg viewBox="0 0 24 24" class="dropdown" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="4" cy="12" r="0.5"></circle>
                          <circle cx="12" cy="12" r="0.5"></circle>
                          <circle cx="20" cy="12" r="0.5"></circle>
                          </svg>
                      </button>
                      <div class="dropdown-content absolute -left-4 bg-white rounded-md py hidden z-40">
                      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton">
                      <li>
                          <a href="#"
                              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              <p>
                                  Comment
                              </p>
                          </a>
                      </li>
                      <li>
                          <a href="#"
                              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              <p>
                                  Archive
                              </p>
                          </a>
                      </li>
                      <li>
                          <a href="#"
                              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              <p>
                                  Delete
                              </p>
                          </a>
                      </li>
                  </ul>
                      </div>
                      </div>
                  `;
        document.getElementById("spinner").classList.add("hidden")
    });

    let buttons = document.querySelectorAll(".dropdown");
    buttons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          openDropdown.classList.add("hidden");
        }
        let dropdown = event.currentTarget.nextElementSibling;
        dropdown.classList.toggle("hidden");
      });
    });

    window.onclick = function (event) {
      if (!event.target.matches(".dropdown")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          openDropdown.classList.add("hidden");
        }
      }
    };
  })
  .catch((error) => console.log(error));
