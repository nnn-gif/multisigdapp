import contract from 'truffle-contract'
import MultiSigContract from '@contracts/MultiSig.json'

const MultiSig = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(MultiSigContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve(instance)
      }).catch(err => {
        reject(err)
      })
    })
  },

  isSigner: function (address) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.isSigner.call(
         address
       ).then(signer => {
         resolve(signer)
       }).catch(err => {
         reject(err)
       })
    })
  },

  getAllSigners: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.signers.call().then(signers => {
        resolve(signers)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getContractAddress: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.contractaddress.call().then(signers => {
        resolve(signers)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getContributers: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.listContributors.call().then(signers => {
        resolve(signers)
      }).catch(err => {
        reject(err)
      })
    })
  },

  listOpenProposals: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.listOpenBeneficiariesProposals.call().then(signers => {
        resolve(signers)
      }).catch(err => {
        reject(err)
      })
    })
  },

  contractowner: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.owner.call().then(signers => {
        resolve(signers)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getContributorAmount: function (address) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getContributorAmount.call(address).then(signers => {
        resolve(signers)
      }).catch(err => {
        reject(err)
      })
    })
  },

  contributersBalance: function (address) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.contributers_balance.call(address).then(signers => {
        resolve(signers)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getProposal: function (address) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getBeneficiaryProposal.call(address).then(signers => {
        resolve(signers)
      }).catch(err => {
        reject(err)
      })
    })
  },

  endContributionPeriod: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.endContributionPeriod({from: window.web3.eth.accounts[0]}).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  listenevents: function () {
    let self = this

    var events = self.instance.allEvents({fromBlock: 0, toBlock: 'latest'})
    events.watch(function (err, ev) {
      if (err) {
        console.log(err)
      } else {
        console.log(ev)
      }
    })
  },

  contribute: function (amount) {
    let self = this

    self.instance.sendTransaction({from: window.web3.eth.accounts[0], value: amount})
  },

  approve: function (address) {
    let self = this

    self.instance.approve(address, {from: window.web3.eth.accounts[0]})
  },

  submitproposal: function (value) {
    let self = this

    self.instance.submitProposal(value, {from: window.web3.eth.accounts[0]})
  },

  withdraw: function (value) {
    let self = this

    self.instance.withdraw(value, {from: window.web3.eth.accounts[0]})
  },

  reject: function (address) {
    let self = this

    self.instance.approve(address, {from: window.web3.eth.accounts[0]})
  },

  isInContributionPeriod: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.isAccepting.call(
        // address || window.web3.eth.defaultAccount,
        //{from: window.web3.eth.accounts[0]}
      ).then(exists => {
        resolve(exists)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default MultiSig

