import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    flex: 1,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

enum OpenStatus {
  EMPTY,
  OPEN,
  CLOSE,
}

interface MenuData {
  title: string;
  onClick?: () => void;
  children?: MenuData[];
  icon: JSX.Element;
  open: OpenStatus;
}

//初始化的数据
const menuinitData: MenuData[] = [
  {
    title: "Sent mail",
    icon: <SendIcon />,
    open: OpenStatus.EMPTY,
  },
  {
    title: "Drafts",
    icon: <DraftsIcon />,
    open: OpenStatus.EMPTY,
  },
  {
    title: "Inbox",
    icon: <InboxIcon />,
    open: OpenStatus.OPEN,
  },
];
const Menu: React.FC<{}> = () => {
  const classes = useStyles();
  const [menuData, setmenuData] = useState(menuinitData);
  const [open, setOpen] = React.useState(true);

  //     <ListItem button onClick={handleClick}>
  //     <ListItemIcon>
  //       <InboxIcon />
  //     </ListItemIcon>
  //     <ListItemText primary="Inbox" />
  //     {open ? <ExpandLess /> : <ExpandMore />}
  //   </ListItem>

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            菜单
          </ListSubheader>
        }
        className={classes.root}
      >
        {menuData.map((item) => {
          let rightIcon = <></>;
          switch (item.open) {
            case OpenStatus.OPEN: {
              rightIcon = <ExpandLess />;
              break;
            }
            case OpenStatus.CLOSE: {
              rightIcon = <ExpandMore />;
              break;
            }
            default:
          }
          return (
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
              {rightIcon}
            </ListItem>
          );
        })}
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export { Menu };
