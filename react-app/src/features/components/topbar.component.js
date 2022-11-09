import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const TopBar = ({ name, logout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Welcome {name}</Typography>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "center" }}>
          Dashboard
        </Typography>
        <Button onClick={() => logout()} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
