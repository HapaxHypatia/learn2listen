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
	const seenSites = []
	const sites = clean_data.filter(function(currentObject) {
		if (currentObject.Page_title in seenSites) {
			return false;
		} else {
			seenSites[currentObject.Page_title] = true;
			return true;
		}
}

	)
	const updateState = (e) => {
		const val = e.target.value;
		setSearchTerm(val)
		const top_results = clean_data.filter((item)=> item.Title.toLowerCase().includes(searchTerm.toLowerCase()))
		const next_results = clean_data.filter(item=> item.Description.toLowerCase().includes(searchTerm))
		setResults(top_results.concat(next_results))

	}

  return (
	  <>

		  <form id={'searchForm'} >
			  <input id='searchBox'value={searchTerm ?? ""} onChange={updateState} placeholder="Type to search listening resources" />
		  </form>
		  <div id={"resultsList"}>
				{results.map((r)=>
					<div key={Math.random()} className={'result'}>
						<img src={r.Image}/>
						<br/>
						<a className={'result-link'} target={"_blank"} href={String(r.URL)}>{r.Title}</a>
						{r.Level && <p className={'level'}>{r.Level}</p>}
						<a href={r.Page_URL}>Source: {r.Page_title}</a>
						<br/>
						<p>{r.Description}</p>
					</div>
					)}
		  </div>
		  <h2>Search {clean_data.length} audio and video resources from {sites.length} sites!</h2>
		  <div id={'sitesList'}>
			  {sites.map((item)=>
				  <span><a href={item.Page_URL}>{item.Page_title}</a></span>
			  )
			  }
		  </div>
		  </>);
}

export default App;
