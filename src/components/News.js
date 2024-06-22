import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
 import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
const News=(props)=>{
   const [articles,setArticles]=useState([])
   const [loadinf,setloadinf]=useState(true)
   const [page,setpage]=useState(1)
   const [totalResults,settotalResults]=useState(0)
   const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  const Updatenews= async()=>
  {
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=f059123d6d5645ce989237f10c7de25a&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({loadinf:true});
    setloadinf(true);
  let data= await fetch(url);
  let parsedata= await data.json();
  // console.log(parsedata);
  props.setProgress(70);
  setArticles(parsedata.articles)
  settotalResults(parsedata.totalResults)
  setloadinf(false);
  props.setProgress(100);
  }

  useEffect(() => {
    Updatenews();
  },[])


     const fetchMoreData= async()=>{
        // this.setState({page:this.state.page+1});
        const url=`https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=f059123d6d5645ce989237f10c7de25a&page=${page+1}&pageSize=${props.pageSize}`;
        setpage(page+1);
    setloadinf(true);

  let data= await fetch(url);
  let parsedata= await data.json();
  console.log(parsedata);
  setArticles(articles.concat(parsedata.articles))
  settotalResults(parsedata.totalResults);
  // setloadinf(false);
  };
        console.log("render");
    return (
      <>
        <h2 className='text-center' style={{margin:'35px 0px'}}>Rapid News- Top {capitalizeFirstLetter(props.category)} Headlines</h2>
         {loadinf && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}>
            <div className="container">
        <div className="row">
        {articles.map((element)=>{
         return <div className="col-md-3" key={element.url}>

         <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} 
              imageUrl={element.urlToImage} newurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
           </div>
           
        })}
        </div>
        </div>
       </InfiniteScroll>
       </>
  )
}


News.defaultProps={
  country:'in',
  pageSize:4,
  category:'general'

}


News.propTypes={
 country:PropTypes.string,
 pageSize:PropTypes.number,
 category:PropTypes.string
}
export default News
