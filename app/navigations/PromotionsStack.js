
import React, {useState, useEffect} from "react";
import Promotions from "../screens/Promotions";
import { dummyData } from"../data/Data";
import * as firebase from 'firebase';
import { ScrollView } from "react-native-gesture-handler";

export default function PromotionsStack() {
    const [promotionsData, setPromotionsData] = useState([]);
    
    useEffect(() => {
        (()=>{
            firebase.firestore().collection('restaurants').get()
                .then(respuesta => {
                    let lista = []
                    respuesta.docs.forEach(restaurant => {
                        const category = restaurant.data().category;
                        lista = lista.concat({
                            category: category,
                            promotions: restaurant.data().images,
                        });
                    });
                    setPromotionsData(lista);
                });
        })()
    },[])
    
    return (
        <ScrollView style={{height: '100%', flex: 1}}>
            {
                promotionsData.map((item, index)=><Promotions key={index*Math.random()} data={item.promotions} category={item.category} />)
            }
        </ScrollView>           
    );    
}