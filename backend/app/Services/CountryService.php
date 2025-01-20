<?php

namespace App\Services;

use App\Models\Country;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;
use \Illuminate\Support\Collection;
use Exception;
use Symfony\Component\Console\Output\BufferedOutput;

class CountryService
{

    /**
     * Call a seeder from the controller.
     *
     * @return void
     */
    public function populateCountries(): void
    {
        // Run the ApiDataSeeder
        Artisan::call('db:seed', [
            '--class' => 'ApiDataSeeder'
        ]);
        Artisan::call('db:seed', [
            '--class' => 'CountryTableSeeder',
        ]);
    }

    /**
     * Get a list of countries with their IDs, names, capitals, and choices.
     *
     * @return array
     * @throws Exception
     */
    public function getCountries(): array
    {
        try {
            $countries = Country::all()->shuffle();
            $results = [];

            foreach ($countries as $country) {
                $results['questions'][] = [
                    'id' => $country->id,
                    'country' => $country->country,
                    'correctAnswer' => $country->capital,
                    'choices' => $this->getCountryChoices($countries, $country),
                ];
            }

            return $results;
        } catch (Exception $e) {
            Log::error('Error fetching countries: ' . $e->getMessage());
            throw new Exception('Failed to fetch countries. Please try again later.');
        }
    }

    /**
     * Generate a list of random choices for a country's capital.
     *
     * @param Collection $countries
     * @param Country $currentCountry
     * @return array
     */
    private function getCountryChoices(Collection $countries, Country $currentCountry): array
    {
        $choices = $countries->pluck('capital')
            ->filter(fn($capital) => $capital !== $currentCountry->capital)
            ->shuffle()
            ->take(2)
            ->toArray();

        $choices[] = $currentCountry->capital;
        shuffle($choices);

        return $choices;
    }
}
