<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // protected $fillable = ['name', 'regular_price', 'description', 'user_id'];

        return [
            'name' => fake()->sentence(rand(2,6)),
            'regular_price' => fake()->numberBetween(100, 2000),
            'description' => fake()->realText(200),
            'user_id' => User::factory(),
        ];
    }
}
