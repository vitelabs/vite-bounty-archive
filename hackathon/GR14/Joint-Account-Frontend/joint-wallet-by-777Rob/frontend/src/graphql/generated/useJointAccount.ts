import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
// Generated using https://www.graphql-code-generator.com/

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Query = {
	__typename?: 'Query';
	hello?: Maybe<Scalars['String']>;
	Account?: Maybe<Account>;
	ContractEvents?: Maybe<Array<Maybe<ContractEvent>>>;
	UsersJointAccounts?: Maybe<Array<Maybe<JointAccount>>>;
	JointAccountMotions?: Maybe<Array<Maybe<Motion>>>;
	JointAccount?: Maybe<JointAccount>;
};

export type QueryAccountArgs = {
	address: Scalars['String'];
};

export type QueryContractEventsArgs = {
	input?: InputMaybe<ContractInput>;
};

export type QueryUsersJointAccountsArgs = {
	userAddress?: InputMaybe<Scalars['String']>;
	update?: InputMaybe<Scalars['Boolean']>;
};

export type QueryJointAccountMotionsArgs = {
	accountId?: InputMaybe<Scalars['Int']>;
};

export type QueryJointAccountArgs = {
	accountId?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	GetMockAccount?: Maybe<Account>;
};

export type ContractInput = {
	contractAddress: Scalars['String'];
	contractAbi: Array<InputMaybe<ContractAbiInput>>;
	eventName?: InputMaybe<Scalars['String']>;
	fromHeight?: InputMaybe<Scalars['Int']>;
	toHeight?: InputMaybe<Scalars['Int']>;
};

export type NewAccountBlock = {
	__typename?: 'NewAccountBlock';
	hash?: Maybe<Scalars['String']>;
	height?: Maybe<Scalars['Int']>;
	heightStr?: Maybe<Scalars['String']>;
	removed?: Maybe<Scalars['Boolean']>;
};

export type ContractFunctionInputType = {
	__typename?: 'ContractFunctionInputType';
	internalType?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
};

export type ContractFunctionInputInputType = {
	internalType?: InputMaybe<Scalars['String']>;
	name?: InputMaybe<Scalars['String']>;
	indexed?: InputMaybe<Scalars['Boolean']>;
	anonymous?: InputMaybe<Scalars['Boolean']>;
	type?: InputMaybe<Scalars['String']>;
};

export type ContractAbiElement = {
	__typename?: 'ContractAbiElement';
	inputs?: Maybe<Array<Maybe<ContractFunctionInputType>>>;
	name?: Maybe<Scalars['String']>;
	outputs?: Maybe<Array<Maybe<ContractFunctionInputType>>>;
	stateMutability?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
};

export type ContractAbiInput = {
	inputs?: InputMaybe<Array<InputMaybe<ContractFunctionInputInputType>>>;
	name?: InputMaybe<Scalars['String']>;
	outputs?: InputMaybe<Array<InputMaybe<ContractFunctionInputInputType>>>;
	indexed?: InputMaybe<Scalars['Boolean']>;
	anonymous?: InputMaybe<Scalars['Boolean']>;
	stateMutability?: InputMaybe<Scalars['String']>;
	type?: InputMaybe<Scalars['String']>;
};

export type ReturnValues = {
	__typename?: 'ReturnValues';
	from?: Maybe<Scalars['String']>;
	to?: Maybe<Scalars['String']>;
	num?: Maybe<Scalars['String']>;
};

export type Raw = {
	__typename?: 'Raw';
	data?: Maybe<Scalars['String']>;
	topics?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ContractEvent = {
	__typename?: 'ContractEvent';
	contractAddress?: Maybe<Scalars['String']>;
	contractAbi?: Maybe<Array<Maybe<ContractAbiElement>>>;
	eventName?: Maybe<Scalars['String']>;
	fromHeight?: Maybe<Scalars['Int']>;
	toHeight?: Maybe<Scalars['Int']>;
	returnValues?: Maybe<ReturnValues>;
	event?: Maybe<Scalars['String']>;
	raw?: Maybe<Raw>;
	accountBlockHeight?: Maybe<Scalars['String']>;
	accountBlockHash?: Maybe<Scalars['String']>;
	logAddress?: Maybe<Scalars['String']>;
};

export type TokenInfo = {
	__typename?: 'TokenInfo';
	name?: Maybe<Scalars['String']>;
	contractAddress?: Maybe<Scalars['String']>;
	totalSupply?: Maybe<Scalars['String']>;
	decimals?: Maybe<Scalars['Int']>;
	owner?: Maybe<Scalars['String']>;
	tokenId?: Maybe<Scalars['String']>;
	maxSupply?: Maybe<Scalars['String']>;
	index?: Maybe<Scalars['Int']>;
};

export type TokenInfoAccount = {
	__typename?: 'TokenInfoAccount';
	balance?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	symbol?: Maybe<Scalars['String']>;
	totalSupply?: Maybe<Scalars['String']>;
	decimals?: Maybe<Scalars['Int']>;
	owner?: Maybe<Scalars['String']>;
	tokenId?: Maybe<Scalars['String']>;
	maxSupply?: Maybe<Scalars['String']>;
	index?: Maybe<Scalars['Int']>;
};

export type Account = {
	__typename?: 'Account';
	address?: Maybe<Scalars['String']>;
	balances?: Maybe<Array<Maybe<TokenInfoAccount>>>;
};

export type Vote = {
	__typename?: 'Vote';
	accountId?: Maybe<Scalars['Int']>;
	motionId?: Maybe<Scalars['Int']>;
	voter?: Maybe<Scalars['String']>;
	vote?: Maybe<Scalars['Boolean']>;
};

export enum MotionType {
	Transfer = 'TRANSFER',
	AddMember = 'ADD_MEMBER',
	RemoveMember = 'REMOVE_MEMBER',
	ChangeThreshold = 'CHANGE_THRESHOLD',
}

export type Voter = {
	__typename?: 'Voter';
	address?: Maybe<Scalars['String']>;
	voted?: Maybe<Scalars['Boolean']>;
};

export type Motion = {
	__typename?: 'Motion';
	accountId?: Maybe<Scalars['Int']>;
	index?: Maybe<Scalars['Int']>;
	type?: Maybe<MotionType>;
	tokenId?: Maybe<Scalars['String']>;
	transferAmount?: Maybe<Scalars['Int']>;
	to?: Maybe<Scalars['String']>;
	destinationAccount?: Maybe<Scalars['Int']>;
	threshold?: Maybe<Scalars['Int']>;
	approved?: Maybe<Scalars['Boolean']>;
	proposer?: Maybe<Scalars['String']>;
	voteCount?: Maybe<Scalars['Int']>;
	votes?: Maybe<Array<Maybe<Voter>>>;
	active?: Maybe<Scalars['Boolean']>;
};

export type JointAccount = {
	__typename?: 'JointAccount';
	members?: Maybe<Array<Maybe<Account>>>;
	approvalThreshold?: Maybe<Scalars['Int']>;
	id?: Maybe<Scalars['Int']>;
	name?: Maybe<Scalars['String']>;
	isStatic?: Maybe<Scalars['Boolean']>;
	isMemberOnlyDeposit?: Maybe<Scalars['Boolean']>;
	motions?: Maybe<Array<Maybe<Motion>>>;
	balances?: Maybe<Array<Maybe<TokenInfoAccount>>>;
};

export type JointAccountQueryVariables = Exact<{
	accountId?: InputMaybe<Scalars['Int']>;
}>;

export type JointAccountQuery = {
	__typename?: 'Query';
	JointAccount?: {
		__typename?: 'JointAccount';
		approvalThreshold?: number | null;
		members?: Array<{ __typename?: 'Account'; address?: string | null } | null> | null;
		balances?: Array<{
			__typename?: 'TokenInfoAccount';
			balance?: string | null;
			tokenId?: string | null;
			symbol?: string | null;
			name?: string | null;
		} | null> | null;
		motions?: Array<{
			__typename?: 'Motion';
			voteCount?: number | null;
			threshold?: number | null;
			tokenId?: string | null;
			proposer?: string | null;
			type?: MotionType | null;
			accountId?: number | null;
			index?: number | null;
			approved?: boolean | null;
			votes?: Array<{
				__typename?: 'Voter';
				voted?: boolean | null;
				address?: string | null;
			} | null> | null;
		} | null> | null;
	} | null;
};

export const JointAccountDocument = gql`
	query JointAccount($accountId: Int) {
		JointAccount(accountId: $accountId) {
			members {
				address
			}
			balances {
				balance
				tokenId
				symbol
				name
			}
			approvalThreshold
			motions {
				voteCount
				threshold
				tokenId
				threshold
				proposer
				type
				accountId
				index
				approved
				votes {
					voted
					address
				}
			}
		}
	}
`;

/**
 * __useJointAccountQuery__
 *
 * To run a query within a React component, call `useJointAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useJointAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJointAccountQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useJointAccountQuery(
	baseOptions?: Apollo.QueryHookOptions<JointAccountQuery, JointAccountQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<JointAccountQuery, JointAccountQueryVariables>(
		JointAccountDocument,
		options
	);
}
export function useJointAccountLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<JointAccountQuery, JointAccountQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<JointAccountQuery, JointAccountQueryVariables>(
		JointAccountDocument,
		options
	);
}
export type JointAccountQueryHookResult = ReturnType<typeof useJointAccountQuery>;
export type JointAccountLazyQueryHookResult = ReturnType<typeof useJointAccountLazyQuery>;
export type JointAccountQueryResult = Apollo.QueryResult<
	JointAccountQuery,
	JointAccountQueryVariables
>;
