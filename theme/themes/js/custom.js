function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function login(id)
{
    var isdata=true;
       if($('#username').val()==='')
       {
           isdata=false;
           $('#username').focus();
       }
       if($('#password').val()==='')
       {
           isdata=false;
           $('#password').focus();
       }

    if(isdata===true)
    {
    	$.post( 'http://madebypakistan.com/projects/server/auth.php', $( "#loginForm" ).serialize(), function( data ) {	
						//alert(data);
                                                if(data==null)
                                                {
                                                    return false;
                                                }
                                                else
                                                {
                                                   // eraseCookie('usertoken');
                                                   // createCookie('usertoken',data.usercode,'30');
                                                    $( "#loginForm").hide();
						    
                                                   localStorage.usertoken= data.usercode;
						   localStorage.fullname= data.firstname+' '+data.middlename+' '+data.lastname;
						   localStorage.useremail= data.useremail;
                                                   $("#fullname").html(data.firstname+' '+data.middlename+' '+data.lastname);
                                                   $("#useremail").html(data.useremail);
                                                   // createCookie('fullname',data.firstname+' '+data.middlename+' '+data.lastname,'30');
                                                   // createCookie('useremail',data.useremail,'30');
                                                    //$("#afterlogin").show();
                                                        loadpage('cams.html');                                                    
                                                }    

}, "json");
                
    }    
}
function logout()
{
  //eraseCookie('usertoken');
  //eraseCookie('fullname');
  //eraseCookie('useremail');
  delete localStorage.usertoken;
  delete localStorage.fullname;
  delete localStorage.useremail;
  controller = null;
  delete    controller;
  $("#loginForm").show();
  $("#afterlogin").hide();
}