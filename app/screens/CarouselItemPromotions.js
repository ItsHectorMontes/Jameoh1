import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

const CarouselItemPromotions = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item }} />
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        height: '100%',
        backgroundColor: 'white',
    },
    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        height: '100%',
        width: '100%',
        borderWidth: 2,
    },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        textShadowRadius: 6,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        textShadowRadius: 6,
        elevation: 5
    }
})

export default CarouselItemPromotions