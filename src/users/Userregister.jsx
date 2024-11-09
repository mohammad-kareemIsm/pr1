import React , {useEffect, useState, useRef} from 'react'
//import  'bootstrap/dist/css/bootstrap.min.css'
//import { DropdownButton} from 'react-bootstrap/DropdownButton';


function Userregister() {

let nameInput = useRef();
let roleInput = useRef();
let emailInput = useRef();
let passwordInput = useRef();
let repasswordInput = useRef();
let [name, setName] = useState();
let [dsel, setDsel] = useState();  // value selected of droupdown
const handleSelect = (e) => {
  console.log(JSON.stringify(e.target.value));
//   setDsel(e);
// console.log(e);
}
const handleSubmit = async (event)=>{
    event.preventDefault()  
    console.log(event)        
    fetch("https://quizappsyria.pythonanywhere.com/users/",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({           
          "role": roleInput.current.value,
          "email": emailInput.current.value,
          "password": passwordInput.current.value,
          "re_password": repasswordInput.current.value
        })
    }).then(request=> request.json()).then(data =>
        console.log(data)).catch(err=> console.log(err))

         //token from site:

        

// HTTP 200 OK
// Allow: POST, OPTIONS
// Content-Type: application/json
// Vary: Accept
// {
//     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNTMwOTc5MywianRpIjoiNDUzZWJmODQ2MWVlNDAzNDg3YTM5ZTU1ZDRiMzE2OWQiLCJ1c2VyX2lkIjozNX0.kmXYY-zsrJby74TB8-hsGoscqEU9j5cNeUBzO6wWe9c",
//     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MjMwNTkzLCJqdGkiOiJjZDY3ZWQzZWU5Yzk0YTFhOWRjZTQwNDM4M2VmYTE3NyIsInVzZXJfaWQiOjM1fQ.beZc8SzDsoWMINgyXgZwdhbTkNyGzqmihct4Mi5e-mI"
// }


// {
//     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNTM1NjAxOCwianRpIjoiNzcyOThkMzA5NmY3NGIxOWFhODc5NWNlNWUyMjBhYjQiLCJ1c2VyX2lkIjozNX0.3NSYuAmnddNnC6um7Ze8BVQxWKLpnahlly7wgYgrqIs",
//     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1Mjc2ODE4LCJqdGkiOiJlOTZjOWI1N2ZhYmE0Mzc1ODM5YzExZTA3ZmY4YmYxMSIsInVzZXJfaWQiOjM1fQ.RubX4cR0pPHKfR6H324qbbSE4nTUcL9wt471bQuP9_U"
// }

}
//console.log(nameInput.current.value , roleInput.current.value );
  return (
    
    <div className='login template d-flex justify-content-center align-items-center bg-primary '>
      <div className='40-w p-5 rounde'>
     <form onSubmit={handleSubmit}>
      <div className='mb-2'>
      <label>Name: </label>
      <input type="text" ref={nameInput} className='form-control' />
      </div>
      <div className='mb-2'>
      <label>Role: </label>
      <input type="text" ref={roleInput} className='form-control' />
      {/* <input type="text" onChange={(e) => setName(e.target.value)} value={name} /> */}
      {/* <input type="text" className='form-control' ref={roleInput} /> */}
      {/* <Dropdown > */}
      {/* <Dropdown.Toggle variant="success" id="dropdown-basic" className='form-control'> */}
      {/* <Dropdown.Toggle variant="Secondary"  className='form-control' >
      </Dropdown.Toggle>

      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item href="#/action-1">Teacher</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Student</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Admin</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
     {/* <DropdownButton
      align="end"
      title="Dropdown end"
      id="dropdown-menu-align-end"
  onSubmit={handleSelect}
    >
      <Dropdown.Item eventKey="1">Teacher</Dropdown.Item>
      <Dropdown.Item eventKey="2">Student</Dropdown.Item>
      <Dropdown.Item eventKey="3">Student</Dropdown.Item>
     
    </DropdownButton> */}
      </div>
      <div className='mb-2'>
      <label>Email: </label>
      {/* <input type="text" onChange={(e) => setName(e.target.value)} value={name} /> */}
      <input type="email" className='form-control' ref={emailInput} />
      </div>
      <div className='mb-2'>
      <label>Password: </label>
      <input type="password" name='password'className='form-control' ref={passwordInput} />
      </div>
      <div className='mb-2'>
      <label>RePassword: </label>
      <input type="password" className='form-control' name='repassword' ref={repasswordInput} />
      </div>
      <button type="submit" className='btn btn-primary' >
        register
      </button>
      {/* {status ? <h1>{status}</h1> : null} */}
    </form>
    </div>
    </div>
   
  );
}

export default Userregister