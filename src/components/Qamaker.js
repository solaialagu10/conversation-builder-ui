import React, { useState } from 'react'; 
import './Qamaker.css';
import Select from 'react-select';

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
                         <span className='suggestions-title'>{suggestiontype}</span>
						 <div className='card-wrapper'>
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
													<span>Question 1</span>													
													<span className='asterisk'>*</span>
												</label>	
																		
										  </td>
										  <td>
                                            <input type="text" className='input-title-class'></input>
										  </td>
										</tr>
										<tr className="table-row">
										<td className="table-layout-label">
												<label> 
													<span>Question Alternate 1</span>													
													<span className='asterisk'>*</span>
												</label>	
																		
										  </td>
										  <td>
                                            <input type="text" className='input-title-class'></input>
										  </td>
										</tr>
										<tr className="table-row">
										<td className="table-layout-label">
												<label> 
													<span>Answer/Response</span>													
													<span className='asterisk'>*</span>
												</label>	
																		
										  </td>
										  <td>
                                            <textarea rows="4" cols="60" placeholder="Type your answer/response here..."
											className='input-title-class'></textarea>
										  </td>
										</tr>
									</tbody>
								</table>

							 </div>
						 </div>
				</div>
		</div>
	);
};

export default QamakerComponent;