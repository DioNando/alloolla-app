<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Helper\Helper;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $data = Product::get();
        // return ProductResource::collection($data);

        return ProductResource::collection(Product::with('user')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->all());
        // TODO: update audit_log
        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'created',
            'entity_type' => 'Product',
            'entity_id' => $product->id,
            'icon' => 'archive',
            'color' => 'success',
            'details' => 'Created a new product with name: ' . $product->name,
        ]);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return new ProductResource($product->loadMissing('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        if ($product->update($request->all())) {
            // TODO: update audit_log
            AuditLog::create([
                'user_id' => Auth::id(),
                'action' => 'updated',
                'entity_type' => 'Product',
                'entity_id' => $product->id,
                'icon' => 'pencil',
                'color' => 'info',
                'details' => 'Updated with name: ' . $product->name,
            ]);
            return new ProductResource($product);
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
        $product = Product::findOrFail($id);
        if ($product->delete()) {
            // TODO: update audit_log
            AuditLog::create([
                'user_id' => Auth::id(),
                'action' => 'deleted',
                'entity_type' => 'Product',
                'entity_id' => $product->id,
                'icon' => 'delete',
                'color' => 'error',
                'details' => 'Deleted product with name: ' . $product->name,
            ]);
            return new ProductResource($product);
        };
    }
}
