const userQuery = document.getElementById("search");
const searchQuery = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errrorContainer = document.getElementById("error-container");

const avatarProfile=document.getElementById("avatar");
const nameOfUser=document.getElementById("name");
const userNameElement=document.getElementById("username");
const bioText=document.getElementById("bio");
const locationOfUser=document.getElementById("location");
const dateJoined=document.getElementById("joined-date");
const viewProfileLink=document.getElementById("profile-link");
const followersCount=document.getElementById("followers");
const followingCount=document.getElementById("following");
const reposCount=document.getElementById("repo");
const companyName=document.getElementById("company");
const blogName=document.getElementById("blog");
const twitteruserName=document.getElementById("twitter");
const companyContainer=document.getElementById("company-container");
const blogContainer=document.getElementById("blog-container");
const twitterContainer=document.getElementById("twitter-container");
const reposContainer=document.getElementById("repos-container");
searchQuery.addEventListener("click", searchUser);
userQuery.addEventListener("keypress", (e)=>{
    if(e.key==="Enter") searchUser()
})
async function searchUser(){
     const userName=userQuery.value.trim();
     if(!userName) return alert("please enter a username");


   try{
    profileContainer.classList.add("hidden");
    errrorContainer.classList.add("hidden");

    const response= await fetch(`https://api.github.com/users/${userName}`);
     //console.log(response.status);
    //console.log(response.headers.get("rate-limit"));
   // console.log(response.headers.get("rate-limit-remaining"));
      if(!response.ok){
        throw new Error(`User not found`);
      }


     const userData=await response.json();
    //console.log(`user data is here ${userData}`) 
   
  displayUserData(userData);
  fetchRepositories(userData.repos_url);}




    catch(error){
      console.error(error);
      showError();
     
    }}
    function displayUserData(data){
    avatarProfile.src=data.avatar_url ;
    nameOfUser.textContent=data.name || data.login;
    userNameElement.textContent="@" + data.login;
    bioText.textContent=data.bio ||"No bio available";
    locationOfUser.textContent=data.location || "Not Specified";
    //todo: format the date
    dateJoined.textContent=formatDate(data.created_at);

    viewProfileLink.href=data.html_url;

    followersCount.textContent=data.followers || 0;
    followingCount.textContent=data.following || 0;
    reposCount.textContent=data.public_repos || 0;

    if(data.company) companyName.textContent=data.company ;
    else companyName.textContent="Not Specified";
    companyContainer.style.display="flex";
    if(data.blog) {blogName.textContent=data.blog;
    blogName.href=data.blog.startsWith("http") ? data.blog :`https://${data.blog}`;}
    else{ blogName.textContent="No Website";
    blogName.href="#";}
    blogContainer.style.display="flex";
    if(data.twitter_username) {twitteruserName.textContent=`@${data.twitter_username}`;
    twitteruserName.href=`https://twitter.com/${data.twitter_username}`}
    else{
      twitteruserName.textContent="No twitter";
      twitteruserName.href="#";}
      twitterContainer.style.display="flex";
      profileContainer.classList.remove("hidden");
    }
    function formatDate(dateString){
     return new Date(dateString).toLocaleDateString("en-us",{
        year:"numeric",
        month:"short",
        day:"numeric"

      });
    }
    function showError(){
      errrorContainer.classList.remove("hidden");
      profileContainer.classList.add("hidden");

    }
   async function fetchRepositories(reposUrl){
    reposContainer.innerHTML=`<div class="loading-repos">Loading Repositories</div>`
    try{
          const response=await fetch(reposUrl);
          if(!response.ok){
            throw new Error("Failed to fetch repositories");
          }
          const repos=await response.json();
          displayRepos(repos);
    }
    catch(error){
      console.error(error);
      reposContainer.innerHTML=`<div class="no-repos">${error.message}</div>`
    }}
    function displayRepos(repos){

      if(repos.length==0){
        reposContainer.innerHTML=`<div class="no-repos"> No repositories found</div>`
       return } 
      reposContainer.innerHTML="";
      repos.forEach(repo =>{
        const repoCard=document.createElement("div");
        repoCard.classList.add("repo-card");
        const updatedAt=formatDate(repo.updated_at);
              repoCard.innerHTML = `
            <a href="${repo.html_url}" target="_blank" class="repo-name">
                <i class="fas fa-code-branch"></i>${repo.name}
            </a>

            <p class="repo-description">
                ${repo.description || "No description available"}
            </p>

            <div class="repo-meta">
                ${
                    repo.language
                        ? `
                            <div class="repo-meta-item">
                                <i class="fas fa-circle"></i>
                                ${repo.language}
                            </div>
                          `
                        : ""
                }

                <div class="repo-meta-item">
                    <i class="fas fa-star"></i>
                    ${repo.stargazers_count}
                </div>

                <div class="repo-meta-item">
                    <i class="fas fa-code-fork"></i>
                    ${repo.forks_count}
                </div>

                <div class="repo-meta-item">
                    <i class="fas fa-history"></i>
                    ${updatedAt}
                </div>
            </div>
        `;

        reposContainer.appendChild(repoCard);
    });
}
   

  
  








