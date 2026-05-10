import { useColorScheme } from 'react-native'
import {typography} from '../constants/typography'
import Colors from '../constants/Colors'
import GooglePlacesTextInput from 'react-native-google-places-textinput'

export default function AdressAutocomplete({inputStyle, value, setValue, showClearButton=true, readOnly=false, numberOfLines=1}) {
    const GOOGLE_MAPS_API_KEY = 'AIzaSyDL41cySPv0G0GsiKsVItoT4tYGlSgwE6M'
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? "light"]
    
    return (
        <GooglePlacesTextInput
            placeHolderText='Adresse'
            value={value}
            onPlaceSelect={(place) => {
                console.log("place:", place.details.formattedAddress)
                setValue(place.details.formattedAddress)
            }}
            fetchDetails={true}
            apiKey={GOOGLE_MAPS_API_KEY}
            languageCode='ca'
            showClearButton={showClearButton}
            readOnly={readOnly}
            numberOfLines={numberOfLines}
            multiline={numberOfLines > 1}
            style={{
                container:{justifyContent:'center', width:'100%', borderWidth:0},
                inputContainer:[inputStyle, { padding:0, alignItems:'center', justifyContent:'center', paddingTop:8}] ,
                input: {
                    ...typography.body,
                    justifyContent: 'center',
                    alignItems:'center', 
                    color: colors.text,
                    fontSize:inputStyle.fontSize??16
                },
                suggestionsContainer: {
                    borderWidth: 1, 
                    borderTopWidth: 0,
                    borderColor: colors.tint,
                    backgroundColor: colors.background,
                },
                suggestionText: {
                    main: {
                        ...typography.body,
                        color: colors.text,
                    },
                    secondary: {
                        ...typography.subtitle,
                        color: colors.text,
                        fontSize: 14,
                    }
                },
                
            }}    
        />
    )
}