import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { bgIMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
          src={bgIMG}
          alt="bg-image"
          className="w-full h-full object-cover"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch