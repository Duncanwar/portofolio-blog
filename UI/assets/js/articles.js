// create article 
const articleForm = document.getElementById('articleForm');
const articleRef = firebase.database().ref('article');

//function to save article query
const saveArticle = async(titleName,image,content) => {
    const newArticle = await articleRef.push();
    await newArticle.set({
        title:titleName,
        image:image,
        content: content
    })
}

// get input fields value
const getInputValue = id => document.getElementById(id).value;

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
articleForm.addEventListener('submit',submitForm)