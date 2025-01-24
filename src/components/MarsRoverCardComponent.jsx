import React from 'react';
import { useState, useEffect } from 'react';


export default function MarsRoverCardComponent(){

    let [roverData,setRoverData] = useState([]);

    useEffect(()=>{
        fetchApiData();

    },[])


    function fetchApiData(){
        fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY")
        .then((res)=> res.json())
        .then((data)=>{
            setRoverData(data.photos);
            console.log(data);
            console.log(data);
        })
    }

    


    return(
        <div className="container">

            

                <div className='row'>

                  {  
                        roverData.map((data)=>{
                            return(
                                <div className='card mt-2 w-25' key={data.id}>
                                <img src={data.img_src} alt="Mars Image" />
                                <div className='card-body'>
                                    <p><b>Id: {data.id}</b></p>
                                    <h5>Rover Name: {data.rover.name}</h5>
                                    <p>camera Name: {data.camera.full_name}</p>
                                    <p>Max_date: {data.rover.max_date}</p>
    
                                </div>
                            </div>
                            )
                        })

                    }

                </div>



           
        </div>
    )
}