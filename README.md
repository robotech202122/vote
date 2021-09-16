## snapshot.page 线下投票页面抓取脚本

1. 安装node和git，要求nodejs版本不低于12.16.0

2. 从github上复制代码

  ```
  git clone https://github.com/robotech202122/vote.git
  ```

3. 到 https://snapshot.page网站找到你要投票的代币对应的url，填写到代码的pages数组里

  ```
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
  ```

  已有的代币如上所示，自行增减

4. 配置好你使用代理的端口号（科学上网）

  ```
  proxy: "http://127.0.0.1:8118",
  ```

  端口号8118按实际修改

5. 如果你没有使用代理，跳过第4步，代码中做一下切换

  ```
  require("request").get(options, function (error, response, body) {
  // requestProxy.get(options, function (error, response, body) {
  ```

6. 每隔2-3天运行一次脚本

  ```
  node mainv2.js
  ```

  程序输出里带 *** 的就是上次运行到这次之间新增的投票项目，按下ctrl点击相应的链接即可打开投票页面投票啦～




