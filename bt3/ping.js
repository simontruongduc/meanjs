const axios = require("axios");
let servers = [
    { url: "http://localhost:3000", name: 0 },
    { url: "http://localhost:3001", name: 1 },
    { url: "http://localhost:3002", name: 2 },
    { url: "http://localhost:3003", name: 3 },
];
const pingService = {
    ping(ignoreServer= 0,index = 0) {
        const self = this;
        setTimeout(() => {
            let server = servers[index];
            if(server.name === ignoreServer){
                index = index < servers.length - 1 ? index+1 : 0;
                server = servers[index];
            }
            axios.get(`${server.url}/ping`).then(function (response) {
                self.ping(ignoreServer,index < servers.length - 1 ? index+1 : 0);
            }).catch(function (error) {
                console.log(`server ${server.name} die`);
                self.ping(ignoreServer,index < servers.length - 1 ? index+1 : 0);
            });
        },1000)
    }
}
module.exports = pingService;