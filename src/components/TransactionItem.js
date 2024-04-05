import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TransactionItem = ({ date, transactions }) => {
  return (
    <View style={{ alignContent: "center", justifyContent: "center" }}>
      <Text
        style={{
          color: "#115596",
          marginVertical: 20,
          textAlign: "center",
          fontSize: 20,
        }}
      >
        {date}
      </Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: "#0D3A66",
              borderBottomColor: "#0D3A66",
              marginHorizontal: 10,
              marginVertical: 8,
            }}
            onPress={() => {
              // Handle onPress if needed
            }}
          >
            <Ionicons
              name={item.category.icon}
              color={"#5B75FC"}
              size={24}
              style={{ marginRight: 10 }}
            />
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <Text
              style={{
                fontSize: 15,
                color: item.type === "income" ? "green" : "red",
              }}
            >
              ${item.amount.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </Text>
            <Ionicons name="chevron-forward" color={"#5B75FC"} size={18} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TransactionItem;
