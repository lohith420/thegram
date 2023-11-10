// import React,{useState,useEffect} from 'react'



// const Home = () => {
//    const [data,setData] = useState("")
//    useEffect(() => {
//       fetch('/allpost',{
//          headers:{
//              "Authorization":"Bearer "+localStorage.getItem("jwt")
//          }
//      }).then(res=>res.json())
//      .then(result=>{
//       console.log(result)
//       setData(result.posts)
//      })
//    },[])
//  return (
//    <div className='home'>
//       {
//          data.map(item=>{
//             return(
//                   <div className='card home-card'>
//                      <h6>Lohith</h6>
//                      <div className='card-image'>
//                         <img alt='wallpapper' src='https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fHdhbGxwYXBlcnxlbnwwfDB8MHx8fDA%3D'/>
//                      </div>
//                      <div className='card-content'>
//                         <i className="material-icons" style={{color:'red'}} >favorite</i>
//                         <h6>title</h6>
//                         <p>this is amazing post</p>
//                         <input type='taxt' placeholder='add comment'/>
//                      </div>
//                   </div>
//             )
//          })
//       }
      
//     </div>
//  )
// }

// export default Home

import React,{useState,useEffect,useContext} from 'react'
import {userContext} from '../../App'
import {Link} from 'react-router-dom'
const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(userContext)
    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return (
       <div className="home">
           {
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                           <h5 style={{ padding: "5px" }}>
    {item.postedBy && (
        <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
            {item.postedBy.name}
        </Link>
    )}
    {item.postedBy && item.postedBy._id === state._id && (
        <i
            className="material-icons"
            style={{
                float: "right"
            }}
            onClick={() => deletePost(item._id)}
        >
            delete
        </i>
    )}
</h5>

                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                            {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            }
                            
                           
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                
                            </div>
                        </div> 
                   )
               })
           }
          
          
       </div>
   )
}


export default Home



