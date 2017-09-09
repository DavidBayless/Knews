import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Article extends React.Component {
  render() {
    return (
      <div>
      <p>{this.props.title}</p>
      </div>
    )
  }
}

class Source extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    apiName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="source">
        <input type="checkbox" value={this.props.apiName} checked name={this.props.name}></input>
        <label>{this.props.name}</label>
      </div>
    )
  }
}

class Home extends React.Component {
  state = {
    sources: [],
    articles: []
  }

  componentWillMount() {
    let sourceHolder;
    axios.get("https://newsapi.org/v1/sources?language=en&category=technology")
    .then(sources => {
      console.log(sources.data.sources);
      sourceHolder = sources.data.sources;
      return Promise.all(sources.data.sources.map(source => {
        return axios.get(`https://newsapi.org/v1/articles?source=${source.id}&apiKey=bac5c703a00c497b8a16da5b8b5ce6b3`)
      }))
    }).then(articles => {
      console.log(articles);
      this.setState({articles: articles, sources: sourceHolder})
    })
  }

  render() {
    const sources = this.state.sources.map((source, idx) => {
      return <Source
        key={idx}
        name={source.name}
        apiName={source.id}
        description={source.description}>
      </Source>
    })

    const articles = this.state.articles.map((source) => {
      return source.data.articles.map((article,idx) => {
        return (
          <Article
          key={idx}
          title={article.title}
          img={article.urlToImage}
          author={article.author}
          url={article.url}/>
        )
      })
    })

    return (
      <div>
        <div className="sources">
        {sources}
        </div>
        <div className="articles">
        {articles}
        </div>
      </div>
    )
  }
}

export default Home;
