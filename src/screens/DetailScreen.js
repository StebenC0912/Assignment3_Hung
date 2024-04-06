import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { TransactionContext } from "../data/store/TransactionContext";
import { getFormattedDate } from "../data/models/date";
function ExpenseDetailScreen(props) {
  const context = useContext(TransactionContext);
  const transaction = context.transactions.find(
    (transaction) => transaction.id === props.route.params.id
  );
  const handleEdit = () => {
    props.navigation.navigate("EditScreen", { id: transaction.id });
  }
  return (
    <ScrollView
      style={StyleSheet.create({
        backgroundColor: "white",
      })}
    >
      <View
        style={StyleSheet.create({
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
        })}
      >
        <View
          style={StyleSheet.create({
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          })}
        >
          <LinearGradient
            colors={["#125CA3", "#0D3A66"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "100%",
            }}
          />

          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={StyleSheet.create({
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 45,
            })}
          >
            Transaction Detail
          </Text>
          <View
            style={StyleSheet.create({
              width: 20,
            })}
          ></View>
        </View>

        <View
          style={StyleSheet.create({
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 50,
            elevation: 5,
            backgroundColor: "white",
            borderRadius: 12,
            alignItems: "center",
            marginBottom: 20,
          })}
        >
          <View
            style={StyleSheet.create({
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: "#BFC9FA",
              width: "100%",
            })}
          >
            <Text
              style={StyleSheet.create({
                fontSize: 16,
              })}
            >
              Amount
            </Text>
            <Text
              style={StyleSheet.create({
                fontSize: 16,
                fontWeight: "bold",
                color: transaction.type === "income" ? "green" : "red",
              })}
            >
              $
              {transaction.amount.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </Text>
          </View>
          <View>
            <View style={styles.detailContainer}>
              <Text>Date</Text>
              <Text>{getFormattedDate(transaction.date)}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text>Category</Text>
              <Text>{transaction.category.name}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text>Note</Text>
              <Text>{transaction.title}</Text>
            </View>
          </View>
        </View>

        <View
          style={StyleSheet.create({
            marginVertical: 30,
            marginHorizontal: 20,
          })}
        >
          <TouchableOpacity
            style={StyleSheet.create({
              backgroundColor: "#BFC9FA",
              marginHorizontal: 20,
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 20,
            })}
            onPress={handleEdit}
          >
            <Text
              style={StyleSheet.create({
                fontSize: 16,
                fontWeight: "bold",
              })}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    width: "100%",
  },
});
export default ExpenseDetailScreen;
