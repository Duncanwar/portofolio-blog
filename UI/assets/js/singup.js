const formsignup = document.getElementById('signup');
const subm = document.getElementById('submit');

const authsignup = (e) => {
    console.log('done')
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const fireauth = firebase.auth();
    fireauth.createUserWithEmailAndPassword(email,password).then(done => {
        window.location.replace("https://duncanwar.github.io/portofolio-blog/UI/articles.html");
    })
}


formsignup.addEventListener('submit', authsignup)

