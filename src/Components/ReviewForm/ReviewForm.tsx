/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  carId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ carId, onReviewSubmitted }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [rating, setRating] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const onSubmit = async (data: any) => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    const reviewData = {
      carId,
      userId: user?.uid,
      userName: user?.displayName,
      rating,
      comment: data.comment,
      createdAt: new Date()
    };

    try {
      await axiosPublic.post('/reviews', reviewData);
      reset();
      setRating(0);
      onReviewSubmitted();
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Your Rating</label>
        <Rating style={{ maxWidth: 180 }} value={rating} onChange={setRating} />
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">Your Review</label>
        <textarea
          id="comment"
          {...register('comment', { required: 'Review comment is required' })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Write your review here..."
          rows={4}
        />
        {errors.comment && <p className="text-red-500 text-xs italic">{errors.comment.message as string}</p>}
      </div>
      <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
