import React from 'react';
import { useState, useEffect } from 'react';


export default function MarsRoverComponent(){

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
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Camera Name</th>
                        <th>Rover Name</th>
                        <th>Max_Date</th>
                        <th>Image</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        roverData.map((data)=>{
                            return(
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.camera.full_name}</td>
                                    <td>{data.rover.name}</td>
                                    <td>{data.rover.max_date}</td>
                                    <td><img loading='lazy' src={data.img_src} alt="Rover Image" style={{width:"120px", height:"130px"}} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}