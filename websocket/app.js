const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req,res)=>{
   res.end('hey!');
});

server.listen(3000);

const io = socketio.listen(server);

io.sockets.on('connection',(socket)=>{
   console.log('Kullanıcı bağlandı');

   socket.on('selamVer',(data)=>{
      console.log(data.name + ' selam Verdi');
       socket.emit('merhabaDe',{message:'Merhaba ' + data.city,name:data.name});
   });
   socket.on('disconnect',()=>{
      console.log('Kullanıcı düştü');
   })
});