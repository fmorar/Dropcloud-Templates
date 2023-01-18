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


})();
