const http = require('http');
const { Client } = require('telegram-client');
const fs = require('fs');
const url = require('url');

const configure = JSON.parse(fs.readFileSync('config.json'));

const port = process.env.PORT || configure.lissenPort || 8080;

const client = new Client({
  apiId: configure.apiId, 
  apiHash: configure.apiHash
});

const server = http.createServer(async (req, res) => {
  // console.log(req.method);
  // console.log(req.url);
  if (req.method === 'POST') {
    let options = {};
    switch (req.url) {
      case '/searchChatMembers':
        req.on('data', (data) => {
          options = JSON.parse(data);
        });
        req.on('end',async () => {
          if(!options.chat_id) {
            res.statusCode = 400;
            res.end('Bad POST searchChatMembers! Need chat_id field.');
          } else {
            await client.request('searchChatMembers', {
              chat_id: options.chat_id,
              limit: 10000
            })
            .then(result=>{
              res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(result))
            })
            .catch(error=>{
              console.log(error);
              res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(error));
            });
          }
        });
        break;
      case '/getSupergroupMembers':
        req.on('data', (data) => {
          options = JSON.parse(data);
        });
        req.on('end',async () => {
          if(!options.supergroup_id) {
            res.statusCode = 400;
            res.end('Bad POST getSupergroupMembers! Need supergroup_id field.');
          } else {
            await client.request('getSupergroupMembers', {
              supergroup_id: options.supergroup_id,
              limit: 200
            })
            .then(result=>{
              res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(result))
            })
            .catch(error=>{
              console.log(error);
              res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(error));
            });
          }
        });
        break;
      case '/getUser':
        req.on('data', (data) => {
          options = JSON.parse(data);
        });
        req.on('end',async () => {
          if(!options.user_id) {
            res.statusCode = 400;
            res.end('Bad POST getUser! Need user_id field.');
          } else {
            await client.request('getUser', {user_id: options.user_id})
            .then(result=>{
              res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(result))
            })
            .catch(error=>{
              console.log(error);
              res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(error));
            });
          }
        });
        break;
      case '/getChat':
        req.on('data', (data) => {
          options = JSON.parse(data);
        });
        req.on('end',async () => {
          if(!options.chat_id) {
            res.statusCode = 400;
            res.end('Bad POST getChat! Need chat_id field.');
          } else {
            await client.request('getChat', {chat_id: options.chat_id})
            .then(result=>{
              res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(result))
            })
            .catch(error=>{
              console.log(error);
              res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(error));
            });
          }
        });
        break;
      case '/getBasicGroupFullInfo':
        req.on('data', (data) => {
          options = JSON.parse(data);
        });
        req.on('end',async () => {
          if(!options.basic_group_id) {
            res.statusCode = 400;
            res.end('Bad POST getBasicGroupFullInfo! Need basic_group_id field.');
          } else {
            await client.request('getBasicGroupFullInfo', {basic_group_id: options.basic_group_id})
            .then(result=>{
              res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(result))
            })
            .catch(error=>{
              console.log(error);
              res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(error));
            });
          }
        });
        break;
      case '/getSupergroupFullInfo':
        req.on('data', (data) => {
          options = JSON.parse(data);
        });
        req.on('end',async () => {
          if(!options.supergroup_id) {
            res.statusCode = 400;
            res.end('Bad POST getSupergroupFullInfo! Need supergroup_id field.');
          } else {
            await client.request('getSupergroupFullInfo', {supergroup_id: options.supergroup_id})
            .then(result=>{
              res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(result))
            })
            .catch(error=>{
              console.log(error);
              res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
              res.end(JSON.stringify(error));
            });
          }
        });
        break;
      default:
        res.statusCode = 400;
        console.log(req.url);
        res.end(`Unknow POST method: ${req.url}`);
        break;
    }
  } else if(req.method === 'GET') {
    let query = url.parse(req.url,true).query;
    let pathname = url.parse(req.url,true).pathname;
    switch (pathname) {
      case '/getSupergroup':
        if(!query.supergroup_id) {
          res.statusCode = 400;
          res.end('Bad GET getSupergroup! Need supergroup_id query parameter.');
        } else {
          await client.request('getSupergroupMembers', {
            supergroup_id: query.supergroup_id,
            limit: 200
          })
          .then(result=>{
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result))
          })
          .catch(error=>{
            console.log(error);
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(error));
          });
        }
        break;
      case '/getChats':
        await client.request('getChats', {
          offset_order: '9223372036854775807',
          offset_chat_id: 0,
          limit: 1000
        })
        .then(result=>{
          res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
          res.end(JSON.stringify(result))
        })
        .catch(error=>{
          console.log(error);
          res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
          res.end(JSON.stringify(error));
        });
        break;
      case '/searchChatMembers':
        if(!query.chat_id) {
          res.statusCode = 400;
          res.end('Bad GET searchChatMembers! Need chat_id query parameter.');
        } else {
          await client.request('searchChatMembers', {
            chat_id: query.chat_id,
            limit: 10000
          })
          .then(result=>{
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result))
          })
          .catch(error=>{
            console.log(error);
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(error));
          });
        }
        break;
      case '/getUser':
        if(!query.user_id) {
          res.statusCode = 400;
          res.end('Bad GET getUser! Need user_id query parameter.');
        } else {
          await client.request('getUser', {
            user_id: query.user_id,
            limit: 10000
          })
          .then(result=>{
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result))
          })
          .catch(error=>{
            console.log(error);
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(error));
          });
        }
        break;
      case '/getSupergroupMembers':
        if(!query.supergroup_id) {
          res.statusCode = 400;
          res.end('Bad GET getSupergroupMembers! Need supergroup_id query parameter.');
        } else {
          await client.request('getSupergroupMembers', {
            supergroup_id: query.supergroup_id,
            limit: 200
          })
          .then(result=>{
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result))
          })
          .catch(error=>{
            console.log(error);
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(error));
          });
        }
        break;
      case '/getChat':
        if(!query.chat_id) {
          res.statusCode = 400;
          res.end('Bad GET getChat! Need chat_id query parameter.');
        } else {
          await client.request('getChat', {chat_id: query.chat_id})
          .then(result=>{
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result))
          })
          .catch(error=>{
            console.log(error);
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(error));
          });
        }
        break;
      case '/getBasicGroupFullInfo':
        if(!query.basic_group_id) {
          res.statusCode = 400;
          res.end('Bad GET getBasicGroupFullInfo! Need basic_group_id query parameter.');
        } else {
          await client.request('getBasicGroupFullInfo', {basic_group_id: query.basic_group_id})
          .then(result=>{
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result))
          })
          .catch(error=>{
            console.log(error);
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(error));
          });
        }
        break;
      case '/getSupergroupFullInfo':
        if(!query.supergroup_id) {
          res.statusCode = 400;
          res.end('Bad GET getSupergroupFullInfo! Need supergroup_id query parameter.');
        } else {
          await client.request('getSupergroupFullInfo', {supergroup_id: query.supergroup_id})
          .then(result=>{
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(result))
          })
          .catch(error=>{
            console.log(error);
            res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(error));
          });
        }
        break;
      default:
        res.statusCode = 400;
        res.end('Unknow GET method!');
        break;
    }
  } else {
    res.statusCode = 400;
    res.end('Use POST method!');
  }
});

const connect = async () => {
  console.log(`Start...`);
  await client.connect(configure.name, configure.phoneNumber);
  console.log(`server is listening on ${port}`);
  server.listen(port);
}

connect();
