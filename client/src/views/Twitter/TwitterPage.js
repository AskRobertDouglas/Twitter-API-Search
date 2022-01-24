import React, { useState, useEffect } from 'react'
import Tweet from '../../components/Tweet'
import Hashtag from '../../components/Hashtag'
import './TwitterPage.css'
import axios from 'axios'

export default function TwitterPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [tweets, setTweets] = useState([])
  const [tweetsStore, setTweetsStore] = useState([])
  const [hashtags, setHashTags] = useState([])
  const [maxId, setMaxId] = useState([])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setHashTags([])
      setTweets([])
      setTweetsStore([])
      if (searchTerm !== '') {
        setHashTags(hashtags => [searchTerm])
        makeRequest(`http://localhost:3001/query/` + searchTerm)
      }
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const makeRequest = (search) => {
    axios.get(search)
      .then(function (response) {
        let data = response.data.statuses

        //set data
        if(tweets.length !== 0){
          setTweetsStore(tweets => [...tweets, ...data])
          setTweets(tweets => [...tweets, ...data])
        }else {
          setTweetsStore(data);
          setTweets(data);
        }
       
        //set hashtags 
        let hashes = []
        data.map(res => {
          if (res.entities.hashtags.length !== 0) {
            let arr = res.entities.hashtags.map(r => 
              {
                if (!hashtags.includes(r.text) && !hashes.includes(r.text)) {
                  return r.text
                }
              })
            if(!(arr[0] === undefined)) hashes.push(...arr)
          }
        })
        
        if (hashes.length > 0) {
          setHashTags(hashtags => [...hashtags, ...hashes])
        }

        //set maxId
        let id = data.map(res => res.id)
        setMaxId(Math.min(...id))
      });
  }

  const handleClick = () => {
    makeRequest(`http://localhost:3001/query/` + searchTerm + `/` + maxId)
  }

  const tweetBlock = () => {
    if (tweets.length > 0) {
      return (
        <div className="tweetContainer">
          {tweets.map((tweet, index) => 
            <Tweet 
              key={index} 
              name={tweet.user.screen_name} 
              avatar={tweet.user.profile_image_url_https} 
              message={tweet.text} 
              url={tweet.entities.url} 
              hashtags={tweet.entities.hashtags} 
              clickHandler={hashClick}
              />
              )}
          <div className="loadMoreContainer">
            <button className="loadMore" onClick={handleClick}>Load more</button>
          </div>
        </div>
      )
    }
  }

  const hashClick = (tag) => {
    if(tag == searchTerm){
      setTweets(tweetsStore)
      return
    }
    let filteredTweets = []
    tweetsStore.forEach(t => {
      t.entities.hashtags.forEach(h =>{
        if(h.text == tag){
          filteredTweets.push(t);
        }
      })
    })
    setTweets(filteredTweets)
  }

  const hashtagBlock = () => {
    if (hashtags.length > 0) {
      return (
        <div className="row">
          {hashtags.map((tag, index) => <Hashtag key={index} tag={tag} clickHandler={hashClick}/>)}
        </div>
      )
    }
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="header">Tweet Feed</h2>
      </div>


      <div className="row">

      <div className="column">

        <input
          autoFocus
          type='text'
          autoComplete='off'
          className='input'
          placeholder='Search by keyword'
          onChange={(e) => setSearchTerm(e.target.value)}
        />

          {tweetBlock()}

      </div>



        <div className="column">
          <div className="filterContainer">
            <h2 className="header">Filter by hashtag</h2>
            {hashtagBlock()}
          </div>
        </div>


      </div>


    </div>

  )
}


