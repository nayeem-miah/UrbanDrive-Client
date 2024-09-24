
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Cars: React.FC = () => {
    const axiosPublic = useAxiosPublic();
    
    interface Car {
        _id: string;
        name: string;
        image:string,
        review:string,
        availability:boolean,
        model:string
    }

    const {data:cardata= [],refetch}=useQuery({
        queryKey:['car'],
        queryFn: async () =>{
            const response = await axiosPublic.get('/cars');
            console.log(response.data)
            return response.data;

        }
    })
  return (
    <div>
    <h1 className=' mt-10'>Cars</h1>
    <select className="select w-full max-w-xs bg-[#111010] text-white border rounded-full p-3 h-12">
            <option disabled value="">Drop Off Locations</option>
            <option value="uttora">Uttora</option>
            <option value="mirpur-1">Mirpur-1</option>
            <option value="saver">Saver</option>
            <option value="ajimpur">Ajimpur</option>
            <option value="mirpur-2">Mirpur-2</option>
          </select>
    {/* Display car data */}
    <ul>
        {Array.isArray(cardata) && cardata.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 bg-[#1d1c1a]">
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
</div>
  );
};

export default Cars;