import { useQuery } from '@tanstack/react-query'

import axios from 'axios'

import { FaCalendar } from 'react-icons/fa6';

interface Car {
_id: string;
make: string;
modelName: string;
year: number;
price: number;
image: string;

}

const fetchCars = async (): Promise<Car[]> => {

const response = await axios.get<Car[]>('https://freetestapi.com/api/v1/cars')

return response.data

}

const CarList: React.FC=() => {

const { data: cars, isLoading, isError } = useQuery<Car[], Error>({

queryKey: ['cars'],

queryFn: fetchCars,

})

if (isLoading) return <div>Loading...</div>

if (isError) return <div>Error fetching cars</div>

return (

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

  {cars?.map((car) => (

    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-[#18181B] text-white transition-all duration-300 hover:shadow-xl">

    <div className="overflow-hidden">

      <img 

        className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-110 hover:opacity-80" 

        src={car.image}

        alt={car.make}

      />

    </div>

    <div className="px-6 py-4">

      <div className="font-bold text-xl mb-2">{car.make} </div>

      <div className="space-y-2">

        <div className="flex items-center justify-between">

          <div className="flex items-center">

            <FaCalendar className="w-5 h-5 mr-2" />

            <span>Model</span>

          </div>

          <span className="font-semibold">{car.modelName}</span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center">

            <FaCalendar className="w-5 h-5 mr-2" />

            <span>Year</span>

          </div>

          <span className="font-semibold">{car.year}</span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center">

            <FaCalendar className="w-5 h-5 mr-2" />

            <span>Price</span>

          </div>

          <span className="font-semibold">{car.price}</span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center">

            <FaCalendar className="w-5 h-5 mr-2" />

            <span>Luggage</span>

          </div>

          <span className="font-semibold">2 Bags</span>

        </div>

      </div>

    </div>

    <div className="px-6 py-4 flex justify-between items-center">

      <span className="text-2xl font-bold">$750<span className="text-sm font-normal">/day</span></span>

      <button



              className="inline-flex items-center justify-center px-4 py-2 mt-4 text-gray-900 rounded-lg group bg-gradient-to-br from-teal-500

   to-navy-700 group-hover:from-teal-500 group-hover:to-navy-700 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-white

   dark:focus:ring-white hover:bg-[#12625D] font-Merri font-bold"

            >

              Submit

            </button>

    </div>

  </div>

  ))}

</div>

)

}

export default CarList