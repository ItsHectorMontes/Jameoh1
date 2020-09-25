import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItemPromotions from "../screens/CarouselItemPromotions";


const { width, heigth } = Dimensions.get('window')
let flatList

function infiniteScroll1(dataList1){
    const numberOfData1 = dataList1.length
    let scrollValue1 = 0, scrolled = 0

    setInterval(function() {
        scrolled ++
        if(scrolled < numberOfData1)
        scrollValue1 = scrollValue1 + width

        else{
            scrollValue1 = 0
            scrolled = 0
        }

        this.flatList.scrollToOffset({ animated: true, offset: scrollValue1})
        
    }, 3000)
}


const PromotionsRestaurant = ({ data }) => {
    const scrollX1 = new Animated.Value(0)
    let position = Animated.divide(scrollX1, width)
    const [dataList1, setDataList] = useState(data)

    useEffect(()=> {
        setDataList(data)
        infiniteScroll1(dataList1)
    })


    if (data && data.length) {
        return (
            <View>
                <FlatList data={data}
                ref = {(flatList) => {this.flatList = flatList}}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItemPromotions item={item} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX1 } } }]
                    )}
                />

                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                            />
                        )
                    })}

                </View>
            </View>
        )
    }

    console.log('Please provide Images')
    return null
}

const styles = StyleSheet.create({
    dotView: { flexDirection: 'row', justifyContent: 'center' }
})

export default PromotionsRestaurant
