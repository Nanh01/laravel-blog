import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BlogCard from '@/Layouts/BlogCard';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs')
            .then((result) => result.json())  // Convert the response to JSON
            .then((result) => {
                
                const data = result.blogs.filter((item) => item.state === "ACCEPT" || (item.state === "PROSSING" && item.createAt < item.updateAt));
                setData(data);  // Set the data to state
            })
            .catch((err) => {
                console.error(err);  // Handle errors
            });
    }, []);
   console.log(data)
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-4 gap-4">
                      
                                {data.length > 0 && data.map((item) => (
                                    <div key={item.id}>
                                        <BlogCard blog={item}></BlogCard>

                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
