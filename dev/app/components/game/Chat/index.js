import React from 'react'
import { Input, Button, Label, Segment } from 'semantic-ui-react'
import style from './style.css';
import socket from '../../../socket';
import {IO_ACTIONS} from '../../../../common/constants';

const message = ({textAlign, color, pointing}) => ({key ,content}) => (
              <Segment key={key} textAlign={textAlign} style={{margin:'0',background:'inherit',padding:'0.25em',border:'0',boxShadow:'0 0 0 0'}}>
                <Label color={color} pointing={pointing}>{content}</Label>
              </Segment>);
const ClientMessage = message({textAlign:"right", pointing:"right", color:"olive"});
const OppenentMessage = message({textAlign:"left", pointing:"left", color:"yellow"})

class Chat extends React.Component {

  constructor(props) {
		super(props)
    this.eee;
    socket.on(IO_ACTIONS.CHAT_MESSAGE, data => {
      const updatedMessages = [...this.state.messages, {isClient:false, content:data}];
      this.setState({messages:updatedMessages,messageInputValue:""});
    });
    this.state = {messages:[], messageInputValue:""};
	}

  sendMessage(){
    socket.emit(IO_ACTIONS.CHAT_MESSAGE, this.state.messageInputValue);
    const updatedMessages = [...this.state.messages, {isClient:true, content:this.state.messageInputValue}];
    this.setState({messages:updatedMessages,messageInputValue:""});
  }

  handleInputChange(e, {value}){
    console.log("handleInputChange: " + value);
    this.setState({messageInputValue:value});
  }

  render(){
    //console.log(this.eee.scrollTop);
    const messages = this.state.messages.map((message, index) =>
        message.isClient?
          <ClientMessage key={index} content={message.content}/>
        :
          <OppenentMessage key={index} content={message.content}/>);

    return <Segment.Group color='white' style={{display: 'flex',flexDirection:'column',flexGrow: '1'}}>
            <div ref={e => {this.eee = e}} style={{flexGrow: '1', overflowY: 'scroll'}}>
              {messages}
            </div>

            <Input fluid
                    value={this.state.messageInputValue}
                   action={<Button onClick={::this.sendMessage}
                                   disabled={this.state.messageInputValue == ""}
                                   icon="send"
                           />}
                   onChange={::this.handleInputChange}/>
            </Segment.Group>
  }

  componentDidUpdate(){
    this.eee.scrollTop = this.eee.scrollHeight;
  }
}

export default Chat
