import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, CardItem, Body } from "native-base";
import axios from "axios";
import { API, API_POST_ID } from "../hooks/useAPI";
import { DarkTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { color } from "react-native-reanimated";

export default function ShowScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ntrp, setNtrp] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setMobile] = useState("");
  const [msg, setMsg] = useState("");

  const [id, setID] = useState(route.params.id);
  const [loading, setLoading] = useState(false);
  const isDarkModeOn = useSelector((state) => state.prefs.darkMode);

  // Start when loaded
  useEffect(() => {
    //Retrive post by ID
    retrivePost(id);

    // Add home icon to header right
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => editPressed(id)}
        >
          <MaterialCommunityIcons
            name="file-document-edit-outline"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  // Retrive posts
  async function retrivePost(recID) {
    console.log("--- Post retriving --- ");

    try {
      setLoading(true);
      const response = await axios.get(API + API_POST_ID + recID);
      console.log("Title: " + response.data.title);
      console.log("Content: " + response.data.content);
      console.log("Ntrp: " + response.data.ntrp);
      console.log("Location: " + response.data.location);
      console.log("Mobile: " + response.data.mobile);

      setTitle(response.data.title);
      setContent(response.data.content);
      setNtrp(response.data.ntrp);
      setLocation(response.data.location);
      setMobile(response.data.mobile);

      console.log("Post retrive successful!");
    } catch (error) {
      console.log("Error retriving post!");
    } finally {
      setLoading(false);
    }
  }

  function editPressed(recID) {
    return navigation.navigate("Edit", { id: recID });
  }

  function backPressed() {
    return navigation.navigate("Index", { action: "show" });
  }

  return (
    <View
      style={[
        commonStyles.container,
        isDarkModeOn && { backgroundColor: "black" },
      ]}
    >
      <Card style={[styles.card, isDarkModeOn && { backgroundColor: "black" }]}>
        <CardItem
          style={[styles.card, isDarkModeOn && { backgroundColor: "black" }]}
        >
          <Body>
            <Text
              style={[styles.cardTitle, isDarkModeOn && { color: "white" }]}
            >
              {title}
            </Text>
            <Text
              style={styles.cardBody}
              style={[styles.cardBody, isDarkModeOn && { color: "white" }]}
            >
              NTRP Level: {ntrp}
            </Text>
            <Text style={[styles.cardBody, isDarkModeOn && { color: "white" }]}>
              {location}
            </Text>
            <Text style={[isDarkModeOn && { color: "white" }]}>{content}</Text>

            <Text
              // style={{ color: "blue" }}
              style={[{ color: "blue" }, isDarkModeOn && { color: "skyblue" }]}
              onPress={() =>
                Linking.openURL(
                  "whatsapp://send?text=" + msg + "&phone=65" + mobile
                )
              }
            >
              WhatsApp: {mobile}
            </Text>

            <Text style={styles.cardTitle2}>
              Click below to check your NTRP rating (National Tennis Rating
              Program)
            </Text>
            <Text
              style={[{ color: "blue" }, isDarkModeOn && { color: "skyblue" }]}
              onPress={() =>
                Linking.openURL(
                  "https://www.usta.com/content/dam/usta/pdfs/NTRP%20General%20Characteristics.pdf"
                )
              }
            >
              NTRP Rating Guide
            </Text>
            <Image
              source={require("../assets/player.gif")}
              style={{
                height: 380,
                alignItems: "center",
                width: 300,
                marginTop: 35,
                borderRadius: 1,
              }}
            />
          </Body>
        </CardItem>
      </Card>
      {/* <TouchableOpacity
        style={[styles.button, styles.buttonBack]}
        onPress={() => backPressed()}
      >
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator size="large" color="red" /> : "Back"}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    padding: 5,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonBack: {
    backgroundColor: "green",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardTitle2: {
    fontSize: 16,
    color: "orange",
    fontWeight: "bold",
    marginTop: 18,
  },
  cardBody: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 3,
  },

  card: {
    flex: 1,
    width: "90%",
  },
});
