<?php

namespace App\Http\Controllers;

use App\Filters\UsersFilter;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new UsersFilter();
        $filterItems = $filter->transform($request); // [['column', 'operator', 'value']]

        $includeProducts = $request->query('includeProducts');

        $users = user::where($filterItems);

        if ($includeProducts) {
            $users = $users->with('products');
        }

        return new UserCollection($users->paginate()->appends($request->query()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->all());
        // TODO: add audit_log
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $includeProducts = request()->query('includeProducts');

        $data = User::findOrFail($id);

        if ($includeProducts) {
            return new UserResource($data->loadMissing('products'));
        }

        return new UserResource($data->loadMissing('audit_logs'));
        // return new UserResource($data->loadMissing('interactions')->loadMissing('audit_logs'));
        // return new UserResource($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if ($user->update($request->all())) {
            // TODO: add audit_log
            return new UserResource($user);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = User::findOrFail($id);
        if ($data->delete()) {
            // TODO: add audit_log
            return new UserResource($data);
        };
    }
}
