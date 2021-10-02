const form = document.querySelector("form");
let search = "";
let color = "";

const api_key = "23520112-b013bf2d41dfff6b7c3007bcf";
const hits = 200;

let counter = 0;
let letfOverImage = 0;
let imageAmount = 0;
let arrayImages = [];
let itemImage = {srcIm: "", tagIm : "", userIm: "" };
let amountImageInLastPage = 0;

let buttonNext = document.getElementById("next");
let buttonBack = document.getElementById("back");
let container = document.getElementById("result");
let buttons = document.getElementById("buttons");


form.onsubmit = event => {
    event.preventDefault();

    //reset the search field when new search begins
    search = "";
    color = "";
    counter = 0;
    letfOverImage = 0;
    imageAmount = 0;
    amountImageInLastPage = 0;
    container.textContent="";
    arrayImages = [];
    buttonBack.disabled = true;
    buttonBack.disabled = true;

    search = form.elements.text.value;
    color = form.elements.color.value
    const params = new URLSearchParams({
        key: api_key,
        q: search,
        colors: color,
        per_page: hits
        
    })
    const url = form.action +'?'+ params.toString();

    async function SearchImage() {
        const response = await fetch(url);
        const json = await response.json();
            
      //iterate every image found and push it to imageAmount array
        json.hits.forEach(image => {

            let srcImage = image.previewURL;
            let tagImage = image.tags;
            let userImage = image.user;
            itemImage = {srcIm: srcImage, tagIm : tagImage, userIm: userImage };
            arrayImages.push(itemImage);
         });


         imageAmount = arrayImages.length;

 
         //check if we are going to enter the first page
        if (counter === 0)
        {
            if(imageAmount>=10){
                container.textContent="";
                for (let i=0;i<10;i++)
                {
                    let contain = document.createElement("section");
                    contain.id = "contain";
                    let img = document.createElement('img');
                    img.id = "image";
                    let tag = document.createElement('figcaption');
                    tag.id = "tags";
                    let user = document.createElement('figcaption');
                    user.id = "users";
                    
                                    
                    tag.textContent = arrayImages[i].tagIm;
                    user.textContent = arrayImages[i].userIm;
                    img.src = arrayImages[i].srcIm;
                    container.appendChild(contain);
                    contain.appendChild(img);
                    contain.appendChild(tag);
                    contain.appendChild(user);
                    
                    counter+=1;
                }
            }
            else {
                container.textContent="";
                for (let i=0;i<imageAmount+1;i++)
                {
                    let contain = document.createElement("section");
                    contain.id = "contain";
                    let img = document.createElement('img');
                    img.id = "image";
                    let tag = document.createElement('figcaption');
                    tag.id = "tags";
                    let user = document.createElement('figcaption');
                    user.id = "users";
                    
                                    
                    tag.textContent = arrayImages[i].tagIm;
                    user.textContent = arrayImages[i].userIm;
                    img.src = arrayImages[i].srcIm;
                    container.appendChild(contain);
                    contain.appendChild(img);
                    contain.appendChild(tag);
                    contain.appendChild(user);
                    
                    counter+=1;
                }
            }

            
            
            letfOverImage = imageAmount-counter;

            buttonNext.style.display= "";
            buttonBack.style.display= "";
            if (letfOverImage === 0) {
                buttonBack.disabled = true;
                buttonNext.disabled = true;
            }
            else {
                buttonNext.disabled = false;
            }
            

        }                  

        

    }

    if(search != ""){
        SearchImage(); 
    }
    else {
        alert("search box cannot be empty");
        buttonBack.style.display = "none";
        buttonNext.style.display = "none";

    }

   
}

buttonNext.onclick = event => {
    event.preventDefault();
    container.textContent="";
    letfOverImage = imageAmount-counter;
    let limit = counter +10;

    //check if we are not gonna enter the last page
    if(letfOverImage>10)
    {
        for(let i= counter; i<limit; i++) {
            try {
                let contain = document.createElement("section");
                contain.id = "contain";
                let img = document.createElement('img');
                img.id = "image";
                let tag = document.createElement('figcaption');
                tag.id = "tags";
                let user = document.createElement('figcaption');
                user.id = "users";
                
                                
                tag.textContent = arrayImages[i].tagIm;
                user.textContent = arrayImages[i].userIm;
                img.src = arrayImages[i].srcIm;
                container.appendChild(contain);
                contain.appendChild(img);
                contain.appendChild(tag);
                contain.appendChild(user);
                counter+=1;
            }
            catch(e) {
                if(e) {
                    console.log("got error: " + e + " stop on counter: " + counter);
                }
            }
            
        }
        buttonBack.disabled = false;

    }
    //check if we are entering the last page
    else
    {
        
        for(let i= counter; i<imageAmount; i++) {
            try {
            amountImageInLastPage = letfOverImage;
                let contain = document.createElement("section");
                contain.id = "contain";
                let img = document.createElement('img');
                img.id = "image";
                let tag = document.createElement('figcaption');
                tag.id = "tags";
                let user = document.createElement('figcaption');
                user.id = "users";
                
                                
                tag.textContent = arrayImages[i].tagIm;
                user.textContent = arrayImages[i].userIm;
                img.src = arrayImages[i].srcIm;
                container.appendChild(contain);
                contain.appendChild(img);
                contain.appendChild(tag);
                contain.appendChild(user);
                counter+=1;

            }
            catch(e) {
                if(e) {
                    console.log("got error: " + e + " stop on counter: " + counter);
                }
            }
            
        }
        buttonNext.disabled = true;
    }
}

buttonBack.onclick = event => {
    event.preventDefault();

    container.textContent="";
    letfOverImage = imageAmount-counter;
    let begin =counter;
   
    //go to previous page from the last page
    if(letfOverImage===0)
    {
        begin = imageAmount-amountImageInLastPage-10;
        let limit = begin +10;
        counter = begin;

        for(let i= begin; i<limit; i++) {
            try {
            
                let contain = document.createElement("section");
                contain.id = "contain";
                let img = document.createElement('img');
                img.id = "image";
                let tag = document.createElement('figcaption');
                tag.id = "tags";
                let user = document.createElement('figcaption');
                user.id = "users";
                
                                
                tag.textContent = arrayImages[i].tagIm;
                user.textContent = arrayImages[i].userIm;
                img.src = arrayImages[i].srcIm;
                container.appendChild(contain);
                contain.appendChild(img);
                contain.appendChild(tag);
                contain.appendChild(user);
                counter+=1;

            }
            catch(e) {
                if(e) {
                    console.log("got error: " + e + " stop on counter: " + counter);
                }
            }
            
        }
        buttonBack.disabled = false;
        buttonNext.disabled = false;

    }
    //check if we are entering the first page
    else if(counter-10===10) {
        counter = 0;
        limit = counter +10;

        for (let i=0;i<limit;i++){
            try {
                let contain = document.createElement("section");
                contain.id = "contain";
                let img = document.createElement('img');
                img.id = "image";
                let tag = document.createElement('figcaption');
                tag.id = "tags";
                let user = document.createElement('figcaption');
                user.id = "users";
                
                                
                tag.textContent = arrayImages[i].tagIm;
                user.textContent = arrayImages[i].userIm;
                img.src = arrayImages[i].srcIm;
                container.appendChild(contain);
                contain.appendChild(img);
                contain.appendChild(tag);
                contain.appendChild(user);
                counter+=1;

            } 
            catch(e) {
                if(e) {
                    console.log("got error: " + e + " stop on counter: " + counter);
                }
            }
            buttonNext.disabled = false;
            buttonBack.disabled = true;
        }
            


    }

    //check if we are not entering the first page
    else  {

        begin = counter-20;
        limit = begin+10;
        counter = begin;


        for(let i= begin; i<limit; i++) {
            try {
                let contain = document.createElement("section");
                contain.id = "contain";
                let img = document.createElement('img');
                img.id = "image";
                let tag = document.createElement('figcaption');
                tag.id = "tags";
                let user = document.createElement('figcaption');
                user.id = "users";
                
                                
                tag.textContent = arrayImages[i].tagIm;
                user.textContent = arrayImages[i].userIm;
                img.src = arrayImages[i].srcIm;
                container.appendChild(contain);
                contain.appendChild(img);
                contain.appendChild(tag);
                contain.appendChild(user);
                counter+=1;

            }
            catch(e) {
                if(e) {
                    console.log("got error: " + e + " stop on counter: " + counter);
                }
            }
            
        }
        buttonNext.disabled = false;
        buttonBack.disabled = false;
    }
    
}