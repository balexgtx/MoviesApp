import { View, Text } from "react-native"
import { useMovies } from "../../hooks/useMovies"
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PosterCarousel } from "../../components/movies/PosterCarouse";

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, nowPlaying } = useMovies();

    if(isLoading){
        return (<Text>Cargando...</Text>);
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20, paddingBottom: 30 }}>
                <PosterCarousel movies={nowPlaying}/>
            </View>
        </ScrollView>
    )
}