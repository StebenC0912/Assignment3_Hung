export const Categories = [
  { id: 1, name: "Income", icon: "briefcase" },
  { id: 2, name: "Food", icon: "restaurant" },
  { id: 3, name: "Shopping", icon: "cart" },
  { id: 4, name: "Payment", icon: "credit-card" },
  { id: 5, name: "Other", icon: "heart" },
];

export const Transactions = [
  {
    id: 1,
    title: "Beef Steak",
    amount: 10, // $10.00
    date: new Date("2024-01-01"),
    category: Categories[1],
    type: "expense",
  },
  {
    id: 2,
    title: "T-shirt",
    amount: 20, // $20.00
    date: new Date("2024-01-02"),
    category: Categories[2],
    type: "expense",
  },
  {
    id: 3,
    title: "Salary",
    amount: 1000, // $1000.00
    date: new Date("2024-01-03"),
    category: Categories[0],
    type: "income",
  },
  {
    id: 4,
    title: "Other",
    amount: 5, // $5.00
    date: new Date("2024-01-04"),
    category: Categories[4],
    type: "expense",
  },
  {
    id: 5,
    title: "Beef Steak",
    amount: 10, // $10.00
    date: new Date("2024-01-05"),
    category: Categories[1],
    type: "expense",
  },
  {
    id: 6,
    title: "T-shirt",
    amount: 20, // $20.00
    date: new Date("2024-01-06"),
    category: Categories[2],
    type: "expense",
  },
  {
    id: 7,
    title: "Movie Tickets",
    amount: 15, // $15.00
    date: new Date("2024-01-07"),
    category: [3], // Entertainment (assuming category id 3)
    type: "expense",
  },
  {
    id: 8,
    title: "Groceries",
    amount: 50, // $50.00
    date: new Date("2024-01-08"),
    category: Categories[1], // Food
    type: "expense",
  },
  {
    id: 9,
    title: "Coffee",
    amount: 3.5, // $3.50
    date: new Date("2024-01-09"),
    category: Categories[1], // Food (could be a separate category for Drinks)
    type: "expense",
  },
  {
    id: 10,
    title: "Gift",
    amount: 25, // $25.00
    date: new Date("2024-01-10"),
    category: [5], // Others (assuming category id 5)
    type: "expense",
  },
  {
    id: 11,
    title: "Gym Membership",
    amount: 30, // $30.00 monthly
    date: new Date("2024-01-15"),
    category: [3], // Health & Fitness (assuming category id 3)
    type: "expense",
  },
  {
    id: 12,
    title: "Car Wash",
    amount: 12, // $12.00
    date: new Date("2024-01-20"),
    category: [4], // Transportation (assuming category id 4)
    type: "expense",
  },
  {
    id: 13,
    title: "Salary",
    amount: 1000, // $1000.00
    date: new Date("2024-01-31"),
    category: Categories[0], // Income
    type: "income",
  },
  {
    id: 14,
    title: "Rent",
    amount: 700, // $700.00 monthly
    date: new Date("2024-02-01"),
    category: [4], // Housing (assuming category id 4)
    type: "expense",
  },
  {
    id: 15,
    title: "Utilities",
    amount: 100, // $100.00 monthly
    date: new Date("2024-02-05"),
    category: [4], // Utilities (assuming category id 4)
    type: "expense",
  },
  {
    id: 16,
    title: "Online Shopping",
    amount: 75, // $75.00
    date: new Date("2024-02-10"),
    category: [3], // Shopping (assuming category id 3)
    type: "expense",
  },
  {
    id: 17,
    title: "Restaurant",
    amount: 20, // $20.00
    date: new Date("2024-02-14"),
    category: Categories[1], // Food
    type: "expense",
  },
  {
    id: 18,
    title: "Haircut",
    amount: 25, // $25.00
    date: new Date("2024-02-20"),
    category: [3], // Personal Care (assuming category id 3)
    type: "expense",
  },
  {
    id: 19,
    title: "Movie Tickets",
    amount: 15, // $15.00
    date: new Date("2024-02-25"),
    category: [3], // Entertainment (assuming category id 3)
    type: "expense",
  },
  {
    id: 20,
    title: "Freelance Income",
    amount: 500, // $500.00
    date: new Date("2024-03-01"),
    category: Categories[0], // Income (can be a separate category for Freelance)
    type: "income",
  },
  {
    id: 21,
    title: "Morning Coffee",
    amount: 250, // $2.50
    date: new Date("2024-04-01"),
    category: Categories[1],
    type: "expense",
  },
  {
    id: 22,
    title: "Movie Tickets for Saturday Night",
    amount: 1200, // $12.00
    date: new Date("2024-04-05"),
    category: Categories[2],
    type: "expense",
  },
  {
    id: 23,
    title: "Freelance Work Payment",
    amount: 3000, // $30.00
    date: new Date("2024-04-05"),
    category: Categories[0],
    type: "income",
  },
  {
    id: 24,
    title: "Weekly Groceries Shopping",
    amount: 3500, // $35.00
    date: new Date("2024-04-02"),
    category: Categories[1],
    type: "expense",
  },
  {
    id: 25,
    title: "Dinner at Fine Dining Restaurant",
    amount: 4000, // $40.00
    date: new Date("2024-04-04"),
    category: Categories[2],
    type: "expense",
  },
];
