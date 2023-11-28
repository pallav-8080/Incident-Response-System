import React, { FunctionComponent, useState } from 'react'
import { Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreVert as More } from '@material-ui/icons'
import { ArrowBack } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'

export interface IProps {
  title: string
  showBackButton?: boolean
  onBack?: () => void
  showMenu?: boolean
}

const NavigationBar: FunctionComponent<IProps> = ({
  title,
  showBackButton,
  onBack,
  showMenu,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement>();
const navigate = useNavigate();

  const openMenuHandler = (anchor: HTMLElement) => {
    setOpenMenu(true);
    setMenuAnchor(anchor);
  }

  const closeMenu = () => {
   setOpenMenu( false );
  }

  const quit = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')

    navigate('/login')
  }
  
  return (
  <Toolbar>
    {showBackButton && (
      <IconButton edge="start" color="inherit" onClick={onBack}>
        <ArrowBack />
      </IconButton>
    )}
    <Typography style={{ flex: 1 }} variant="h6" color="inherit">
      {title}
    </Typography>
    {showMenu && (
      <IconButton
        color="inherit"
        edge="end"
        onClick={e => openMenuHandler(e.currentTarget)}
      >
        <More />
      </IconButton>
    )}{
      <Menu open={openMenu} anchorEl={menuAnchor} onClose={closeMenu}>
          <MenuItem onClick={quit}>Quit</MenuItem>
        </Menu>
    }
  </Toolbar>
)};

export default NavigationBar


