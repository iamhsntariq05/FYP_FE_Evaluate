import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { Theme, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { io } from "socket.io-client";
import { logout } from "src/features/auth/authSlice";
import { themeTypeAction, toggleMobileDrawerAction } from "src/features/settings/settingsSlice";
import { DRAWER_WIDTH } from "./SideNav";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
      textDecoration: "none",
      color: "unset",
    },
    item: {
      padding: "0.3rem",
      border: "2px solid rgb(199 197 197)",
      fontSize: "15px",
      fontWeight: 400,
      borderRadius: "5px",
      marginBottom: "8px",
    },
  })
);

export function Header() {
  // const dispatch = useAppDispatch();
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const history = useHistory();

  // socketIO for notifications
  const socket = io("http://localhost:8080");
  socket.on("connect", () => {
    console.log("Socket Connected!");
  });
  // const isDarkTheme = useTheme().palette.mode === "dark";
  // const toggleTheme = () => {
  //   dispatch(themeTypeAction(isDarkTheme ? "light" : "dark"));
  // };
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    history.push("/login");
  };
  // display notifications
  const [notifications, setNotifications] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickNotifications = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleDrawer("right", true);
  };
  const handleClose = () => {
    // setAnchorEl(null);
  };
  // example how to send a notification
  // const handleNotifications = async () => {
  // const room = "61b060dfc7b65cfb9161f5ac";
  // socket.emit("sendNotification", { noti: "Hello World", room: room });
  // };
  // sets user notification
  socket.on("getNotification", (noti: any) => {
    const user = localStorage.getItem("id");
    if (!user) return;
    const filterNoti =
      noti &&
      noti?.length > 0 &&
      noti.filter((not: any) => {
        if (not.room === user) {
          return not;
        }
      });
    console.log("noti=>", filterNoti);
    if (filterNoti.length > 0) {
      setNotifications(filterNoti);
    }
  });
  // drawer
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (anchor: any, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };
  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => dispatch(toggleMobileDrawerAction())}
              className={classes.menuButton}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title} component={Link} to="/">
              FYP PORTAL
            </Typography>
            <IconButton
              // aria-label="Notification"
              color="inherit"
              size="large"
              // onClick={handleO}
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={() => setState(true)}
            >
              <Badge badgeContent={notifications?.length} color="secondary">
                <NotificationsIcon />
              </Badge>
              {/* <NotificationsIcon /> */}
            </IconButton>
            <IconButton aria-label="Logout" color="inherit" size="large" onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer("right", false)}>
        <Box
          sx={{ width: 310 }}
          role="presentation"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
          <List style={{ padding: "16px", overflow: "auto" }}>
            {notifications?.length > 0 ? (
              notifications.map((nt: any) => (
                <ListItem className={classes.item} key={nt} disablePadding>
                  <div style={{ padding: "0.2rem", overflow: "none" }}>{nt.noti}</div>
                </ListItem>
              ))
            ) : (
              <ListItem className={classes.item}>No New Notifications</ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
