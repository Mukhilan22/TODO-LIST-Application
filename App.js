import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState,useEffect } from 'react';
import Additem from "./Additem";
import Searchitem from "./Searchitem";
import apiRequest from "./Apirequest";

function App() {
  const API_URL ='http://localhost:3500/items'; //Database

  const [items , setItems] = useState([])
     //Data recieved from local storage everytime when we refresh
     const [newItem , setNewitems] = useState('') //to recieve typed value in ip
     const [search , setSearch] = useState('') //recive txt typed in search box
     const [fetchError,setFetcherror] = useState(null) //to get error in API LINK
     const [isLoading,setIsloading] = useState(true) //show loading

     useEffect(()=>{ //Runs very first time,only when change in Dependncy occur
        const fetchitems = async() => {
          try{
            const response = await fetch(API_URL); //Data from api fetched
            if (!response.ok) throw Error("Data Not Recieved") //Error is threw
            const listitems = await response.json();
            setItems(listitems)
            setFetcherror(null) //if o error
          }catch(err){
            setFetcherror(err.message) //if error is caught
          }finally{
            setIsloading(false) //loading initally as true set to false after data is fetched
          }
        }
        setTimeout(()=>{    //Timeout to test Loading
          (async () => await fetchitems())()
         },2000) 
        //(async ()=> await fetchitems())() //fn called using anonymous fn as it shud be called as async fn
     },[])
 
 
      const handleCheck = async(id) => {
       const listitems = items.map((item) => 
       (item.id===id? {...item,checked:!item.checked} : item))
       setItems(listitems)//new list is created and set

       const myItem = listitems.filter((item)=>item.id==id) 
       //an array which contains item whose checkbox was clicked

       const updateOptions= {
        method : 'PATCH',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify({checked:myItem[0].checked})
      }

      const myReq = `${API_URL}/${id}` //http://localhost:3500/items/id sent
      const result = await apiRequest(myReq,updateOptions) 
      if(result) setFetcherror(result)  //Error is returned from apiRequest()

      }
 
      const handleDelete = async(id) => {
        const listitems = items.filter((item) =>(item.id!==id))
        //maps item with id not deleted
        setItems(listitems)

       const deleteOptions= {method : 'DELETE'}

      const myReq = `${API_URL}/${id}` //http://localhost:3500/items/id sent
      const result = await apiRequest(myReq,deleteOptions) 
      if(result) setFetcherror(result)  //Error is returned from apiRequest()

      }

      const addItem = async (item) => {  //text typed in ip is passed
        const id = items.length? items[items.length-1].id + 1 : 1; //id of item is made
        const addNewitem ={id,checked:false,item}  //newItem object is made
        const listitems = [...items,addNewitem]  //new listitems is made with items and new Item
        setItems(listitems)  //list items is set as items

        const postOptions= {
          method : 'POST',
          headers : {
              'Content-type' : 'application/json'
          },
          body : JSON.stringify(addNewitem)
        }
        const result = await apiRequest(API_URL,postOptions) 
        if(result) setFetcherror(result)  //Error is returned from apiRequest()
      }


      const handleSubmit = (e) =>{  //Handling Submit of Input
        e.preventDefault() //To avoid refreshing everytime we click submit
        console.log(newItem)  //Testing
        addItem(newItem) //Fn called to display ip below
        setNewitems('') //To make input box empty after submit is clicked
      }


  return (
    <div>
      <Header title="TO DO LIST" />
      <Additem
        newItem = {newItem}
        setNewitems = {setNewitems} 
        handleSubmit = {handleSubmit} 
      />

      <Searchitem 
      search = {search}
      setSearch = {setSearch}
      />

      <main>
        {isLoading && <p>LIST LOADING , Please Wait</p>} 
        {fetchError && <p>{`Error: ${fetchError}`}</p>} 

        {!isLoading && !fetchError &&
        <Content
          items = {items.filter(item => 
            (item.item).includes(search))}
          /*search text recieved and sent to content 
          where items not in search text isnt included
          so if search is empty,all items are sent*/
          handleCheck = {handleCheck} 
          handleDelete = {handleDelete}
        /> }
      </main>

      <Footer length={items.length}/>
    </div>
  );
}

export default App;
