import React from 'react'

const Forecast = ({title, data}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-center mt-4 sm:mt-6">
        <p className="font-medium uppercase text-lg sm:text-xl md:text-2xl">{title}
        </p>
        </div>
        <hr className="my-2 sm:my-3"/>
        <div className="flex items-center justify-between gap-4">
           {data.map((d,index)=>(
            <div key={index} className="flex flex-col items-center justify-center">
                <p className="font-light text-xs sm:text-sm md:text-base">{d.title}</p>
                <img src={d.icon} alt="weather icon" 
                className="w-10 sm:w-12 md:w-14 my-2"/>

                <p className="font-medium text-sm sm:text-base md:text-lg">{`${d.temp.toFixed()}°`}</p>
            </div>
           ))}
        </div>
    </div>
  )
}

export default Forecast
