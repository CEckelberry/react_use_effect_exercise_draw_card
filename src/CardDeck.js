import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import axios from "axios";

const CardDeck = () => {

    const [Deck, setDeck] = useState([])
    const [Drawn, setDrawn] = useState([])
    const [Draw, setDraw] = useState(false);

    useEffect(() => {
        async function loadDeck(){
            console.log("running deck GET now")
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/`);
            setDeck(res.data)
            console.log(`Deck inside GET deck: ${Deck}`)
        }
        loadDeck();
    }, []);

    useEffect(() => {
        console.log("running card GET now")
        if(Deck.deck_id){           
       
        async function loadCard(){
        let {deck_id} = Deck;

        try{
                console.log(`Deck inside card useEffect: ${Deck.deck_id}`)
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    
                if(res.data.remaining === 0){
                    throw new Error("No Cards Remaining!");
                }
    
                const currentCard = res.data.cards[0];
    
                setDrawn(cc => [
                    ...cc,
                    {
                        image: currentCard.image,
                        code: currentCard.code,
                        suit: currentCard.suit,
                        value: currentCard.value,                    
                    }
                ]);
                
            }
        catch (error){
            alert(error);
        }
        
    }
    loadCard();
    } }, [Draw]);

    const cardComponents = Drawn.map(card => (
        <Card 
            key={card.code}
            image={card.image}
            value={card.value}
            suit={card.suit}
            code={card.code}
        />
    ))

    const newCard = () => {
        if(!Draw){
            setDraw(true)
        }else{
            setDraw(false)
        }
    };

    return (
        <div>
            {Deck? <button onClick={newCard}>Draw A Card</button> : <h1>Loading...</h1>}
            <div>{cardComponents}</div>
        </div>
    )
}

export default CardDeck;