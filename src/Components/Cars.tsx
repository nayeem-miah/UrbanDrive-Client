
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


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
       date: number
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
    <div className='bg-[#181818]  mt-16'>
    
    <div>
    
             <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-12'>
             <select className="select w-full bg-[#111010] text-white  border rounded-full p-3 h-12"
             value={category} // Set the current selected value
             onChange={handleCategoryChange} // Handle change
             >
             <option disabled value="">Filter by Category</option>
             <option value="Electric">Electrice</option>
             <option value="suv">SUV</option>
             <option value="Sedan">Sedan</option>
             <option value="Luxury">Luxury</option>
             <option value="Truck">Truck</option>
           </select>


         

     <select className="select w-full bg-[#111010] text-white  rounded-full p-3 h-12">
             <option disabled value="">Seats</option>
             <option value="4">4 or more</option>
             <option value="5">5 or more</option>
             <option value="6">6 or more</option>
             <option value="7">7 or more</option>
             <option value="8">8 or more</option>
           </select>
    

           <select
                    className="select w-full bg-[#111010] text-white  border rounded-full p-3 h-12"
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
    className="select w-full bg-[#111010] text-white  border rounded-full p-3 h-12"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)} // Handle sorting change
>
    <option disabled value="">Sort by</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="date-desc">Date Added: Newest First</option>
</select>
 
             </div>
    
    </div>
     {/* Display car data */}
     <ul>
         {Array.isArray(cardata) && cardata.length > 0 ? (
             <div className="grid mt-5 grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 bg-[#1d1c1a]">
                 {cardata.map((car: Car) => (
                     <div key={car._id} className="card card-compact bg-[#272625]  shadow-xl rounded-3xl p-4">
                         <figure>
                             <img
                                 src={car.image}
                                 alt={car.name}
                                  className="w-[95%] h-[300px] object-cover rounded-3xl"
                             />
                         </figure>
                         <div className="card-body">
                             <h2 className="card-title">{car.name}</h2>
                             <p>{car.review}</p>
                             <div className='flex lg:gap-60 '>
                                 <p>Model</p>
                                 <p>{car.model}</p>
                             </div>
                             <div>
                                 <p>Avilability</p>
                                 <p>{car.availability}</p>
                             </div>
                             <div>
                                 <p>Category</p>
                                 <p>{car.category}</p>
                             </div>
                             <div>
                                 <p>Price</p>
                                 <p>{car.price}</p>
                             </div>
                             <div>
                                 <p>date</p>
                                 <p>{formatDate(car.date)}</p> 
                             </div>
                             <div className="card-actions justify-end">
                                 <button className="btn btn-primary rounded-3xl">Buy Now</button>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
         ) : (
             <li>No cars available or data format is incorrect</li>
         )}
     </ul>
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