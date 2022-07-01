import { Space as SpaceType } from 'utils/types'
import {Box, Avatar, ListItem, List, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import { deepOrange, deepPurple, green, teal, blue } from '@mui/material/colors';
import {MouseEventHandler} from "react";

type Props = {
  space: SpaceType|null,
  joinHandler: MouseEventHandler,
  leaveHandler: MouseEventHandler
}

const Space = ({space, joinHandler, leaveHandler}: Props) => {
  const color = [deepOrange, deepPurple, green, teal, blue][Math.floor(Math.random() * 5)]

  if (!space) {
    return <></>
  }

  return space ? (
    <Box className='space'>
      <div className='meta'>
        <Avatar sx={{ width: 56, height: 56, bgcolor: color[500] }}>{space.name[0]}</Avatar>
        <p>{space.name}</p>
        <p>{space.memberCount} members</p>

        {
          space.isMember ? <Button variant="outlined" onClick={joinHandler}>Join</Button>
            : <Button variant="outlined" onClick={leaveHandler}>Leave</Button>
        }
      </div>

      <List className='links'>
        <ListItem alignItems="flex-start">
          <Link to={`/spaces/${space.address}/proposals`} className="active">Proposals</Link>
        </ListItem>
        <ListItem alignItems="flex-start">
          <Link to={`/spaces/${space.address}/proposals/new`} className="">New Proposal</Link>
        </ListItem>
      </List>
    </Box>
  ) : null
}

export default Space
