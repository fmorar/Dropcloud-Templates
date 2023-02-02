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
      event: "Michael changed status of INV-100 to processed",
      date: "23 Jun, 2022",
    },
    {
      event: "Mary uploaded Receipt-100",
      date: "23 Jun, 2022",
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
      data.forEach(function (rowData) {
        var newRow = document.createElement("div");
        newRow.classList.add("flex", "justify-between", "border-b-2", "border-[#E0E7EC]", "py-2")
        newRow.innerHTML=`<p class="text-[#283555] text-md">${rowData.event}</p><p class="text-[#7E8699] text-sm">${rowData.date}</p>`
        
        document.querySelector(".activity").appendChild(newRow)
      });
    })
    .catch((error) => console.log(error));
  