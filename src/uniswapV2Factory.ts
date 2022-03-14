import { PairCreated } from "../generated/UniswapV2Factory/UniswapV2Factory"
import {
    getOrCreateERC20Token,
    getOrCreateERC20RewardToken,
    getOrCreateEthereumDexAmmProtocol,
    createDexAmmLiquidityPool,
} from "./common"


export function handlePairCreated(event: PairCreated): void {
    // TODO
}
