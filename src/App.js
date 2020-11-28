import React from "react";
import "./App.css";
import { BrowserRouter , Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import PostDetail from "./components/postDetail";
import AuthorDetail from "./components/authorDetail";

export default function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/post-detail/:id/:comments" component={PostDetail} />
          <Route path="/post-detail/:id" component={PostDetail} />
          <Route path="/author-detail/:id" component={AuthorDetail} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}