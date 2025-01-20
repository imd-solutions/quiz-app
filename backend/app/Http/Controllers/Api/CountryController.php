<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\ClientException;
use App\Services\CountryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    protected CountryService $countryService;

    public function __construct(CountryService $countryService)
    {
        $this->countryService = $countryService;
    }

    /**
     * Populate the countries' database.
     *
     * @return JsonResponse
     */
    public function populateCountries(): JsonResponse
    {
        $this->countryService->populateCountries();
        return response()->json(['data' => ['The data has been populated'], 'status' => 'success'], 200);
    }

    /**
     * Return a list of countries.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getCountries(Request $request): JsonResponse
    {
        try {
            $countries = $this->countryService->getCountries();
            return response()->json(['data' => $countries, 'status' => 'success'], 200);
        } catch (ClientException $e) {
            return response()->json(['error' => $e->getMessage(), 'status' => 'error'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 'status' => 'error'], 500);
        }
    }
}
