<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CountryController;

Route::get('v1/populate-countries', [CountryController::class, 'populateCountries']);
Route::get('v1/countries', [CountryController::class, 'getCountries']);
