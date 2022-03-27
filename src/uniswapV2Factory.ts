import { PairCreated } from "../generated/UniswapV2Factory/UniswapV2Factory"
import { UniswapV2Pair } from "../generated/templates"
import {
    getOrCreateERC20Token,
    getOrCreateDex,
    createDexAmmLiquidityPool,
} from "./common"


export function handlePairCreated(event: PairCreated): void {
    // Create liquidity pool
    let token0 = getOrCreateERC20Token(event.params.token0)
    let token1 = getOrCreateERC20Token(event.params.token1)
    let lpToken = getOrCreateERC20Token(event.params.pair)
    let protocol = getOrCreateDex()
    createDexAmmLiquidityPool(event, event.params.pair, protocol, token0, token1, lpToken)
    
    // Start listening for pool events
    UniswapV2Pair.create(event.params.pair)
}

