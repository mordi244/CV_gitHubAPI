
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
    let divimg = document.createElement("div");
    let divh1 = document.createElement("div");
    // create and set html elements
    let container = document.querySelector(".container");
    let userContainer = document.createElement("div");
    let userImg = document.createElement("img");
    let name = document.createElement("h4");
    let containerUserContent = document.createElement("div");
    let btnRepo = document.createElement('button');
    let btnProfile = document.createElement('button');
    divh1.appendChild(name);
    containerUserContent.appendChild(name);
    btnRepo.textContent = "Repositories";
    btnProfile.textContent = "Full Profile";
    name.textContent = content.login; //get header by repository login owner
    userContainer.setAttribute("class", "container-user");
    userImg.setAttribute("src", content.avatar_url);
    //append child to container
    containerUserContent.appendChild(btnRepo);
    containerUserContent.appendChild(btnProfile);
    containerUserContent.appendChild(userImg);
    containerUserContent.setAttribute("class","containerUserContent");
    userContainer.appendChild(userImg);
    userContainer.appendChild(containerUserContent);
    container.appendChild(userContainer);
    
    //click listener for loading repositories
    btnRepo.addEventListener("click", function () {
        container.innerHTML = "";
        getDataRepo(content);
    });
    //click listener for loading profile site
    btnProfile.addEventListener("click", function () {
        //window.location = content.html_url;
        window.open(content.html_url,'_blank');
    });
}

//get repositories for user
const getDataRepo = async (content) => {
    try {
        //get data from api
        let response = await fetch(content.repos_url);
        let myJson = await response.json();
        //creating and set html elements
        let container = document.querySelector(".container");
        let headerDiv = document.createElement("div");
        let h1Div = document.createElement("div");
        let imgDiv = document.createElement("div");
        let mainHeader = document.createElement("h1");
        let userImg = document.createElement("img");
        userImg.setAttribute("src", content.avatar_url);
        mainHeader.textContent = content.login + "'s "+ ' Repositories (' + myJson.length + ')';
        headerDiv.setAttribute("class", "divHeader");
        //append child to container
        imgDiv.appendChild(userImg);
        h1Div.appendChild(mainHeader);
        headerDiv.appendChild(imgDiv);
        headerDiv.appendChild(h1Div);
        container.appendChild(headerDiv);
        //loop over the user repositories
        for (let i = 0; i < myJson.length; i++) {
            createDivsRepos(myJson[i], content.repos_url);
        }
    } catch (err) {
        console.log(err);
    }
}

//create ui for user repositories
function createDivsRepos(content, url) {
    //creating and set html elements
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
    getDataFromAPI(username);
});
