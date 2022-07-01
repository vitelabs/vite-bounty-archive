import {Space as SpaceType} from 'utils/types'
import {Box, Avatar, Button} from '@mui/material'
import {useLinkClickHandler} from 'react-router-dom'
import {deepOrange, deepPurple, green, teal, blue} from '@mui/material/colors';

type Props = {
  space: SpaceType
}

const SpaceCard = ({space}: Props) => {
  const bgColor = [deepOrange, deepPurple, green, teal, blue][Math.floor(Math.random() * 5)]

  return (
    <Box className='space-card' onClick={useLinkClickHandler(`/spaces/${space.address}/proposals`)}>
      <div className='content'>
        <Avatar sx={{width: 56, height: 56, bgcolor: bgColor[500]}}>{space.name[0]}</Avatar>
        <div className='name'>{space.name}</div>
        <div className='members'>{space.memberCount} members</div>
      </div>
    </Box>
  )
}

export default SpaceCard
