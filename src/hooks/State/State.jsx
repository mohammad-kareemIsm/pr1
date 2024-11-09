import React, { useEffect, useState } from 'react'

function State() {
    const [posts,setPosts] =  useState([])
    const [postId,setPostId] =  useState(1)
    const increment = () => setPostId(prev=> prev+1) 
    const decrement = () => setPostId(prev=> prev-1) 
    useEffect(()=>
       { fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json()).then(data=> setPosts(data))
},[]);
    
  return (
    //posts?: for get data after fetch, sometimes fetch have a long time
    <>
     <button onClick={increment}>+</button>
     <button onClick={decrement}>-</button>
     <br/>
    {posts?.map(x=> (
    <>
    {x.id == postId ? (<>
    <h2>{x.id} : {x.title}</h2>
    <p>{x.body}</p>
    </>) : ("")}<br/>
    </>
    )
    )}
    </>
  );
}
export default State

// import { useState } from "react"
// export default function State() {
//     const [value, setValue] = useState(0);
//     function increment(){
//     setValue(prev=> prev+1);
//         //setValue(value +1);
//     }
//     //or:
//     //const increment = () => setValue(prev=> prev+1) 
//     function decrement(){
//         setValue(prev=> prev-1);
//     }
//   return (
//     <>
//      <h1>{value}</h1>
//     <button onClick={increment}>+</button>
//     <button onClick={decrement}>-</button>
//     </>
   
//   )
// }