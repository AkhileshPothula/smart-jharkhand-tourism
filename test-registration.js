// Test script to verify backend registration endpoint
// Run this with: node test-registration.js

const API_BASE_URL = 'http://localhost:5000';

const testRegistration = async () => {
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: '+91 9876543210',
    role: 'Tourist'
  };

  try {
    console.log('Testing registration endpoint...');
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('Response:', data);
    } else {
      console.log('❌ Registration failed!');
      console.log('Error:', data);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
};

testRegistration();
