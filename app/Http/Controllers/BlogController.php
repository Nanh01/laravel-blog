<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogResource;
use App\Http\Resources\CategoryResource;
use App\Models\Blog;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BlogController extends Controller
{
    //
    public function index()
    {
        $query = Blog::query();
        $blogs = $query->paginate(10)->onEachSide(1);

        return inertia("Blog/Index", [
            "blogs" => BlogResource::collection(Blog::all()),
        ]);
    }

    public function getBlogs()
    {

        return response()->json([
            "blogs" => BlogResource::collection(Blog::all()),
        ]);
    }

    public function create()
    {
        return inertia("Blog/Create", [
            "categories" => CategoryResource::collection(Category::all()),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "title" => 'required|nullable',
            "content" => 'required|nullable',
            'category_id' => 'required|exists:categories,id',
            'user_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();
        print_r($validatedData);
        $blog = Blog::create($validatedData);

        return Inertia::location(route('blog.index'));
    }

    public function edit($id)
    {
        $blog = Blog::findOrFail($id);
        return inertia("Blog/Edit", [
            "blog" => new BlogResource($blog),
            "categories" => CategoryResource::collection(Category::all()),
        ]);
    }
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $validatedData = [];

        try {
            // Kiểm tra nếu role thay đổi
            if ($request->has('state')) {
                $blog->state = $request->state;
                $blog->save();
            } else {
                $validator = Validator::make($request->all(), [
                    "title" => 'required|nullable',
                    "content" => 'required|nullable',
                    'category_id' => 'required|exists:categories,id',
                    'user_id' => 'required|exists:users,id'
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'message' => 'Validation error',
                        'errors' => $validator->errors()
                    ], 422);
                }

                $validatedData = $validator->validated();
                print_r($validatedData);
                $blog->update($validatedData);
            }
        } catch (Exception $e) {
            throw new $e;
        }
        return Inertia::location(route('blog.index'));
    }

    public function destroy($id)
    {
        $user = Blog::find($id);
        $user->delete();
        return Inertia::location(route('blog.index'));
    }
}
