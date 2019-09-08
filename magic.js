window.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", placeInCircle);

function init() {
  fetch("marvelmovietemplate.svg")
    .then(response => response.text())
    .then(svgData => {
      document
        .querySelector("#svg_timeline")
        .insertAdjacentHTML("afterbegin", svgData);

      document.querySelectorAll(".svgplaceholder").forEach(button => {
        button.addEventListener("click", addAnimation);
      });

      loadJSON();

      placeInCircle();
    });
}

function addAnimation() {
  // container

  const svgTimeline = document.querySelector("#svg_timeline");

  let btns = svgTimeline.getElementsByClassName("svgplaceholder");

  // Loop through the buttons and also adds the active class to the clicked button
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active");

      // if theres no current active
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }

      // add class active to clicked
      this.className += " active";
    });
  }
}

function loadJSON() {
  fetch("moviedata.json")
    .then(response => response.json())
    .then(jsonData => {
      jsonData.forEach(movie => {
        //clone

        const template = document.querySelector("#movie_template");

        let clone = template.cloneNode(true).content;

        //put data in clone

        clone.querySelector("[data-field='title']").textContent = movie.title;
        clone.querySelector("[data-field='year']").textContent = movie.year;

        //append clone

        const destination = document.querySelector(
          ".svgplaceholder[data-svgplaceholder='" + movie.id + "']"
        );

        destination.appendChild(clone);
      });
    });
}

function placeInCircle() {
  const svgplaceholders = document.querySelectorAll(".svgplaceholder");
  svgplaceholders.forEach(replaceSVGwithHTML);
}

function replaceSVGwithHTML(htmlElement) {
  //we got an html element with data-svgplacheholder
  //find matching svg-element

  const svgId = htmlElement.dataset.svgplaceholder;
  const svgSelector = "#" + svgId + " .HTML_placeholder";

  fitRectangle(svgSelector, htmlElement);
}

function fitRectangle(svgElement, htmlElement) {
  svgElement = document.querySelector(svgElement);

  getRect = svgElement.getBoundingClientRect();

  // htmlElement = document.querySelector(htmlElement);

  //left
  htmlElement.style.left = getRect.x + "px";
  //top
  htmlElement.style.top = getRect.y + "px";
  //width
  htmlElement.style.width = getRect.width + "px";
  //height
  htmlElement.style.height = getRect.height + "px";
}

//getBoundingCLientRect
//function to resize whenever window changes
