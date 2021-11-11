import React from "react";
import CardItem from "./CardItem";
import "./Cards.css"

function Cards(){
    return(
        <div className="cards">
            <h1>Look at these cards</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                            src="/images/img-9.jpg"
                            text="Explore this spooky water"
                            label="Adventure"
                            path="/services"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards