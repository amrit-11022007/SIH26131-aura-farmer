const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dns.resolveSrv(
  "_mongodb._tcp.sih.0rxhow1.mongodb.net",
  (error, addresses) => {
    console.log("Error:", error);
    console.log("Addresses:", addresses);
  }
);