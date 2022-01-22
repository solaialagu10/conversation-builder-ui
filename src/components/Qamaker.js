import React, { useState } from 'react'; 
import './Qamaker.css';
import Select from 'react-select';
import _ from 'lodash';
const QamakerComponent = () => {
	const options = [
		{ value: 'Walmart', label: 'Walmart' }
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
		  category:"",
		  categoryId:"",
		  subCategory:"",
		  subCategoryId:""

	  }]
	  const [QnA,setQnA] = React.useState(qAObj);

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
	  if(qna.length < 5){qna.push(questionObj);}
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

	const handleInputChange = (e,qIndex,type,altIndex) =>{	
		let qna = _.cloneDeep(QnA);
		if(type === 'Question'){
			qna[qIndex].question = e.target.value;
		 }
		 else if(type === 'AltQuestion'){
			qna[qIndex].variances[altIndex].variance = e.target.value;
		 }
		 else if(type === 'Response'){
			qna[qIndex].Response = e.target.value;
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
                         <span className='suggestions-title'>{suggestiontype}</span>
							<div className='action-buttons'>
								<button className='btn-cls primary-btn'>Submit</button>
								<button className='btn-cls primary-btn'>Publish</button>
							</div>
						 </div>
						 {QnA.map((q, qIndex) => {
						 return (
						 <div className='card-wrapper' key={qIndex}>
							 <div className='card-content'>
                                <div className='category-row'>
									<div className='category-column'>
										<div className='category-name'> 
											<span>Division<span className='asterisk'>*</span></span>
										</div>
										<div className='category-select'> 
											<Select options={options}></Select>
										</div>
									</div>
									<div className='category-column'>
										<div className='category-name'> 
											<span>Category<span className='asterisk'>*</span></span>
										</div>
										<div className='category-select'> 
											<Select options={options}></Select>
										</div>
									</div>
									<div className='category-column'>
										<div className='category-name'> 
											<span>Sub-Category<span className='asterisk'>*</span></span>
										</div>
										<div className='category-select'> 
											<Select options={options}></Select>
										</div>
									</div>
								</div>
								<table>
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
													className='input-title-class' 
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
											className='input-title-class'
											spellCheck="true" 
											value={q.Response}
											className='input-title-class' 
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
				</div>
		</div>
	);
};

export default QamakerComponent;