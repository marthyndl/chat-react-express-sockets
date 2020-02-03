import React from 'react';
import { withRouter } from "react-router-dom";
import io from 'socket.io-client';
import Moment from 'moment';
import './index.css';

class Laura extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      writeMessage: '',
      messages: []
    }
  }

  componentDidMount () {
    this.socket = io('/')
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages]})
    })
  }

  handleSubmit = (event, bool) => {
    const body = event.target.value
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
      const message = {
        body,
        from: (bool === true) ? 'Laura' : 'Rob'
      }
      this.setState({ messages: [message, ...this.state.messages]})
      this.socket.emit('message', body)
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
          <b  className={(message.from === 'Laura') ? 'italic' : 'oblique' }>{message.from}: {message.body}
          <br />
          <span className="time">{Moment(Date()).format('MMMM Do YYYY, h:mm')}</span>
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
                  type="text"
                  placeholder='Enter a message'
                  onKeyUp={(event) => this.handleSubmit(event, true)}/>
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

export default withRouter(Laura);