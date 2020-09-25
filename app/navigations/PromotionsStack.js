
import React, { Component } from "react";
import { Platform, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Promotions from "../screens/Promotions";
import { dummyData } from"../data/Data";
import { ScrollView } from "react-native-gesture-handler";




const Stack = createStackNavigator();

export default function PromotionsStack() {
    
        return (
        <ScrollView>
            <Text>pollos y parrillas</Text>
            <Promotions data={dummyData}/>
            <Text>pizza</Text>
            <Promotions data={dummyData}/>
            <Text>pescasdos</Text>
            <Promotions data={dummyData}/>
            <Promotions data={dummyData}/>
            <Promotions data={dummyData}/>
            <Promotions data={dummyData}/>
            <Promotions data={dummyData}/>
            <Promotions data={dummyData}/>
            <Promotions data={dummyData}/>
            
        </ScrollView>
        
           
        );    

    
       
    
}