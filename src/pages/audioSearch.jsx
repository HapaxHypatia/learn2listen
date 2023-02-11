import React, {useState} from "react";
import data from "../data.json";
import Result from "../components/result";
import './audioSearch.css'

function AudioSearch() {
    const [searchTerm, setSearchTerm] = useState("")
	const [results, setResults] = useState([])
	const [paginate, setPaginate] = useState(10)
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
	})

	const load_more = () => {
	  setPaginate((prevValue) => prevValue + 8);
	};


	const getResults= (e)=> {
		e.preventDefault()
		setPaginate(10)
		const top_results = clean_data.filter((item)=> item.Title.toLowerCase().includes(searchTerm.toLowerCase()))
		const next_results = clean_data.filter(item=> item.Description.toLowerCase().includes(searchTerm))
		setResults(top_results.concat(next_results))
	}
	const updateState = (e) => {
		const val = e.target.value;
		setSearchTerm(val)
	}

	return (
	  <div className={'main'}>

		  <form id={'searchForm'} onSubmit={getResults}>
			  <input id='searchBox' value={searchTerm ?? ""} onChange={updateState} placeholder="Search listening resources" />
			  <button type={"submit"}>Search</button>
		  </form>
		  <div id={"resultsList"}>
				{results.slice(0, paginate)
					.map((r)=><Result r={r}></Result>
					)}
		  </div>
		  {results.length<1?
			  <>
				<h2>Search {clean_data.length} audio and video resources from {sites.length} sites!</h2>
				<div id={'sitesList'}>
					{sites.map((item)=>
					<span><a href={item.Page_URL}>{item.Page_title}</a></span>
					)
					}
				</div>
			  </>: <></>
		  }
		  {results.length>paginate?
			  <button id={'loadMore'} onClick={load_more}>Load More</button> :<></>
		  }
	  </div>
	);
}

export default AudioSearch;