import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { LuCheckCircle } from "react-icons/lu";

const EditProfile: React.FC = () => {
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    console.log('user:', user);
    const formatJoinDate = (dateString: string) => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' } as const; // short month, numeric day, and numeric year
        return date.toLocaleDateString('en-US', options); // Format the date
    };

    const joinDate = user ? formatJoinDate(user.metadata.creationTime) : '';

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mx-auto' >
    <div className=''>
     <div className="relative ">
     <img src={user?.photoURL} className='rounded-full  w-32 h-32' alt="" />
    
        <button className='bg-primary pt-2 pb-2 pl-3 pr-3 rounded-lg text-white absolute bottom-2 left-12 transform translate-x-1/2 translate-y-1/2' onClick={() => setIsEditing(true)}>Edit Profile</button>
    </div>
    
  
        
        <h1 className='text-4xl font-lato font-bold lg:mt-7'>{user?.displayName}</h1>
       
        <h3 >Joined {joinDate}</h3>
        <div className="mt-6 space-y-2 w-2/3 "> {/* Use space-y-4 for vertical spacing */}
            <h2 className='uppercase font-semibold text-slate-500 text-sm'>Verified info</h2>
<div className="flex justify-between items-center text-lg">
<h2>Email address</h2>
<span className="text-green-600 text-2xl"><LuCheckCircle /></span>
</div>
<div className="flex justify-between items-center text-lg">
<h2>Phone number</h2>
<span className="text-blue-600">Verify phone number</span> {/* Change color for visibility */}
</div>
<div className="flex justify-between items-center text-lg">
<h2>Facebook</h2>
<span className="text-blue-600">Connect Account</span> {/* Change color for visibility */}
</div>
<h3 className='text-slate-500 font-lato text-xs'>Build trust with other users on UrbanDrive by verifying your contact information.</h3>

        




</div>
        {/* Profile details */}
    </div>
    <div className='lg:pt-24'>
    
    
     <h2 className='uppercase text-slate-500 text-sm font-lato font-semibold'>Reviews from hosts</h2>
     <div className='flex gap-5 mt-3'>
     <img src={user?.photoURL} className='rounded-full  w-18 h-18' alt="" />
     <div>
     <div className="rating rating-sm ">
     <input type="radio" name="rating-9" className="mask mask-star-2" />
    <input type="radio" name="rating-9" className="mask mask-star-2" />
    <input type="radio" name="rating-9" className="mask mask-star-2"  />
    <input type="radio" name="rating-9" className="mask mask-star-2" />
    <input type="radio" name="rating-9" className="mask mask-star-2" />
    <input type="radio" name="rating-9" className="mask mask-star-2" />
    </div>
        <h2 className='text-black font-semibold'>No reviews yet</h2>
        <h2>{user?.displayName} hasn’t received a review on UrbanDrive yet.</h2>
     </div>

     </div>
    
     

    </div>
 
   
   
    </div>
  );
};

export default EditProfile;
