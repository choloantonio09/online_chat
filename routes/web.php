<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'MessageController@displayAll');

Route::post('/message','MessageController@message');

Route::post('/session','MessageController@sessions');

Route::post('/getmessages','MessageController@callmessages');

Route::get('/chaturl', function() {
    return view('chatbox');
});
