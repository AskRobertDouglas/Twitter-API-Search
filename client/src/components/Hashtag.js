import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  hashtag: {
    cursor: 'pointer',
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    margin: 5,
    borderRadius: 35,
    backgroundColor: '#DDEDF9',
    color: '#017ED1'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    width: 'max-content'
  }
})

export default function Hashtag(props) {
  const styles = useStyles()

  return (
      <div className={styles.column} onClick={() => props.clickHandler(props.tag)}>
        <div className={styles.hashtag}>
          #{props.tag}
        </div>
      </div>
  )
}

