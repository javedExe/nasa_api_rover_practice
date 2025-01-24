import React, { useEffect, useState } from "react";
import '../static/css/ShopingMainComponent.css';


export default function ShopingMainComponent(){

    let [products, setProducts] = useState([]);
    let [categories, setCategories] = useState([]);
    let [cartItems, setCartItems] = useState([]);
    let [cartItemsCount, setCartItemsCount] = useState(0);
    let [totalPrice, setTotalPrice] = useState(0);
    let [updatcartItems, setUpdatecartItems]  = useState();

    function fetchProducts(url){

        fetch(url)
        .then((res)=> res.json())
        .then((data)=>{
            setProducts(data);
        });

    }

    function fetchCategory(){
        fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data)=>{
            data.unshift("all");
            setCategories(data);
        })
    }

    function handleFetchCategory(e){
        // console.log(e.target.value);

        if(e.target.value == 'all'){

            fetchProducts("https://fakestoreapi.com/products");

        }else{
            fetch(`https://fakestoreapi.com/products/category/${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
        }

    }

    async function addcartItems(e){

        await fetch(`https://fakestoreapi.com/products/${e.target.value}`)
        .then((res) => res.json())
        .then((data)=>{

            data.icount = 1;

            let flagItem = false;

            cartItems.map((item)=>{
                if(item.id == e.target.value){
                    // console.log("Value match");
                    flagItem = true;
                    // console.log(flagItem);
                }
            })


            if(flagItem){
                setCartItems(pre => pre.filter((item)=>{
                    if(item.id == e.target.value){
                        item.icount = item.icount+0.5;
                        // console.log(item.icount)
                       
                    }
                    return item;
                }))
            }else{

                setCartItems((pre) => [...pre, data]);
            }


            setCartItemsCount((pre) => pre + 1);

            setTotalPrice(data.price);
        })
        
        calculateTotalPrice();


//641
    }


    function deleteCartItem(e){
        setCartItems(pre => pre.filter(item => item.id != e.target.value));
        setCartItemsCount(pre => pre-1);
        setTotalPrice(0);
        calculateTotalPrice();
    }


    function emptyCartItems(){
        setCartItems([]);
        setCartItemsCount(0);
        setTotalPrice(0);
        console.log(totalPrice);
    }

    function calculateTotalPrice(){

        cartItems.map((item)=>{
            setTotalPrice((pre)=> pre + item.price);
        });

        console.log(totalPrice);
    }


    useEffect(()=>{
            fetchProducts("https://fakestoreapi.com/products");
            fetchCategory();

    }, [])



    // Render UI
    return (
        <div className="container-fluid row">

            <div className="col-4">
            
                <select onChange={handleFetchCategory} className="form-select mt-5" name="category" id="category">
                    {
                        categories.map((categoryOption)=>{
                            return(
                                <option value={categoryOption} key={categoryOption}>{categoryOption.toUpperCase()}</option>
                            )
                        })
                    }
                </select>

                <button className="btn bg-danger col-12 mt-3 text-white fw-semibold">[{cartItemsCount}] Card Items</button>


                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th><button className="btn bg-primary" onClick={emptyCartItems}><i className="bi bi-trash3 text-white"></i></button></th>
                            <th>Items</th>
                           
                        </tr>
                    </thead>

                    <tbody>

                            {
                                cartItems.map((item)=>{
                                    return(
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td><img className="cartImage" src={item.image} alt="IMG" /></td>
                                            <td><button onClick={deleteCartItem} className="btn bg-danger" value={item.id}><i value={item.id} className="bi bi-trash3 text-white"></i></button></td>
                                            <td>{item.icount}</td>
                                        </tr>
                                    )
                                })
                            }


                    </tbody>


                    <tfoot>
                        <tr>
                            <th colSpan={3}>Total Amount: </th>
                            <th>{Number(totalPrice)}</th>
                        </tr>
                    </tfoot>

                </table>

            </div>




            <div className="col-8 d-flex flex-wrap justify-content-evenly">
            

                {
                    products.map((product)=>{
                        return(
                        <div className="card cardContainer mt-5 p-2" key={product.id}>
                            <img src={product.image} alt="Product Image" className="card-img-top" />
                            <div className="card-body">
                                <h5>{product.title}</h5>
                                <p className="text-success"><b>Price: {product.price }</b></p>
                            </div>
                            <div className="card-footer">
                                <button onClick={addcartItems} value={product.id} className="btn bg-danger text-white">Add to cart</button>
                            </div>
                        </div>
                        )
                    })
                }

               


            </div>

        </div>
    )

}