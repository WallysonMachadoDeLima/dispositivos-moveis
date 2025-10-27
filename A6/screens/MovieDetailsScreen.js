// Tela de detalhes do filme
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { TMDB_CONFIG } from "../config/tmdb";
import {
    getImageUrl,
    getMovieCredits,
    getMovieDetails,
} from "../services/tmdbService";

const { width } = Dimensions.get("window");

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const [movieData, creditsData] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
      ]);

      setMovie(movieData);
      setCredits(creditsData);
    } catch (err) {
      setError("Erro ao carregar detalhes do filme. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || "Filme não encontrado"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadMovieDetails}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const backdropUrl = getImageUrl(
    movie.backdrop_path,
    TMDB_CONFIG.BACKDROP_SIZE
  );
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const genres = movie.genres
    ? movie.genres.map((g) => g.name).join(", ")
    : "N/A";

  const director = credits?.crew?.find((person) => person.job === "Director");
  const mainCast = credits?.cast?.slice(0, 5) || [];

  return (
    <ScrollView style={styles.container}>
      {/* Backdrop */}
      {backdropUrl && (
        <Image
          source={{ uri: backdropUrl }}
          style={styles.backdrop}
          resizeMode="cover"
        />
      )}

      {/* Header com botão voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        {/* Poster e informações principais */}
        <View style={styles.headerSection}>
          {posterUrl && (
            <Image
              source={{ uri: posterUrl }}
              style={styles.poster}
              resizeMode="cover"
            />
          )}

          <View style={styles.mainInfo}>
            <Text style={styles.title}>{movie.title}</Text>

            {movie.tagline && (
              <Text style={styles.tagline}>"{movie.tagline}"</Text>
            )}

            <View style={styles.metaRow}>
              <View style={styles.ratingBox}>
                <Text style={styles.ratingLabel}>⭐ Avaliação</Text>
                <Text style={styles.ratingValue}>{rating}/10</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Informações adicionais */}
        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Ano</Text>
            <Text style={styles.infoValue}>{releaseYear}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Duração</Text>
            <Text style={styles.infoValue}>{runtime}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Votos</Text>
            <Text style={styles.infoValue}>{movie.vote_count}</Text>
          </View>
        </View>

        {/* Gêneros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gêneros</Text>
          <Text style={styles.genresText}>{genres}</Text>
        </View>

        {/* Sinopse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.overview}>
            {movie.overview || "Sinopse não disponível."}
          </Text>
        </View>

        {/* Diretor */}
        {director && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Direção</Text>
            <Text style={styles.directorText}>{director.name}</Text>
          </View>
        )}

        {/* Elenco principal */}
        {mainCast.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Elenco Principal</Text>
            {mainCast.map((actor) => (
              <View key={actor.id} style={styles.castItem}>
                <Text style={styles.actorName}>{actor.name}</Text>
                <Text style={styles.characterName}>como {actor.character}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Informações extras */}
        {movie.budget > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Orçamento</Text>
            <Text style={styles.budgetText}>
              ${movie.budget.toLocaleString("pt-BR")}
            </Text>
          </View>
        )}

        {movie.revenue > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Receita</Text>
            <Text style={styles.revenueText}>
              ${movie.revenue.toLocaleString("pt-BR")}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 18,
    color: "#e50914",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },
  retryButton: {
    backgroundColor: "#e50914",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#e50914",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  backdrop: {
    width: width,
    height: 260,
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 20,
    backgroundColor: "rgba(229, 9, 20, 0.9)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    zIndex: 10,
    shadowColor: "#e50914",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  contentContainer: {
    padding: 20,
  },
  headerSection: {
    flexDirection: "row",
    marginBottom: 24,
  },
  poster: {
    width: 130,
    height: 195,
    borderRadius: 12,
    backgroundColor: "#2a2a2a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  mainInfo: {
    flex: 1,
    marginLeft: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 10,
    letterSpacing: 0.5,
    lineHeight: 30,
  },
  tagline: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#999",
    marginBottom: 14,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  ratingBox: {
    backgroundColor: "rgba(229, 9, 20, 0.2)",
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(229, 9, 20, 0.3)",
  },
  ratingLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
    fontWeight: "600",
  },
  ratingValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#e50914",
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
    backgroundColor: "#1a1a1a",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  infoBox: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#e50914",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  genresText: {
    fontSize: 15,
    color: "#aaa",
    fontWeight: "500",
  },
  overview: {
    fontSize: 15,
    color: "#ccc",
    lineHeight: 24,
  },
  directorText: {
    fontSize: 16,
    color: "#aaa",
    fontWeight: "600",
  },
  castItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#e50914",
  },
  actorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  characterName: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  budgetText: {
    fontSize: 18,
    color: "#4ade80",
    fontWeight: "700",
  },
  revenueText: {
    fontSize: 18,
    color: "#60a5fa",
    fontWeight: "700",
  },
});

export default MovieDetailsScreen;
