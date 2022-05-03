import web3NoAccount from '../utils/web3'
import MultiCallAbi from '../constants/abi/Multicall.json'
import {Interface} from '@ethersproject/abi'

const multicall = async (abi, calls, provider) => {
	const web3 = web3NoAccount

	const multi = new web3.eth.Contract(
		MultiCallAbi,
		'0x1ee38d535d541c55c9dae27b12edf090c608e6fb',
	)
	const itf = new Interface(abi)

	const calldata = calls.map((call) => [
		call.address.toLowerCase(),
		itf.encodeFunctionData(call.name, call.params),
	])

	const { returnData } = await multi.methods.aggregate(calldata).call()
	return returnData.map((call, i) =>
		itf.decodeFunctionResult(calls[i].name, call),
	)
}

export default multicall
