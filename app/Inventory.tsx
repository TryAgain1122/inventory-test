'use client';

import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
  quantity: number;
}
function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetch('/api/items')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setItems(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, quantity })
    });

    if (res.ok) {
      const newItem: Item = await res.json(); // Ensure newItem is of type Item
      setItems([...items, newItem]);
      setName('');
      setDescription('');
      setQuantity(0);
    } else {
      console.error('Error creating item');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inventory System</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="border border-black"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Description"
            className="border border-black"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            placeholder="Quantity"
            className="border border-black"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Item
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory
