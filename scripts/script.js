const githubUrl = 'https://api.github.com/users/HugoCortezL/repos'
const content = document.getElementById('content')

async function fetchProfile(link){
    const profile = await fetch(link).then(response => response.json())
    return profile
}

async function getProfile(){
    var profile = await fetchProfile(githubUrl)
    var repositories = [];
    for( var i = 0; i < profile.length; i++){
        const project = {
            key: profile[i].id,
            name: profile[i].full_name.split("/")[1],
            link: profile[i].html_url,
            language: profile[i].language
        }
        repositories.push(project)
    }
    repositories = jsonToHtml(repositories)
    console.log(repositories[0])
    document.getElementById("content").innerHTML = repositories.join("");
}

function jsonToHtml(repositories){
    var teste = []
    for(var i = 0; i < repositories.length;i++){
        teste.push(`<div class="project" key=${repositories[i].key}>
            <h2>${repositories[i].name}</h2>
            <p>
            Link: <a href=${repositories[i].link}> ${repositories[i].link}</a>
            </p>
            <p>Linguagem principal: <span>${repositories[i].language}</span></p>        
        </div>`)
    }
    return teste
}

getProfile()