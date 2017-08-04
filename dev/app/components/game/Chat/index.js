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
      const messages = this.state.messages;
      const updatedMessages = [...messages, {key:messages.length, isClient:false, content:data}];
      this.setState({messages:updatedMessages,
                    messageInputValue:"",
                    messageInputIsFocused:false});
    });
    this.state = {messages:[], messageInputValue:""};
	}

  sendMessage(){
    socket.emit(IO_ACTIONS.CHAT_MESSAGE, this.state.messageInputValue);
    const messages = this.state.messages;
    const updatedMessages = [...messages, {key: messages.length, isClient:true, content:this.state.messageInputValue}];
    this.setState({messages:updatedMessages,messageInputValue:""});
  }

  handleInputChange(e, {value}){
    if (this.state.messageInputIsFocused){
      this.setState({messageInputValue:value});
    }
  }

  setMessageInputFocus(isFocus){
    return () => this.setState({messageInputIsFocused:isFocus});
  }

  handleOnKeyDown(e){

    const {messageInputValue, messageInputIsFocused} = this.state;

    if (!messageInputIsFocused){
      if (e.keyCode == 8){
        this.setState({messageInputValue:messageInputValue.substring(0, messageInputValue.length-1)});
      }else if (e.keyCode == 13 && messageInputValue != ""){
        ::this.sendMessage();
      }
    }
  }

  handleOnKeyPress(e){

    const {messageInputValue, messageInputIsFocused} = this.state;

    if (!messageInputIsFocused){
      e.preventDefault();
      if (e.keyCode != 13){
        // handle input change
        this.setState({messageInputValue:messageInputValue+e.key});
      }
    }
  }

  componentDidMount(){
      document.addEventListener("keypress", ::this.handleOnKeyPress);
      document.addEventListener("keydown", ::this.handleOnKeyDown);
  }


  render(){
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
                   onFocus={::this.setMessageInputFocus(true)}
                   onBlur={::this.setMessageInputFocus(false)}
                   value={this.state.messageInputValue}
                   onChange={::this.handleInputChange}
                   action={<Button onClick={::this.sendMessage}
                                   disabled={this.state.messageInputValue == ""}
                                   icon="send"
                           />}
            />
            </Segment.Group>
  }

  componentDidUpdate(){
    this.eee.scrollTop = this.eee.scrollHeight;
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", ::this.handleOnKeyDown);
    document.removeEventListener("keypress", ::this.handleOnKeyPress);
  }
}

export default Chat
