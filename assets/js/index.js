/*
PLEASE READ ⬇
I know, I know, this is a terrible way to organise JS.
I did it like this because I don't know how to use/define cross-file functions yet.
Please do not complain about this.
*/


var data;
var charData;
var post;
var pfp = '/assets/img/pfp.gif';
var username = '8BitJake'
var p;
var postLink;
let oldData;
const postNumLink = [];
async function fetchAPI(url) {
    
  // Storing response
  response = await fetch(url);
  
  // Storing data in form of JSON
  data = await response.json();
  console.log(data)
  if (response) {
      console.log('Data fetched from "' + url + '"');
  }
}
(async () => {
document.getElementsByTagName("header")[0].innerHTML=`<div class="header-content"><a href="/">home</a> | <a href="/characters">characters</a> | <a href="/blog">blog</a> | &copy; 2021-` + new Date().getUTCFullYear() + ` 8BitJake</span></div>`

if (page == 'index') {
await fetchAPI('https://my-ocular.jeffalo.net/api/user/8bitjake');
document.getElementById('status').innerHTML = '<div id="status-dot"></div> <em title="Status taken from ocular.jeffalo.net">' + data.status + '</em>';
let ocular = data
await fetchAPI("https://scratchdb.lefty.one/v3/user/info/8bitjake");
document.getElementById('status').innerHTML = data.country + ' | ' + document.getElementById('status').innerHTML
document.getElementById("status-dot").style.backgroundColor = ocular.color;
document.getElementById('bio').innerHTML = '<strong>About Me</strong><br>' + replaceAll(data.bio, '\n', '<br>')
document.getElementById('wiwo').innerHTML = "<strong>What I'm Working On</strong><br>" + replaceAll(data.work, '\n', '<br>')
} else if (page == 'chars') {

await fetchAPI('chars.json')
for (let i = 0; i < data.chars.length; i++) {
    charData = data.chars[i]
    document.getElementsByClassName('main')[0].innerHTML += '<div class="charBG"><span class="charName">' + charData.char.toUpperCase() + '</span>' +
    '<br>' + charData.desc + '<br><br> <img class="charImg" src="/assets/img/char/' + charData.char + '.svg" width="' + ((charData.charWidth) ? charData.charWidth  : `25%`) +  '"height="auto" alt="' + charData.char + '"></div>'
  let elem = document.getElementsByClassName('charName')[i];
  elem.style.setProperty('--textColor', charData.charColor);
  let oldElem = elem
  elem = document.getElementsByClassName('charBG')[i];
  if (oldElem.innerHTML != 'FOLDERY') {
  elem.style.setProperty('--bgColor', charData.charBgColor);
} else {
  elem.style.background = "linear-gradient(#e8aa00, #c89200)";
}
  elem.style.setProperty('--divTextColor', ((charData.textColor) ? charData.textColor  : 'black'));
  
  }
  

} else if (page == 'blog') {
await fetchAPI('posts.json')
for (let i = 0; i < data.length; i++) {
  postData = data[i];
createPost(i);
var date = postData.date
      console.log(postData,date)
      if(!date) date = 'Unknown Date'
document.getElementsByClassName('user')[i].innerHTML = '<img src="' + pfp + '" width="50px" height="auto" alt="' + username + '" style="border-radius: 9999px;">'
document.getElementsByClassName('post')[i].innerHTML +=  '<div class="postContent"><p class="postName">' + postData.title + '</p><div style="position:relative; bottom:1em;"><span>Post ' + (i + 1) +'<br>'+ date + '</span>'+'<hr class="divider"><p class="postText">' + postData.content + '</p></div></div></div>';
}
let postContent = document.getElementsByClassName('postContent');
/* var att = document.createAttribute('onclick');
att.value = 'return false'; */
for (let i = 0; i <= postContent.length - 1; i++) {
let links = postContent[i].getElementsByTagName('a')
for (let ii = 0; ii <= links.length - 1; ii++) {
 // links[i].setAttributeNode(att);
  links[i].removeAttribute('href');
}
}

} else if (page == 'post-viewer') {
  await fetchAPI('../posts.json')
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  p = urlParams.get('p');
  postData = data[p];
  console.log(p);
 if (p) {
  var postTemplate = '<a href="../">⬅ Go back</a><br><br><div class="post"><span class="user"></span><br><br></div>'
  for (let i = data.length; i >= 0; i--) {
    console.log(i)
    console.log(i == p)
    if (i == p) {
      var date = postData.date
      console.log(postData,date)
      if(!date) date = 'Unknown Date'
  document.getElementsByClassName('main')[0].innerHTML = postTemplate;
  document.getElementsByClassName('user')[0].innerHTML = '<img src="' + pfp + '" width="50px" height="auto" alt="' + username + '" style="border-radius: 9999px;"><p class="postName">' + postData.title + '</p><span>Post ' + (i + 1) +'<br>'+ date + '</span>'
document.getElementsByClassName('post')[0].innerHTML +=  '<br><div class="postContent"><hr class="divider"><p class="postText">' + postData.content + '</p></div></div></a>';
document.title += ' ' + postData.title
    }
  }

 } else {
   window.location.href="../"
 }
}

document.getElementsByTagName("body")[0].innerHTML=twemoji.parse(document.getElementsByTagName("body")[0].innerHTML, { folder: 'svg', ext: '.svg'});



function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }

  function createPost(postNum) {
    postNumLink.push(postNum);
       var postTemplate = '<div class="post" onclick="location.href = `post-viewer/?p=` + postNumLink[' + postNum + ']"><span class="user"></span></div></a>'
    document.getElementsByClassName('main')[0].innerHTML += postTemplate
    }
})()