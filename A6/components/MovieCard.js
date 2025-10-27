// Componente para exibir um card de filme na lista
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getImageUrl } from "../services/tmdbService";

const MovieCard = ({ movie, onPress }) => {
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(movie)}
      activeOpacity={0.7}
    >
      <View style={styles.posterContainer}>
        {posterUrl ? (
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noPoster}>
            <Text style={styles.noPosterText}>Sem Imagem</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>

        <View style={styles.metaContainer}>
          <Text style={styles.year}>{releaseYear}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>{rating}</Text>
          </View>
        </View>

        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview || "Sem sinopse disponível."}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 14,
    shadowColor: "#e50914",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  posterContainer: {
    width: 110,
    height: 165,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#2a2a2a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  noPoster: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
  },
  noPosterText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  year: {
    fontSize: 14,
    color: "#999",
    fontWeight: "600",
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(229, 9, 20, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  star: {
    fontSize: 16,
    marginRight: 4,
  },
  rating: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e50914",
  },
  overview: {
    fontSize: 13,
    color: "#aaa",
    lineHeight: 20,
  },
});

export default MovieCard;
