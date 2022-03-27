import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import { ERC20 } from "../generated/UniswapV2Factory/ERC20"
import {
    Token,
    RewardToken,
    DexAmmProtocol,
    LiquidityPool,
} from "../generated/schema"
import {
    Network,
    ProtocolType,
    RewardTokenType,
    BIGINT_ZERO,
    BIGDECIMAL_ZERO,
    FACTORY_ADDRESS,
} from "./constants"


export function getOrCreateERC20Token(address: Address): Token {
    let addressHex = address.toHexString()
    let token = Token.load(addressHex)
    if (token != null) {
        return token as Token
    }

    token = new Token(addressHex)
    let tokenInstance = ERC20.bind(address)
    let tryName = tokenInstance.try_name()
    if (!tryName.reverted) {
        token.name = tryName.value
    }
    let trySymbol = tokenInstance.try_symbol()
    if (!trySymbol.reverted) {
        token.symbol = trySymbol.value
    }
    let tryDecimals = tokenInstance.try_decimals()
    if (!tryDecimals.reverted) {
        token.decimals = tryDecimals.value
    }
    token.save()

    return token as Token
}

export function getOrCreateERC20RewardToken(address: Address): RewardToken {
    let addressHex = address.toHexString()
    let rewardToken = RewardToken.load(addressHex)
    if (rewardToken != null) {
        return rewardToken as RewardToken
    }

    rewardToken = new RewardToken(addressHex)
    let rewardTokenInstance = ERC20.bind(address)
    let tryName = rewardTokenInstance.try_name()
    if (!tryName.reverted) {
        rewardToken.name = tryName.value
    }
    let trySymbol = rewardTokenInstance.try_symbol()
    if (!trySymbol.reverted) {
        rewardToken.symbol = trySymbol.value
    }
    let tryDecimals = rewardTokenInstance.try_decimals()
    if (!tryDecimals.reverted) {
        rewardToken.decimals = tryDecimals.value
    }
    rewardToken.type = RewardTokenType.DEPOSIT
    rewardToken.save()

    return rewardToken as RewardToken
}

export function getOrCreateDex(): DexAmmProtocol {
    let protocol = DexAmmProtocol.load(FACTORY_ADDRESS)
    if (protocol != null) {
        return protocol as DexAmmProtocol
    }

    protocol = new DexAmmProtocol(FACTORY_ADDRESS)
    protocol.name = "Sushiswap"
    protocol.slug = "sushiswap"
    protocol.version = "1.0.0"
    protocol.network = Network.ETHEREUM
    protocol.type = ProtocolType.EXCHANGE
    protocol.save()

    return protocol as DexAmmProtocol
}

export function createDexAmmLiquidityPool(
    event: ethereum.Event,
    address: Address,
    protocol: DexAmmProtocol,
    token0: Token,
    token1: Token,
    lpToken: Token
) : LiquidityPool {
    let pool = new LiquidityPool(address.toHexString())
    pool.protocol = protocol.id
    pool.inputTokens = [token0.id, token1.id]
    pool.outputToken = lpToken.id
    pool.totalValueLockedUSD = BIGDECIMAL_ZERO
    pool.totalVolumeUSD = BIGDECIMAL_ZERO
    pool.inputTokenBalances = [BIGINT_ZERO, BIGINT_ZERO]
    pool.outputTokenSupply = BIGINT_ZERO 
    pool.outputTokenPriceUSD = BIGDECIMAL_ZERO
    pool.createdTimestamp = event.block.timestamp
    pool.createdBlockNumber = event.block.number
    pool.name = protocol.name + " " + lpToken.symbol
    pool.symbol = lpToken.symbol
    pool.save()

    return pool as LiquidityPool
}
