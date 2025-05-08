import React from 'react'
import { TimelineDemo } from '../components/TimelineDemo'
import Hero from '../components/Hero'
import AboutMe from '../components/AboutMe'

const HomePage = () => {
  return (
    <div className="w-full">
      <Hero />
      <AboutMe />
    </div>
  )
}

export default HomePage