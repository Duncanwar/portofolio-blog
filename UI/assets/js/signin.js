const formsignin = document.getElementById('signin');


const authsignin = (e) => {
   
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const fireauth = firebase.auth();
    fireauth.signInWithEmailAndPassword(email,password).then(done => {
        window.location.replace("https://duncanwar.github.io/portofolio-blog/UI/articles.html");
    })
        .catch(err =>{
console.log(err)
let alerts = document.getElementsByClassName('alert')
alerts.display = 'flex';
alerts.background = 'red';
alerts.textcontent = err.message;
        } )
}

formsignin.addEventListener('submit', authsignin)
