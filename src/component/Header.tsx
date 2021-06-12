import React from "react";
import ricon from "../logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#10003D",
    justifyContent: "space-between",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#e9e3f9",
    // backgroundColor: "white",
  },
  iconButton: {
    padding: 10,
    color: "white",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

//注意看这行，导入图片后变为url输出了
console.log("img url:", ricon);
//这里的数据就是module，
console.log("img require", require("../logo.svg"));
//这条才等于上面的第一个
console.log("img require", require("../logo.svg").default);
export const Header: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <img src={ricon} alt={"react"} height={40} />
      <div
        style={{
          borderRadius: "3px",
          backgroundColor: "#34275B",
          height: 33,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <InputBase className={classes.input} placeholder={"search"}></InputBase>
      </div>
      <div>
        <Button
          style={{
            color: "white",
          }}
        >
          登入
        </Button>
        <Button
          style={{
            color: "white",
          }}
        >
          注册
        </Button>
      </div>
    </div>
  );
};
