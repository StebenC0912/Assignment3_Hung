import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { TransactionContext } from "../data/store/TransactionContext";
import { getFormattedMonth } from "../data/models/date";
import { Dropdown } from "react-native-element-dropdown";

function AnalysisScreen() {
  const context = useContext(TransactionContext);
  const categories = context.categories;
  const transactions = context.transactions;
  const monthlyData = useMemo(() => {
    const monthlyTransactions = {};
    transactions.forEach((transaction) => {
      const date = getFormattedMonth(transaction.date); // Formatting date
      if (!monthlyTransactions[date]) {
        monthlyTransactions[date] = { income: 0, expense: 0 };
      }
      if (transaction.type === "income") {
        monthlyTransactions[date].income += transaction.amount;
      } else if (transaction.type === "expense") {
        monthlyTransactions[date].expense += transaction.amount;
      }
    });
    return monthlyTransactions;
  }, [transactions]);
  console.log(monthlyData);
  const balance = useMemo(() => {
    const income = transactions.filter(
      (transaction) => transaction.type === "income"
    );
    const expense = transactions.filter(
      (transaction) => transaction.type === "expense"
    );
    const totalIncome = income.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    const totalExpense = expense.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    return totalIncome - totalExpense;
  }, [transactions]);

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
              justifyContent: "center",
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

            <Text
              style={StyleSheet.create({
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: 45,
              })}
            >
              Analysis
            </Text>
          </View>
        </View>
        <View
          style={StyleSheet.create({
            alignContent: "center",
            justifyContent: "center",
          })}
        >
          <Text
            style={StyleSheet.create({
              color: balance >= 0 ? "green" : "red",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 45,
            })}
          >
            Current Balance: {balance}
          </Text>
        </View>
      </View>
      <FlatList
        scrollEnabled={false}
        data={Object.keys(monthlyData).map((key) => ({
          date: key,
          income: monthlyData[key].income,
          expense: monthlyData[key].expense,
        }))}
        renderItem={({ item }) => (
          <View
            style={StyleSheet.create({
              padding: 20,
            })}
          >
            <Text
              style={StyleSheet.create({
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
                paddingBottom: 10,
                borderBottomWidth: 1,
              })}
            >
              {item.date}
            </Text>
            <View
              style={StyleSheet.create({
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                backgroundColor: "#2F5F8A",
                borderRadius: 10,
                padding: 10,
                marginTop: 15,
                marginBottom: 7,
              })}
            >
              <Text
                style={StyleSheet.create({
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                })}
              >
                Income
              </Text>
              <Text
                style={StyleSheet.create({
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                })}
              >
                ${" "}
                {item.income.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </Text>
            </View>
            <View
              style={StyleSheet.create({
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                backgroundColor: "#FF1D1D",
                borderRadius: 10,
                padding: 10,
                marginTop: 7,
                marginBottom: 15,
              })}
            >
              <Text
                style={StyleSheet.create({
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                })}
              >
                Expense
              </Text>
              <Text
                style={StyleSheet.create({
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                })}
              >
                ${" "}
                {item.expense.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </Text>
            </View>
            <View
              style={StyleSheet.create({
                flexDirection: "row",
                justifyContent: "space-between",
                borderTopWidth: 1,
                paddingVertical: 10,
                padding: 10,
              })}
            >
              <Text
                style={StyleSheet.create({
                  fontSize: 16,
                  fontWeight: "bold",
                })}
              >
                Balance
              </Text>
              <Text
                style={StyleSheet.create({
                  fontSize: 16,
                  fontWeight: "bold",
                  color: item.income - item.expense >= 0 ? "green" : "red",
                })}
              >
                ${" "}{(item.income - item.expense).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                    })
                }
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.date}
      />
    </ScrollView>
  );
}

export default AnalysisScreen;
