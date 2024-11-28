import React, { useState, useEffect } from "react";

import {
  ShoppingBag,
  ChevronRight,
  Plus,
  ShoppingCart,
  Minus,
  Trash2,
  Edit,
  Check,
  X,
  AlertCircle,
  Sun,
  Moon,
} from "lucide-react";

const Home = () => {
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [budget, setBudget] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", quantity: 1 });
  const [editingItem, setEditingItem] = useState(null);
  const [total, setTotal] = useState(0);

  // Calculate total whenever items change
  useEffect(() => {
    const calculatedTotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(parseFloat(calculatedTotal.toFixed(2)));
  }, [items]);

  // Add new item
  const addItem = () => {
    if (newItem.name.trim() && newItem.price) {
      const newItemToAdd = {
        ...newItem,
        id: Date.now(),
        price: parseFloat(newItem.price),
      };
      setItems([...items, newItemToAdd]);
      setNewItem({ name: "", price: "", quantity: 1 });
    }
  };

  // Remove item
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Edit item
  const startEditItem = (item) => {
    setEditingItem(item);
  };

  // Save edited item
  const saveEditedItem = () => {
    if (!editingItem) return;

    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );

    setItems(updatedItems);
    setEditingItem(null);
  };

  // Increment/Decrement quantity
  const changeQuantity = (id, change) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setItems(updatedItems);
  };

  // Budget Warning Component
  const BudgetWarning = () => {
    const isOverBudget = budget && total > parseFloat(budget);

    if (!isOverBudget) return null;

    return (
      <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg flex items-center space-x-4 mb-4">
        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-300" />
        <div>
          <h3 className="font-bold text-red-800 dark:text-red-200">
            Budget Exceeded!
          </h3>
          <p className="text-red-600 dark:text-red-300">
            Your total (${total}) is over the set budget of (${budget})
          </p>
        </div>
      </div>
    );
  };

  // Landing Page Component
  const LandingPage = () => (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <nav
        className={`p-6 flex justify-between items-center shadow-sm ${
          darkMode ? "bg-gray-800" : "bg-gray-800"
        }`}
      >
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-8 w-8 text-blue-600" />
          <span className="text-3xl font-bold  text-gray-800 dark:text-white">
            Grocyfy
          </span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 text-white dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </button>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Smart Grocery Shopping
            <span className="text-blue-600"> Reimagined</span>
          </h1>
          <p className="text-xl mb-8 text-blue dark:text-blue">
            Intelligent shopping list management that helps you track expenses,
            stay within budget, and shop smarter.
          </p>
          <button
            onClick={() => setShowShoppingList(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold
                     hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            Start Listing
            <ChevronRight className="ml-2" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            title="Smart Lists"
            description="Automatically categorize items and get intelligent suggestions based on your shopping history."
            icon={<ShoppingBag className="h-8 w-8 text-blue-600" />}
          />
          <FeatureCard
            title="Budget Tracking"
            description="Set budgets and track your spending in real-time as you add items to your list."
            icon={<ShoppingBag className="h-8 w-8 text-blue-600" />}
          />
          <FeatureCard
            title="Easy Navigation"
            description="User-friendly interface designed for one-handed use while shopping."
            icon={<ShoppingBag className="h-8 w-8 text-blue-600" />}
          />
        </div>
      </main>
    </div>
  );

  // Feature Card Component
  const FeatureCard = ({ title, description, icon }) => (
    <div
      className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-slate-200"} 
                    transition-transform hover:scale-105`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );

  // Shopping List Management Component
  const ShoppingListPage = () => (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Grocyfy
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 text-white dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Budget Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Set Budget</label>
          <input
            id="budgetInput"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Your shopping budget"
            className="w-full p-3 rounded-lg border dark:bg-gray-800 text-white dark:border-gray-700"
          />
        </div>

        {/* Budget Warning */}
        <BudgetWarning />

        {/* Total Display */}
        <div
          className={`mb-6 p-4 rounded-lg text-center text-2xl font-bold ${
            budget && total > parseFloat(budget)
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          }`}
        >
          Total: ${total.toFixed(2)}
        </div>

        {/* Add Item Form */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <input
            id="newItemInput"
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item name"
            className="w-full p-3 rounded-lg border dark:bg-gray-800 text-white dark:border-gray-700"
          />
          <input
            id="newItemPriceInput"
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            placeholder="Price"
            className="w-full p-3 rounded-lg border dark:bg-gray-800 text-white dark:border-gray-700"
          />
          <button
            onClick={addItem}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="mr-2" /> Add Item
          </button>
        </div>

        {/* Item List */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between"
            >
              {editingItem && editingItem.id === item.id ? (
                // Editing Mode
                <div className="flex items-center space-x-4 w-full">
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    className="flex-grow p-2 rounded border dark:bg-gray-700"
                  />
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="w-24 p-2 rounded border dark:bg-gray-700"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={saveEditedItem}
                      className="text-green-500 hover:text-green-600"
                    >
                      <Check />
                    </button>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X />
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        className="bg-gray-200 dark:bg-gray-700 text-white p-1 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        className="bg-gray-200 dark:bg-gray-700 text-white p-1 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <span className="font-semibold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditItem(item)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12 opacity-50">
            <ShoppingCart className="mx-auto h-16 w-16 mb-4" />
            <p>Your shopping list is empty. Start adding items!</p>
          </div>
        )}
      </main>
    </div>
  );

  return showShoppingList ? <ShoppingListPage /> : <LandingPage />;
};

export default Home;
