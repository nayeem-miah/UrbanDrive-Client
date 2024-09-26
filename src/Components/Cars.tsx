
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineDiscount } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";

import { useEffect, useState } from 'react';

const Cars: React.FC = () => {
    const axiosPublic = useAxiosPublic();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [category,setCategory] = useState ('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [sortOption,setSortOption]=useState('');
    
    
    interface Car {
        _id: string;
        name: string;
        image:string,
        review:string,
        availability:boolean,
        model:string,
        category:string,
        price:number,
       date: number,
       description:string,
       discount:number,
       rating:number,
       trip_count:number,
       make:string
    }
 

    const {data:cardata= [],refetch}=useQuery({
        queryKey:['car',currentPage,category,maxPrice,minPrice,sortOption],
        queryFn: async (page) =>{
            const response = await axiosPublic.get('/cars',{params:{page:currentPage,limit:6,category:category,minPrice:minPrice,maxPrice:maxPrice,sort:sortOption}});
            setTotalPages(response.data.totalPages); // Set total pages for pagination
            return response.data.Cars;

        }
    })

    const  handleCategoryChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setCategory(e.target.value);
        refetch();
    }
    const handlePriceRangeChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === '0-50') {
            setMinPrice(0);
            setMaxPrice(50);
        } else {
            const [min, max] = value.split('-').map(Number);
            setMinPrice(min);
            setMaxPrice(max);
        }
        console.log('Price Range:', minPrice, maxPrice);
    }
    useEffect(() => {
        refetch();
    }, [minPrice, maxPrice, category, currentPage, sortOption]);

      const formatDate = (dateString:number) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
          refetch(); // Refetch data after changing page
        }
      };
      
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
          refetch(); // Refetch data after changing page
        }
      };
  return (
    <div className='mt-10 pt-4 md:mt-24 md:p-5 lg:mt-28 lg:pt-8 bg-white'>
    {/* bg-[#181818] */}
             <div className='grid grid-cols-2 md:grid-cols-6 lg:grid-cols-7 gap-4 lg:gap-6'>
             <select className="select w-full  rounded-2xl p-3 h-12"
             value={category} // Set the current selected value
             onChange={handleCategoryChange} // Handle change
             >
             <option disabled value="">Select by Category</option>
             <option value="Electric">Electrice</option>
             <option value="suv">SUV</option>
             <option value="Sedan">Sedan</option>
             <option value="Luxury">Luxury</option>
             <option value="Truck">Truck</option>
           </select>


         

     <select className="select w-full  rounded-2xl p-3 h-12">
             <option disabled value="">Select by Seats</option>
             <option value="4">4 or more</option>
             <option value="5">5 or more</option>
             <option value="6">6 or more</option>
             <option value="7">7 or more</option>
             <option value="8">8 or more</option>
           </select>
    

           <select
                    className="select w-full  rounded-2xl p-3 h-12"
                    value={minPrice && maxPrice ? `${minPrice}-${maxPrice}` :""}
                    onChange={handlePriceRangeChange}
                >
                    <option disabled value="">Select By Price Range</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="51-100">$51 - $100</option>
                    <option value="101-200">$101 - $200</option>
                    <option value="201-500">$201 - $500</option>
                    <option value="501-1000">$501 - $1000</option>
                    <option value="1001-Infinity">Above $1000</option>
                </select>


                <select
    className="select w-full  rounded-2xl p-3 h-12"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)} // Handle sorting change
>
    <option disabled value="">Sort by</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="date-desc">Date Added: Newest First</option>
</select>
 
             </div>
    
    
     {/* Display car data */}
     <div className=''>
     <div>
     {cardata.length} + cars available
         {Array.isArray(cardata) && cardata.length > 0 ? (
             <div className="grid mt-5 grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 ">
                
                 {cardata.map((car: Car) => (
                     <div key={car._id} className="card lg:card-side bg-base-100 shadow-xl rounded-2xl group">
                     <figure className="w-full lg:w-[50%]"> {/* Adjust the width of the image container */}
                       <img
                         className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
                         src={car.image}
                         alt={car.name}
                       />
                     </figure>
                     <div className="card-body w-full lg:w-2/3 flex-1"> {/* Adjust the width for the content */}
                       <h2 className="card-title">{car.model}</h2>
                       
                       {
                        car.rating > 0 ?(<p className='flex gap-1'>{car.rating}<MdOutlineStar className='text-[#f0bb0c] mt-1'/>    ({car.trip_count}   trips)    <FaAward className='mt-1'/>   All-Star-Host</p>):
                        (
                            <p>New listing</p>
                        )
                       }
                       <p className='flex gap-1'><FaMapLocationDot className='mt-1'/>{car.make}</p>
                       
                       {car.discount > 0 ? (
      <span className="flex gap-1 text-[#469761] ">
        <MdOutlineDiscount className=' mt-1'/> Discount: {car.discount}%
      </span>
    ) : (
      <p></p>
    )}
                       
                       <div className="card-actions justify-end">
                         <span>${car.price}/day</span>
                       </div>
                     </div>
                   </div>
                   
                 ))}
             </div>
         ) : (
             <li>No cars available or data format is incorrect</li>
         )}
     </div>

     </div>
    
     <div className="mx-auto text-center m-16">
                         <button className="btn btn-active btn-primary mr-4"
                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                             disabled={currentPage === 1}
                         >
                             Previous
                         </button>
                         <span> Page {currentPage} of {totalPages} </span>
                         <button
                         className="btn btn-active btn-primary ml-4"
                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                             disabled={currentPage === totalPages}
                         >
                             Next
                         </button>
                     </div>
 
 </div>

  );
};

export default Cars;