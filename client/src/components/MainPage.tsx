'use client'
import HealthNewsList from "./HealthNewsList";
import Navbar from "./Navbar";

export default function MainPage () {
  return (
    <div>
      
      <Navbar />
      <h1>News</h1>
      <HealthNewsList/>
    </div>
  )
}