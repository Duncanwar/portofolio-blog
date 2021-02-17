// create article 


const url= 'https://blog-andela.herokuapp.com/api/v1/'
const articleForm = document.getElementById('articleForm');
const articleView = document.getElementById('articleOne');
const articleTable = document.getElementById('blog');
let title = document.getElementById('title');
let date = document.getElementById('date');
let manipulate = document.getElementById('manipulate');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const logout = document.getElementById('logout');



if(!role){
  window.location.assign('signin.html')
  } else if(role === 'user') {
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
    displayArticle()
    }
else {
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
        <th>Manipulate</th>
        </tr>
        `;
    const data = await fetch(`${url}/articles`);
    const result = await data.json();
    result.data.map(d => {
        console.log(d._id)
        tab +=`
        <tr>
        <td>${d.Title}</td>
        <td>${new Date(d.createdAt).toDateString()}</td>
        <td><button value="delete" id=${d._id} onclick="removeArticle(this)">Delete</button></td>
        </tr>`
    })
    articleTable.innerHTML = tab;
    }

    // location
    
     function removeArticle(id){
        const is = id.getAttribute('id');
        const newArticle = fetch(`${url}articles/${is}`,{
            method:'delete',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(article => {
            article.json()
        }).then(result => {
            console.log(result)
        });
    
        const article = newArticle.json()
        console.log(article)
        console.log("Yego",is);
    }
   
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
 
logout.addEventListener('click',()=>{
    localStorage.clear()
    window.location.replace('signin.html')
})
}
//function to save article query
