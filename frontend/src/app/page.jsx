"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchCustomers();
    }
  }, [mounted]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiEndpoint}/allcustomers`);
      
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        setError('Failed to fetch customers');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // クライアントサイドでマウントされるまで何も表示しない
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-400 mb-4">Error: {error}</h1>
          <button 
            onClick={fetchCustomers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* ヘッダー */}
      <div className="bg-blue-500 text-white p-4 mb-6 rounded">
        <h1 className="text-2xl font-bold text-center">Customer Management</h1>
      </div>

      {/* 顧客一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">
            顧客情報がありません
          </div>
        ) : (
          customers.map((customer) => (
            <div key={customer.customer_id} className="bg-white rounded-lg border-2 border-blue-200 max-w-md">
              <div className="m-4 bg-blue-200 rounded-lg p-4">
                <div className="mb-4">
                  <h2 className="text-xl font-bold">{customer.customer_name}さん</h2>
                  <p className="text-gray-600">Customer ID: {customer.customer_id}</p>
                  <p className="text-gray-600">Age: {customer.age}</p>
                  <p className="text-gray-600">Gender: {customer.gender}</p>
                </div>
                
                {/* ボタン群 */}
                <div className="flex flex-col gap-2">
                  <Link 
                    href={`/customers/read/${customer.customer_id}`}
                    className="bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    Read
                  </Link>
                  <Link 
                    href={`/customers/update/${customer.customer_id}`}
                    className="bg-yellow-500 text-white text-center py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
                  >
                    Update
                  </Link>
                  <Link 
                    href={`/customers/delete/${customer.customer_id}`}
                    className="bg-red-500 text-white text-center py-2 px-4 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 新規作成ボタン */}
      <div className="fixed bottom-6 right-6">
        <Link 
          href="/customers/create"
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-green-600 transition-all"
        >
          + 新規作成
        </Link>
      </div>
    </div>
  );
}