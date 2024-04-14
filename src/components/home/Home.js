import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../section1/Hero'
import Section2 from '../section2/Section2';
import Section3 from '../section3/Section3';
import TitleAndParagraph from '../section4/TitleAndParagraph';
import Cards  from '../section4/Cards'
const Home = () => {
   
  return (
    <div>
      <Hero />
      <Section2 />
      <Section3></Section3>
      <Cards />
      {/* <TitleAndParagraph></TitleAndParagraph> */}

    </div>
  )
}

export default Home