const BREEDS_LIST = "https://dog.ceo/api/breeds/list/all";

const button = document.getElementById("get-btn");

const select = document.getElementById("breeds-sel");

const gallery = document.querySelector(".image-gallery");

const promise = fetch(BREEDS_LIST);

function capitalize(str) {
  // To capitalize words
  return str.charAt(0).toUpperCase() + str.slice(1);
}

promise
  .then(function(response) {
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function(processedResponse) {
    const breeds = processedResponse.message;

    for (const breed in breeds) {
      const option = document.createElement("option");
      option.value = breed;
      option.appendChild(document.createTextNode(capitalize(breed)));
      select.appendChild(option);

      for (const subbreed in breeds[breed]) {
        const option = document.createElement("option");
        option.value = breed + "/" + breeds[breed][subbreed];
        option.appendChild(
          document.createTextNode(
            capitalize(breeds[breed][subbreed]) + " " + capitalize(breed)
          )
        );
        select.appendChild(option);
      }
    }
  });

button.addEventListener("click", function() {
  if (select.value !== "") {
    console.log(select.value);
    const URL = "https://dog.ceo/api/breed/" + select.value + "/images/random";

    const promise = fetch(URL);
    promise
      .then(function(response) {
        const processingPromise = response.json();
        return processingPromise;
      })
      .then(function(processedResponse) {
        const imgCont = document.createElement("div");
        imgCont.setAttribute("class", "img-container");
        const imgICont = document.createElement("div");
        imgICont.setAttribute("class", "img-inner-container");
        const img = document.createElement("img");
        img.src = processedResponse.message;
        img.alt = select.value;

        imgICont.appendChild(img);
        imgCont.appendChild(imgICont);

        gallery.appendChild(imgCont);
      });
  }
});

// {
//   /* <div class="img-container">
//   <img
//     src="https://images.dog.ceo/breeds/affenpinscher/n02110627_11620.jpg"
//     alt=""
//   />
// </div>; */
// }
