import Web3 from 'web3'
import {MAINNET_BSC_URL} from './../constants/index'

const web3NoAccount = new Web3(new Web3(new Web3.providers.HttpProvider(MAINNET_BSC_URL)))

const getWeb3NoAccount = () => {
    return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount
