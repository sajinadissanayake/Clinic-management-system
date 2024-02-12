import React from 'react'
import { Link } from "react-router-dom";

 function Home() {
  return (
    <div>


    <h1>CMS HOME</h1>

      <Link to="/ReportsView">Patient Reports  </Link><br></br>
      <Link to="/plist">Patients  </Link>
    </div>
  )
}
export default Home;