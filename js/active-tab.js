var docTitle = document.title.replace("Oli GD -", "").trim();

const classTag = document.getElementsByClassName("nav-link");

let found = false;


for (let i = 0; i < classTag.length; i++) {

    if (classTag[i].textContent.trim() === docTitle) { 
        classTag[i].classList.add("active");
        found = true; 
    }
}

// Log if no matches were found
if (!found) {
    console.log("Oops - I dont know how you got to see this....");
}
