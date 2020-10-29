const formsignin = document.getElementById('signin');

const authsignin = async (e) => {
   
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const postData = await fetch("http://localhost:3000/api/v1/login",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
      })
    const result = await postData.json();
    const tok = result.token;
    const queries = await fetch("http://localhost:3000/api/v1/queries",{
        headers:{
            'Authorization': `Bearer ${tok}`
        }
    })
    localStorage.setItem('token', tok)
    const query = await queries.json()
    console.log(result, query)
}

formsignin.addEventListener('submit', authsignin)
