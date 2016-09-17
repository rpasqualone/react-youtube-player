import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail'
import VideoList from './components/video_list';

const API_KEY = 'AIzaSyBKU5SNZzOFg1FdosuzbUg6LD_lwCoZqo4';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { videos: [], selectedVideo: null, term: 'Learn React' } ;

		this.videoSearch(this.state.term);
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, videos => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
		return (
			<div>
				<SearchBar onSearchTermChange={term => videoSearch(term)} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} selectedVideo={this.state.selectedVideo} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
