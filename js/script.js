const overview = document.querySelector(".overview")
const username = "Aechelon-Online"
const repoList = document.querySelector(".repo-list")
const repoClick = document.querySelector(".repos")
const repoDataPull = document.querySelector(".repo-data")
const backButton = document.querySelector(".view-repos")
const filterInput = document.querySelector(".filter-repos")

const getProfile = async function () {
    const githubData = await fetch (
        `https://api.github.com/users/${username}`
    )
    const profileData = await githubData.json()
    //console.log(profileData)
    displayUser(profileData)
}
getProfile()

const displayUser = function (profileData) {
    const userinfo = document.createElement("div")
    userinfo.classList.add("user-info")
    userinfo.innerHTML = 
    `<figure>
    <img alt="user avatar" src=${profileData.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${profileData.name}</p>
    <p><strong>Bio:</strong> ${profileData.bio}</p>
    <p><strong>Location:</strong> ${profileData.location}</p>
    <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
  </div> `
  overview.append(userinfo)
  getRepos()
}

const getRepos = async function () {
  const githubRepos = await fetch (
    `https://api.github.com/users/${username}/repos?sort=updated&per-page=100`
  )
  const repoData = await githubRepos.json()
  //console.log(repoData)
  displayRepos(repoData)

}


const displayRepos = function (repos) {
  filterInput.classList.remove("hide")
  for (const repo of repos) {
    const repoLi = document.createElement("li")
    repoLi.classList.add("repo")
    repoLi.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(repoLi)
  }
}

repoList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText
    clickRepo(repoName)
  }
})

const clickRepo = async function(repoName) {
  const fetchRepo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  )
  const repoInfo = await fetchRepo.json()
  //console.log(repoInfo)
  const fetchLanguages = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`
  )
  const languageData = await fetchLanguages.json()
  //console.log(languageData)

  const languages = []

  for (let language in languageData) {
    languages.push(language)
    //console.log(languages)
  }
  displayRepo(repoInfo, languages)
}

const displayRepo = function (repoInfo, languages) {
  repoDataPull.innerHTML = ""
  repoDataPull.classList.remove("hide")
  repoClick.classList.add("hide")
  backButton.classList.remove("hide")
  const displayRepoInfo = document.createElement("div")
  displayRepoInfo.innerHTML = 
  `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

  repoDataPull.append(displayRepoInfo)
}

backButton.addEventListener("click", function(e) {
  repoClick.classList.remove("hide")
  repoDataPull.classList.add("hide")
  backButton.classList.add("hide")
})

filterInput.addEventListener("input", function(e) {
  const searchText = e.target.value
  //console.log(searchText)
  const repos = document.querySelectorAll(".repo")
  const repoSearch = searchText.toLowerCase()
  for (const repoMatch of repos) {
      repoLowerCase = repoMatch.innerText.toLowerCase()
      if (repoLowerCase.includes(repoSearch)) {
        repoMatch.classList.remove("hide")
      } else {
        repoMatch.classList.add("hide")
      }
  }
    
})