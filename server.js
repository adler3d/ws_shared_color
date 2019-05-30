'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
/*
const wss = new require('ws').Server({noServer:true});
server.on('upgrade',(request,socket,head)=>{
  const pathname = url.parse(request.url).pathname;
  if (pathname === '/foo') {
    wss.handleUpgrade(request,socket,head,ws=>{
      wss.emit('connection',ws,request);
    });
    return;
  }
  socket.destroy();
});*/
var g_obj={};var fn="nope";var getmap=(m,k)=>{if(!(k in m))m[k]={};return m[k];};
wss.on('connection',ws=>{
  console.log('Client connected');
  ws.on('close',()=>console.log('Client disconnected'));
  ws.on('message',s=>{console.log(s);getmap(g_obj,fn).v=s;});
});
var iter=0;
setInterval(()=>{
  iter++;
  wss.clients.forEach((client) => {
    var s=JSON.stringify({fn:fn,mem:getmap(g_obj,fn)});
    client.send(s);
  });
},16);
