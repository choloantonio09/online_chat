<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <title>Online Conference</title>
        <link rel="stylesheet" type="text/css" href="{{URL:: to('css/style.css')}}">

        
    </head>

    <script type="text/javascript" src="{{URL:: to('js/send.js')}}"></script>



    <body style="padding: 20px; font-family: Century Gothic">


        <div id="myModal" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                {{-- <button type="button" class="close" data-dismiss="modal">&times;</button> --}}
                <h2 class="modal-title">Enter your name: </h2>
              </div>
              <div class="modal-body">
                <input class="form-control" id="name" type="text" name="name" style="text-align: center" value="" placeholder="Enter your name" autofocus>
              </div>
              <div class="modal-footer">
                <button type="button" id="modalsubmit" class="btn btn-info" >Submit</button>
              </div>
            </div>
          </div>
        </div>


        <div id="original">
            <div class="chat_window">
                <div class="top_menu">
                    <div class="buttons">
                        <div class="button close"></div>
                        <div class="button minimize"></div>
                        <div class="button maximize"></div>
                    </div>
                    <div class="title">Online Conference</div>
                </div>
                <ul class="messages" id="messagesss" data-msgs='{{$messages}}'>
                </ul>
                <div class="bottom_wrapper clearfix">
                    <div class="message_input_wrapper">
                        <input class="message_input" placeholder="Type your message here..." />
                    </div>
                    <div class="send_message">
                        <div class="icon"></div>
                        <div class="text">Send</div>
                    </div>
                </div>
            </div>
            <div class="message_template">
                <li class="message">
                    <div class="avatar"></div>
                    <div class="text_wrapper">
                        <div class="text pull-right"></div>
                    </div>
                </li>
            </div>
        </div>



        
    </body>
</html>
