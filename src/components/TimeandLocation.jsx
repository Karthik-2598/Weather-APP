import React from 'react'

const TimeandLocation = ({weather: {formattedtime, name, country}}) => {
  return (
    <div className = "p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center my-4">
        <p className="text-base sm:text-lg md:text-xl font-light">
            {formattedtime}
        </p>

      </div>

      <div className="flex flex-col items-center justify-center my-2">
        <p className="text-xl sm:text-2xl md:text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  )
}

export default TimeandLocation
