import axios from "axios"
import {API_KEY, TOKEN_IDO, WALLET_TOKEN_IDO } from 'config'

export function useHome() {

    const getBalanceAPIBscscan = async () => {
        return axios({
            method: 'GET',
            url: process.env.REACT_APP_API_BSCSCAN + `?module=account&action=tokenbalance&contractaddress=${TOKEN_IDO}&address=${WALLET_TOKEN_IDO}&tag=latest&apikey=${API_KEY}`
        }).then((res) => {
            return Number(res?.data?.result) ? (Number(res?.data?.result) / 1e18) : 0
        }).catch(err => {
            return 0
        })
    }

    return {
        getBalanceAPIBscscan
    }
}