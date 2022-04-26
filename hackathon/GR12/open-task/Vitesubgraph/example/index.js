const axios = require("axios");

const main = async () => {
  try {
    const result = await axios.post(
      "https://api.thegraph.com/subgraphs/name/binsta/vitesubgraph",
      {
        query: `
            {
                transfers(first: 5) {
                    id
                    from
                    to
                    value
                  }
            }
            `,
      }
    );
    console.log(result.data.data.transfers);
  } catch (e) {
    console.log(e);
  }
};

main();
