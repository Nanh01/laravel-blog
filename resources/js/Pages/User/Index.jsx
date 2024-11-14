import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { Switch } from 'antd';
export default function Index({ auth, users }) {
    const [data, setData] = useState([])
    const destroy = (id) => {
        router.delete(route("user.destroy", id));
    }

    const onChange = (id, checked) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, state: !checked }; // Cập nhật trạng thái của người dùng
            }
            return item; // Giữ nguyên các người dùng khác
        });
    
        // Cập nhật lại state với dữ liệu mới
        setData(updatedData);
        router.put(`/user/${id}`, {state: !checked});
       

      };

    const edit = (id) => {
        router.get(route("user.edit", id));
    }

    const filteredData = data.filter((item) => {
        if (auth.user.role === "admin") {
          return item.role !== "admin"; 
        }
        if (auth.user.role === "editor") {
          return item.role !== "admin" && item.role !== "editor"; 
        }
        return true; 
      });
    useEffect(() => {
        if(users){
            setData(users.data);
        }
    }, [users])
    return (
        <AuthenticatedLayout
            auth={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-3 ">
                        <Link  href={route("user.create")} className="px-2 py-1 text-white bg-blue-700 hover:bg-blue-600 rounded">Add</Link>

                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="px-3 py-3">Id</th>
                                        <th className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3">Email</th>
                                        <th className="px-3 py-3">State</th>
                                        <th className="px-3 py-3">Role</th>
                                        <th className="px-3 py-3">Create At</th>
                                        <th className="px-3 py-3">Update At</th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 &&
                                        filteredData.map((item) => 
                                        <tr key={item.id}>
                                            <td className="px-3 py-3">{item.id}</td>
                                            <td className="px-3 py-3">{item.name}</td>
                                            <td className="px-3 py-3">{item.email}</td>
                                            <td className="px-3 py-3">
                                            <Switch value={item.state} onChange={(e) => onChange(item.id, item.state)} />
                                            </td>
                                            <td className="px-3 py-3">{item.role}</td>
                                            <td className="px-3 py-3">{item.createdAt}</td>
                                            <td className="px-3 py-3">{item.updatedAt}</td>
                                        <td className="px-3 py-3">
                                            <span className="text-red-900 cursor-pointer" onClick={() => destroy(item.id)}>Delete</span>
                                            <span className="text-blue-900 cursor-pointer" onClick={() => edit(item.id)}>Edit</span>
                                        </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                          
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
