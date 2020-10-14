import React from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'
import CarouselItemPromotions from "../screens/CarouselItemPromotions";
import Swiper from 'react-native-swiper';

const {height} = Dimensions.get('window');

class Promotions extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      imagesData : props.data,
    }
  }
  
  render() {
    const {imagesData} = this.state;
    const {category} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.categoryTitle}>{category}</Text> 
        <Swiper autoplay autoplayTimeout={5} >
          {
            imagesData.map((item) => <CarouselItemPromotions key={Math.random()*(1000-0)+0} item={item} />)
          }
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height / 3,
  },
  categoryTitle: {
    fontSize: 28,
    color: 'white',
    position: 'absolute',
    zIndex: 10,
    top: 25,
    shadowOpacity: 0.2,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 6,
    left: 20,
  }
});

export default Promotions