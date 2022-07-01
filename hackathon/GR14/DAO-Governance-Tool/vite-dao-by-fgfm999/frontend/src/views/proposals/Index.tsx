import {Proposal as ProposalType, State} from 'utils/types';
import {connect} from 'utils/globalContext';
import Proposal from "components/Proposal"
import {Grid} from '@mui/material'
import Space from 'components/Space'
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import SpaceQuery from 'utils/spaceQuery'
import SpaceContract from 'contracts/space'
import {Space as SpaceType} from 'utils/types'
import {constant} from '@vite/vitejs';

type Props = State & {};

const ProposalIndex = ({setState, vcInstance, callContract, viteApi}: Props) => {
  const connectedAccount = useMemo(() => vcInstance?.accounts[0], [vcInstance]);
  const [proposals, proposalsSet] = useState<Array<ProposalType>>([])
  const [space, spaceSet] = useState<SpaceType|null>(null)
  const [page, pageSet] = useState(0)
  const {address} = useParams()
  const countPerPage = 2

  if (!address) return (<></>)

  const joinHandler = useCallback(() => {
    callContract(
      SpaceContract,
      'join',
      [],
      constant.Vite_TokenId,
    ).then((res) => {
      setState({toast: 'join success'})
    }).catch((e) => setState({toast: 'join fail'}))
  }, [viteApi])

  const leaveHandler = useCallback(() => {
    callContract(
      SpaceContract,
      'leave',
      [],
      constant.Vite_TokenId,
    ).then((res) => {
      setState({toast: 'leave success'})
    }).catch((e) => setState({toast: 'leave  fail'}))
  }, [viteApi])

  const getProposals = useCallback((query: SpaceQuery) => {
    query.getProposals([page, countPerPage]).then((res) => {
      proposalsSet(proposals.concat(res as Array<ProposalType>))

      // @ts-ignore
      if (res.length === countPerPage) {
        pageSet(page + 1)
      }
    })
  }, [page])

  useEffect(() => {
    if (viteApi) {
      const query = new SpaceQuery(viteApi, address, SpaceContract.abi)

      query.getDetail(connectedAccount).then((res) => spaceSet(res as SpaceType))
      getProposals(query)
    }
  }, [viteApi])

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Space space={space} joinHandler={joinHandler} leaveHandler={leaveHandler}/>
      </Grid>

      <Grid item xs={9}>
        <h2 className='proposals-title'>Proposals List</h2>

        {proposals.map((proposal: ProposalType, index: number) => {
          return <Proposal proposal={proposal} address={address} key={`proposal-${proposal.id}`}/>
        })}
      </Grid>
    </Grid>
  )
}

export default connect(ProposalIndex)
