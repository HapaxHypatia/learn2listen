import React, {useCallback, useState} from "react";
import data from "../data.json";
import Result from "../components/result";
import '../App.css'
import './audioSearch.css'

//Add level to entries
const levels = [
	{name:"Beginner", descriptors: ['beginner', 'beginning', 'débutant', 'debutant', 'introductory']},
	{name:"Intermediate", descriptors: ['intermediate', 'intermédiaire', 'intermediaire']},
	{name:"Advanced", descriptors: ['advanced', 'avancé']},
	{name:"A1", descriptors: ['a1']},
	{name:"A2", descriptors: ['a2']},
	{name:"B1", descriptors: ['b1']},
	{name:"B2", descriptors: ['b2']},
	{name:"C1", descriptors: ['c1']},
	{name:"C2", descriptors: ['c2']}
]

for (let item of data) {
	if (item.level ==="") {
		for (let level of (levels)) {
			for (let descriptor of level.descriptors) {
				if (typeof (item) == "string") {
					if (item.toLowerCase().includes(descriptor)) {
						data[item].level = level.name
					}
				}

			}
		}
	}
}

function AudioSearch() {
	const [state, setState] = useState({
		products: data,
		filters: new Set(),
	  })
	// const [update, setUpdate] = useState('')
	const [searchTerm, setSearchTerm] = useState("")
	const [results, setResults] = useState([])
	const [paginate, setPaginate] = useState(10)
	const load_more = () => {
		setPaginate((prevValue) => prevValue + 8);
	};

	// fetch('https://api.github.com/repos/HapaxHypatia/Learn2Listen/commits?per_page=1')
	// 	.then(res => res.json())
	// 	.then(res => setUpdate(res[0]['commit']['author']['date']))



	function normalize(text) {
		return text.toLowerCase()
			.replace(/[àâ]/g, "a")
			.replace(/[éèêë]/g, "e")
			.replace(/[îï]/g, 'i')
			.replace('ô', 'o')
			.replace('œ', 'oe')
			.replace(/[ùûü]/g, 'u')
	}

	//Search Function
	const search = (e) => {
		let term = normalize(searchTerm)
		console.log(term)
		e.preventDefault()
		let hits = []
		for (let item of data) {
			let title = normalize(item.title)
			let count = 0
			if (item.level) {
				if (normalize(item.level) === term) {
					count = count + 10
					continue
				}
				if (term.includes(item.level)) {
					count = count + 2
				}
			}

			let titlewords = title.split(" ")
			for (let word of titlewords) {
				if (word === term) {
					count = count + 3
				}
				if (word.includes(term)) {
					count = count + 2
				}
				if (term.includes(word)) {
					count = count + 2
				}
			}
			if (item.description) {
				let descwords = item.description.split(" ")
				for (let word of descwords) {
					if (word === term) {
						count = count + 2
					}
					if (word.includes(term)) {
						count = count++
					}
				}
			}
			if (count !== 0) {
			item.count = count
			hits.push(item)
		}

		}
		hits.sort((a, b) => parseInt(b.count) - parseInt(a.count))
		setResults(hits)
	}
	//Search filters
	function onFilterChange(){

	}

	const updateSearchBox = (e) => {
		const val = e.target.value;
		let cleanval = normalize(val)
		setSearchTerm(cleanval)
	}
	//TODO set up search filters
	//TODO fix photos- many are not showing (partajon, youtube)
	//TODO Francais facile missing titles

	useCallback(event => {
		setState(previousState => {
		  let filters = new Set(previousState.filters)
		  let results = results

		  if (event.target.checked) {
			filters.add(event.target.value)
		  } else {
			filters.delete(event.target.value)
		  }

		  if (filters.size) {
			results = results.filter(result => {
			  return filters.has(result.level)
			})
		  }

		  return {
			filters,
			results,
		  }
		})
	  }, [setState])
	return (
	  <div className={'main'}>
		  <form id={'searchForm'} onSubmit={search}>
			  <input id='searchBox' value={searchTerm ?? ""} onChange={updateSearchBox} placeholder="Search listening resources" />
			  <button type={"submit"}>Search</button>
		  </form>
		  {results.length<1?
			  <>
				<h2>Search thousands of French audio and video resources with one search</h2>
			  </>: <></>
		  }
		  {results.length>1?
			  <>
			<section
				className="filters"
				aria-labelledby="filters-header">
				<header id="filters-header">
				{'Filters'}
				</header>

				<ul>
					{levels.map(level => (
						<li key={level.name}>
						<label>
						<input
						onChange={onFilterChange}
						type="checkbox"
						value={level.name} />
						{level.name}
						</label>
						</li>
					))}
					</ul>
			</section>

			  <div id={"resultsList"}>
			  {results.length} results found.
				{results.slice(0, paginate)
					.map((r)=><Result r={r}></Result>
					)}
			  </div>
			  </>: <></>
		  }

		  {results.length>paginate?
			  <button id={'loadMore'} onClick={load_more}>Load More...</button> :<></>
		  }
	  </div>
	);
}

export default AudioSearch;