function get_github_repositories() {
    const request = new Request('https://api.github.com/users/OGD311/repos');
    return fetch(request)
        .then(response => {
            if (!response.ok) { 
                return get_default_repositories(); 
            }
            return response.json();
    });
}
function get_default_repositories() {
    return fetch('../default_repos.json')
        .then(response => response.json());
}

function filter_relevant_repositories(repositories) {
    return repositories
    .filter((repo) => repo.name != 'readme' && repo.language)
    .sort((a, b) => b.id - a.id);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    
    // Get the day, month, and year
    const day = String(date.getUTCDate()).padStart(2, '0'); // Pad single digit days
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();
    
    // Return in the desired format
    return `${day}/${month}/${year}`;
}

function get_language_color(language) {
    return fetch('../languages.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data[language] || 'black';
        })
        .catch(error => {
            return 'black'; 
        });
}

function createRepoCard(repos) {

    const container = document.getElementById('cards');
    
    // Create and append <h1>
    const title = document.createElement('h1');
    title.textContent = 'Projects';
    container.appendChild(title);

    // Create and append <p>
    if (repos[0].language == 'error'){
        const message = document.createElement('p');
        message.innerHTML = 'Oops - could not connect to the github API. <br> Some of these details may be out of date or inaccurate and some repositories may be missing';
        container.appendChild(message);
        repos.splice(0,1);
    };

    // Loop through repos and create cards
    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'card justify-content-center border-2 m-1';
        card.style.width = '17rem';

        const link = document.createElement('a');
        link.className = 'link-underline-opacity-0 link-primary';
        link.href = repo.html_url;
        link.target = repo.html_url;

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card-title';
        cardTitle.textContent = repo.name; 
        link.appendChild(cardTitle);

        const cardSubtitle = document.createElement('h4');
        cardSubtitle.className = 'card-subtitle'
        get_language_color(repo.language).then(color => {
            cardSubtitle.style.color = color; 
        });
        cardSubtitle.textContent = repo.language;
        link.appendChild(cardSubtitle);


        const cardDescription = document.createElement("p");
        cardDescription.className = "card-body";
        cardDescription.textContent = repo.description;
        link.appendChild(cardDescription);



        const cardStars = document.createElement("p");
        cardStars.innerHTML = 'Stars: <span style="color: goldenrod;">' + repo.stargazers_count + '<img src="../images/star.svg"></span>';
        link.appendChild(cardStars);

        const cardUpdated = document.createElement("p");
        cardUpdated.innerHTML = "Last Updated: " + formatDate(repo.updated_at);
        link.appendChild(cardUpdated);

        if (repo.license) {
            const cardLicense = document.createElement("p");
            let licenseName = repo.license
            cardLicense.textContent = "License: " + licenseName.name;
            link.appendChild(cardLicense);
        }        
             

        card.appendChild(link);
        container.appendChild(card);
    });
    
     
    document.body.appendChild(container);
    createFooter(container);
}

get_github_repositories().then(data => filter_relevant_repositories(data))
    .then(repos =>{
        createRepoCard(repos);
    });



function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'text-center sticky-bottom';

    const container = document.createElement('div');
    container.className = 'container';

    const copyright = document.createElement('p');
    copyright.innerHTML = '&copy; 2024 Oli GD';

    const warning = document.createElement('p');
    warning.className = 'text-bg-danger p-2';
    warning.textContent = 'This site is a work in progress and thus some features may be unavailable or may not work as intended - please be patient';

    container.appendChild(copyright);
    container.appendChild(warning);

    footer.appendChild(container);

    document.body.appendChild(footer);
}