import React, {useRef, useState} from "react";
import { FlatList, Animated, View, Text, Image } from "react-native";
import faker from "faker";
import { StatusBar } from "expo-status-bar";


const IMAGE_SIZE = 80

const demoData = [...Array(30).keys()].map((_, i) => {
    return {
        key: i,
        image: `https://randomuser.me/api/portraits/men/75.jpg`,
        name: faker.name.firstName(),
        email: faker.internet.email(),
    };
});

export default function OpacityScaleFL() {
    const scrollY = useRef(new Animated.Value(0)).current
    const [heightValue, setHeightValue] = useState(0)
    return (
        <Animated.FlatList 
            data={demoData}
            keyExtractor={(d)=>d.key}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            contentContainerStyle={{
                padding: 20,
                paddingTop: StatusBar.currentHeight || 42
            }}
            renderItem={({item, index}) => <OpacityScaleFLDemoItem idx={index} email={item.email} image={item.image} name={item.name} heightValue={heightValue} animatedOffsetValue={scrollY}/>}
        />
    );
}

export function OpacityScaleFLDemoItem({idx, image, name, email, animatedOffsetValue, heightValue}) {
    const size = IMAGE_SIZE + 10 + 10 + 20
    const scaleInputRange = [-1, 0, parseInt(idx) * size, (parseInt(idx) + 2) * size ]
    const opacityInputRange = [-1, 0, parseInt(idx) * size, (parseInt(idx) + 1) * size ]

    const scale = animatedOffsetValue.interpolate({
        inputRange: scaleInputRange,
        outputRange: [1, 1, 1, 0]
    })

    const opacity = animatedOffsetValue.interpolate({
        inputRange: opacityInputRange,
        outputRange: [1, 1, 1, 0]
    })

    return (
        <Animated.View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "pink", padding: 10, marginBottom: 20,
            elevation: 20,
            borderRadius: 20,
            transform: [{scale}],
            opacity
        }}>
            <Image source={{uri: image}} style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 50, marginRight: 10 }}/>
            <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{name}</Text>
                <Text style={{ fontSize: 12 }}>{email}</Text>
            </View>
        </Animated.View>
    )
}