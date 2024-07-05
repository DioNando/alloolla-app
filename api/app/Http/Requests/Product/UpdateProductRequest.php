<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $method = $this->method();

        if ($method == 'PUT') {
            return [
                'name' => ['required'],
                // 'type' => ['required', Rule::in(['I', 'B', 'i', 'b'])],
                'regular_price' => ['required', 'integer'],
                'description' => ['required', 'string'],
                'user_id' => ['required'],

            ];
        } else {
            return [
                'name' => ['sometimes', 'required'],
                // 'type' => ['sometimes', 'required', Rule::in(['I', 'B', 'i', 'b'])],
                'regular_price' => ['sometimes', 'required', 'integer'],
                'description' => ['sometimes', 'required', 'string'],
                'user_id' => ['sometimes', 'required'],
            ];
        }
    }
}
