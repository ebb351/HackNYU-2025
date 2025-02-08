import { StyleSheet, ScrollView, Switch, TouchableOpacity, useColorScheme } from "react-native"
import React from "react"
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from "@/utils/authenticationManager";
import { Ionicons } from "@expo/vector-icons"
import Colors from '@/constants/Colors';

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [isDynamicRoundingEnabled, setIsDynamicRoundingEnabled] = React.useState(false)

  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        <Text>Please log in to view your profile.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.greeting}>Hello, {}!</Text>
        <Text style={styles.impactText}>You've planted {} trees so far!</Text>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="settings-outline" size={24} color="#2E7D32" />
          <Text style={styles.settingText}>Settings</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Ionicons name="leaf-outline" size={24} color="#2E7D32" />
          <Text style={styles.settingText}>Dynamic Rounding</Text>
          <Switch
            value={isDynamicRoundingEnabled}
            onValueChange={setIsDynamicRoundingEnabled}
            trackColor={{ false: "#767577", true: "#81c784" }}
            thumbColor={isDynamicRoundingEnabled ? "#2E7D32" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="document-text-outline" size={24} color="#2E7D32" />
          <Text style={styles.settingText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="document-text-outline" size={24} color="#2E7D32" />
          <Text style={styles.settingText}>Terms of Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#2E7D32" />
          <Text style={styles.settingText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[useColorScheme() ?? 'light'].profileBackground,
  },
  hero: {
    backgroundColor: Colors[useColorScheme() ?? 'light'].profileHeroBg,
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors[useColorScheme() ?? 'light'].profileHeroText,
    marginBottom: 10,
  },
  impactText: {
    fontSize: 16,
    color: Colors[useColorScheme()?? 'light'].profileHeroText,
  },
  settingsContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors[useColorScheme() ?? 'light'].profileBorder,
  },
  settingText: {
    marginLeft: 15,
    fontSize: 16,
    color: Colors[useColorScheme() ?? 'light'].profileText,
    flex: 1,
  },
})

export default Profile

