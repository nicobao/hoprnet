[@hoprnet/hopr-ethereum](../README.md) / [Exports](../modules.md) / IERC777

# Class: IERC777

## Hierarchy

- *Contract*

  ↳ **IERC777**

## Table of contents

### Constructors

- [constructor](ierc777.md#constructor)

### Properties

- [\_deployedPromise](ierc777.md#_deployedpromise)
- [\_runningEvents](ierc777.md#_runningevents)
- [\_wrappedEmits](ierc777.md#_wrappedemits)
- [address](ierc777.md#address)
- [callStatic](ierc777.md#callstatic)
- [deployTransaction](ierc777.md#deploytransaction)
- [estimateGas](ierc777.md#estimategas)
- [filters](ierc777.md#filters)
- [functions](ierc777.md#functions)
- [interface](ierc777.md#interface)
- [populateTransaction](ierc777.md#populatetransaction)
- [provider](ierc777.md#provider)
- [resolvedAddress](ierc777.md#resolvedaddress)
- [signer](ierc777.md#signer)

### Methods

- [\_checkRunningEvents](ierc777.md#_checkrunningevents)
- [\_deployed](ierc777.md#_deployed)
- [\_wrapEvent](ierc777.md#_wrapevent)
- [attach](ierc777.md#attach)
- [authorizeOperator](ierc777.md#authorizeoperator)
- [authorizeOperator(address)](ierc777.md#authorizeoperator(address))
- [balanceOf](ierc777.md#balanceof)
- [balanceOf(address)](ierc777.md#balanceof(address))
- [burn](ierc777.md#burn)
- [burn(uint256,bytes)](ierc777.md#burn(uint256,bytes))
- [connect](ierc777.md#connect)
- [defaultOperators](ierc777.md#defaultoperators)
- [defaultOperators()](ierc777.md#defaultoperators())
- [deployed](ierc777.md#deployed)
- [emit](ierc777.md#emit)
- [fallback](ierc777.md#fallback)
- [granularity](ierc777.md#granularity)
- [granularity()](ierc777.md#granularity())
- [isOperatorFor](ierc777.md#isoperatorfor)
- [isOperatorFor(address,address)](ierc777.md#isoperatorfor(address,address))
- [listenerCount](ierc777.md#listenercount)
- [listeners](ierc777.md#listeners)
- [name](ierc777.md#name)
- [name()](ierc777.md#name())
- [off](ierc777.md#off)
- [on](ierc777.md#on)
- [once](ierc777.md#once)
- [operatorBurn](ierc777.md#operatorburn)
- [operatorBurn(address,uint256,bytes,bytes)](ierc777.md#operatorburn(address,uint256,bytes,bytes))
- [operatorSend](ierc777.md#operatorsend)
- [operatorSend(address,address,uint256,bytes,bytes)](ierc777.md#operatorsend(address,address,uint256,bytes,bytes))
- [queryFilter](ierc777.md#queryfilter)
- [removeAllListeners](ierc777.md#removealllisteners)
- [removeListener](ierc777.md#removelistener)
- [revokeOperator](ierc777.md#revokeoperator)
- [revokeOperator(address)](ierc777.md#revokeoperator(address))
- [send](ierc777.md#send)
- [send(address,uint256,bytes)](ierc777.md#send(address,uint256,bytes))
- [symbol](ierc777.md#symbol)
- [symbol()](ierc777.md#symbol())
- [totalSupply](ierc777.md#totalsupply)
- [totalSupply()](ierc777.md#totalsupply())
- [getContractAddress](ierc777.md#getcontractaddress)
- [getInterface](ierc777.md#getinterface)
- [isIndexed](ierc777.md#isindexed)

## Constructors

### constructor

\+ **new IERC777**(`addressOrName`: *string*, `contractInterface`: ContractInterface, `signerOrProvider?`: *Signer* \| *Provider*): [*IERC777*](ierc777.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | *string* |
| `contractInterface` | ContractInterface |
| `signerOrProvider?` | *Signer* \| *Provider* |

**Returns:** [*IERC777*](ierc777.md)

Inherited from: Contract.constructor

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:98

## Properties

### \_deployedPromise

• **\_deployedPromise**: *Promise*<Contract\>

Inherited from: Contract.\_deployedPromise

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:92

___

### \_runningEvents

• **\_runningEvents**: *object*

#### Type declaration

Inherited from: Contract.\_runningEvents

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:93

___

### \_wrappedEmits

• **\_wrappedEmits**: *object*

#### Type declaration

Inherited from: Contract.\_wrappedEmits

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:96

___

### address

• `Readonly` **address**: *string*

Inherited from: Contract.address

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:71

___

### callStatic

• **callStatic**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `authorizeOperator` | (`operator`: *string*, `overrides?`: CallOverrides) => *Promise*<void\> |
| `authorizeOperator(address)` | (`operator`: *string*, `overrides?`: CallOverrides) => *Promise*<void\> |
| `balanceOf` | (`owner`: *string*, `overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `balanceOf(address)` | (`owner`: *string*, `overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `burn` | (`amount`: BigNumberish, `data`: BytesLike, `overrides?`: CallOverrides) => *Promise*<void\> |
| `burn(uint256,bytes)` | (`amount`: BigNumberish, `data`: BytesLike, `overrides?`: CallOverrides) => *Promise*<void\> |
| `defaultOperators` | (`overrides?`: CallOverrides) => *Promise*<string[]\> |
| `defaultOperators()` | (`overrides?`: CallOverrides) => *Promise*<string[]\> |
| `granularity` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `granularity()` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `isOperatorFor` | (`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides) => *Promise*<boolean\> |
| `isOperatorFor(address,address)` | (`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides) => *Promise*<boolean\> |
| `name` | (`overrides?`: CallOverrides) => *Promise*<string\> |
| `name()` | (`overrides?`: CallOverrides) => *Promise*<string\> |
| `operatorBurn` | (`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: CallOverrides) => *Promise*<void\> |
| `operatorBurn(address,uint256,bytes,bytes)` | (`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: CallOverrides) => *Promise*<void\> |
| `operatorSend` | (`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: CallOverrides) => *Promise*<void\> |
| `operatorSend(address,address,uint256,bytes,bytes)` | (`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: CallOverrides) => *Promise*<void\> |
| `revokeOperator` | (`operator`: *string*, `overrides?`: CallOverrides) => *Promise*<void\> |
| `revokeOperator(address)` | (`operator`: *string*, `overrides?`: CallOverrides) => *Promise*<void\> |
| `send` | (`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: CallOverrides) => *Promise*<void\> |
| `send(address,uint256,bytes)` | (`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: CallOverrides) => *Promise*<void\> |
| `symbol` | (`overrides?`: CallOverrides) => *Promise*<string\> |
| `symbol()` | (`overrides?`: CallOverrides) => *Promise*<string\> |
| `totalSupply` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `totalSupply()` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |

Overrides: Contract.callStatic

Defined in: packages/ethereum/types/IERC777.d.ts:419

___

### deployTransaction

• `Readonly` **deployTransaction**: TransactionResponse

Inherited from: Contract.deployTransaction

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:91

___

### estimateGas

• **estimateGas**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `authorizeOperator` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `authorizeOperator(address)` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `balanceOf` | (`owner`: *string*, `overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `balanceOf(address)` | (`owner`: *string*, `overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `burn` | (`amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `burn(uint256,bytes)` | (`amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `defaultOperators` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `defaultOperators()` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `granularity` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `granularity()` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `isOperatorFor` | (`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `isOperatorFor(address,address)` | (`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `name` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `name()` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `operatorBurn` | (`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `operatorBurn(address,uint256,bytes,bytes)` | (`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `operatorSend` | (`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `operatorSend(address,address,uint256,bytes,bytes)` | (`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `revokeOperator` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `revokeOperator(address)` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `send` | (`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `send(address,uint256,bytes)` | (`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<BigNumber\> |
| `symbol` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `symbol()` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `totalSupply` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |
| `totalSupply()` | (`overrides?`: CallOverrides) => *Promise*<BigNumber\> |

Overrides: Contract.estimateGas

Defined in: packages/ethereum/types/IERC777.d.ts:608

___

### filters

• **filters**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AuthorizedOperator` | (`operator`: *string*, `tokenHolder`: *string*) => [*TypedEventFilter*](../interfaces/typedeventfilter.md)<[*string*, *string*], { `operator`: *string* ; `tokenHolder`: *string*  }\> |
| `Burned` | (`operator`: *string*, `from`: *string*, `amount`: ``null``, `data`: ``null``, `operatorData`: ``null``) => [*TypedEventFilter*](../interfaces/typedeventfilter.md)<[*string*, *string*, *BigNumber*, *string*, *string*], { `amount`: *BigNumber* ; `data`: *string* ; `from`: *string* ; `operator`: *string* ; `operatorData`: *string*  }\> |
| `Minted` | (`operator`: *string*, `to`: *string*, `amount`: ``null``, `data`: ``null``, `operatorData`: ``null``) => [*TypedEventFilter*](../interfaces/typedeventfilter.md)<[*string*, *string*, *BigNumber*, *string*, *string*], { `amount`: *BigNumber* ; `data`: *string* ; `operator`: *string* ; `operatorData`: *string* ; `to`: *string*  }\> |
| `RevokedOperator` | (`operator`: *string*, `tokenHolder`: *string*) => [*TypedEventFilter*](../interfaces/typedeventfilter.md)<[*string*, *string*], { `operator`: *string* ; `tokenHolder`: *string*  }\> |
| `Sent` | (`operator`: *string*, `from`: *string*, `to`: *string*, `amount`: ``null``, `data`: ``null``, `operatorData`: ``null``) => [*TypedEventFilter*](../interfaces/typedeventfilter.md)<[*string*, *string*, *string*, *BigNumber*, *string*, *string*], { `amount`: *BigNumber* ; `data`: *string* ; `from`: *string* ; `operator`: *string* ; `operatorData`: *string* ; `to`: *string*  }\> |

Overrides: Contract.filters

Defined in: packages/ethereum/types/IERC777.d.ts:537

___

### functions

• **functions**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `authorizeOperator` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `authorizeOperator(address)` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `balanceOf` | (`owner`: *string*, `overrides?`: CallOverrides) => *Promise*<[*BigNumber*]\> |
| `balanceOf(address)` | (`owner`: *string*, `overrides?`: CallOverrides) => *Promise*<[*BigNumber*]\> |
| `burn` | (`amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `burn(uint256,bytes)` | (`amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `defaultOperators` | (`overrides?`: CallOverrides) => *Promise*<[*string*[]]\> |
| `defaultOperators()` | (`overrides?`: CallOverrides) => *Promise*<[*string*[]]\> |
| `granularity` | (`overrides?`: CallOverrides) => *Promise*<[*BigNumber*]\> |
| `granularity()` | (`overrides?`: CallOverrides) => *Promise*<[*BigNumber*]\> |
| `isOperatorFor` | (`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides) => *Promise*<[*boolean*]\> |
| `isOperatorFor(address,address)` | (`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides) => *Promise*<[*boolean*]\> |
| `name` | (`overrides?`: CallOverrides) => *Promise*<[*string*]\> |
| `name()` | (`overrides?`: CallOverrides) => *Promise*<[*string*]\> |
| `operatorBurn` | (`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `operatorBurn(address,uint256,bytes,bytes)` | (`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `operatorSend` | (`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `operatorSend(address,address,uint256,bytes,bytes)` | (`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `revokeOperator` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `revokeOperator(address)` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `send` | (`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `send(address,uint256,bytes)` | (`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<ContractTransaction\> |
| `symbol` | (`overrides?`: CallOverrides) => *Promise*<[*string*]\> |
| `symbol()` | (`overrides?`: CallOverrides) => *Promise*<[*string*]\> |
| `totalSupply` | (`overrides?`: CallOverrides) => *Promise*<[*BigNumber*]\> |
| `totalSupply()` | (`overrides?`: CallOverrides) => *Promise*<[*BigNumber*]\> |

Overrides: Contract.functions

Defined in: packages/ethereum/types/IERC777.d.ts:179

___

### interface

• **interface**: *IERC777Interface*

Overrides: Contract.interface

Defined in: packages/ethereum/types/IERC777.d.ts:177

___

### populateTransaction

• **populateTransaction**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `authorizeOperator` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `authorizeOperator(address)` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `balanceOf` | (`owner`: *string*, `overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `balanceOf(address)` | (`owner`: *string*, `overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `burn` | (`amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `burn(uint256,bytes)` | (`amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `defaultOperators` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `defaultOperators()` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `granularity` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `granularity()` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `isOperatorFor` | (`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `isOperatorFor(address,address)` | (`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `name` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `name()` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `operatorBurn` | (`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `operatorBurn(address,uint256,bytes,bytes)` | (`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `operatorSend` | (`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `operatorSend(address,address,uint256,bytes,bytes)` | (`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `revokeOperator` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `revokeOperator(address)` | (`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `send` | (`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `send(address,uint256,bytes)` | (`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }) => *Promise*<PopulatedTransaction\> |
| `symbol` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `symbol()` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `totalSupply` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |
| `totalSupply()` | (`overrides?`: CallOverrides) => *Promise*<PopulatedTransaction\> |

Overrides: Contract.populateTransaction

Defined in: packages/ethereum/types/IERC777.d.ts:729

___

### provider

• `Readonly` **provider**: *Provider*

Inherited from: Contract.provider

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:74

___

### resolvedAddress

• `Readonly` **resolvedAddress**: *Promise*<string\>

Inherited from: Contract.resolvedAddress

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:90

___

### signer

• `Readonly` **signer**: *Signer*

Inherited from: Contract.signer

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:73

## Methods

### \_checkRunningEvents

▸ **_checkRunningEvents**(`runningEvent`: *RunningEvent*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `runningEvent` | *RunningEvent* |

**Returns:** *void*

Inherited from: Contract.\_checkRunningEvents

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:113

___

### \_deployed

▸ **_deployed**(`blockTag?`: BlockTag): *Promise*<Contract\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockTag?` | BlockTag |

**Returns:** *Promise*<Contract\>

Inherited from: Contract.\_deployed

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:106

___

### \_wrapEvent

▸ **_wrapEvent**(`runningEvent`: *RunningEvent*, `log`: Log, `listener`: Listener): Event

#### Parameters

| Name | Type |
| :------ | :------ |
| `runningEvent` | *RunningEvent* |
| `log` | Log |
| `listener` | Listener |

**Returns:** Event

Inherited from: Contract.\_wrapEvent

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:114

___

### attach

▸ **attach**(`addressOrName`: *string*): [*IERC777*](ierc777.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addressOrName` | *string* |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.attach

Defined in: packages/ethereum/types/IERC777.d.ts:138

___

### authorizeOperator

▸ **authorizeOperator**(`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | *string* |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:300

___

### authorizeOperator(address)

▸ **authorizeOperator(address)**(`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | *string* |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:303

___

### balanceOf

▸ **balanceOf**(`owner`: *string*, `overrides?`: CallOverrides): *Promise*<BigNumber\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | *string* |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<BigNumber\>

Defined in: packages/ethereum/types/IERC777.d.ts:310

___

### balanceOf(address)

▸ **balanceOf(address)**(`owner`: *string*, `overrides?`: CallOverrides): *Promise*<BigNumber\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | *string* |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<BigNumber\>

Defined in: packages/ethereum/types/IERC777.d.ts:310

___

### burn

▸ **burn**(`amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | BigNumberish |
| `data` | BytesLike |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:317

___

### burn(uint256,bytes)

▸ **burn(uint256,bytes)**(`amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | BigNumberish |
| `data` | BytesLike |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:321

___

### connect

▸ **connect**(`signerOrProvider`: *string* \| *Signer* \| *Provider*): [*IERC777*](ierc777.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerOrProvider` | *string* \| *Signer* \| *Provider* |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.connect

Defined in: packages/ethereum/types/IERC777.d.ts:137

___

### defaultOperators

▸ **defaultOperators**(`overrides?`: CallOverrides): *Promise*<string[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<string[]\>

Defined in: packages/ethereum/types/IERC777.d.ts:329

___

### defaultOperators()

▸ **defaultOperators()**(`overrides?`: CallOverrides): *Promise*<string[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<string[]\>

Defined in: packages/ethereum/types/IERC777.d.ts:329

___

### deployed

▸ **deployed**(): *Promise*<[*IERC777*](ierc777.md)\>

**Returns:** *Promise*<[*IERC777*](ierc777.md)\>

Overrides: Contract.deployed

Defined in: packages/ethereum/types/IERC777.d.ts:139

___

### emit

▸ **emit**(`eventName`: *string* \| EventFilter, ...`args`: *any*[]): *boolean*

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | *string* \| EventFilter |
| `...args` | *any*[] |

**Returns:** *boolean*

Inherited from: Contract.emit

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:119

___

### fallback

▸ **fallback**(`overrides?`: TransactionRequest): *Promise*<TransactionResponse\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | TransactionRequest |

**Returns:** *Promise*<TransactionResponse\>

Inherited from: Contract.fallback

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:107

___

### granularity

▸ **granularity**(`overrides?`: CallOverrides): *Promise*<BigNumber\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<BigNumber\>

Defined in: packages/ethereum/types/IERC777.d.ts:333

___

### granularity()

▸ **granularity()**(`overrides?`: CallOverrides): *Promise*<BigNumber\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<BigNumber\>

Defined in: packages/ethereum/types/IERC777.d.ts:333

___

### isOperatorFor

▸ **isOperatorFor**(`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides): *Promise*<boolean\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | *string* |
| `tokenHolder` | *string* |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<boolean\>

Defined in: packages/ethereum/types/IERC777.d.ts:337

___

### isOperatorFor(address,address)

▸ **isOperatorFor(address,address)**(`operator`: *string*, `tokenHolder`: *string*, `overrides?`: CallOverrides): *Promise*<boolean\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | *string* |
| `tokenHolder` | *string* |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<boolean\>

Defined in: packages/ethereum/types/IERC777.d.ts:341

___

### listenerCount

▸ **listenerCount**(`eventName?`: *string* \| EventFilter): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | *string* \| EventFilter |

**Returns:** *number*

Inherited from: Contract.listenerCount

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:120

___

### listeners

▸ **listeners**<EventArgsArray, EventArgsObject\>(`eventFilter?`: [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\>): [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | *any*[] |
| `EventArgsObject` | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter?` | [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\> |

**Returns:** [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\>[]

Overrides: Contract.listeners

Defined in: packages/ethereum/types/IERC777.d.ts:141

▸ **listeners**(`eventName?`: *string*): Listener[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | *string* |

**Returns:** Listener[]

Overrides: Contract.listeners

Defined in: packages/ethereum/types/IERC777.d.ts:164

___

### name

▸ **name**(`overrides?`: CallOverrides): *Promise*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<string\>

Defined in: packages/ethereum/types/IERC777.d.ts:349

___

### name()

▸ **name()**(`overrides?`: CallOverrides): *Promise*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<string\>

Defined in: packages/ethereum/types/IERC777.d.ts:349

___

### off

▸ **off**<EventArgsArray, EventArgsObject\>(`eventFilter`: [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\>, `listener`: [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\>): [*IERC777*](ierc777.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | *any*[] |
| `EventArgsObject` | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\> |
| `listener` | [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\> |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.off

Defined in: packages/ethereum/types/IERC777.d.ts:144

▸ **off**(`eventName`: *string*, `listener`: Listener): [*IERC777*](ierc777.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | *string* |
| `listener` | Listener |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.off

Defined in: packages/ethereum/types/IERC777.d.ts:165

___

### on

▸ **on**<EventArgsArray, EventArgsObject\>(`eventFilter`: [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\>, `listener`: [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\>): [*IERC777*](ierc777.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | *any*[] |
| `EventArgsObject` | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\> |
| `listener` | [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\> |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.on

Defined in: packages/ethereum/types/IERC777.d.ts:148

▸ **on**(`eventName`: *string*, `listener`: Listener): [*IERC777*](ierc777.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | *string* |
| `listener` | Listener |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.on

Defined in: packages/ethereum/types/IERC777.d.ts:166

___

### once

▸ **once**<EventArgsArray, EventArgsObject\>(`eventFilter`: [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\>, `listener`: [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\>): [*IERC777*](ierc777.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | *any*[] |
| `EventArgsObject` | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\> |
| `listener` | [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\> |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.once

Defined in: packages/ethereum/types/IERC777.d.ts:152

▸ **once**(`eventName`: *string*, `listener`: Listener): [*IERC777*](ierc777.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | *string* |
| `listener` | Listener |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.once

Defined in: packages/ethereum/types/IERC777.d.ts:167

___

### operatorBurn

▸ **operatorBurn**(`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | *string* |
| `amount` | BigNumberish |
| `data` | BytesLike |
| `operatorData` | BytesLike |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:353

___

### operatorBurn(address,uint256,bytes,bytes)

▸ **operatorBurn(address,uint256,bytes,bytes)**(`account`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | *string* |
| `amount` | BigNumberish |
| `data` | BytesLike |
| `operatorData` | BytesLike |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:359

___

### operatorSend

▸ **operatorSend**(`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sender` | *string* |
| `recipient` | *string* |
| `amount` | BigNumberish |
| `data` | BytesLike |
| `operatorData` | BytesLike |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:369

___

### operatorSend(address,address,uint256,bytes,bytes)

▸ **operatorSend(address,address,uint256,bytes,bytes)**(`sender`: *string*, `recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `operatorData`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sender` | *string* |
| `recipient` | *string* |
| `amount` | BigNumberish |
| `data` | BytesLike |
| `operatorData` | BytesLike |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:376

___

### queryFilter

▸ **queryFilter**<EventArgsArray, EventArgsObject\>(`event`: [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\>, `fromBlockOrBlockhash?`: *string* \| *number*, `toBlock?`: *string* \| *number*): *Promise*<[*TypedEvent*](../interfaces/typedevent.md)<EventArgsArray & EventArgsObject\>[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | *any*[] |
| `EventArgsObject` | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\> |
| `fromBlockOrBlockhash?` | *string* \| *number* |
| `toBlock?` | *string* \| *number* |

**Returns:** *Promise*<[*TypedEvent*](../interfaces/typedevent.md)<EventArgsArray & EventArgsObject\>[]\>

Overrides: Contract.queryFilter

Defined in: packages/ethereum/types/IERC777.d.ts:171

___

### removeAllListeners

▸ **removeAllListeners**<EventArgsArray, EventArgsObject\>(`eventFilter`: [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\>): [*IERC777*](ierc777.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | *any*[] |
| `EventArgsObject` | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\> |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.removeAllListeners

Defined in: packages/ethereum/types/IERC777.d.ts:160

▸ **removeAllListeners**(`eventName?`: *string*): [*IERC777*](ierc777.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName?` | *string* |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.removeAllListeners

Defined in: packages/ethereum/types/IERC777.d.ts:169

___

### removeListener

▸ **removeListener**<EventArgsArray, EventArgsObject\>(`eventFilter`: [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\>, `listener`: [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\>): [*IERC777*](ierc777.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventArgsArray` | *any*[] |
| `EventArgsObject` | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventFilter` | [*TypedEventFilter*](../interfaces/typedeventfilter.md)<EventArgsArray, EventArgsObject\> |
| `listener` | [*TypedListener*](../modules.md#typedlistener)<EventArgsArray, EventArgsObject\> |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.removeListener

Defined in: packages/ethereum/types/IERC777.d.ts:156

▸ **removeListener**(`eventName`: *string*, `listener`: Listener): [*IERC777*](ierc777.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | *string* |
| `listener` | Listener |

**Returns:** [*IERC777*](ierc777.md)

Overrides: Contract.removeListener

Defined in: packages/ethereum/types/IERC777.d.ts:168

___

### revokeOperator

▸ **revokeOperator**(`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | *string* |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:387

___

### revokeOperator(address)

▸ **revokeOperator(address)**(`operator`: *string*, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | *string* |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:390

___

### send

▸ **send**(`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | *string* |
| `amount` | BigNumberish |
| `data` | BytesLike |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:397

___

### send(address,uint256,bytes)

▸ **send(address,uint256,bytes)**(`recipient`: *string*, `amount`: BigNumberish, `data`: BytesLike, `overrides?`: Overrides & { `from?`: *string* \| *Promise*<string\>  }): *Promise*<ContractTransaction\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `recipient` | *string* |
| `amount` | BigNumberish |
| `data` | BytesLike |
| `overrides?` | Overrides & { `from?`: *string* \| *Promise*<string\>  } |

**Returns:** *Promise*<ContractTransaction\>

Defined in: packages/ethereum/types/IERC777.d.ts:402

___

### symbol

▸ **symbol**(`overrides?`: CallOverrides): *Promise*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<string\>

Defined in: packages/ethereum/types/IERC777.d.ts:411

___

### symbol()

▸ **symbol()**(`overrides?`: CallOverrides): *Promise*<string\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<string\>

Defined in: packages/ethereum/types/IERC777.d.ts:411

___

### totalSupply

▸ **totalSupply**(`overrides?`: CallOverrides): *Promise*<BigNumber\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<BigNumber\>

Defined in: packages/ethereum/types/IERC777.d.ts:415

___

### totalSupply()

▸ **totalSupply()**(`overrides?`: CallOverrides): *Promise*<BigNumber\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | CallOverrides |

**Returns:** *Promise*<BigNumber\>

Defined in: packages/ethereum/types/IERC777.d.ts:415

___

### getContractAddress

▸ `Static` **getContractAddress**(`transaction`: { `from`: *string* ; `nonce`: BigNumberish  }): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | *object* |
| `transaction.from` | *string* |
| `transaction.nonce` | BigNumberish |

**Returns:** *string*

Inherited from: Contract.getContractAddress

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:100

___

### getInterface

▸ `Static` **getInterface**(`contractInterface`: ContractInterface): *Interface*

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractInterface` | ContractInterface |

**Returns:** *Interface*

Inherited from: Contract.getInterface

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:104

___

### isIndexed

▸ `Static` **isIndexed**(`value`: *any*): value is Indexed

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | *any* |

**Returns:** value is Indexed

Inherited from: Contract.isIndexed

Defined in: node_modules/@ethersproject/contracts/lib/index.d.ts:110