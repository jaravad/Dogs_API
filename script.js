const BREEDS_LIST = "https://dog.ceo/api/breeds/list/all";

const promise = fetch(BREEDS_LIST);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

promise
  .then(function(response) {
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function(processedResponse) {
    const breeds = processedResponse.message;
    const select = document.getElementById("breeds-sel");
    for (const breed in breeds) {
      const option = document.createElement("option");
      option.value = breed;
      option.appendChild(document.createTextNode(capitalize(breed)));
      select.appendChild(option);

      for (const subbreed in breeds[breed]) {
        const option = document.createElement("option");
        option.value = breed + "-" + breeds[breed][subbreed];
        option.appendChild(
          document.createTextNode(
            capitalize(breeds[breed][subbreed]) + " " + capitalize(breed)
          )
        );
        select.appendChild(option);
      }
    }
  });
