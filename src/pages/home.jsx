import React from "react";
import {Card} from "../components";
import listening from '../img/listening.jpg'
import transcribe from '../img/transcribe.jpg'

function Home() {
	return (
		<div className={'main'}>
			<Card w={300}
				  t={'Transcribe'}
				  s={transcribe}
				  l={'/transcribe'}
				  d={'Upload an audio file to transcribe'}/>
			<Card w={300}
				  t={'Audio search'}
				  s={listening}
				  l={'/audiosearch'}
				  d={'Search thousands of French listening resources'}/>
		</div>
);
}

export default Home;