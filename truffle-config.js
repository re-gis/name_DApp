module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      network_id: "*",
      host: "127.0.0.1",
      chain_id: 5777, // Change this to your desired chain ID
      port: 7545,
    },
    develop: {
      port: 7545,
    },
  },
};
