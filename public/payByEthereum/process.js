$(document).ready(function () {
    alert("Hhhhh");
    const abi = [
      {
        constant: false,
        inputs: [
          {
            name: "id",
            type: "string",
          },
        ],
        name: "payment",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        name: "arr_bills",
        outputs: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "walletAddress",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: "walletAddress",
            type: "address",
          },
          {
            indexed: false,
            name: "id",
            type: "string",
          },
        ],
        name: "send_data",
        type: "event",
      },
    ];
  
    const smartContractAddress = "0x891e7528207A8ACe6d45f7731f6cb3884336FfDe";
  
    const web3 = new Web3(window.ethereum);
  //   window.ethereum.enable();
  
    // contract meta mask
    let contractMetaMask = new web3.eth.Contract(abi, smartContractAddress);
    //console.log(contractMetaMask)
  
    checkInstallMetaMask();
  
    let currentAccount = "";
  
    connectMetaMask().then((data) => { currentAccount = data[0] }).catch((err) => console.log(err));
  
    let eth_vnd;
  
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,VND').then((data) => { return data.json(); }).then((data) => { eth_vnd = data});
  
    $("#btnPayable").click(function () {
  
      // the money have to pay
      let payableAmount = $("#payableAmount").val()
      // Convert VND to ETH
      let convertVNDtoETH = payableAmount / eth_vnd.VND
  
      let ethPayable = convertVNDtoETH.toFixed(18).toString()
  
      contractMetaMask.methods.payment("1234").send({
          from: currentAccount, value: web3.utils.toWei(ethPayable, 'ether')
      }).then((data)=> { alert('Thanh toán thành công')}).catch((err)=>{console.log(err)})
    });
  });
  
  async function connectMetaMask() {
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    return account;
  }
  
  function checkInstallMetaMask() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      alert("Vui lòng cài đặt MetaMask");
    }
  }
  