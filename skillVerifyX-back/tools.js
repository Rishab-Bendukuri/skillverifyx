
loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("web3 is 'undefined'.")
    }
  }

  loadAccount: async () => {
    web3.eth.defaultAccount = "0xBC7B4B86C3EdA2E67767e19D8376Ff7D0ac5B119"
    App.account = "0xBC7B4B86C3EdA2E67767e19D8376Ff7D0ac5B119"
  }

  loadContract: async () => {
    const todoList = await $.getJSON('TodoList.json')
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)

    App.todoList = await App.contracts.TodoList.deployed()
  }

  createTask: async () => {
    await App.todoList.createTask("New", { from: App.account })
  }