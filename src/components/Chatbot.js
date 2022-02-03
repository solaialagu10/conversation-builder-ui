import React, { useState } from 'react';
import './Chatbot.css';
import _ from 'lodash';
const ChatbotComponent = () => {
	const [showChatbot,setShowChatbot] = useState(false);
	const defaultMessage = [{
			msgId:1,
			type:"resp",
			value:{
				resposneType:'Text',
				resposneText:'How may I help you?',
				userInput:''
			},
			noImageFlag:true
		}]
	const [chathistory,setChathistory] = React.useState(defaultMessage);
	const [inputMsg,setInputMsg] = React.useState('');

	const hanldeSendInput = (event)=>{
		let chats = _.cloneDeep(chathistory);
		if(inputMsg.length >0){
		let msg = {msgId:chathistory.length+1,
			type:"input",
			value:inputMsg};
			chats.push(msg);
			setInputMsg('');
			setChathistory(chats);	
		}						
	}

	const onChangeInputMsg= (event) =>{
		if(!_.isNil(event.target.value)){
			setInputMsg(event.target.value)
		}

	}

	const hanldeEnterKeyPress = (event)=>{
		if(event.keyCode  == 13 && inputMsg.length >0){
			hanldeSendInput();
		}
	}
	
	return (
		<div>
			<div className='chatbot-container' style={showChatbot ? {display:"block"} : {display:"none"}} >
				<div className='chatbot-window'>
					<div className='chatbot-header'>
						<div className='header-text'> ASK EVA </div>
						<div className='close-chatbot' onClick={()=> setShowChatbot(false)}> 
							<span className='close-btn'>
							</span>
						</div>
					</div>	
					<div className='chatbot-window-body'>
						<div className='message-box'>
						  {!_.isEmpty(chathistory) ? chathistory.map((item,index) =>{
							  return item.type === 'input' ? (
								  	<div key={index + Math.random + 1.1}
									  className='input-msg-container' id={"CHATBOT_"+String(index + 1)}> 
									  	<div className='input-msg'> 
											<div className='text'>{item.value}</div>											
										</div> 
										<img className='input-img' src={require('../assets/icons/user-icon.png')}></img>
									  </div>
							  ) : 
							  (
								  <div key={index + Math.random + 1.1}
									  className='resp-msg-container' id={"CHATBOT_"+String(index + 1)}> 
									  	<img className='resp-img' src={require('../assets/icons/bot-icon.png')}></img>
									  	<div className='resp-msg'> 
										  	<div className='message-container'>
												<div className='text' dangerouslySetInnerHTML={{__html: item.value.resposneText}}></div>
											</div>
										</div> 
									  </div>
							  )
						  }) : ""
						  }						
						</div>
					</div>	
					<div className='chatbot-window-footer'>
						<div className='enter-box'>
							<input type='text' autoFocus={true} spellCheck={true} 
							maxLength={100}
							placeholder='Enter your query here...'
							onChange={(event)=>onChangeInputMsg(event)}
							onKeyDown={(event)=>hanldeEnterKeyPress(event)}
							value={!_.isEmpty(inputMsg) ? inputMsg: ""}></input>
							<button className='btn-cls primary-btn send-btn' onClick={()=>hanldeSendInput()}>Send</button>

						</div>
					</div>			
				</div>
			</div>		
			<div className="chatbot-icon" style={showChatbot ? {display:"none"} : {display:"block"}} onClick={()=> setShowChatbot(true)}>
						<img className="img" src={require("../assets/icons/chatbot.png")}/>
			</div>
		</div>
	);
};

export default ChatbotComponent;