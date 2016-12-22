<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;

class MessageController extends Controller
{
	public function displayAll()
	{
    	$messages = Message::all();
    	return view('welcome')->with('messages', $messages);
	}

    public function message(Request $request)
    {
    	$message = new Message;
    	$message->name = $request->author;
    	$message->message = $request->message;
    	$message->save();

    	$latest = Message::orderBy('created_at','desc')->first();

    	return response()->json([

    		'name' => $latest->name,
    		'message' => $latest->message

    		]);
    }

    public function callmessages(Request $request)
    {
        $messages = Message::all();
        $latest = Message::orderBy('created_at','desc')->first();

        if($request->count != sizeof($messages))
        {
            $latest = Message::orderBy('created_at','desc')->first();

            return response()->json([

                'name' => $latest->name,
                'message' => $latest->message

            ]);
        }
        else
        {
            return;
        }
        
    }

    public function sessions(Request $request)
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
            $_SESSION['name'] = $request->session;
        }
        else
        {
            session_destroy();
            session_start();
            $_SESSION['name'] = $request->session;
        }
        
        
    }
}
