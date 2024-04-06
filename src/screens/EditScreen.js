import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { TransactionContext } from "../data/store/TransactionContext";
import { Dropdown } from "react-native-element-dropdown";

function EditScreen(props) {
  const context = useContext(TransactionContext);
  const categories = context.categories;
  const id = props.route.params.id;
  const transaction = context.transactions.find(
    (transaction) => transaction.id === id
  );
  console.log(transaction);
  const displayCategories = categories.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });
  const [date, setDate] = useState(
    new Date(transaction.date).toISOString().slice(0, 10)
  );
  const dateRef = useRef(null);
  const [note, setNote] = useState(transaction.title);
  const noteRef = useRef(null);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const amountRef = useRef(null);
  const [category, setCategory] = useState({
    label: transaction.category.name,
    value: transaction.category.id,
  });
  const handleDelete = () => {
    context.deleteTransaction(id);
    alert("Transaction deleted");
    props.navigation.navigate("HomeScreen");
  };
  const handleSave = () => {
    if (!date || !note || !amount || !category) {
      alert("Please fill all fields");
      return;
    }
    if (date.charAt(4) !== "-" || date.charAt(7) !== "-") {
      alert("Invalid date format");
      return;
    }
    if (new Date(date) > new Date()) {
      alert("Invalid date");
      return;
    }
    let type = category.label === "Income" ? "income" : "expense";
    const selectedCategory = categories.find(
      (item) => item.id === category.value
    );
    context.updateTransaction(id, {
      title: note,
      amount: parseInt(amount),
      date: new Date(date),
      category: selectedCategory,
      type: type,
    });

    dateRef.current.clear();
    noteRef.current.clear();
    amountRef.current.clear();
    setCategory("");
    alert("Transaction updated");
    props.navigation.goBack();
  };
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
              Edit Transaction
            </Text>
            <View />
          </View>
        </View>
        <View
          style={StyleSheet.create({
            marginHorizontal: 20,
            marginTop: 30,
            marginBottom: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#5B75FC",
          })}
        >
          <Text
            style={StyleSheet.create({
              fontSize: 14,
              marginTop: 20,
              marginLeft: 20,
              marginBottom: 10,
            })}
          >
            Budget amount
          </Text>
          <View
            style={StyleSheet.create({
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginBottom: 20,
            })}
          >
            <Text
              style={StyleSheet.create({
                fontSize: 20,
                fontWeight: "bold",
              })}
            >
              $
            </Text>
            <TextInput
              ref={amountRef}
              value={amount}
              onChangeText={(value) => setAmount(value)}
              placeholder=""
              keyboardType="number-pad"
              textAlign="center"
              style={StyleSheet.create({
                flex: 1,
                fontSize: 20,
                fontWeight: "bold",
              })}
            />
          </View>
        </View>
        <View>
          <Dropdown
            placeholder="Select category"
            data={displayCategories}
            labelField={"label"}
            valueField={"value"}
            value={category}
            onChange={(value) => setCategory(value)}
            style={StyleSheet.create({
              borderWidth: 1,
              borderColor: "#5B75FC",
              padding: 15,
              borderRadius: 16,
              marginBottom: 10,
              marginTop: 20,
              marginHorizontal: 20,
            })}
          />
        </View>
        <View>
          <TextInput
            placeholder="Date YYYY-MM-DD"
            ref={dateRef}
            value={date}
            onChangeText={(value) => setDate(value)}
            style={StyleSheet.create({
              borderWidth: 1,
              borderColor: "#5B75FC",
              padding: 15,
              borderRadius: 16,
              marginBottom: 10,
              marginTop: 20,
              marginHorizontal: 20,
            })}
          />
        </View>
        <View>
          <TextInput
            ref={noteRef}
            onChangeText={(value) => setNote(value)}
            placeholder="Note"
            value={note}
            style={StyleSheet.create({
              borderWidth: 1,
              borderColor: "#5B75FC",
              padding: 15,
              borderRadius: 16,
              marginBottom: 10,
              marginTop: 20,
              marginHorizontal: 20,
            })}
          />
        </View>

        <TouchableOpacity
          style={StyleSheet.create({
            backgroundColor: "#5B75FC",
            marginHorizontal: 20,
            padding: 15,
            borderRadius: 16,
            alignItems: "center",
            marginTop: 20,
          })}
          onPress={handleSave}
        >
          <Text
            style={StyleSheet.create({
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            })}
          >
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.create({
            backgroundColor: "#FF1D1D",
            marginHorizontal: 20,
            padding: 15,
            borderRadius: 16,
            alignItems: "center",
            marginTop: 20,
          })}
          onPress={handleDelete}
        >
          <Text
            style={StyleSheet.create({
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            })}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EditScreen;
