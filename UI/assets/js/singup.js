const formsignup = document.getElementById('signup');
const subm = document.getElementById('submit');
const formsignin = document.getElementById('signin');


const authsignup = (e) => {
    console.log('done')
    e.preventDefault();
    const name = document.getElementById('name').value;
const email = document.getElementById('email').value
const password = document.getElementById('password').value
    const fireauth = firebase.auth();
    fireauth.createUserWithEmailAndPassword(email,password).then(done => {
        window.location.replace("http://www.w3schools.com");
    })
}

const authsignin = (e) => {
   
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const fireauth = firebase.auth();
    fireauth.signInWithEmailAndPassword(email,password).then(done => {
        window.location.replace("http://www.w3schools.com");
    })
        .catch(err => console.log(err))
}

formsignup.addEventListener('submit', authsignup)
formsignin.addEventListener('submit', authsignin)
