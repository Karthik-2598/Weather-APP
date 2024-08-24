import React from 'react'

const TopButtons = ({setQuery}) => {

    const cities = [
        {
            id:1,
            name:"London"
        },
        {
            id:2,
            name:"Sydney"
        },
        {
            id:3,
            name:"Paris"
        },
        {
            id:4,
            name:"Tokyo"
        },
        {
            id:5,
            name:"Delhi"
        },

    ]
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-around my-6 space-y-4 md:space-y-0 md:space-x-4">
        {
            cities.map((city)=> (
<button key={city.id}
className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in text-center w-full md:w-auto"
onClick={()=> setQuery({q:city.name})}>{city.name}</button>
            ))
        }
    </div>
  )
}

export default TopButtons
