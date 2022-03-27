import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export namespace Network {
    export const AVALANCHE = "AVALANCHE"
    export const AURORA = "AURORA"
    export const BSC = "BSC"
    export const CELO = "CELO"
    export const CRONOS = "CRONOS"
    export const ETHEREUM = "ETHEREUM"
    export const FANTOM = "FANTOM"
    export const HARMONY = "HARMONY"
    export const MOONBEAM = "MOONBEAM"
    export const MOONRIVER = "MOONRIVER"
    export const OPTIMISM = "OPTIMISM"
    export const POLYGON = "POLYGON"
    export const XDAI = "XDAI"
}

export namespace ProtocolType {
    export const EXCHANGE = "EXCHANGE"
    export const LENDING = "LENDING"
    export const YIELD = "YIELD"
    export const BRIDGE = "BRIDGE"
    export const GENERIC = "GENERIC"
}

export namespace RewardTokenType {
    export const DEPOSIT = "DEPOSIT"
    export const BORROW = "BORROW"
}

export const BIGINT_ZERO = BigInt.fromI32(0);
export const BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export const FACTORY_ADDRESS = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac"