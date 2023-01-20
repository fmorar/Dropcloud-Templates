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
    let thumbnailElement = dropZoneElement.querySelector(
        ".drop-zone__thumb"
    );
    /*remove text prompt*/
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
        dropZoneElement.querySelector(".drop-zone__text").remove();
    }

    /*first time there won't be a thumbnailElement so it has to be created*/
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb", "w-full", "h-full", "rounded-md", "overflow-hidden", "bg-gray-300", "bg-cover", "relative", "after:content-[attr(data-label)]", "after:absolute", "after:bottom-0", "after:left-0", "after:w-full", "after:p-5", "after:text-white", "after:bg-black", "after:bg-opacity-75", "after:text-center", "after:font-size-14");
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
        thumbnailElement.style.backgroundImage = null; /*plain background for non image type files*/
    }
}

function handleSelectAll() {
    let checkboxes = document.querySelectorAll('.checkbox');
    const selectAllCheckbox = document.getElementById("selectAll");
    checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
}

(function () {

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

    let mockData = [
        {
            fileName: "INV-1", adminName: "Wade Warren",
            comment: "Payment for logistics costs", status: "Processed"
        },
        {
            fileName: "INV-2", adminName: "Brooklyn Simpsons",
            comment: "Payment for office costs", status: "Pending"
        },
    ]

    function getData() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(mockData);
            }, 1000);
        });
    }


    getData()
        .then((data) => {
            let table = document.getElementById("myTable").getElementsByTagName("tbody")[0];
            data.forEach(function (rowData) {
                var newRow = table.insertRow(table.length);
                var checkboxCell = newRow.insertCell(0);
                var fileCell = newRow.insertCell(1);
                var adminCell = newRow.insertCell(2);
                var commentCell = newRow.insertCell(3);
                var statusCell = newRow.insertCell(4);
                var actionsCell = newRow.insertCell(5);

                fileCell.innerHTML = rowData.fileName
                adminCell.innerHTML = rowData.adminName
                commentCell.innerHTML = rowData.comment
                statusCell.innerHTML = rowData.status
                checkboxCell.innerHTML = `<input type="checkbox" id="checkbox_${rowData.name}" class="checkbox w-5 h-5 rounded-sm text-gray-600" value="${rowData.name}">`;
                actionsCell.innerHTML = `
                <div class="relative">
                    <button class="bg-[#E5E5E5] dropdown rounded-md text-sm border h-8 w-8 ">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="4" cy="12" r="0.5"></circle>
                        <circle cx="12" cy="12" r="0.5"></circle>
                        <circle cx="20" cy="12" r="0.5"></circle>
                        </svg>
                    </button>
                    <div class="dropdown-content absolute bg-white rounded-md py hidden z-40">
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

            });

            let buttons = document.querySelectorAll(".dropdown");
            buttons.forEach(function (button) {
                button.addEventListener("click", function (event) {
                    let dropdown = event.currentTarget.nextElementSibling;
                    dropdown.classList.toggle("hidden");
                });
            });
        })
        .catch((error) => console.log(error));


})();
