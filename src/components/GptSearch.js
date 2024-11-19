import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { bgIMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          src={bgIMG}
          alt="bg-image"
          className="md:w-full md:h-full h-screen object-cover"
        />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  )
}

export default GptSearch