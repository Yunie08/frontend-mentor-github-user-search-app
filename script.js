

// Check whether data is filled or empty
function checkData(data) {
  if ((data == null) || (data == "")) {
    return false;
  }
  return true;
}

// if data is present returns data, otherwise returns defaultText
function getData(data, defaultText) {
  if (checkData(data)) {
    return data;
  }
  return defaultText;
}

// Modify date format from YYYY-MM-DDTHH:MM:SSZ to " DD [Mon]th YYYY"
// example : 2011-01-25T18:44:36Z --> "25 Jan 2011"
function getFormattedDate(rawDate) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let day = rawDate.slice(8,10);
  // Extract month, convert to number and return correponding month in months[]
  let month = months[Number(rawDate.slice(5,7)) - 1];
  let year = rawDate.slice(0,4);

  let formattedDate = " " + day + " " + month + " " + year;
  return formattedDate;
}


function fillUserInfo(userData) {
  //Default text when data was not filled by user
  const defaultBio = "This profile has no bio";
  const notAvailableText = "Not available";


  // Setting user profile pic
  const userPic = document.getElementById("userPic");
  userPic.setAttribute('src',`${userData.avatar_url}`);

  // Setting user name and username
  let userNameElt = document.querySelector(".user-info__name");
  let name = getData(userData.name, userData.login);
  userNameElt.innerText = name;

  let userPseudo = document.querySelector(".user-info__pseudo");

  userPseudo.innerText = `@${userData.login}`;

  // Setting joining date after formatting
  const dateElt = document.getElementById("date");
  let rawDate = userData.created_at;
  let formattedDate = getFormattedDate(rawDate);
  date.innerText = formattedDate;

  // Setting description
  let description =document.querySelector('.user-info__description');
  let bio = getData(userData.bio, defaultBio);
  if (bio == defaultBio) {
    description.classList.add('not-available');
  }
  description.innerText = bio;

  // Setting statistics
  let repos = document.getElementById("repos");
  repos.innerText = userData.public_repos;

  let followers = document.getElementById("followers");
  followers.innerText = userData.followers;

  let following = document.getElementById("following");
  following.innerText = userData.following;

  //Setting "where to find me" section
  // Location
  let locationElt = document.getElementById('location');
  let location = getData(userData.location, notAvailableText);
  if (location == notAvailableText) {
    locationElt.parentElement.classList.add('not-available');
  } else {
    locationElt.parentElement.classList.remove('not-available');
  }
  locationElt.innerText = location;

  // User website
  const websiteElt = document.getElementById('website');
  const websiteContainer = document.getElementById('websiteContainer');
  let website = getData(userData.blog, notAvailableText);
  console.log(website);
  if (website == notAvailableText) {
    websiteContainer.classList.add('not-available');
    let websiteData = document.createElement("p");
    websiteData.classList.add("user-infos__links__text");
    websiteData.setAttribute('id','website');
    websiteData.innerText = website;
    if (websiteElt != null) {
      websiteContainer.replaceChild(websiteData,websiteElt);
    } else {
      websiteContainer.append(websiteData);
    }
  } else {
    websiteContainer.classList.remove('not-available');
    let websiteData = document.createElement("a");
    websiteData.classList.add("user-infos__links__text");
    websiteData.setAttribute('id','website');
    websiteData.setAttribute('href', website);
    websiteData.innerText = website;
    if (websiteElt != null) {
      websiteContainer.replaceChild(websiteData,websiteElt);
    } else {
      websiteContainer.append(websiteData);
    }
  }


  // User twitter
  const twitterElt = document.getElementById('twitter');
  const twitterContainer = document.getElementById('twitterContainer');
  let twitter = getData(userData.twitter_username, notAvailableText);
  console.log(twitter);
  if (twitter == notAvailableText) {
    twitterContainer.classList.add('not-available');
    let twitterData = document.createElement("p");
    twitterData.classList.add("user-infos__links__text");
    twitterData.setAttribute('id','twitter');
    twitterData.innerText = twitter;
    if (twitterElt != null) {
      twitterContainer.replaceChild(twitterData,twitterElt);
    } else {
      twitterContainer.append(twitterData);
    }
  } else {
    twitterContainer.classList.remove('not-available');
    let twitterData = document.createElement("a");
    twitterData.classList.add("user-infos__links__text");
    twitterData.setAttribute('id','twitter');
    twitterData.setAttribute('href', `https://twitter.com/${twitter}`);
    twitterData.innerText = twitter;
    if (twitterElt != null) {
      twitterContainer.replaceChild(twitterData,twitterElt);
    } else {
      twitterContainer.append(twitterData);
    }
  }


  // User company
  const companyElt = document.getElementById('company');
  const companyContainer = document.getElementById('companyContainer');
  let company = getData(userData.company, notAvailableText);
  console.log(company);
  if (company == notAvailableText) {
    companyContainer.classList.add('not-available');
    let companyData = document.createElement("p");
    companyData.classList.add("user-infos__links__text");
    companyData.setAttribute('id','company');
    companyData.innerText = company;
    if (companyElt != null) {
      companyContainer.replaceChild(companyData,companyElt);
    } else {
      companyContainer.append(companyData);
    }
  } else {
    companyUrl = company.substring(1);
    companyContainer.classList.remove('not-available');
    let companyData = document.createElement("a");
    companyData.classList.add("user-infos__links__text");
    companyData.setAttribute('id','company');
    companyData.setAttribute('href', `https://github.com/${companyUrl}`);
    companyData.innerText = company;
    if (companyElt != null) {
      companyContainer.replaceChild(companyData,companyElt);
    } else {
      companyContainer.append(companyData);
    }
  }
}

// Fetch and display @octocat data by default
fetch("https://api.github.com/users/octocat")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(jsonUserData) {
    console.log(jsonUserData);
    fillUserInfo(jsonUserData);
  })
  .catch(function(error){
    console.log(error);
});

let form = document.getElementById('form');
let inputElt = document.getElementById('gitUsername');
let errorElt = document.querySelector(".error");


// Fetch Github API with input username
form
  .addEventListener('submit', function(e){
    e.preventDefault();
    let user = inputElt.value;
    fetch(`https://api.github.com/users/${user}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  // Display user data if user is found 
  .then(function(jsonUserData) {
    console.log(jsonUserData);
    fillUserInfo(jsonUserData);
  })
  // Display error message if no user is found 
  .catch(function(error) {
    if (errorElt.classList.contains("hidden")) {
    errorElt.classList.remove("hidden");
  }
    console.log(error);

  });
})

// Hide error message when user clicks on form
form
  .addEventListener('click', function(e){
    if (!errorElt.classList.contains("hidden")) {
      errorElt.classList.add("hidden")
    }
});
