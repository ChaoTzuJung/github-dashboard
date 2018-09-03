import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import { Layout, Menu, Icon } from 'antd';

import './App.css';
import 'antd/dist/antd.css';
import SideMenu from './components/SideMenu';
import SearchBox from './components/searchBox';
import Main from './components/Main';


const { Header, Content, Sider } = Layout;

class App extends Component {

  state = {
    user_data: null,
    repo_data: [],
    events_data: [],
    followers_data: [],
    following_data: [],
  }

  fetchData(username) {
    axios.get(`https://api.github.com/users/${username}`)
      .then(res => {
        this.setState({
          user_data: {
            name: res.data.name,
            bio: res.data.bio,
            avatar_url: res.data.avatar_url,
            followers: res.data.followers,
            following: res.data.following,
          }
        })
      })
      .catch(error => {
        console.log(error)
      })

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then(res => {
        this.setState({
          repo_data: res.data.map(repo => ({
            id: repo.id,
            name: repo.name,
            owner: repo.owner,
            description: repo.description,
            html_url: repo.html_url,
          }))
        })
      })
      .catch(error => {
        console.log(error)
      })

    axios.get(`https://api.github.com/users/${username}/events`)
      .then(res => {
        this.setState({
          events_data: res.data.map(event => ({
            type: event.type,
            repo: event.repo,
          }))
        })
      })
      .catch(error => {
        console.log(error)
      })

    axios.get(`https://api.github.com/users/${username}/followers`)
      .then(res => {
        this.setState({
          followers_data: res.data.map(follower => ({
            login: follower.login,
            html_url: follower.html_url,
            avatar_url: follower.avatar_url,
          }))
        })
      })
      .catch(error => {
        console.log(error)
      })

    axios.get(`https://api.github.com/users/${username}/following`)
      .then(res => {
        this.setState({
          following_data: res.data.map(following => ({
            login: following.login,
            html_url: following.html_url,
            avatar_url: following.avatar_url,
          }))
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  componentDidMount() {
    this.fetchData('chaotzujung')
  }
  
  render() {

    return (
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <SideMenu />
        </Sider>
        <Layout style={{ marginLeft: 200, height: '100vh' }}>
          <Header style={{ background: '#fff', padding: 0 }} >
            <SearchBox fetchData={this.fetchData.bind(this)}/>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff'}}>
              <Main 
                  user_data={this.state.user_data}
                  events_data={this.state.events_data}
                  followers_data={this.state.followers_data}
                  followering_data={this.state.followering_data}
                  repo_data={this.state.repo_data}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
