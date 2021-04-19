import React, { useState, useEffect } from 'react';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { View, Text, Share, Image, TouchableOpacity } from 'react-native'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';


const Home = (props) => {
    const [info, setInfo] = useState({
        name: "loading !!",
        temp: "loading",
        humidity: "loading",
        desc: "loading",
        icon: "loading",
        maxTemp: "loading",
        minTemp: "loading",
        cordinet: 'loading',
        wind: 'loading'
    })
    useEffect(() => {
        getWeather()
    }, [])
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const getWeather = async () => {
        let MyCity = await AsyncStorage.getItem("newcity")
        if (!MyCity) {
            const { city } = props.route.params
            MyCity = city
        }


        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&appid=7c2bda65d2aecb8c16ec2cefff0a4a11&units=metric
     `)
            .then(data => data.json())
            .then(results => {
                console.log("Data  >>>", results)

                setInfo({
                    name: results.name,
                    mains: results.main,
                    temp: results.main.temp,
                    maxTemp: results.main.temp_max,
                    minTemp: results.main.temp_min,
                    humidity: results.main.humidity,
                    desc: results.weather[0].description,
                    icon: results.weather[0].icon,
                    cordinet: results.coord,
                    wind: results.wind.speed,
                })
            })
            .catch(err => {
                alert(err.message)
            })
    }
    if (props.route.params.city != "london") {
        getWeather()
    }
    return (
        <View style={{ flex: 1 }}>
            <Header name="Weather Forecast" />
            <View style={{ alignItems: "center" }}>
                <Title
                    style={{
                        color: '#e300ff',
                        marginTop: 30,
                        fontSize: 30
                    }}>
                    {info.name}
                </Title>
                <Text>Latitude : {info.cordinet.lat}   Longitude : {info.cordinet.lon}</Text>
                <Image
                    style={{
                        width: 120,
                        height: 120
                    }}
                    source={{ uri: "https://openweathermap.org/img/w/" + info.icon + ".png" }}
                />
                <Text>
                    {info.desc}
                </Text>
                <Title style={{ color: "#e300ff", fontSize: 25 }}>{info.temp}°C</Title>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginRight: 10 }}>Max temperature : {info.maxTemp}°C</Text>
                <Text>Min temperature : {info.minTemp}°C</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', marginRight: 10 }}>Humidity : {info.humidity}%</Text>
                <Text style={{ textAlign: 'center', }}>Wind : {info.wind}km/h</Text>

            </View>
            <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                <View style={{ marginTop: 50, height: 35, width: 110, backgroundColor: '#e300ff', }}>
                    <TouchableOpacity onPress={onShare} >
                        <Text style={{textAlign:'center',marginTop:6,}}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default Home
