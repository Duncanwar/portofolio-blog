const formsignup = document.getElementById('signup');
const subm = document.getElementById('submit');
const signupError = document.getElementById('signup-error')

const authsignup = async(e) => {
    e.preventDefault();
    localStorage.clear()
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const signup = await fetch('http://localhost:3000/api/v1/signup',{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,password})
    })
    const result = await signup.json();
    if(result.error){
        formsignup.innerText = result.error
    }
    else {
        return window.location.replace('http://127.0.0.1:5500/UI/articles.html')
    }
}


formsignup.addEventListener('submit', authsignup)

