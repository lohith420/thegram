// import React,{useEffect,useState,useContext} from 'react'
// import {userContext} from '../../App'


// const Profile = () => {
//     const [mypics,setPics] = useState([])
//     const {state,dispatch} = useContext(userContext)
//     const [image,setImage] = useState("")
//     useEffect(()=>{
//         fetch('/mypost',{
//             headers:{
//                 "Authorization":"Bearer "+localStorage.getItem("jwt")
//             }
//         }).then(res=>res.json())
//         .then(result=>{
//             console.log(result)
//             setPics(result.mypost)
//         })
//      },[])
 
//  return (
//    <div style={{maxWidth:"550px", margin:"0px auto"}}>
//       <div style={{display:'flex',justifyContent:"space-around",margin:"18px 0px", borderBottom:"1px solid grey"}}>
//          <div>
//          <img alt='profile_img' style={{width:"160px",
//          height:"160px",borderRadius:"80px"}}
//             src="https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29uc3xlbnwwfHwwfHx8MA%3D%3D"
//             />
//          </div>
//          <div>
//             <h4>lohith</h4>
//             <div style={{display:"flex",justifyContent:"space-between", width:"108%"}}>
//                <h6>40 posts</h6>
//                <h6>40 followers</h6>
//                <h6>40 following</h6>
//             </div>
//          </div>
//       </div>

//       <div className='gallery'>
//                {
//                    mypics.map(item=>{
//                        return(
//                         <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
//                        )
//                    })
//                }
        
//       </div>

     
//    </div>
//  )
// }

// export default Profile





// import React,{useEffect,useState,useContext} from 'react'
// import {userContext} from '../../App'

// const Profile  = ()=>{
//     const [mypics,setPics] = useState([])
//     const {state,dispatch} = useContext(userContext)
//     const [image,setImage] = useState("")
//     useEffect(()=>{
//        fetch('/mypost',{
//            headers:{
//                "Authorization":"Bearer "+localStorage.getItem("jwt")
//            }
//        }).then(res=>res.json())
//        .then(result=>{
//            console.log(result)
//            setPics(result.mypost)
//        })
//     },[])
//     useEffect(()=>{
//        if(image){
//         const data = new FormData()
//         data.append("file",image)
//         data.append("upload_preset","insta_clone")
//         data.append("cloud_name","dlltswc9d")
//         fetch("https://api.cloudinary.com/v1_1/dlltswc9d/image/upload",{
//             method:"post",
//             body:data
//         })
//         .then(res=>res.json())
//         .then(data=>{
    
       
//            fetch('/updatepic',{
//                method:"put",
//                headers:{
//                    "Content-Type":"application/json",
//                    "Authorization":"Bearer "+localStorage.getItem("jwt")
//                },
//                body:JSON.stringify({
//                    pic:data.url
//                })
//            }).then(res=>res.json())
//            .then(result=>{
//                console.log(result)
//                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
//                dispatch({type:"UPDATEPIC",payload:result.pic})
//                //window.location.reload()
//            })
       
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//        }
//     },[image])
//     const updatePhoto = (file)=>{
//         setImage(file)
//     }
//    return (
//        <div style={{maxWidth:"550px",margin:"0px auto"}}>
//            <div style={{
//               margin:"18px 0px",
//                borderBottom:"1px solid grey"
//            }}>

         
//            <div style={{
//                display:"flex",
//                justifyContent:"space-around",
              
//            }}>
//                <div>
//                    <img alt='pic' style={{width:"160px",height:"160px",borderRadius:"80px"}}
//                    src={state?state.pic:"loading"}
//                    />
                 
//                </div>
//                <div>
//                    <h4>{state?state.name:"loading"}</h4>
//                    <h5>{state?state.email:"loading"}</h5>
//                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
//                        <h6>{mypics.length} posts</h6>
//                        <h6>{state?.followers?.length || 0} followers</h6>
//                        <h6>{state?.following?.length || 0} following</h6>
//                    </div>

//                </div>
//            </div>
        
//             <div className="file-field input-field" style={{margin:"10px"}}>
//             <div className="btn #64b5f6 blue darken-1">
//                 <span>Update pic</span>
//                 <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
//             </div>
//             <div className="file-path-wrapper">
//                 <input className="file-path validate" type="text" />
//             </div>
//             </div>
//             </div>      
//            <div className="gallery">
//                {
//                    mypics.map(item=>{
//                        return(
//                         <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
//                        )
//                    })
//                }

           
//            </div>
//        </div>
//    )
// }


// export default Profile




import React,{useEffect,useState,useContext} from 'react'
import {userContext} from '../../App'

const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(userContext)
    const [image,setImage] = useState("")
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta_clone")
        data.append("cloud_name","dlltswc9d")
        fetch("https://api.cloudinary.com/v1_1/dlltswc9d/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
       
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
   return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.pic:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?.followers?.length || 0} followers</h6>
                   <h6>{state?.following?.length || 0} following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
   )
}


export default Profile