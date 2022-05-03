function fadeTest (data, fade) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].getBoundingClientRect().top - 400 <= 0) {
          data[i].firstElementChild.style.transform = "translateX(0)";
        } else {
          data[i].firstElementChild.style.transform = "translateX(" + fade + ")";
        }
    }
}

export function fadeRight (fadeRight) {
    // let fadeRight = document.querySelectorAll("[cus-fade='right']");
    let fade = "-75vw";
    fadeTest(fadeRight, fade);
    window.addEventListener("scroll", function (event) {
      fadeTest(fadeRight, fade);
    })
}
  
export function fadeLeft (fadeLeft) {
    // let fadeLeft = document.querySelectorAll("[cus-fade='left']");
    let fade = "80vw";
    fadeTest(fadeLeft, fade);
    window.addEventListener("scroll", function (event) {
        fadeTest(fadeLeft, fade);
    })
}