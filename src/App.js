import './App.css';
import {useState} from "react";
import data from './data.json'

function App() {
	const [searchTerm, setSearchTerm] = useState("")
	const [results, setResults] = useState([])
	const seenURLs = []
	const clean_data = data.filter(function(currentObject) {
    if (currentObject.URL in seenURLs) {
        return false;
    } else {
        seenURLs[currentObject.URL] = true;
        return true;
    }
})

	const updateState = (e) => {
		const val = e.target.value;
		setSearchTerm(val);
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const top_results = clean_data.filter(item=> item.Title.includes(searchTerm))
		const next_results = clean_data.filter(item=> item.Description.includes(searchTerm))
		setResults(top_results.concat(next_results))
	}

  return (
	  <>
		  <form id={'searchForm'} onSubmit={handleSubmit}>
					<input id='searchBox' value={searchTerm ?? ""} onChange={updateState} placeholder="Search listening resources" />
					<button>Search</button>
		  </form>
		  <div id={"resultsList"}>
				{results.map((r)=>
					<div key={String(r.URL)} className={'result'}>
						<img src={r.Image}/>
						<a className={'result-link'} target={"_blank"} href={String(r.URL)}>{r.Title}</a>
						<p className={'level'}>{r.Level}</p>
						<p>{r.Page_title}</p>
						<p>{r.Description}</p>
					</div>
					)}
		  </div>
		  </>);
}

export default App;
