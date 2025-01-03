import React from 'react'
const VideoTitle = ({ title, overview }) => {
    return (
        <div className='pt-[16%] px-24 w-screen aspect-video absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-6xl font-bold'>{title}</h1>
            <p className='py-6 text-lg w-1/4'>{overview}</p>
            <div className=''>
                <button className='text-black bg-white p-4 px-12 text-xl rounded-lg hover:bg-opacity-80'>▶️ Play</button>
                <button className='mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg'>More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle