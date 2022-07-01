import {accountBlock, constant} from '@vite/vitejs';
import {useMemo, useState} from 'react'
import {State} from 'utils/types';
import {connect} from 'utils/globalContext';
import {TextField, Paper, Box, Button, FormControl} from '@mui/material'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Link} from "react-router-dom";
import spaceBinary from 'assets/space-binary'
import SpaceFactoryContract from 'contracts/space_factory'

type Props = State & {};

const SpaceNew = ({vcInstance, callContract}: Props) => {
  const connectedAccount = useMemo(() => vcInstance?.accounts[0], [vcInstance]);
  const [name, nameSet] = useState('')
  const tokenId = constant.Vite_TokenId
  const [quorumVotes, quorumVotesSet] = useState('')
  const [votingPeriod, votingPeriodSet] = useState(7)

  const abi = {
    "inputs":
      [
        {"internalType": "string", "name": "name_", "type": "string"},
        {"internalType": "tokenId", "name": "tokenId_", "type": "tokenId"},
        {"internalType": "uint256", "name": "quorumVotes_", "type": "uint256"},
        {"internalType": "uint256", "name": "votingPeriod_", "type": "uint256"},
      ],
    "stateMutability": "nonpayable", "type": "constructor"
  }

  const code = spaceBinary.toString()

  const submitSpace = () => {
    const params = [name, tokenId, quorumVotes, votingPeriod * 60 * 60 * 24]

    if (vcInstance) {
      const block = accountBlock.createAccountBlock("createContract", {
        address: vcInstance.accounts[0],
        abi,
        code,
        responseLatency: 1,
        randomDegree: 1,
        params,
      })

      console.log(block)

      vcInstance.signAndSendTx([{block}]).then((res: any) => {
        callContract(
          SpaceFactoryContract,
          'newSpace',
          [res],
          tokenId
        ).then((res) => {
          console.log('new space', res)
        })
      }).catch((e: Error) => console.log(e))
    }
  }

  const inputChange = (callback: Function) => {
    return (newValue: any) => {
      callback(newValue.target.value)
    }
  }

  const nameChange = inputChange(nameSet)
  // const tokenIdChange = inputChange(tokenIdSet)
  const quorumVotesChange = inputChange(quorumVotesSet)
  const votingPeriodChange = inputChange(votingPeriodSet)

  return (
    <Box>
      <Link className='link-back' to={'/'}>
        <ArrowBackIcon/>
        <span>Back</span>
      </Link>

      <Paper className='proposal-new'>
        <h2>New Space</h2>

        <TextField id='name' value={name} onChange={nameChange} label="Name" variant="outlined" fullWidth/>
        <TextField id='token' value={tokenId} disabled inputProps={{readOnly: true}} label="Token" variant="outlined"
                   fullWidth/>
        <TextField id='quorum-votes' value={quorumVotes} onChange={quorumVotesChange} label="Quorum Votes"
                   variant="outlined" fullWidth/>

        <FormControl className='input-voting-period' variant="outlined" sx={{width: '200px'}}>
          <TextField id='voting-period' label="Voting Period" value={votingPeriod} onChange={votingPeriodChange}
                     variant="outlined"/>
          <span>days</span>
        </FormControl>

        <div>
          <Button onClick={submitSpace} variant='contained'>Submit Space</Button>
        </div>
      </Paper>
    </Box>
  )
}

export default connect(SpaceNew)
