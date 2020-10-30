const formsignin = document.getElementById('signin');

const authsignin = async (e) => {
   
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const postData = await fetch("https://blog-andela.herokuapp.com/api/v1/login",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
      })
    const result = await postData.json();
    const tok = result.token;
    const role = result.data.role
    localStorage.setItem('token', tok)
    localStorage.setItem('role',role)
    if(role === 'admin'){
     return window.location.replace('http://127.0.0.1:5500/UI/dashboard.html')
    }
    else{
      return window.location.replace('http://127.0.0.1:5500/UI/articles.html')
    }
}

formsignin.addEventListener('submit', authsignin)
