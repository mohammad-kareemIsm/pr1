import axios from "axios";

  const getTokenF = async (event)=>{       
    event.preventDefault();
    const user = {
      email: "moham96961@gmail.com",
      password: "##P@ssw0rdd#" };

  // Create the POST requuest
  const {data} = await                                                                            
                axios.post('https://quizappsyria.pythonanywhere.com/jwt/create/',
                user ,
                {headers: 
                  {'Content-Type': 'application/json'} ,
                withCredentials: true});

 // Initialize the access & refresh token in localstorage.      
 localStorage.clear();
 localStorage.setItem('access_token', data.access);
 localStorage.setItem('refresh_token', data.refresh);
 axios.defaults.headers.common['Authorization'] = `JWT ${data['access']}`; 
  }

function Regester() {
  return (
    <div>
      <button onClick={getTokenF}> get token</button>
    </div>
  )
}

export default Regester
