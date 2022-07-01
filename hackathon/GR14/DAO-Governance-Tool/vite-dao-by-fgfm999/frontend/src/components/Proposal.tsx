import { Proposal as ProposalType } from 'utils/types'
import { Box, Chip } from '@mui/material'
import { useLinkClickHandler } from "react-router-dom"
import { shortenAddress } from "utils/strings";

type Props = {
  proposal: ProposalType
  address: string
}

const Proposal = ({proposal, address}: Props) => {
  const label = parseInt(proposal.executed) ? 'Executed' : parseInt(proposal.canceled) ? 'Canceled' : 'Active'

  let labelDOM

  if (label) {
    labelDOM = <Chip label={label} className={`state ${label.toLocaleLowerCase()}`} color="primary" />
  }

  return (
    <Box className='proposal' onClick={useLinkClickHandler(`/spaces/${address}/proposals/${proposal.id}`)}>
      <div className='proposer'>by {shortenAddress(proposal.proposer)}</div>
      <div className='title'>{proposal.title}</div>
      <div className='desc'>{proposal.description}</div>

      {labelDOM}
    </Box>
  )
}

export default Proposal
