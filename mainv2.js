const fs = require('fs')

// 1. config your pages
const pages = [
  "balancer",  //BAL
  "badgerdao.eth", //BADGER 
  "uniswap", //UNI
  "aragon", //ANT	
  "pancake", //CAKE	
  "fei.eth", //TRIBE
  "rarible.eth", //RARI
  "graphprotocol.eth", //GRT	
  "alchemistcoin.eth", //MIST
  "alpha-ethereum", //ALPHA
  "ampleforth", //AMPL
  "banklessvault.eth", //BANK
  "curve", //CRV
  "dai", //DAI 
  "dodobird.eth", //DODO
  "snapshot.floatprotocol.eth", //BANK
  "uberhaus.eth", //HAUS
  "unslashed.eth", //USF
  "xdaistake.eth",  //XDAI
  "eth", //ETH
  "trustwallet", //TWT
  "truefigov.eth", //TRU
  "nft", //NFT	
  "aavegotchi.eth", //GHST	
  "tokenlon.eth", //LON	
  "gitcoindao.eth", //GTC
  "poolpool.pooltogether.eth", //POOL	
  "visor.eth", //VISR	
  "metafactory.eth", //ROBOT
  "ens.eth", //ENS
  "decentralgames.eth", //DG	
  "sushigov.eth", //xSUSHI
  "aave.eth", //AAVE
  "mintclub.eth", //MINTDAO	
  "xdollarfi.eth", //XDO	
]

// 2. config it if you use a proxy
const requestProxy = require("request").defaults({
  proxy: "http://127.0.0.1:8118",
  rejectUnauthorized: false,
})

// helper methods
let synchronous_request = function (url, params) {

  if (params == undefined) {
    let options = {
      url: url,
      form: params
    }
    
    return new Promise(function (resolve, reject) {
      // If you don't use proxy, require("request").get(...) is ok
      // require("request").get(options, function (error, response, body) {
      requestProxy.get(options, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve(body)
            }
        })
    })
  } else {
    let options = {
      url: url,
      json: params
    }

    return new Promise(function (resolve, reject) {
      requestProxy.post(options, function (error, response, body) {
        if (error) {
            reject(error)
        } else {
            resolve(body)
        }
      })
    })
  }
}

let read_last_items = function() {
  try {
    let items = fs.readFileSync("last_items")
    return JSON.parse(items)
  } catch {
    return []
  }
}

// snapshot
const snapshot_api_url = "https://hub.snapshot.org/graphql"
const snapshot_url = "https://snapshot.org/#/page/proposal/key"

async function main() {

  let last_items = read_last_items()
  let index = 0
  let items = []
  for (page of pages) {
    index++
    console.log(`\nPage ${index}: ${page}`)
    let body = await synchronous_request(snapshot_api_url, {
      operationName: 'Proposals',
      variables: {
        first: 6,
        skip: 0,
        space: page,
        state: "all",
        author_in: []
      },
      query: "query Proposals($first: Int!, $skip: Int!, $state: String!, $space: String, $space_in: [String], $author_in: [String]) {\n  proposals(\n    first: $first\n    skip: $skip\n    where: {space: $space, state: $state, space_in: $space_in, author_in: $author_in}\n  ) {\n    id\n    title\n    body\n    start\n    end\n    state\n    author\n    space {\n      id\n      name\n      members\n      avatar\n      __typename\n    }\n    __typename\n  }\n}\n"

    })
    if (body == "{}") {
      console.log("\tNo data returned, maybe bad page name or no proposals")
      continue
    }

    if (body.data.proposals.length == 0) {
      console.log("\tNo ACTIVE proposal")
      continue
    }

    for (p in body.data.proposals) {
      let proposal = body.data.proposals[p]
      items.push(proposal.id)
      let now = new Date().getTime() / 1000
      
      if (proposal.start <= now && proposal.end > now) {
        
        let mark = ""
        if (!last_items.includes(proposal.id)) {
          mark = "*** "
        }

        let start_date = new Date(proposal.start * 1000)
        let start_str = start_date.toLocaleDateString() + ' ' + start_date.toLocaleTimeString()
        let end_date = new Date(proposal.end * 1000)
        let end_str = end_date.toLocaleDateString() + ' ' + end_date.toLocaleTimeString()

        let url1 = snapshot_url.replace("page", page).replace("key", proposal.id)

        console.log(`\t${mark}Proposal '${proposal.title}' is ACTIVE, from ${start_str} to ${end_str},\n\t\tclick ${url1} to vote`)
      }
    }
  }
  
  fs.writeFileSync("last_items", JSON.stringify(items))
}

main()

