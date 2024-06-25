<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $status = $this->faker->randomElement(['D', 'R']);
// TODO: ajouter les attributs
        return [
            'name' => fake()->sentence(rand(2,5)),
            'description' => fake()->realText(200),
            'amount' => fake()->numberBetween(100, 20000),
            'status' => $status,
            'user_id' => User::factory(),
        ];
    }
}
