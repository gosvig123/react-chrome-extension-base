import React from 'react'
import { useState } from 'react'

const App = () => {
  const [content, setContent] = useState([])
  const [scrapingButton, setScrapingButton] = useState('Start Scraping')
  const [detailedPageContent, setDetailedPageContent] = useState([])

  const handContent = (index) => {
    setContent((content) => {
      return content.map((link, i) => {
        if (i === index) {
          return {
            ...link,
            expanded: !link.expanded,
          }
        }
        return {
          ...link,
          expanded: false,
        }
      })
    })
  }

  const displayQuery = () => {
    setScrapingButton('Scrapey is working')
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      let url = tabs[0].url

      let unFilteredData = await sendDataToServer(url)
      console.log(unFilteredData)
      setContent(
        unFilteredData.childLinks.map((link) => ({
          ...link,
          expanded: false,
        }))
      )

      setScrapingButton('Scrape again?')
      return
    })
  }

  return (
    <div>
      <div className='upperPart'>
        <h4>This is Scrapy - Scrapy likes data, be like Scrapy</h4>
        <p>
          Scrapy will start from your current active page and start scraping for
          whatever you are looking for, checking any link that is related to the
          page and provide you with anything that matches your search query.
        </p>
      </div>
      <button className='scrapeButton' onClick={ displayQuery }>
        { scrapingButton }
      </button>
      <div className='formDiv'>
        <form>
          <br />
          <label className='label'>CSS selector</label>
          <input
            className='cssInput'
            type='text'
            placeholder='write your CSS selector here'
          />
          <br />
          <label>
            Url structure for lists
            <input type='text' placeholder='insert path for next page' />
          </label>
        </form>
      </div>
      <ul>
        { content.map((item, index) => (
          <li key={ index }>
            <button
              key={ index }
              className='listButton'
              onClick={ () => handContent(index) }
            >
              See More
            </button>
            { '  -  ' }
            { item.link }
            <br />
            { item.expanded &&
              item.textContent.map((textContent) => (
                <span className='listSpan'>{ textContent }</span>
              )) }
          </li>
        )) }
      </ul>
    </div>
  )
}

export default App

const sendDataToServer = async (fullWebUrl) => {
  return await fetch('http://localhost:8080/', {
    headers: {
      url: fullWebUrl,
    },
  }).then((data) => {
    return data.json()
  })
}

// const sayHi = () => {
//   chrome.runtime.sendMessage({ action: 'initiate scrape' })
//
// State for content
//function for getting array of objects
