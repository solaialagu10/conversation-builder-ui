import React, { useState } from 'react'; 
import './Qamaker.css';
import Select from 'react-select';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const getMuiTheme = require("material-ui/styles/getMuiTheme").default
const muiTheme = getMuiTheme({
	palette:{
		accent1Color: "rgb(0,84,129)",
		secondary2color:"#000"
	}
})
const QamakerComponent = () => {
	const options = [
		{ value: 'Walmart', label: 'Walmart' },
		{ value: 'Walmart2', label: 'Walmart2' }
	  ]
	  const options1 = [
		{ value: 'Walmart', label: 'Walmart' }
	  ]
	  const options2 = [
		{ value: 'Walmart', label: 'Walmart' }
	  ]
      const qAObj = [{
		  id:"",
		  question:"",
		  variances:[
			  {
				  id:"-1",
				  variance:""
			  }
		  ],
		  branch_id:"",
		  Response:"",
		  division:"",
		  category:"",
		  categoryId:"",
		  subCategory:"",
		  subCategoryId:"",
		  questionErrorText:"",
		  resposneErrorText:"",
		  divisionErrorText:"",
		  categoryErrorText:""
	  }]
	  const [QnA,setQnA] = React.useState(qAObj);
	  const [division,setDivision] = React.useState('');
	  const [category,setCategory] = React.useState('');
	  const [subCategory,setSubCategory] = React.useState('');
      const [addQModal,setAddQModal] = React.useState(false);
	  const [submitSuggestionModal,setSubmitSuggestionModal] = React.useState(false);
	  const [publishSuggestionModal,setPublishSuggestionModal] = React.useState(false);
	  const [modalMessage,setModalMessage] = React.useState('');
	  const setDivisionValue = (value)=>{			
			setDivision(value.value);
	  }
	  const setCategoryValue = (value)=>{		
			setCategory(value.value);
 	 }
	  const setSubCategoryValue = (value)=>{
		  	setSubCategory(value.value);
 	 }
	  const addQuestion = () =>{	
		let qna = _.cloneDeep(QnA);	 
	   let questionObj = {
		id:"",
		question:"",
		variances:[
			{
				id:"-1",
				variance:""
			}
		],
		branch_id:"",
		Response:"",
		category:"",
		categoryId:"",
		subCategory:"",
		subCategoryId:""

	}
	  if(qna.length === 5){
		setAddQModal(true);
		setModalMessage('You cant add more than five suggestions');
	  }	  
	 else {qna.push(questionObj);}
	  setQnA(qna);
		}

	const removeQuestion = (qIndex) =>{	
	  let qna = _.cloneDeep(QnA);
	  let removeQnA = [...qna.slice(0,qIndex),...qna.slice(qIndex+1)]
	   setQnA(removeQnA);
  		}

	  const addAlternateQuestions = (qIndex) =>{	
		  let qna = _.cloneDeep(QnA);	 
		 let varianceObj = {
			id:"-1",
			variance:""
		}
		if(qIndex >= 0 && qna[qIndex].variances.length < 5){qna[qIndex].variances.push(varianceObj);}
		setQnA(qna);
	  	}

	  const removeAlternateQuestions = (qIndex,altIndex) =>{	
		let qna = _.cloneDeep(QnA);
	 	qna[qIndex].variances.splice(altIndex,1);
	 	setQnA(qna);
		}

	  const closeModal = () => {
		setAddQModal(false);
		setModalMessage('');
	  }

	  const validateForm = () =>{
		let dataset = _.cloneDeep(QnA);
		let questionFlag = false;
		let responseFlag = false;
		let divisionFlag =false;
		let categoryFlag = false;
		dataset.map((el,i)=>{
			if(el.question.length  === 0){
				questionFlag =true;
				return (el.questionErrorText =true)
			}
			else{
				return (el.questionErrorText =false)
			}
		})
		dataset.map((el,i)=>{
			if(el.Response.length  === 0){
				responseFlag =true;
				return (el.resposneErrorText =true)
			}
			else{
				return (el.resposneErrorText =false)
			}
		})		
		setQnA(dataset);
		if(responseFlag || questionFlag || division.length === 0 || category.length === 0 ) return false;
		else return true;
	  }

	  const onClickSubmitSuggestion = ()=>{
		let flag = validateForm();
		if(flag){
			setSubmitSuggestionModal(true);
			setModalMessage('Do you want to Submit your Suggestion?');
		}
		
	  }
	  const onClickPublishSuggestion = ()=>{
		let flag = validateForm;
		if(flag){
		setPublishSuggestionModal(true);
		setModalMessage('Do you want to Publish your Suggestion?');
		}
	  }
	  const cancelSubmitModal = () => {
		setSubmitSuggestionModal(false);
		setPublishSuggestionModal(false);
		setModalMessage('');
	  }

	  const saveQnA = () => {
		let qna = _.cloneDeep(QnA);
		setSubmitSuggestionModal(false);
		setModalMessage('');
	  }

	  const publishQnA = () => {
		let qna = _.cloneDeep(QnA);
		setPublishSuggestionModal(false);
		setModalMessage('');
	  }
	const handleInputChange = (e,qIndex,type,altIndex) =>{	
		let qna = _.cloneDeep(QnA);
		if(type === 'Question'){
			qna[qIndex].question = e.target.value;
			qna[qIndex].questionErrorText = false;
		 }
		 else if(type === 'AltQuestion'){
			qna[qIndex].variances[altIndex].variance = e.target.value;
		 }
		 else if(type === 'Response'){
			qna[qIndex].Response = e.target.value;
			qna[qIndex].resposneErrorText = false;
		 }
		 setQnA(qna);
	}
	  
	const [suggestiontype, setSuggestiontype] = React.useState('Question & Answer');
	return (
		<div className='suggestions-wrapper'>
				<div className='suggestions-header'>Create Suggestions</div>
				<div>
					<table className='suggestions-table'>
						<tbody>
							<tr>
								<td>
									<span className='type-label'>Suggestion Type:</span>
								</td>
								<td>
									<label className='type-container'>
										<input type="radio" value="QnA" checked={suggestiontype === 'Question & Answer'}  onChange  = {()=>setSuggestiontype('Question & Answer')}/>
										<span className={"checkbox-mark"}></span>
										<span className='checkbox-text'>Question & Answer</span>
									</label>
									<label className='type-container'>
									<input type="radio" value="Acronym" checked={suggestiontype === 'Acronym'}  onChange  = {()=>setSuggestiontype('Acronym')}/>
										<span className='checkbox-mark'></span>
										<span className='checkbox-text'>Acronym</span>
									</label>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='suggestions-body'>
						<div> 
							<div>
								<span className='suggestions-title'>{suggestiontype}</span>						 
								<div className='action-buttons'>
									<button className='btn-cls primary-btn' onClick={()=> onClickSubmitSuggestion()}>Submit</button>
									<button className='btn-cls primary-btn' onClick={()=> onClickPublishSuggestion()}>Publish</button>
									<button className='btn-cls primary-btn' onClick={()=> onClickPublishSuggestion()}>Upload</button>
								</div>
							</div>
							<div className='category-row'>
									<div className='category-column'>
										<div className='category-name'> 
											<span>Division<span className='asterisk'>*</span></span>
										</div>
										<div className='category-select'> 
											<Select 
											 options={options} value= {options.filter(function(option) {
												return option.value === division;
												})}
											onChange={(value) => setDivisionValue(value)}></Select>
										</div>
									</div>
									<div className='category-column'>
										<div className='category-name'> 
											<span>Category<span className='asterisk'>*</span></span>
										</div>
										<div className='category-select'> 
											<Select 
											 options={options} value= {options.filter(function(option) {
												return option.value === category;
												})}
											onChange={(value) => setCategoryValue(value)}></Select>
										</div>
									</div>
									<div className='category-column'>
										<div className='category-name'> 
											<span>Sub-Category<span className='asterisk'>*</span></span>
										</div>
										<div className='category-select'> 
											<Select options={options} value= {options.filter(function(option) {
												return option.value === subCategory;
												})}
											onChange={(value) => setSubCategoryValue(value)}></Select>
										</div>
									</div>
								</div>
						 </div>
						 {QnA.map((q, qIndex) => {
						 return (
						 <div className='card-wrapper' key={qIndex}>
							 <div className='card-content'>
                                
								<table className="questions-table">
									<tbody>
										<tr className="table-row">
                                          <td className="table-layout-label">
												<label> 
													<span>{suggestiontype === 'Question & Answer' ? 'Question' : 'Acronym'} {qIndex+1}</span>													
													<span className='asterisk'>*</span>
												</label>																			
										  </td> 
										  <td>
                                            <input type="text" spellCheck="true" 
													value={q.question}
													className={q.questionErrorText ? 'input-title-class-error' : 'input-title-class' }
													onChange={question=> handleInputChange(question,qIndex,'Question')}>
											</input>
										  </td>
										</tr>
										{q.variances.map((altQ,altIndex) => {
											return (
												<tr className="table-row" style= {suggestiontype === 'Acronym'? {display:'none'} : {}} key={altIndex}>
													<td className="table-layout-label">
															<label> 
																<span>Question Alternate {altIndex+1}</span>													
																<span className='asterisk'>*</span>
															</label>	
																					
													</td>
													<td>
													<input type="text" spellCheck="true" 
													value={q.variances[altIndex].variance}
													className='input-title-class' 
													onChange={altQ=> handleInputChange(altQ,qIndex,'AltQuestion',altIndex)}>														
													</input>
													</td>
													<td>
														{altIndex < 1 ? (
														<div className='icon-container' onClick={()=> addAlternateQuestions(qIndex)}>
															<div className='icon-wrapper'>														
																<img className="icon-cls" src={require('../assets/icons/add.png')}></img>
															</div>
														</div>)
														: (
														<div className='icon-container' onClick={()=> removeAlternateQuestions(qIndex,altIndex)}>
															<div className='icon-wrapper'>														
																<img className="icon-cls" src={require('../assets/icons/minus-sign.png')}></img>
															</div>
														</div>)
														}
													</td>
												</tr>
											)	
										})
										}										
										<tr className="table-row">
										<td className="table-layout-label">
												<label> 
													<span>Answer/Response</span>													
													<span className='asterisk'>*</span>
												</label>				
										  </td>
										  <td>
                                            <textarea rows="4" cols="60" placeholder="Type your answer/response here..."
											className={q.resposneErrorText ? 'input-title-class-error' : 'input-title-class' }
											spellCheck="true" 
											value={q.Response}
											onChange={response=> handleInputChange(response,qIndex,'Response')}></textarea>
										  </td>
										</tr>
									</tbody>
								</table>
								<div className='qna-container'>
									<span>Add Q&A</span>
									{QnA.length > 1 && qIndex !== 0 ? (
										<div key={Math.random()} style={{display:'inline-block'}}>
											<div className='icon-container' onClick={()=> addQuestion()}>
															<div className='icon-wrapper'>														
																<img className="icon-cls" src={require('../assets/icons/add.png')}></img>
															</div>
											</div>
											<div className='icon-container' onClick={()=> removeQuestion(qIndex)}>
															<div className='icon-wrapper'>														
																<img className="icon-cls" src={require('../assets/icons/minus-sign.png')}></img>
															</div>
											</div>
										</div>
									) : (
										<div key={Math.random()} style={{display:'inline-block'}}>
											<div className='icon-container' onClick={()=> addQuestion()}>
															<div className='icon-wrapper'>														
																<img className="icon-cls" src={require('../assets/icons/add.png')}></img>
															</div>
											</div>										
										</div>
									)
						 		}
								</div>
							 </div>
						 </div>
						 )
						 })
						}
						<MuiThemeProvider muiTheme={muiTheme}>
							<Dialog contentStyle={{maxWidth:"30%"}}
							modal={true}
							open={addQModal || submitSuggestionModal  || publishSuggestionModal}
							>
							<div className='modal-alert-msg'>{modalMessage}</div>
							<div className='modal-buttons'>
								<button className='btn-cls secondary-btn'								
								style={{display: submitSuggestionModal || publishSuggestionModal ? "inline-block":"none",minWidth:"80px"}}
								onClick={()=> cancelSubmitModal()}>No
								</button>
								<button className='btn-cls primary-btn'								
								style={{display:submitSuggestionModal || publishSuggestionModal? "inline-block":"none",minWidth:"80px"}}
								onClick={submitSuggestionModal ? ()=> saveQnA() : ()=> publishQnA()}>Yes
								</button>
								<button className='btn-cls primary-btn'								
								style={{display:addQModal ? "inline-block":"none",minWidth:"80px"}}
								onClick={()=> closeModal()}>Ok
								</button>
							</div>
							</Dialog>
						</MuiThemeProvider>
				</div>
		</div>
	);
};

export default QamakerComponent;