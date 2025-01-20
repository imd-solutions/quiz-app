<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class ApiDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $count = DB::table('countries')->count();
        if ($count > 0) {
            $this->command->info('The database has already been populated.');
            return;
        }
        // Define the API endpoint
        $apiUrl = env('API_URL');
        $apiEndpoint = env('API_ENDPOINT');

        $url = $apiUrl . $apiEndpoint;

        // Make an HTTP GET request to fetch data
        try {
            $response = Http::get($url);

            if ($response->successful()) {
                $data = $response->json();

                // Iterate through the data and insert it into the database
                foreach ($data as $items) {

                    if (is_array($items)) {

                        foreach ($items as $item) {
                            DB::table('countries')->insert([
                                'country' => $item['name'],
                                'capital' => $item['capital'],
                                'iso2' => $item['iso2'],
                                'iso3' => $item['iso3'],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);

                        }
                    }
                }

                $this->command->info('Data seeded successfully from API.');

            } else {
                $this->command->error('Failed to fetch data from API. Status: ' . $response->status());
            }
        } catch (\Exception $e) {
            $this->command->error('Error: ' . $e->getMessage());
        }
    }
}
