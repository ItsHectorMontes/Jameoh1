import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItem from "../screens/CarouselItem";

class PromotionsRestaurant extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        imagesData : props.data,
      }
    }
    
    render() {
      const {imagesData} = this.state;
      console.log(imagesData);
      return (
        <View>
          <Swiper autoplay>
            {
              imagesData.map(({item})=><CarouselItemPromotions item={item.url} />)
            }
          </Swiper>
        </View>
      )
    }
  }
export default PromotionsRestaurant
