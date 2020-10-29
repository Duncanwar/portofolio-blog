// create article 

const url= 'http://localhost:3000/api/v1/'

const articleForm = document.getElementById('articleForm');
const articleView = document.getElementById('articleOne');
const articleTable = document.getElementById('blog');
let title = document.getElementById('title');
let date = document.getElementById('date');
let manipulate = document.getElementById('manipulate');
const token = localStorage.getItem('token');

//function to save article query
const saveArticle = async(Title,image,content) => {
    const newArticle = await fetch(`${url}articles`,{
        method:'Post',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({Title,image,content})
    });

    const article = await newArticle.json()
    console.log(article)
}

// get input fields value
const getInputValue = id => document.getElementById(id).value;

// display articles
const displayArticle = async() => {
let tab='';
const data = await fetch(`${url}articles`);
const result = await data.json();
result.data.map( d=>{
    tab +=`
    <h1>${d.Title}</h1>
    <small>${new Date(d.createdAt).toDateString() }</small>
    `
})
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
const data = await fetch(`${url}/articles`);
const result = await data.json();
result.data.map(d => {
    tab +=`
    <tr>
    <td>${d.Title}</td>
    <td>${d.createdAt}</td>
    </tr>
   
  `
})
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

if(articleForm){
    articleForm.addEventListener('submit',submitForm)
}
else if(articleTable){
    displayArticleInTableForm()
}
else{
    displayArticle()
}
