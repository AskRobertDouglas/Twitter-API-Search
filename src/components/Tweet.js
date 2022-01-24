import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import Hashtag from './Hashtag'

const useStyles = createUseStyles({
  container: {
    padding: 20,

  },
  avatar: {
    verticalAlign: 'middle',
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20
  },
  name: {
    fontWeight: 600,
    marginBottom: 10
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  columnAvatar: {
    display: 'flex',
    flexDirection: 'column',
    width: '10%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%'
  }
})

export default function Tweet(props) {

  const styles = useStyles()
  const [customMsg, setCustomMsg] = useState()
  const [link, setLink] = useState()
  const [hashtags, setHashTags] = useState([])

  useEffect(() => {
    if (props.message.includes('https')) {
      var messageArr = props.message.split("https")
      setCustomMsg(messageArr[0])
      setLink(messageArr[1])
    } else {
      setCustomMsg(props.message)
      setLink('')
    }
  }, [hashtags, props.message])

  const hashtagBlock = () => {
    if (props.hashtags.length > 0) {
      return (
        <div className = "row">
          {props.hashtags.map((tag, index) => <Hashtag key={index} tag={tag.text} clickHandler={props.clickHandler}/>)}
        </div>
      )
    }
  }

  const getMessage = () => {
    if (link !== '') {
      return (
        <div>
          {customMsg} <a target="_blank" rel="noopener noreferrer" href={'https' + link}>{'https' + link}</a>
        </div>
      )
    } else {
      return (
        <div>
          {customMsg}
        </div>
      )
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.columnAvatar}>
          <img src={props.avatar} alt="Avatar" className={styles.avatar} />
        </div>
        <div className={styles.column}>
          <div className={styles.name}>
            @{props.name}
          </div>
          <div>
            {getMessage()}
          </div>
          {hashtagBlock()}
        </div>

      </div>

    </div>
  )
}
