"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import fetchCustomers from "./fetchCustomers";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={loadCustomers}
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
      <div className="bg-blue-500 text-white p-4 mb-6 rounded">
        <h1 className="text-2xl font-bold text-center">Customer List</h1>
      </div>

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