import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { RootStackParams } from "../../navigation/Navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { useMovie } from "../../hooks/useMovie";
import { MovieHeader } from "../../components/movies/movie/MovieHeader";
import { MovieDetails } from "./MovieDetails";
import { ScrollView } from "react-native-gesture-handler";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";

interface Props extends StackScreenProps<RootStackParams, 'Details'> { };

export const DetailScreen = ({ route }: Props) => {
    const { movieId } = route.params;
    const { isLoading, movie, cast = [] } = useMovie(movieId);

    if (isLoading) {
        return (<FullScreenLoader/>);
    }

    return (
        <ScrollView>
            <MovieHeader
                originalTitle={movie!.originalTitle}
                title={movie!.title}
                poster={movie!.poster}
            />
            <MovieDetails
                movie={movie!}
                cast={cast}
            />
        </ScrollView>
    )

}