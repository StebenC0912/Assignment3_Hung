import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useMemo, useEffect, useContext } from "react";
import { TransactionContext } from "../data/store/TransactionContext";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import TransactionItem from "../components/TransactionItem";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function HomeScreen() {
  const context = useContext(TransactionContext);
  const categories = context.categories;
  const Transactions = context.transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const balance = useMemo(() => {
    const income = Transactions.filter(
      (transaction) =>
        transaction.type === "income" &&
        new Date(transaction.date).getFullYear() === currentYear &&
        new Date(transaction.date).getMonth() === currentMonthIndex
    );
    const expense = Transactions.filter(
      (transaction) =>
        transaction.type === "expense" &&
        new Date(transaction.date).getFullYear() === currentYear &&
        new Date(transaction.date).getMonth() === currentMonthIndex
    );
    const totalIncome = income.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    const totalExpense = expense.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    return totalIncome - totalExpense;
  }, [Transactions, currentMonthIndex, currentYear]);
  const displayTransactions = useMemo(() => {
    return Transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === currentYear &&
        transactionDate.getMonth() === currentMonthIndex
      );
    });
  }, [Transactions, currentMonthIndex, currentYear]);
  const income = useMemo(() => {
    const income = Transactions.filter(
      (transaction) =>
        transaction.type === "income" &&
        new Date(transaction.date).getFullYear() === currentYear &&
        new Date(transaction.date).getMonth() === currentMonthIndex
    );
    return income.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  }, [Transactions, currentMonthIndex, currentYear]);
  const expense = useMemo(() => {
    const expense = Transactions.filter(
      (transaction) =>
        transaction.type === "expense" &&
        new Date(transaction.date).getFullYear() === currentYear &&
        new Date(transaction.date).getMonth() === currentMonthIndex
    );
    return expense.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  }, [Transactions, currentMonthIndex, currentYear]);
  const handleLeftArrow = () => {
    let prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    let prevYear = currentYear;
    if (prevMonthIndex === 11) {
      prevYear--;
    }
    setCurrentMonthIndex(prevMonthIndex);
    setCurrentYear(prevYear);
  };
  const handleRightArrow = () => {
    if (
      currentMonthIndex === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      return;
    }

    let nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
    let nextYear = currentYear;
    if (nextMonthIndex === 0) {
      nextYear++;
    }
    setCurrentMonthIndex(nextMonthIndex);
    setCurrentYear(nextYear);
  };
  const transactionList = useMemo(() => {
    // Create an object to store transactions by date
    const transactionsByDate = {};

    // Iterate over displayTransactions to group transactions by date
    displayTransactions.forEach((transaction) => {
      const dateString = transaction.date.toISOString().split("T")[0]; // Get date string in 'YYYY-MM-DD' format
      if (transactionsByDate[dateString]) {
        transactionsByDate[dateString].push(transaction.id); // Add transaction ID to existing date entry
      } else {
        transactionsByDate[dateString] = [transaction.id]; // Create new date entry with transaction ID
      }
    });

    // Convert the object to an array of objects
    return Object.entries(transactionsByDate).map(([date, ids]) => ({
      date,
      ids,
    }));
  }, [displayTransactions]);

  return (
    <ScrollView>
      <View>
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
        <View
          style={StyleSheet.create({
            marginTop: 50,
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Text
            style={StyleSheet.create({
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 10,
            })}
          >
            Hello Hung
          </Text>
          <View
            style={StyleSheet.create({
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              padding: 20,
            })}
          >
            <TouchableOpacity onPress={handleLeftArrow}>
              <Ionicons name="chevron-back" color={"white"} size={24} />
            </TouchableOpacity>
            <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
              {monthNames[currentMonthIndex]} {currentYear}
            </Text>
            <TouchableOpacity onPress={handleRightArrow}>
              <Ionicons name="chevron-forward" color={"white"} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={StyleSheet.create({
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "center",
          paddingHorizontal: 5,
          paddingVertical: 20,
          borderWidth: 1,
          borderColor: "#0D3A66",
        })}
      >
        <View
          style={StyleSheet.create({
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Text>Income</Text>
          <Text style={{ color: "green" }}>
            $
            {income.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          </Text>
        </View>
        <View
          style={StyleSheet.create({
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Text>Expense</Text>
          <Text style={{ color: "red" }}>
            $
            {expense.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          </Text>
        </View>
        <View
          style={StyleSheet.create({
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Text>Balance</Text>
          <Text style={{ color: balance >= 0 ? "green" : "red" }}>
            $
            {balance.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          </Text>
        </View>
      </View>
      <FlatList
        scrollEnabled={false}
        data={transactionList}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
            <TransactionItem date={item.date} transactions={item.ids.map(id => displayTransactions.find(transaction => transaction.id === id))} />
        )}
      />
    </ScrollView>
  );
}
