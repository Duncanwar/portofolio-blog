// create article 
const articleForm = document.getElementById('articleForm');
const articleRef = firebase.database().ref('article');
const articleView = document.getElementById('articleOne');
//function to save article query
const saveArticle = async(titleName,image,content) => {
    const newArticle = await articleRef.push();
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
const data = await fetch('https://fir-test-83ee9.firebaseio.com/article.json');
const result = await data.json();
const key = Object.keys(result) 
console.log(data)
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
displayArticle()
articleForm.addEventListener('submit',submitForm)