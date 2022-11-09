import React, { Component } from "react";

import DashboardScreen from "./features/screens/dashboard.screen";
import LoginScreen from "./features/screens/login.screen";
import SignupScreen from "./features/screens/signup.screen";

class App extends Component {
  state = {
    user: [],
    appScreen: "login",
  };

  //Switch between screens
  changeAppScreen = (screen, data) => {
    this.setState({
      user: data,
      appScreen: screen,
    });
  };

  render() {
    const { appScreen, user } = this.state;
    return (
      <div>
        {appScreen === "login" && (
          <LoginScreen changeAppScreen={this.changeAppScreen} />
        )}
        {appScreen === "signup" && (
          <SignupScreen changeAppScreen={this.changeAppScreen} />
        )}
        {appScreen === "dashboard" && (
          <DashboardScreen
            changeAppScreen={this.changeAppScreen}
            userData={user}
          />
        )}
      </div>
    );
  }
}

export default App;
