import React, { Component, useEffect, useState} from 'react';
import { withRouter } from "react-router-dom";
import io from 'socket.io-client';
import Moment from 'moment';
import './index.scss';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      writeMessage: '',
      messages: []
    }
  }

  componentDidMount () {
    this.socket = io('http://localhost:3000', {transports: ['websocket'], upgrade: false});
    this.socket.on('message', message => {
      console.log('message post server ****', message)
      this.setState({ messages: [message, ...this.state.messages]})
    })
  }

  handleSubmit = (event, bool) => {
    const body = event.target.value;
    if (body !== null || body !== undefined || body !== '') {
      if (bool === true) {
        this.setState({ writeMessage: 'Laura is writing ...' })
      } else {
        this.setState({ writeMessage: 'Rob is writing ...' })
      }
    }
    if (body === null || body === undefined || body === '') {
      this.setState({ writeMessage: '' })
    }
    
    if (event.keyCode === 13 && body) {
      var time = Moment(Date()).format('MMMM Do YYYY, h:mm:ss a');
      const message = {
        body,
        from: (bool === true) ? 'Laura' : 'Rob',
        time
      }
      this.setState({ messages: [message, ...this.state.messages]}, () => {
        this.socket.emit('message', message)
        console.log('message pre server ****', this.state.messages)
      })
      
      
      event.target.value = ''
      if (event.target.value === null || event.target.value === undefined || event.target.value === '') {
        this.setState({ writeMessage: '' })
      }
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return (
        <li key={index}>
          <b  className={(message.from === 'Laura') ? 'italic' : (message.from === 'Rob') ? 'oblique' : '' }>{message.from}: {message.body}
          <br />
          <span className="time">Sended by {message.from} at {message.time}</span>
          </b>
        </li>
        );
    });
    return(
      <div style = {{height:"100vh"}}>
        <div className="contenedor">
          <div className="title">
            <h1>Chat Messages</h1>
          </div>
          <div className="boxes">
            <div className="lauraBox">
              
              <h1>Laura Chat Box</h1>
              <input
              className='input'
                  type="text"
                  placeholder='Enter a message'
                  onKeyUp={(event) => this.handleSubmit(event, true)}/>
            </div>
            <div className="robBox">
            
              <h1>Rob Chat Box</h1>
              <input
                  type="text"
                  placeholder='Enter a message'
                  onKeyUp={(event) => this.handleSubmit(event, false)}/>
            </div>
          </div>
        </div>
        
        <div className="messages">
          <div className="title">
            <h1>Messages</h1>
          </div>
          
          <span>{this.state.writeMessage}</span>
          <p>{messages}</p>
        </div>
      </div>
    )
  }
}

export default withRouter(Home);