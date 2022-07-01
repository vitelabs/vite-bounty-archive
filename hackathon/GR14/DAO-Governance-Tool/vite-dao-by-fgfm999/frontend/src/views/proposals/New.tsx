import { useState } from 'react'
import { State } from 'utils/types';
import { connect } from 'utils/globalContext';
import { TextField, Paper, Box, Button} from '@mui/material'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Link, useParams} from "react-router-dom";
import DaoContract from 'contracts/space'

type Props = State & {};

const ProposalNew = ({vcInstance, callContract, setState}: Props) => {
  const { id } = useParams()
  const [title, titleSet] = useState('')
  const [description, descriptionSet] = useState('')

  const submitProposal = () => {
    callContract(
      DaoContract,
      'propose',
      [[], [], [], title, description]
    ).then(() => {
      console.log('propose success')
      setState({ toast: '123' })
    }).catch(() => {
      console.log('propose fail')
      setState({toast: '456'})
    })
  }

  const inputChange = (methodName: Function) => {
    return (newValue: any) => {
      methodName(newValue.target.value)
    }
  }

  const titleChange = inputChange(titleSet)
  const descriptionChange = inputChange(descriptionSet)

  return (
    <Box>
      <Link className='link-back' to={`/spaces/${id}/proposals`}>
        <ArrowBackIcon />
        <span>Back</span>
      </Link>

      <Paper className='proposal-new'>
        <h2>New Proposal</h2>

        <TextField id='title' value={title} onChange={titleChange} label="Title" variant="outlined" fullWidth />
        <TextField id='description' value={description} onChange={descriptionChange} label="Description" variant="outlined" multiline fullWidth rows={10} />

        <Button onClick={submitProposal} variant='contained'>Submit Proposal</Button>
      </Paper>
    </Box>
  )
}

export default connect(ProposalNew)
