// create article 
import dotenv from 'dotenv'

dotenv.config();
const url = process.env.url;

const articleForm = document.getElementById('articleForm');
const articleView = document.getElementById('articleOne');
const articleTable = document.getElementById('blog');
let title = document.getElementById('title');
let date = document.getElementById('date');
let manipulate = document.getElementById('manipulate');

//function to save article query
const saveArticle = async(titleName,image,content) => {
    const newArticle = await fetch(`/articles`);
    //const time = ;
    await newArticle.set({
        title:titleName,
        image:image,
        content: content,
        timeStamp: new Date().toDateString()
    })
}

// get input fields value
const getInputValue = id => document.getElementById(id).value;

// display articles
const displayArticle = async() => {
let tab='';
const data = await fetch(`${url}articles`);
const result = await data.json();
const key = Object.keys(result) 
console.log(result)
for (let d of key){
    tab +=`
    <h1>${result[d].title}</h1>
    <small>${result[d].timeStamp}</small>
    `
}
articleView.innerHTML = tab;

}


// submit the article form
const submitForm = async(e) => {
    let alerts = document.querySelector('.alert')
    e.preventDefault();
    const title = getInputValue('articleTitle');
    const image = getInputValue('articleImg');
    const content = getInputValue('articleContent');
    // save query in Firebase
    await saveArticle(title,image,content);
    // show alert
    alerts.style.display = 'block';
    alerts.textContent = 'SUCCESS';
    setTimeout(()=> 
    alerts.style.display='none'
    ,3000)
    // clear form
    articleForm.reset();
}

const displayArticleInTableForm = async() => {
    let tab=`
    <tr>
    <th>Title</th>
    <th>Time</th>
    </tr>
    `;
const data = await fetch('https://fir-test-83ee9.firebaseio.com/article.json');
const result = await data.json();
const key = Object.keys(result) 
console.log(data)
for (let d of key){
    tab +=`
    <tr>
    <td>${result[d].title}</td>
    <td>${result[d].timeStamp}</td>
    </tr>
   
  `
}
articleTable.innerHTML = tab;
}
// location


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }


function showPosition(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
  
    console.log(`longitude: ${ lng } | latitude: ${ lat }`);
}

displayArticleInTableForm()
displayArticle()
articleForm.addEventListener('submit',submitForm)