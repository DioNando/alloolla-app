<?php

namespace App\Http\Controllers;

use App\Filters\UsersFilter;
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

        $includeArticles = $request->query('includeArticles');

        $users = user::where($filterItems);

        if ($includeArticles) {
            $users = $users->with('articles');
        }

        return new UserCollection($users->paginate()->appends($request->query()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $includeArticles = request()->query('includeArticles');

        $data = User::findOrFail($id);

        if ($includeArticles) {
            return new UserResource($data->loadMissing('articles'));
        }

        return new UserResource($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
