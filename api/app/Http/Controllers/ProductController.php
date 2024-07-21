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
use Intervention\Image\Facades\Image;

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

        return ProductResource::collection(Product::with('user')->orderBy('id', 'desc')->paginate(10));
        // return ProductResource::collection(Product::with('user')->paginate(10));
    }

    // public function search(Request $request)
    // {
    //     $keywords = $request->input('keywords');
    //     if ($request->input('stade') == 2) {
    //         $data = Client::where('nom', 'LIKE', '%' . $keywords . '%')->where('stade', 2)
    //             ->first();
    //     } else {
    //         $data = Client::where('nom', 'LIKE', '%' . $keywords . '%')
    //             ->first();
    //     }

    //     return new ClientResource($data);
    // }

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
        $product->categories()->attach($request->input('categories'));

        // if ($request->hasFile('images')) {
        //     foreach ($request->file('images') as $file) {
        //         $path = $file->store('images', 'public');
        //         $image = Image::create(['src' => $path]);
        //         $product->images()->attach($image);
        //     }
        // }

        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => 'Ajout',
            'entity_type' => 'Product',
            'entity_id' => $product->id,
            'icon' => 'archive',
            'color' => 'success',
            'details' => 'Ajout d\'un nouveau produit: ' . $product->name,
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
                'action' => 'Modification',
                'entity_type' => 'Produit',
                'entity_id' => $product->id,
                'icon' => 'pencil',
                'color' => 'info',
                'details' => 'Modification de : ' . $product->name,
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
                'action' => 'Suppression',
                'entity_type' => 'Produit',
                'entity_id' => $product->id,
                'icon' => 'delete',
                'color' => 'error',
                'details' => 'Suppression de : ' . $product->name,
            ]);
            return new ProductResource($product);
        };
    }
}
