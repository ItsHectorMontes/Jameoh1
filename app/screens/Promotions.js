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
      textWidth: 0,
      textHeight: 0,
    }
  }

  mesureText = event => {
    event = event.nativeEvent.layout;
    this.setState({
      textWidth: event.width,
      textHeight: event.height,
    });
    console.log(event);
  }
  
  render() {
    const {imagesData} = this.state;
    const {category} = this.props;
    return (
      <View style={styles.container}>
        <Text 
          style={{...styles.categoryTitle, transform: [{translateX: -this.state.textWidth/2}, {translateY: -this.state.textHeight/2}]}} 
          onLayout={event => this.mesureText(event)}
          >{category}</Text> 
        <Swiper autoplay autoplayTimeout={5} >
          {
            imagesData.map((item) => <CarouselItemPromotions key={Math.random()} item={item} />)
          }
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 3,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    height: height / 4,
  },
  categoryTitle: {
    fontSize: 46,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    shadowOpacity: 0.2,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 8,
    left: '50%',
  }
});

export default Promotions