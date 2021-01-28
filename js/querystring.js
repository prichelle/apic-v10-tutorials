context.request.body.readAsBuffer(
  function(error, buffer){
    if (error) {
      context.message.statusCode = '500';
    }
    if(buffer) {
      var response = {"active" : true};

      var bodyStr = buffer.toString();
      var bodyParsed = bodyStr.split('&');

      for (var i = 0; i < bodyParsed.length; i++) {
        var pair = bodyParsed[i].split('=');
        console.debug('pair: ' + pair[0]);
        if (pair[0]==='token'){
          response['reqat'] = pair[1];
          context.set('reqat',pair[1]);
          console.debug('token: ' + pair[1]);
        }
      }
    }
    else{
      context.message.statusCode = '500';
    }
  }
);
