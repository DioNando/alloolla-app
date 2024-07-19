<?php

namespace App\Http\Controllers;

use App\Helper\Helper;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\AuditLog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if ($request->query('includeAll')) {
            $data = Category::get();
            return CategoryResource::collection($data);
        }

        return CategoryResource::collection(Category::with('user')->orderBy('id', 'asc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->all());
        // Helper::interactionCategory($category->id, $request->input('user_id'), 'Ajout', 'grey', 'tag', 'Création');
        // TODO: add audit_log
        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'Ajout',
            'entity_type' => 'Catégorie',
            'entity_id' => $category->id,
            'icon' => 'tag',
            'color' => 'info',
            'details' => 'Ajout de : ' . $category->name,
        ]);
        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return new CategoryResource($category->loadMissing('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        if ($category->update($request->all())) {
            // Helper::interactionCategory($category->id, $request->input('user_id'), 'Modification', 'orange', 'archive', 'Mise à jour');
            // TODO: add audit_log

            AuditLog::create([
                'user_id' => Auth::id(),
                'action' => 'Modification',
                'entity_type' => 'Catégorie',
                'entity_id' => $category->id,
                'icon' => 'pencil',
                'color' => 'info',
                'details' => 'Modification de : ' . $category->name,
            ]);
            return new CategoryResource($category);
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
        $category = Category::findOrFail($id);
        if ($category->delete()) {
            // TODO: add audit_log

            AuditLog::create([
                'user_id' => Auth::id(),
                'action' => 'Suppression',
                'entity_type' => 'Catégorie',
                'entity_id' => $category->id,
                'icon' => 'delete',
                'color' => 'error',
                'details' => 'Suppression de : ' . $category->name,
            ]);
            return new CategoryResource($category);
        };
    }
}
