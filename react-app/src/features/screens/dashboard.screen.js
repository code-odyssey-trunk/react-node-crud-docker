import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import UserIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { TopBar } from "../components/topbar.component";
import { styles } from "../components/styles.component";

import {
  loadUsers,
  updateUser,
  deleteUser,
} from "../../services/user.services";

export default class DashboardScreen extends Component {
  state = {
    users: [],
    isEdit: false,
    name: null,
    userId: null,
    validationError: false,
  };

  componentDidMount() {
    this.intialLoad();
  }

  render() {
    const { userData } = this.props;

    return (
      <>
        <TopBar name={userData.name} logout={this.logout} />
        <CssBaseline />

        <Container maxWidth="md">
          <div style={styles.userContainer}>
            <Typography style={styles.title} variant="h6">
              Users
            </Typography>
            <List style={styles.listBg}>
              {this.state.users.map((user) => (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <UserIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() =>
                        this.setState({
                          isEdit: true,
                          name: user.name,
                          userId: user.id,
                        })
                      }
                      edge="end"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => this.deleteUser(user.id)}
                      edge="end"
                      aria-label="delete"
                      style={styles.deleteIcon}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Container>
        <Dialog
          fullWidth={true}
          open={this.state.isEdit}
          onClose={() => this.setState({ isEdit: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={this.state.name}
              error={this.state.validationError}
              helperText="Enter minimum of 2 characters"
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ isEdit: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => this.updateUser()} color="primary">
              SAVE
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  async intialLoad() {
    //Fetching all users
    const res = await loadUsers();
    this.setState({
      users: res.data,
    });
  }

  updateUser = async () => {
    const { name, userId } = this.state;
    if (name.length < 2) {
      this.setState({ validationError: true });
      return;
    }
    //Requesting to update
    await updateUser(name, userId);
    //Update data on update
    this.intialLoad();
    this.setState({ isEdit: false });
  };

  deleteUser = async (userId) => {
    //Checking with logged in user
    if (userId === this.props.userData.id) {
      alert("Cannot delete logged in User");
      return;
    }
    //Requesting to delete
    await deleteUser(userId);
    //Updating data on delete
    this.intialLoad();
  };

  logout = () => {
    const { changeAppScreen } = this.props;
    //Navigation
    changeAppScreen("login", []);
  };
}
