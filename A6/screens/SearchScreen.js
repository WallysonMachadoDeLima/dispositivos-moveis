// Tela de busca de filmes
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/tmdbService";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Carrega filmes populares ao iniciar
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPopularMovies(1);
      setMovies(data.results);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError("Erro ao carregar filmes populares. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) {
      loadPopularMovies();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPage(1);
      const data = await searchMovies(query, 1);

      if (data.results.length === 0) {
        setError("Nenhum filme encontrado. Tente outra busca.");
        setMovies([]);
      } else {
        setMovies(data.results);
        setHasMore(data.page < data.total_pages);
      }
    } catch (err) {
      setError(
        "Erro ao buscar filmes. Verifique sua conexão e tente novamente."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = searchQuery.trim()
        ? await searchMovies(searchQuery, nextPage)
        : await getPopularMovies(nextPage);

      setMovies([...movies, ...data.results]);
      setPage(nextPage);
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      console.error("Erro ao carregar mais filmes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate("MovieDetails", { movieId: movie.id });
  };

  const renderMovieItem = ({ item }) => (
    <MovieCard movie={item} onPress={handleMoviePress} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#e50914" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error || "Busque por filmes ou veja os populares!"}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 Busca de Filmes</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do filme..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => handleSearch()}
          >
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {searchQuery.trim() && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearchQuery("");
              loadPopularMovies();
            }}
          >
            <Text style={styles.clearButtonText}>Limpar e ver populares</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading && movies.length === 0 ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator size="large" color="#e50914" />
          <Text style={styles.loadingText}>Carregando filmes...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  header: {
    backgroundColor: "#1a1a1a",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    shadowColor: "#e50914",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 20,
    letterSpacing: 1,
    textShadowColor: "rgba(229, 9, 20, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 52,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    marginRight: 12,
    color: "#ffffff",
    borderWidth: 2,
    borderColor: "#3a3a3a",
  },
  searchButton: {
    backgroundColor: "#e50914",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#e50914",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  clearButton: {
    marginTop: 14,
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(229, 9, 20, 0.15)",
    borderRadius: 20,
  },
  clearButtonText: {
    color: "#e50914",
    fontSize: 13,
    fontWeight: "600",
  },
  listContent: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  centerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },
  footerLoader: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    lineHeight: 26,
  },
});

export default SearchScreen;
