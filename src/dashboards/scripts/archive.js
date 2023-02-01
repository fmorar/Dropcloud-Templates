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
        var cells = rows[i].getElementsByTagName("td")[1];
        var match = false;
  
        if (cells && cells.id.toLowerCase().indexOf(searchValue) != -1) {
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
      type: "invoice",
    },
    {
      fileName: "INV-2",
      adminName: "Brooklyn Simpsons",
      comment: "Payment for office costs",
      type: "receipt",
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
        var actionsCell = newRow.insertCell(4);

        fileCell.id = rowData.type
        fileCell.innerHTML = rowData.fileName;
        adminCell.innerHTML = rowData.adminName;
        commentCell.innerHTML = rowData.comment;
        checkboxCell.innerHTML = `<input type="checkbox" id="${rowData.fileName}" onchange="handleSelect()"  class="checkbox w-5 h-5 rounded-sm text-gray-600" value="${rowData.name}">`;
        actionsCell.innerHTML = `
                    <div class="relative">
                        <button class="bg-[#E5E5E5] dropdown rounded-md text-sm border h-8 w-8 ">
                            <svg viewBox="0 0 24 24" class="dropdown-svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="4" cy="12" r="0.5"></circle>
                            <circle cx="12" cy="12" r="0.5"></circle>
                            <circle cx="20" cy="12" r="0.5"></circle>
                            </svg>
                        </button>
                        <div class="dropdown-content w-[200px] absolute -left-4 bg-white rounded-md py hidden z-40">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDividerButton">
                        <li>
                            <a href="#"
                                class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <p>
                                    Move to list
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
        if (!event.target.matches(".dropdown-svg")) {
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
  