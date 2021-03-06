const form = document.querySelector("form");
let search = "";
let color = "";
let numberOfPage = 0;

const api_key = "23560619-43cb7c664d743888e50527d93";
let pageNumber = 1;
let url = "";

let counter = 0;
let letfOverImage = 0;
let imageAmount = 0;
let arrayImages = [];
let itemImage = { srcIm: "", tagIm: "", userIm: "" };
let amountImageInLastPage = 0;

//variables for new pictures elements
let contain;
let img;
let tag;
let user;

let buttonNext = document.getElementById("next");
let buttonBack = document.getElementById("back");
let container = document.getElementById("result");
let buttons = document.getElementById("buttons");

function CreatePicturesElements(i) {

    contain = document.createElement("section");
    contain.id = "contain";
    img = document.createElement('img');
    img.id = "image";
    tag = document.createElement('figcaption');
    tag.id = "tags";
    user = document.createElement('figcaption');
    user.id = "users";

    tag.textContent = arrayImages[i].tagIm;
    user.textContent = arrayImages[i].userIm;
    img.src = arrayImages[i].srcIm;

    container.appendChild(contain);
    contain.appendChild(img);
    contain.appendChild(tag);
    contain.appendChild(user);

    counter++;
}

async function SearchImage(urlParameter) {
    const response = await fetch(urlParameter);
    const json = await response.json();
    numberOfPage = Math.ceil(json.totalHits / 10);
    json.hits.forEach(image => {

        let srcImage = image.previewURL;
        let tagImage = image.tags;
        let userImage = image.user;
        itemImage = { srcIm: srcImage, tagIm: tagImage, userIm: userImage };
        arrayImages.push(itemImage);
    });

    imageAmount = arrayImages.length;
    for (let i = 0; i < imageAmount; i++) {
        CreatePicturesElements(i);
    }
}

form.onsubmit = event => {
    event.preventDefault();

    //reset the search field when new search begins
    search = "";
    pageNumber = 1;
    color = "";
    counter = 0;
    letfOverImage = 0;
    imageAmount = 0;
    amountImageInLastPage = 0;
    container.textContent = "";
    arrayImages = [];
    buttonBack.disabled = true;
    buttonBack.disabled = true;

    search = form.elements.text.value;
    color = form.elements.color.value
    const params = new URLSearchParams({
        key: api_key,
        q: search,
        colors: color,
        per_page: 10,
        page: pageNumber

    })
    url = form.action + '?' + params.toString();

    if (search != "") {
        SearchImage(url);
        buttonBack.style.display = "";
        buttonNext.disabled = false;
        buttonNext.style.display = "";
    }
    else {
        alert("search box cannot be empty");
        buttonBack.style.display = "none";
        buttonNext.style.display = "none";
    }
}

buttonNext.onclick = event => {
    event.preventDefault();
    container.textContent = "";
    arrayImages = [];

    pageNumber += 1;
    const params = new URLSearchParams({
        key: api_key,
        q: search,
        colors: color,
        per_page: 10,
        page: pageNumber

    })
    url = form.action + '?' + params.toString();
    SearchImage(url);
    if (pageNumber === numberOfPage) {

        buttonBack.disabled = false;
        buttonBack.style.display = "";
        buttonNext.disabled = true;
        buttonNext.style.display = "";

    }
    else {
        buttonBack.disabled = false;
        buttonBack.style.display = "";
        buttonNext.disabled = false;
        buttonNext.style.display = "";
    }


}
buttonBack.onclick = event => {
    event.preventDefault();
    container.textContent = "";
    arrayImages = [];

    pageNumber -= 1;
    const params = new URLSearchParams({
        key: api_key,
        q: search,
        colors: color,
        per_page: 10,
        page: pageNumber

    })
    url = form.action + '?' + params.toString();
    SearchImage(url);
    if (pageNumber === 1) {

        buttonBack.disabled = true;
        buttonBack.style.display = "";
        buttonNext.disabled = false;
        buttonNext.style.display = "";

    }
    else {
        buttonBack.disabled = false;
        buttonBack.style.display = "";
        buttonNext.disabled = false;
        buttonNext.style.display = "";
    }


}
