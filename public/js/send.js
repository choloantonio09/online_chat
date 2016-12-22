var countMessage = 0;
var isActive;
var notifMessage = "Hello World!";
var notifSender = "guest";

window.onfocus = function () { 
  isActive = true; 
}; 
window.onblur = function () { 
  isActive = false; 
}; 

$(window).on('load',function(){
    $('div#original').hide().fadeOut('fast');
    $('#myModal').modal('show');
});

/*$('#myModal').on('shown.bs.modal', function () {
    $('#name').focus();
})*/  

$(document).on('keypress','#name',function (e) {
            if (e.which === 13) {
                $("#modalsubmit").click();
            }
        });

$(document).on('click','#modalsubmit',function(event){
	event.preventDefault();

	if ($("#name").val().replace(/^\s+|\s+$/g, "").length == 0)
	{
		alert("NOTICE! You must enter your name.");
	}
	else
	{
		$('#myModal').modal('hide');

        var name = $('#name').val();
        var div = $('div#original');
        checkName(name);
        div.show().fadeIn('slow');
        //setInterval(getmessages,1000);
        getmessages();
        $("#messagesss").animate({ scrollTop: $('#messagesss').prop("scrollHeight")}, 1000);

	}
});

function checkName (currentName) {

    var ul = $('ul#messagesss');
    var messages = $($('.messages')[0]).attr('data-msgs');
    messages = $.parseJSON(messages);
    
    for (var i = 0, len = messages.length; i < len; i++) {
        countMessage++;
        if (messages[i].name.toLowerCase() === currentName.toLowerCase())
        {
            ul.append('<li class="message right appeared"><div class="avatar"></div><div class="text_wrapper"><div class="text pull-right">'+messages[i].message+'</div></div></li>');
        }
        else
        {
            ul.append('<li class="message left appeared"><div class="avatar"></div><div class="text_wrapper"><div class="text">'+messages[i].message+'</div></div></li>');
        }
    }
}

function getmessages()
{
    $.ajax({
                method: 'POST',
                url: 'getmessages',
                data:{
                    count: countMessage
                },
                success: function(data)
                {
                    var ul = $('ul#messagesss');
                    var name = $('#name').val();


                    if(data)
                    {
                        console.log(data);

                        if (data.name.toLowerCase() == name.toLowerCase())
                        {
                            
                        }
                        else
                        {
                            ul.append('<li class="message left appeared"><div class="avatar"></div><div class="text_wrapper"><div class="text">'+data.message+'</div></div></li>');

                            $("#messagesss").animate({ scrollTop: $('#messagesss').prop("scrollHeight")}, 1000);

                            if(isActive == false)
                            {
                                notifMessage = data.message;
                                notifSender = data.name;
                                notifyMe();
                            }
                        }
                        countMessage++;
                    }
                    else
                    {
                        console.log(data);
                    }

                    getmessages();
                    
                },
                error: function(data)
                {
                    console.log(data);
                }
            });
}

(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $('#name').val() + ": " + $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') { //check if input is empty
                return;
            }
            
            $messages = $('.messages');
            ///message_side = message_side === 'left' ? 'right' : 'left';
            message_side = 'right';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();


            var author = $('#name').val();
       	 	var message = $('#name').val() + ": " + $('.message_input').val();
       	 	//alert(message);

            $.ajax({
	        	method: 'POST',
	        	url: 'message',
	        	data: 
	        	{
	        		author: author,
	        		message: message
	        	},
	        	success: function(data)
	        	{
	        		//console.log(data);
	        	},
	        	error: function(data)
	        	{
	        		//console.log(data);
	        	}
	        });

	        $('.message_input').val(''); //set input to null




            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
    });
}.call(this));


//NOTIFICATIONS

function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    spawnNotification(notifMessage,notifSender,"../images/notifImage.png");
    
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        spawnNotification(notifMessage,notifSender,"../images/notifImage.png");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

Notification.requestPermission().then(function(result) {
  console.log(result);
});

function spawnNotification(theBody,sender,theIcon) {
  var options = {
      body: theBody,
      icon: theIcon
  }

  var n = new Notification("New message from " + sender, options);
  n.onclick = function(event)
  {
    event.preventDefault();
    window.focus();
    n.close();
  }
  setTimeout(n.close.bind(n),6000);



};