import React, { useState } from "react";
import content from "../../Assets/Content";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Notifications } from "./Notifications";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import Modal from 'react-modal';

interface Props {
  displayNav: boolean;
  setDisplayNav: any;
  isLogin: boolean;
  setIsLogin: any;
  highlight:string,
  setHighlight:any,
  plan:string,
  handleChangePlan:any
}


const Navbar = ({ displayNav , setDisplayNav, isLogin , setIsLogin , highlight , setHighlight,plan,handleChangePlan }: Props) => {

  const [quickSupport,setQuickSupport] = React.useState<boolean>(false);

  const family_Name:string = "Mom";
  const family_Email:string = "ritagomes@gmail.com";
  const friend_Name:string = "Maddy";
  const friend_Email:string = "maddydani@gmail.com";
  const coworker_Name:string = "Daniel Jhon";
  const coworker_Email:string = "danieljohn@gmail.com"

  const Navigate = useNavigate();
  const [clicked,setClicked] = useState<boolean>(false)
  const [displayNotifications,setDisplayNotifications] = useState<boolean>(false)
  
  const handleSignIn = () => {
    setDisplayNav(false);
    setIsLogin(false);
    Navigate("/login");
  };

  const handleSignOut = () => {
    setDisplayNav(true);
    setIsLogin(false);
    Navigate("/");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return isLogin ? (
    <>
      <Modal isOpen={quickSupport} style={content.customStylesOne} onRequestClose={()=> setQuickSupport(false)} ariaHideApp={false}>
        <div className="quickSupportContent">
          <div className="quickSupportHeader primaryalign"><div>Support alert send to your family, friend and co-worker</div></div>
          <div className="quickSupportDetails">{family_Name} ({family_Email}) | {friend_Name} ({family_Email}) | {coworker_Name} ({coworker_Email})</div>
        </div>
      </Modal>
   
      <nav className="navbar navbar-default ">
        <div className="navbar-header" >
          {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
          <a className="navbar-brand" onClick={() => Navigate("/dashboard")}>
            <img className="navbar-logo" src={content.images.logo} alt="Logo" />
          </a>
        </div>
        {
          <ul className="nav navbar-nav navbar-right">

            <li onClick={() => Navigate("/moodcompass")}>
             {highlight==='/moodcompass'?(
              <div className="highlight">
                <div className="text">
                 Mood Compass
                </div>
                <hr/>
              </div>
              ):(
              <>Mood Compass</>
              )}
            </li>

            <li onClick={() => Navigate("/healyourself")}>
             {highlight==='/healyourself'?(
              <div className="highlight">
                <div className="text">
                 Heal Yourself
                </div>
                <hr/>
              </div>
              ):(
              <>Heal Yourself</>
              )}
            </li>
         
            {/* <li className={plan=="Free"?"displaynone":"pixelFriendNavbar"} > */}
            <li className="pixelFriendNavbar">
              
              <span style={{color:"white"}}><Link style={{color:"white"}} to="/chatbot">Pixelfriend</Link></span>
            </li>

            <li className="quickSupportText" onClick={()=>{setQuickSupport(!quickSupport)}}>
             {highlight==='/settings'?(
              <div className="highlight">
                <div className="text">
                 <span> Quick Support</span>
                </div>
                <hr/>
              </div>
              ):(
              <>Quick Support</>
              )}
            </li>

            <li 
             onClick={
              () =>
              // eslint-disable-next-line no-sequences
              (setDisplayNotifications(!displayNotifications),
               setClicked(!clicked))
             }>
             <img 
             src = {
                clicked===false?(
                 content.images.notifications):(
                 content.images.notifications2)
              } 
             alt=''/>
            </li>

             {displayNotifications===true?
             <Notifications/>:('')}

            {/* <li>
              <a href="https://solutions.imbesideyou.com/">
               About
              </a>
            </li> */}

             <li onClick={() => Navigate("/help")}>
             {highlight==='/help'?(
              <div className="highlight">
                <div className="text">
                 Help
                </div>
                <hr/>
              </div>
              ):(
              <>Help</>
              )}
            </li> 

            <li onClick={() => Navigate("/settings")}>
             {highlight==='/settings'?(
              <div className="highlight">
                <div className="text">
                 Settings
                </div>
                <hr/>
              </div>
              ):(
              <>Settings</>
              )}
            </li>

            <li>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
              {/*<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>*/}
              <img src={content.images.account} style={{ width: 32, height: 32 }} alt='' />
              </IconButton>
            </Tooltip>
          <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              },
              '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>{Navigate("/")}}>
          <ListItemIcon>
            <InfoIcon fontSize="large" />
          </ListItemIcon>
          <span style={{fontSize:"13px"}}>About</span>
        </MenuItem>

        <MenuItem onClick={()=>{Navigate("/help")}}>
          <ListItemIcon>
            <HelpIcon fontSize="large" />
          </ListItemIcon>
          <span style={{fontSize:"13px"}}>Help</span>
        </MenuItem>   
        <MenuItem onClick={()=>{Navigate("/settings")}}>
          <ListItemIcon>
            <Settings fontSize="large" />
          </ListItemIcon>
          <span style={{fontSize:"13px"}}>Settings</span>
        </MenuItem>
        <MenuItem onClick={()=>{Navigate("/")}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <span style={{fontSize:"13px"}} onClick={() => handleSignOut()}>Logout</span>
        </MenuItem>
      </Menu>
            </li>



          </ul>
        }
      </nav>
    </>
  ) : (
    <>
      <nav className="navbar navbar-default ">
        <div className="navbar-header" >
          {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
          <a className="navbar-brand" onClick={() => Navigate("/dashboard")}>
            <img
              className="navbar-logo"
              src={content.images.logo2}
              alt="Logo"
            />
          </a>
        </div>
        {
          <ul className="nav navbar-nav navbar-right">

            <li>
              <a href="https://solutions.imbesideyou.com/">About</a>
            </li>

            <li onClick={() => Navigate("/help")}>
             {highlight==='/help'?(
              <div className="highlight">
                <div className="text">
                 Help
                </div>
                <hr/>
              </div>
              ):(
              <>Help</>
              )}
            </li>

            <li onClick={() => handleSignIn()}>Login/SignUp</li>

          </ul>
        }
      </nav>
    </>
  );
};

export default Navbar;



