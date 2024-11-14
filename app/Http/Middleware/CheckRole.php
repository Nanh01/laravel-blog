<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $roles)
    {
        // Chia danh sách vai trò được phép thành mảng
        $rolesArray = explode('|', $roles);

        // Kiểm tra nếu người dùng đã xác thực
        if (Auth::check()) {
            // Kiểm tra xem vai trò của người dùng có nằm trong danh sách vai trò được phép hay không
            if (in_array(Auth::user()->role, $rolesArray)) {
                return $next($request);
            }
        }

        // Nếu không đủ quyền, trả về lỗi 403
        return response()->json(['message' => 'Forbidden'], 403);
    }
}
