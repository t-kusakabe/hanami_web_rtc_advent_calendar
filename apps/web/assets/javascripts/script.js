console.log('start webRTC!')

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var peer = new Peer({key: 'PeerJS APIkey'});
 
peer.on('open', function(){
    console.log('connect')
    $('#my-id').text(peer.id);
});


var myStream;
$(function(){
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    myStream = stream;
    $('#video').prop('src', URL.createObjectURL(stream));
  }, function(){});
});

function callTo(peerId){
  var call = peer.call(peerId, myStream)

  call.on('stream', function(othersStream){
    $('#others-video').prop('src', URL.createObjectURL(othersStream))
  })
}

peer.on('call', function(call){
  call.answer(myStream);
  call.on('stream', function(othersStream){
    $('#others-video').prop('src', URL.createObjectURL(othersStream));
  });
});
