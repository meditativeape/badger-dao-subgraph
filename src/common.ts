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
} from "./constants"

const getUuid = require('uuid-by-string')


export function getOrCreateERC20Token(event: ethereum.Event, address: Address): Token {
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

export function getOrCreateERC20RewardToken(event: ethereum.Event, address: Address): RewardToken {
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

export function getOrCreateEthereumDexAmmProtocol(name: string, slug: string): DexAmmProtocol {
    let uuidHash = getUuid(slug);  // Hash the slug into an UUID
    let protocol = DexAmmProtocol.load(uuidHash)
    if (protocol != null) {
        return protocol as DexAmmProtocol
    }

    protocol = new DexAmmProtocol(uuidHash)
    protocol.name = name
    protocol.slug = slug
    protocol.network = Network.ETHEREUM
    protocol.type = ProtocolType.EXCHANGE
    protocol.save()

    return protocol as DexAmmProtocol
}

export function createDexAmmLiquidityPool(
    address: Address,
    protocol: DexAmmProtocol,
    name: string,
    symbol: string,
    inputTokens: [Token],
    outputToken: Token,
    rewardTokens: [RewardToken]
) : LiquidityPool {
    let pool = new LiquidityPool(address.toHexString())
    pool.name = name
    pool.symbol = symbol
    pool.protocol = protocol
    pool.inputTokens = inputTokens
    pool.outputToken = outputToken
    pool.rewardTokens = rewardTokens
    pool.save()

    return pool as LiquidityPool
}
