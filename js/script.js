const overview = document.querySelector(".overview")
const username = "Aechelon-Online"
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
}