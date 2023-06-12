//TODO create server to run and fetch transcription
import React, {useState} from "react";

function Transcribe() {
	const [file, setFile] = useState()

	const handleFileChange = (e) => {
		e.preventDefault()
      	setFile(e.target.files[0]);
	  	console.log(e.target.files[0])
	};

	const sendFile = ()=> {
		console.log("in sendfile function")
		const data = new FormData()
        data.append('file', file)		// 👇 Uploading the file using the fetch API to the server
    	fetch('http://localhost:8080/audio', {
      		method: 'POST',
      		body: data,
		})};

	return (
		<div className={'main'}>
			<p>Transcribe</p>
			<form method={'POST'} encType={'multipart/form-data'} action={"http://localhost:8080/"}>
				<label htmlFor={"username"}>Name:</label>
				<input name={'username'} type={"text"}/>
				<label htmlFor={"email"}>Email address:</label>
				<input name={'email'} type={"email"}/>
				<input id="file-upload" name={"file"} type="file" onInput={handleFileChange}/>
				<button type={"submit"}>Submit file</button>
			</form>
		</div>
	);}

export default Transcribe;
