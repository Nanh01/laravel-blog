import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Date from "@/Layouts/Date";
import { Head, Link, router } from "@inertiajs/react";
import { Select } from "antd";
import React, { useEffect, useState } from "react";

export default function Index({ auth, blogs }) {
    const [data, setData] = useState([]);
    const [acceptCount, setAcceptCount] = useState(0);
    const [processingCount, setProcessingCount] = useState(0);

    const checkedRole = () => {
        if (auth.user.role === "author") {
            return false;
        }else {
          
            return true;
        }
    };
   
    const onChange = (event, id) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, state: event }; // Cập nhật trạng thái của người dùng
            }
            return item; // Giữ nguyên các người dùng khác
        });

        router.put(`/blog/${id}`, { state: event });
        // Cập nhật lại state với dữ liệu mới
        setData(updatedData);
        updateCountsManual(updatedData);
    };

    const edit = (id) => {
        router.get(route("blog.edit", id));
    };
    const destroy = (id) => {
        router.delete(route("blog.destroy", id));
    };

    const updateCountsManual = (blogsData) => {

        let accept = 0;
        let processing = 0;

        for (const item of blogsData){
            if(item.state === "ACCEPT"){
                accept++;

            } else if (item.state === "PROCESSING"){
                processing++;
            }
        }

        setAcceptCount(accept);
        setProcessingCount(processing);


    };




    useEffect(() => {
        if (blogs) {
            if (auth.user.role === "author") {
                const newData = blogs.data.filter((item) => item.user === auth.user.name);
                setData(newData);
                updateCountsManual(newData);
           
            }else {
                const newData = blogs.data.filter((item) => item.user !== auth.user.name);
                setData(newData);
                updateCountsManual(newData);
            }

        }
    }, [blogs]);
    console.log(data)
    return (
        <AuthenticatedLayout
            auth={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Blog
                </h2>
            }
        >
            <Head title="Blog" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-3 ">
                            <Link
                                href={route("blog.create")}
                                className="px-2 py-1 text-white bg-blue-700 hover:bg-blue-600 rounded"
                            >
                                Add
                            </Link>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        {data.length > 0 ?
                            <table>
                                <thead>
                                    <tr>
                                        <th className="px-3 py-3">Id</th>
                                        <th className="px-3 py-3">Title</th>
                                        <th className="px-3 py-3">State</th>
                                        <th className="px-3 py-3">User</th>
                                        <th className="px-3 py-3">Category</th>
                                        <th className="px-3 py-3">Create At</th>
                                        <th className="px-3 py-3">Update At</th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 && 
                                        data.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-3 py-3">
                                                    {item.id}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {item.title}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {!checkedRole() ? (
                                                        item.state
                                                    ) : (
                                                        <Select
                                                            defaultValue={
                                                                item.state
                                                            }
                                                            style={{
                                                                width: 120,
                                                            }}
                                                            onChange={(e) =>
                                                                onChange(
                                                                    e,
                                                                    item.id
                                                                )
                                                            }
                                                            options={[
                                                                {
                                                                    value: "ACCEPT",
                                                                    label: "ACCEPT",
                                                                },
                                                                {
                                                                    value: "PROCESSING",
                                                                    label: "PROCESSING",
                                                                },
                                                                {
                                                                    value: "DENY",
                                                                    label: "DENY",
                                                                },
                                                            ]}
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {item.user}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {item.category}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <Date date={item.createdAt}></Date>
                                                </td>
                                                <td className="px-3 py-3">
                                              
                                                    <Date date={item.updateAt}></Date>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span
                                                        className="text-red-900 cursor-pointer"
                                                        onClick={() =>
                                                            destroy(item.id)
                                                        }
                                                    >
                                                        Delete
                                                    </span>
                                                    <span
                                                        className="text-blue-900 cursor-pointer"
                                                        onClick={() =>
                                                            edit(item.id)
                                                        }
                                                    >
                                                        Edit
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        : <p>Bạn chưa có bài viết nào</p>}
                        </div>
                            <div className="p-4 text-gray-700 dark:text-gray-300">
                            <p> Accepted: {acceptCount}</p>
                            <p> Processing: {processingCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
