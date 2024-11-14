<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;


class UserController extends Controller
{
    public function index()
    {
        $query = User::query();
        $users = $query->paginate(10)->onEachSide(1);

        return inertia("User/Index", [
            "users" => UserResource::collection(User::all()),
        ]);
    }

    public function create()
    {
        return inertia("User/Create");
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required|nullable',
            "email" => 'required|nullable',
            "password" => 'required|nullable',
            "confirm" => 'required|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();
        $user = User::create($validatedData);

        return Inertia::location(route('user.index'));
    }

    public function edit($id)
    {
        $user = User::find($id);
        return inertia("User/Edit", [
            "user" => new UserResource($user)
        ]);
    }
    
    public function update(Request $request, $id)
    {
        // Tìm người dùng theo ID
        $user = User::findOrFail($id);
    
        // Khởi tạo mảng dữ liệu đã xác thực
        $validatedData = [];
    
        try {
            // Kiểm tra nếu role thay đổi
            if ($request->has('state')) {
                $user->state = $request->state;
                $user->save();
            } else {
                // Xác thực các trường khác nếu role không thay đổi
                $validator = Validator::make($request->all(), [
                    "name" => 'required|string|max:255',
                    "email" => 'required|email|unique:users,email,' . $id,
                    "password" => 'nullable|min:8|confirmed',
                ]);
    
                // Nếu xác thực thất bại, trả về lỗi
                if ($validator->fails()) {
                    return response()->json([
                        'message' => 'Validation error',
                        'errors' => $validator->errors()
                    ], 422);
                }
    
                // Lưu dữ liệu đã xác thực vào mảng
                $validatedData = $validator->validated();
                $user->update($validatedData);
            }
            
            // Cập nhật dữ liệu người dùng
           
    
        } catch (Exception $e) {
            throw new $e;
        }
    
        // Chuyển hướng đến trang danh sách người dùng
        return Inertia::location(route('user.index'));
    }
    


    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return Inertia::location(route('user.index'));
    }
}
