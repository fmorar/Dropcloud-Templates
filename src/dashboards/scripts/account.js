let tabsContainer = document.querySelector("#tabs");

let tabTogglers = tabsContainer.querySelectorAll("#tabs a");

console.log(tabTogglers);

tabTogglers.forEach(function(toggler) {
  toggler.addEventListener("click", function(e) {
    e.preventDefault();

    let tabName = this.getAttribute("href");

    let tabContents = document.querySelector("#tab-contents");

    for (let i = 0; i < tabContents.children.length; i++) {
      
      tabTogglers[i].parentElement.classList.remove("border-b-[3px]");  tabContents.children[i].classList.remove("hidden");
      if ("#" + tabContents.children[i].id === tabName) {
        continue;
      }
      tabContents.children[i].classList.add("hidden");
      
    }
    e.target.parentElement.classList.add("border-b-[3px]");
  });
});

var parent = document.querySelector(".parent");

// password show/hide helper function
function showHide(input, showText) {
    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
        showText.classList.remove("fa-eye");
        showText.classList.add("fa-eye-slash");
    } else {
        input.setAttribute("type", "password");
        showText.classList.remove("fa-eye-slash");
        showText.classList.add("fa-eye");
    }
}

// event delegation on event target match
parent.addEventListener("click", event => {
    if (event.target.matches("i")) {
        var spanElm = event.target;
        var inputElm = spanElm.previousElementSibling;
        showHide(inputElm, spanElm);
    }
});