import InputText from "@/Components/InputText";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function Edit({ auth, user }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: user.data.name,
        email: user.data.email,
        password: null,
        confirm: null,
    });
    const handleSumit = (e) => {
        e.preventDefault();
        put(`/user/${user.data.id}`);
    };

    

    return (
        <AuthenticatedLayout
            auth={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit User
                </h2>
            }
        >
            <Head title="User Edit" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form method="POST" onSubmit={(e) => handleSumit(e)}>
                                <div className="grid grid-cols-2 gap-4 ">
                                    <InputText
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={data.name}
                                        placeholder="name"
                                        setData={setData}
                                    ></InputText>
                                    <InputText
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={data.email}
                                        placeholder="email"
                                        setData={setData}
                                    ></InputText>
                                    <InputText
                                        id="password"
                                        name="password"
                                        label="Password"
                                        value={data.password}
                                        placeholder="password"
                                        setData={setData}
                                    ></InputText>
                                    <InputText
                                        id="confirm"
                                        name="confirm"
                                        label="Confirm Password"
                                        value={data.confirm}
                                        placeholder="confirm password"
                                        setData={setData}
                                    ></InputText>
                                </div>
                                <div className="text-center mt-3">
                                    <button type="submit" className="bg-green-700 hover:bg-green-600 rounded px-4 py-1">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
