import React from "react";
import Navbar from  "./components/Navbar";
import Cards from "./components/Cards"
import Filter from "./components/Filter"
import { apiUrl, filterData  } from "./data";
import { useState,useEffect } from "react";
import Spinner from "./components/Spinner";
import {toast} from "react-toastify";


const App = () => { 
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  // to choose between filters
  const [category, setCategory] = useState(filterData[0].title);  // default will be "All" categories

  async function fetchData() {
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      // save all courses data
      setCourses(output.data);
    }
    catch(error) {
        toast.error("Something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []) // --> run only on first render
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-400">
      <div>
        <Navbar/>
      </div>
      <div className="bg-gray-400">
        <div>
          <Filter 
          filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
          }
        </div>
      </div>


    </div>
  );
};

export default App;
