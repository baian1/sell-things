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
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    position: "sticky",
    top: "0px",
    maxWidth: 360,
    backgroundColor: "#1d0c4c",
  },
  item: {
    borderBottom: "3px solid white",
  },
  icon: {
    color: "white",
  },
  text: {
    color: "white",
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
    children: [
      {
        title: "Starred",
        icon: <StarBorder />,
        open: OpenStatus.CLOSE,
        children: [
          {
            title: "Starred11",
            icon: <StarBorder />,
            open: OpenStatus.EMPTY,
          },
        ],
      },
    ],
  },
];

const Menu: React.FC<{}> = () => {
  const classes = useStyles();
  const [menuData, setmenuData] = useState(menuinitData);

  /**
   * 控制菜单的展开与关闭
   */
  const changeOpen = useCallback((nodeTrace: number[]) => {
    setmenuData((oldMenuData) => {
      const newMenuData = [...oldMenuData];
      const firstIndex = nodeTrace[0];
      nodeTrace.shift();
      let current: MenuData = newMenuData[firstIndex];
      for (let index of nodeTrace) {
        if (!current.children) {
          break;
        }
        current = current.children[index];
      }
      if (current.open === OpenStatus.OPEN) {
        current.open = OpenStatus.CLOSE;
      } else if (current.open === OpenStatus.CLOSE) {
        current.open = OpenStatus.OPEN;
      }
      return newMenuData;
    });
  }, []);

  const renderList: (
    menuData: MenuData[],
    parentList?: number[]
  ) => JSX.Element[] = useCallback(
    (menuData: MenuData[], parentList: number[] = []) => {
      return menuData.map((item, index) => {
        let rightIcon = <></>;
        switch (item.open) {
          case OpenStatus.OPEN: {
            rightIcon = <ExpandLess className={classes.icon} />;
            break;
          }
          case OpenStatus.CLOSE: {
            rightIcon = <ExpandMore className={classes.icon} />;
            break;
          }
          default:
        }
        let children: JSX.Element[] | null = null;
        if (item.children) {
          children = renderList(item.children, [...parentList, index]);
        }

        let className = "";
        switch (parentList.length) {
          case 0: {
            className = "";
            break;
          }
          case 1: {
            className = classes.nested;
            break;
          }
          case 2: {
            //可以根据长度来控制缩进等样式
            className = classes.nested;
            break;
          }
          default:
        }
        return (
          <>
            <ListItem
              button
              className={`${className} ${classes.item}`}
              onClick={() => {
                const nodeTrace = [...parentList, index];
                changeOpen(nodeTrace);
              }}
            >
              <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} className={classes.text} />
              {rightIcon}
            </ListItem>
            {children && item.open === OpenStatus.OPEN ? (
              <Collapse
                in={item.open === OpenStatus.OPEN}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {children}
                </List>
              </Collapse>
            ) : null}
          </>
        );
      });
    },
    [changeOpen, classes.icon, classes.item, classes.nested, classes.text]
  );

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
        className={classes.root}
      >
        {renderList(menuData)}
      </List>
    </div>
  );
};

export { Menu };
