import InputText from "@/Components/InputText";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React from "react";

export default function Index({ auth, categories }) {
    const { data, setData, post } = useForm({
        id: null,
        name: null,
    });
    console.log(categories)
    const destroy = (id) => {
        console.log(id)
        router.delete(route("category.destroy", id));
    };
    const handSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post("/category", data);
    };

    return (
        <AuthenticatedLayout
            auth={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Category
                </h2>
            }
        >
            <Head title="Category" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form className="w-3/5 m-auto flex items-center" method="post" onSubmit={(e) => handSubmit(e)}>
                            <div className="px-5 pt-5 grid grid-cols-2 gap-3">
                                <InputText
                                    id="id"
                                    name="id"
                                    label="Id"
                                    value={data.id}
                                    placeholder="Id"
                                    setData={setData}
                                ></InputText>
                                <InputText
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={data.name}
                                    placeholder="Name"
                                    setData={setData}
                                ></InputText>
                            </div>
                            <div className="px-5 pt-5 ">

                                <button type="submit" className="px-3 py-1 rounded text-white bg-green-700 hover:bg-green-600">Save</button>
                            </div>
                        </form>
                        <div className="p-6 flex justify-center text-gray-900 dark:text-gray-100">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="px-3 py-3">Id</th>
                                        <th className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.data &&
                                        categories.data.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-3 py-3">
                                                    {item.categoryId}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {item.categoryName}
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
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
