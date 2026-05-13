//Gabriel Pereira Levesque

import Colors from '@/constants/Colors';
import { useAccount } from '@/contexts/account';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import ProfilePicture from '../../../components/profilePicture';
import { typography } from '@/constants/typography';
import MapView, { Circle, Marker, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import warehouses from '../../../warehouses';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Location from 'expo-location';

export default function Warehouses() {
    type Region = {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number
    }

    type Points = {
        latitude: number,
        longitude: number
    }

    type GeocodeLoc = {
        lat: number | null,
        lng: number | null
    }

    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']

    const API_KEY = 'e89dc4f3378cef69e4b84e9c9eb693e989d6bfd'
    const GOOGLE_API_KEY = 'AIzaSyDL41cySPv0G0GsiKsVItoT4tYGlSgwE6M'

    const {account} = useAccount()
    

    const icons = {
        warehouse: colorScheme === 'dark' ? require('../../../assets/images/warehouse-dark.png') : require('../../../assets/images/warehouse-light.png'),
        house: colorScheme === 'dark' ? require('../../../assets/images/house-dark.png') : require('../../../assets/images/house-light.png'),
        default: colorScheme === 'dark' ? require('../../../assets/images/default_pfp_dark.png') : require('../../../assets/images/default_pfp_light.png')
    }

    const [highlitedWarehouse, setHighlitedWarehouse] = useState<number | null>(null)
    const [region, setRegion] = useState<Region>()
    const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null)
    const [nearestWarehousePoints, setNearestWarehousePoints] = useState<Points[]>([])
    const [isCellLoc, setIsCellLoc] = useState(false) // To signify if we show the house icon or the marker icon


    //Gets cell location using Expo-Location
    const getLocation = async () : Promise<Region> => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return {
                longitude: 0,
                latitude: 0,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            }
        }

        let location = await Location.getCurrentPositionAsync({});

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }
    }

    // Gets user's address location using geocoding's API
    const getUserLocation = async () : Promise<Region> => { 
        let userAdress = account?.address        
        userAdress = userAdress?.replaceAll(' ', '+').replaceAll(',', '') //Formats user adress to a query string for geocode API

        let userCountry = userAdress?.substring(userAdress.lastIndexOf('+')) ?? '' //Gets the full country string plus the + sign out of userAdress
        let userCountryCode = userCountry?.substring(0, 3).toUpperCase().replace('+', '') ?? '' //Parses userCountry to a country code eg. +Canada -> CA

        userAdress = userAdress?.replace(userCountry, '') //Removes userCountry from the query string

        const res = await fetch(`https://api.geocod.io/v1.12/geocode?q=${userAdress}&api_key=${API_KEY}&country=${userCountryCode}`)

        const data = await res.json()


        let location:GeocodeLoc = data.results[0].location

        console.log("location", location)

        if (Object.values(location)[0] == null) //location was not found
        {
            console.log("isCellLoc true")
            setIsCellLoc(true)
            //lets get the cell location instead
            const cellLocation = await getLocation()

            location = { //format to geocode format
                lat: cellLocation.latitude,
                lng: cellLocation.longitude
            }
        }
        else {
            setIsCellLoc(false)
        }
        
        setUserLocation({
            latitude: location.lat ?? 0,
            longitude: location.lng ?? 0
        })
        // let's find the nearest warehouse
        const nearestWarehouse = findNearestWarehouse({ longitude: location.lng ?? 0, latitude: location.lat ?? 0 })
        
        if(nearestWarehouse){
            //Now that we have the nearest warehouse, let's fetch its route from user location
            //origin being the user location and destination being the warehouse
            fetchRoute(/* origin */{ latitude: location.lat ?? 0, longitude: location.lng ?? 0}, /* destination */{ latitude: nearestWarehouse.latitude, longitude: nearestWarehouse.longitude })
                .then((points) => {
                    setNearestWarehousePoints(points)
                })
                .catch(err =>
                    console.log("cant fetch points", err.message)
                )
        }

        return {
            latitude: location.lat ?? 0,
            longitude: location.lng ?? 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }       
    }

    const findNearestWarehouse = (userLoc: {latitude: number, longitude: number}) => {
        const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => { //Haversine formula
            const R = 6371 // Earth curvature
            const dLat = (lat2 - lat1) * Math.PI / 180
            const dLon = (lon2 - lon1) * Math.PI / 180
            const a = Math.sin(dLat/2) ** 2 +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon/2) ** 2
            return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        }

        return warehouses.reduce((nearest, warehouse) => { //Goes through warehouses array keeping the nearest so far
            const dist = getDistance(userLoc.latitude, userLoc.longitude, warehouse.latitude, warehouse.longitude)
            return dist < nearest.dist ? { warehouse, dist } : nearest
        }, { warehouse: warehouses[0], dist: Infinity }).warehouse //returns the warehouse object 
    }

    const decodePolyline = (encoded: string): Points[] => {
        const points: Points[] = []
        let index = 0, lat = 0, lng = 0

        // Method found in googles doc for Directions API: 
        // https://developers.google.com/maps/documentation/utilities/polylinealgorithm

        while (index < encoded.length) { // for each encoded point
            let b, shift = 0, result = 0
            do {
                b = encoded.charCodeAt(index++) - 63 // goggle adds 63 before encoding
                result |= (b & 0x1f) << shift // Left shifts the binary value 
                shift += 5 // increments shift value by 5 (five bits chunk)
            } while (b >= 0x20) // while there's another chunk that follows
            lat += result & 1 ? ~(result >> 1) : result >> 1 

            shift = 0; result = 0
            do {
                b = encoded.charCodeAt(index++) - 63
                result |= (b & 0x1f) << shift
                shift += 5
            } while (b >= 0x20)
            lng += result & 1 ? ~(result >> 1) : result >> 1

            points.push({ latitude: lat / 1e5, longitude: lng / 1e5 })
        }
        return points
    }

    const fetchRoute = async (origin: {latitude: number, longitude: number}, destination: {latitude: number, longitude: number}) => {
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?` +
            `origin=${origin.latitude},${origin.longitude}` +
            `&destination=${destination.latitude},${destination.longitude}` +
            `&mode=driving` +
            `&key=${GOOGLE_API_KEY}`
        )
        const data = await res.json() //Encoded polyline points

        if (data.routes.length === 0) return []

        // Returns decoded polyline points
        const points = decodePolyline(data.routes[0].overview_polyline.points)
        return points
    }
    
    useEffect(() => {
        getUserLocation()
            .then(loc => {
                setRegion(loc);
            })
    }, [])

    useEffect(() => {
        console.log('cell loc', isCellLoc)
    }, [isCellLoc])

    const s = StyleSheet.create({
        container: {
            flex: 4,
            alignItems: 'center',
            width: '100%',
        },
        mapContainer: {
            flex: 3,
            width: '100%',
        },
        controlsContainer: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
            backgroundColor: colors.background,
            borderTopWidth: 2,
            borderColor: colors.tint,
        },
        warehousBtn: {
            padding: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.tint,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'column'
        },
        houseBtn: {
            backgroundColor: colors.tint,
            flexDirection: 'row',
            gap:4
        }

    })

    return (
        <View style={s.container}>
            <View style={s.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ height: '100%', width: '100%' }}
                    region={region}
                >
                    {warehouses.map((warehouse, i) => {
                        return (
                            <View key={`w-${i}`}>
                                <Marker
                                    key={warehouse.id}
                                    coordinate={{latitude: warehouse.latitude, longitude: warehouse.longitude}}
                                    title={`Warehouse ${warehouse.id}`}
                                    description={`This is warehouse ${warehouse.id}`}
                                    icon={icons.warehouse}
                                />
                                {/* circle around the warehouse */}
                                <Circle
                                    key={`circle-${warehouse.id}`}
                                    center={{ latitude: warehouse.latitude, longitude: warehouse.longitude }}
                                    radius={5000}
                                    strokeWidth={5}
                                    strokeColor={highlitedWarehouse === warehouse.id ? colors.tint : colors.background}
                                />
                            </View>
                        )
                    })}
                    <Marker
                        coordinate={{
                            latitude: userLocation?.latitude ?? 0,
                            longitude: userLocation?.longitude ?? 0
                        }}
                        title={`Votre maison`} /* TODO: internationalize */
                        description={`C'est votre maison`} //TODO: internationalize                       
                        
                        {...(isCellLoc ? {icon: icons.default} : { icon: icons.house })}
                    />
                    {/* Road to nearest warehouse */}
                    <Polyline
                        coordinates={nearestWarehousePoints}
                        strokeColor='purple'
                        strokeWidth={5}
                    />
                </MapView>
            </View>
            <View style={s.controlsContainer}>
                <Text style={[typography.subtitle, { color: colors.text }]}>Entrepôts</Text>
                {/* TODO: internationalize */}
                <ScrollView
                    horizontal
                    contentContainerStyle={{alignItems: 'center', gap: 8, paddingHorizontal: 8}}
                    showsHorizontalScrollIndicator={false}
                >
                    {warehouses.map((warehouse) => {
                        const highlighted = highlitedWarehouse === warehouse.id
                        return (
                            <TouchableOpacity key={warehouse.id} onPress={() => {
                                const warehouseRegion = {
                                    latitude: warehouse.latitude,
                                    longitude: warehouse.longitude,
                                    latitudeDelta: 0.1,
                                    longitudeDelta: 0.1
                                }
                                setRegion(warehouseRegion)
                                setHighlitedWarehouse(warehouse.id)
                            }} style={[s.warehousBtn, { backgroundColor: highlighted ? colors.tint : 'transparent' }]}>
                                <FontAwesome5 name="warehouse" size={32} color={highlighted ? colors.text : colors.tint} />
                                <Text style={[typography.subtitle, { color: colors.text }]}>{`Warehouse ${warehouse.id}`}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <TouchableOpacity style={[s.warehousBtn, s.houseBtn]}
                    onPress={() => {
                        setHighlitedWarehouse(-1)
                        setRegion({
                            longitude: userLocation?.longitude ?? 0,
                            latitude: userLocation?.latitude ?? 0,
                            latitudeDelta: 0.1,
                            longitudeDelta:0.1
                        })
                    }}
                >
                    <FontAwesome5 name="location-arrow" size={20} color={colors.text} />
                    <Text style={[typography.subtitle, { color: colors.text, fontSize:16, }]}>
                        Ma maison
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}