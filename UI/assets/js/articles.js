// create article 
const articleForm = document.getElementById('articleForm');
const articleRef = firebase.database().ref('article');
const articleView = document.getElementById('articleOne');
const articleTable = document.getElementById('blog');
let title = document.getElementById('title');
let date = document.getElementById('date');
let manipulate = document.getElementById('manipulate');

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

const displayArticleInTableForm = () => {
	articleRef.on("child_added", snap => { 
        let datas={};
        let data = fetch('https://fir-test-83ee9.firebaseio.com/article.json/')
        .then (result => result.json()).then(res => datas = res)
            let key = snap.key,
                value = snap.val();
                row += key
               $td = document.createElement('td'),
               $tr = document.createElement('tr');
            console.log(datas.json())
			// edit icon
			let editIconUI = document.createElement('button');
			editIconUI.class = "btn-edit";
			editIconUI.innerHTML = " ✎";
			editIconUI.setAttribute("userid", key);
			// editIconUI.addEventListener("click", editButtonClicked)

			// delete icon
			let deleteIconUI = document.createElement("button");
			deleteIconUI.class = "btn-delete";
			deleteIconUI.innerHTML = " ☓";
            deleteIconUI.setAttribute("userid", key);
            // manipulate=
			// deleteIconUI.addEventListener("click", deleteButtonClicked)
			console.log(value,key)
            $tr.innerHTML = value.title;
            $tr.innerHTML = value.timeStamp;
			$tr.append(editIconUI);
			$tr.append(deleteIconUI);

			$tr.setAttribute("user-key", key);
			// $li.addEventListener("click", userClicked)
			// articleTable.append($tr);
// })
})
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