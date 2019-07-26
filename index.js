
// get data from github api - by search field
const getDataFromAPI = async (userName) => {
    try {
        let response = await fetch("https://api.github.com/search/users?q=" + username.value);
        let myJson = await response.json();
        console.log(myJson);
        for (let i = 0; i < myJson.items.length; i++) {
            createDivsMain(myJson.items[i]);
        }
    } catch (err) {
        console.log(err);
    }
}

//create html elements for the main page
const createDivsMain = (content) => {
    // create html elements
    let container = document.querySelector(".container");
    let userContainer = document.createElement("div");
    let userImg = document.createElement("img");
    let name = document.createElement("h4");
    let btnRepo = document.createElement('button');
    let btnProfile = document.createElement('button');
    btnRepo.textContent = "Repositories";
    btnProfile.textContent = "Full Profile";
    name.textContent = content.login; //get header by repository login owner
    userContainer.setAttribute("class", "container-user");
    userImg.setAttribute("src", content.avatar_url);
    //append child to container
    userContainer.appendChild(name);
    userContainer.appendChild(userImg);
    userContainer.appendChild(btnRepo);
    userContainer.appendChild(btnProfile);
    //click listener for loading repositories
    btnRepo.addEventListener("click", function () {
        container.innerHTML = "";
        getDataRepo(content);
    });

    container.appendChild(userContainer);
}


const getDataRepo = async (content) => {
    try {
        let response = await fetch(content.repos_url);
        let myJson = await response.json();
        //creating html elements
        let container = document.querySelector(".container");
        let headerDiv = document.createElement("div");
        let mainHeader = document.createElement("h1");
        let userImg = document.createElement("img");
        userImg.setAttribute("src", content.avatar_url);
        mainHeader.textContent = content.login;
        headerDiv.setAttribute("class", "divHeader");
        //append child to container
        headerDiv.appendChild(userImg);
        headerDiv.appendChild(mainHeader);
        container.appendChild(headerDiv);
        //loop over the user repositories
        for (let i = 0; i < myJson.length; i++) {
            createDivsRepos(myJson[i], content.repos_url);
        }

    } catch (err) {
        console.log(err);
    }
}
function createDivsRepos(content, url) {
    //creating html elements
    let container = document.querySelector(".container");
    let userContainer = document.createElement("div");
    let headerDiv = document.createElement("div");
    let forks = document.createElement("p");
    let watchers = document.createElement("p");
    let flag = document.createElement("p");
    let a = document.createElement("a");
    let header = document.createElement("h5");
    let mainHeader = document.createElement("h1");
    headerDiv.appendChild(mainHeader);
    header.textContent = content.full_name;
    a.href = url;
    a.textContent = url;
    forks.textContent = "Forks : " + content.forks;
    watchers.textContent = "Watchers : " + content.watchers;
    //setting flag value
    if (container.private === "true")
        flag.textContent = "Private";
    else flag.textContent = "Public";
    flag.setAttribute("class", "flag");
    //appends all childs to page
    userContainer.setAttribute("class", "container-user");
    userContainer.appendChild(header);
    userContainer.appendChild(forks);
    userContainer.appendChild(watchers);
    userContainer.appendChild(flag);
    userContainer.appendChild(a);
    container.appendChild(userContainer);
}
//repositories click event
document.querySelector("#search").addEventListener('click', function () {
    let username = document.querySelector("#username");
    let container = document.querySelector(".container");
    container.innerHTML = ""; // clean page berfore load html
    console.log(username.value)
    getDataFromAPI(username);
});
