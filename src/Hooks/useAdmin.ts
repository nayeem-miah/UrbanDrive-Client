import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other admin properties as needed
}

const useAdmin = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const axiosSecure = useAxiosPublic();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosSecure.get('/admin/support-details');
        setAdminData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch admin data');
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [axiosSecure]);

  return { adminData, loading, error };
};

export default useAdmin;
