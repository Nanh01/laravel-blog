import InputText from '@/Components/InputText';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({auth, blog, categories}) {
    const {data, setData, post} = useForm({
        title: blog.data.title,
        content: blog.data.content,
        user_id: auth.user.id,
        category_id: null
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(auth.user.id);
        console.log(data)
        post("/blog", data);
    }

 
    return (
        <AuthenticatedLayout
        auth={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Blog
                </h2>
            }
        >
            <Head title=" Create Blog" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                            <div>
                            <InputText id="title" name="title" value={data.title} label="Title" placeholder="Title" setData={setData}></InputText>
                            <InputText id="content" name="content" value={data.content} label="Content" placeholder="Content" setData={setData}></InputText>
                            <div className="form-group">
                                <select onChange={(e) => setData('category_id', e.target.value)} className='text-gray-600'>
                                <option value="">Select a Category</option>
                                    {categories.data && categories.data.map((item) => (
                                        <option key={item.id} value={item.id}>{item.categoryName}</option>

                                    ))}
                                </select>
                            </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="px-3 py-1 bg-green-700 hover:bg-green-600 rounded">Save</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
