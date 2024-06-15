import { View, Text } from "react-native"
import { useMovies } from "../../hooks/useMovies"
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PosterCarousel } from "../../components/movies/PosterCarouse";
import { HorizontalCarouse } from "../../components/movies/HorizontalCarousel";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies();

    if (isLoading) {
        return (<FullScreenLoader/>);
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20, paddingBottom: 30 }}>
                {/*  */}
                <PosterCarousel movies={nowPlaying} />
                <HorizontalCarouse
                    movies={popular}
                    title="Populares"
                    loadNextPage={popularNextPage}
                />
                <HorizontalCarouse
                    movies={topRated}
                    title="Mejor Calificadas"
                />
                <HorizontalCarouse
                    movies={upcoming}
                    title="Proximamente"
                />
            </View>
        </ScrollView>
    )
}