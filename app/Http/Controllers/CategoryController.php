<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{
   public function index() {
        $query = Category::query();
        $categories = $query->paginate(10)->onEachSide(1);

        return inertia("Category/Index", [
            "categories" => CategoryResource::collection(Category::all()),
        ]);
    }

    public function create(){
        return inertia("Category/Create");
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            "id" => 'required|nullable',
            "name" => 'required|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();
        print_r($validatedData);
        $data = [
            "category_id" => $validatedData["id"],
            "category_name" => $validatedData["name"]
        ];
        $category = Category::create($data);

        return Inertia::location(route('category.index'));
    }

    public function destroy($id){
        $user = Category::find($id);
        $user->delete();
        return Inertia::location(route('category.index'));
    }
}
