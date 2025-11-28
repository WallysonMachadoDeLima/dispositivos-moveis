import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import 'react-native-gesture-handler';

// Screens
import AboutScreen from './screens/AboutScreen';
import HomeScreen from './screens/HomeScreen';

// Exercises
import Exercise0_Introduction from './exercises/Exercise0_Introduction';
import Exercise10_Quiz from './exercises/Exercise10_Quiz';
import Exercise1_State from './exercises/Exercise1_State';
import Exercise2_Effect from './exercises/Exercise2_Effect';
import Exercise3_FlatList from './exercises/Exercise3_FlatList';
import Exercise4_NativeAPIs from './exercises/Exercise4_NativeAPIs';
import Exercise5_Styling from './exercises/Exercise5_Styling';
import Exercise6_Components from './exercises/Exercise6_Components';
import Exercise7_Forms from './exercises/Exercise7_Forms';
import Exercise8_Advanced from './exercises/Exercise8_Advanced';
import Exercise9_CodeChallenge from './exercises/Exercise9_CodeChallenge';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#151B2B',
          borderBottomColor: '#2A3250',
          borderBottomWidth: 1,
        },
        headerTintColor: '#E8EEFF',
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exercise0"
        component={Exercise0_Introduction}
        options={{ title: 'Introdução ao React Native' }}
      />
      <Stack.Screen
        name="Exercise1"
        component={Exercise1_State}
        options={{ title: 'useState Hook' }}
      />
      <Stack.Screen
        name="Exercise2"
        component={Exercise2_Effect}
        options={{ title: 'useEffect Hook' }}
      />
      <Stack.Screen
        name="Exercise3"
        component={Exercise3_FlatList}
        options={{ title: 'FlatList' }}
      />
      <Stack.Screen
        name="Exercise4"
        component={Exercise4_NativeAPIs}
        options={{ title: 'APIs Nativas' }}
      />
      <Stack.Screen
        name="Exercise5"
        component={Exercise5_Styling}
        options={{ title: 'Estilos & Layouts' }}
      />
      <Stack.Screen
        name="Exercise6"
        component={Exercise6_Components}
        options={{ title: 'Criando Componentes' }}
      />
      <Stack.Screen
        name="Exercise7"
        component={Exercise7_Forms}
        options={{ title: 'Formulários' }}
      />
      <Stack.Screen
        name="Exercise8"
        component={Exercise8_Advanced}
        options={{ title: 'Mini-Game Avançado' }}
      />
      <Stack.Screen
        name="Exercise9"
        component={Exercise9_CodeChallenge}
        options={{ title: 'Desafio de Código' }}
      />
      <Stack.Screen
        name="Exercise10"
        component={Exercise10_Quiz}
        options={{ title: 'Quiz Final' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#151B2B',
              borderTopColor: '#2A3250',
              borderTopWidth: 1,
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            tabBarActiveTintColor: '#6C8CFF',
            tabBarInactiveTintColor: '#A9B4D0',
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{
              tabBarLabel: 'Exercícios',
              tabBarIcon: ({ color }) => <TabIcon emoji="📚" color={color} />,
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              tabBarLabel: 'Sobre',
              tabBarIcon: ({ color }) => <TabIcon emoji="ℹ️" color={color} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}

// Componente customizado para ícones das tabs
function TabIcon({ emoji }) {
  return <Text style={{ fontSize: 24 }}>{emoji}</Text>;
}
