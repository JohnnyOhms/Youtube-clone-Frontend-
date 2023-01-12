import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
      <div style={{
          height: "100vh",
          width: "100vw",
      display: "flex",
          backgroundColor: "black"
    }}><Link to="/" style={{ margin: "auto", color: "white"}}>
         <p >404 error | page not Found click to go Back</p>
      </Link>
     
    </div>
  )
}

export default NotFoundPage