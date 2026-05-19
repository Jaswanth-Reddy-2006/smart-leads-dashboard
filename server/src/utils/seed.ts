import mongoose from 'mongoose';
import { User } from '../models/User.model.js';
import { Lead } from '../models/Lead.model.js';
import { env } from '../config/env.js';

const mockLeadsData = [
  { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', status: 'Qualified', source: 'Instagram' },
  { name: 'Sneha Patel', email: 'sneha.patel@example.com', status: 'Contacted', source: 'Website' },
  { name: 'Vikram Singh', email: 'vikram.singh@example.com', status: 'New', source: 'Referral' },
  { name: 'Priya Iyer', email: 'priya.iyer@example.com', status: 'Lost', source: 'Website' },
  { name: 'Amit Verma', email: 'amit.verma@example.com', status: 'Qualified', source: 'Referral' },
  { name: 'Ananya Roy', email: 'ananya.roy@example.com', status: 'Contacted', source: 'Instagram' },
  { name: 'Rohan Gupta', email: 'rohan.gupta@example.com', status: 'New', source: 'Website' },
  { name: 'Divya Nair', email: 'divya.nair@example.com', status: 'Qualified', source: 'Instagram' },
  { name: 'Sanjay Dutt', email: 'sanjay.dutt@example.com', status: 'Lost', source: 'Website' },
  { name: 'Kiran Rao', email: 'kiran.rao@example.com', status: 'Contacted', source: 'Referral' },
  { name: 'Aditya Birla', email: 'aditya.birla@example.com', status: 'New', source: 'Website' },
  { name: 'Meera Sen', email: 'meera.sen@example.com', status: 'Qualified', source: 'Instagram' },
  { name: 'Rajesh Koothrappali', email: 'rajesh.k@example.com', status: 'Contacted', source: 'Referral' },
  { name: 'Neha Kakkar', email: 'neha.kakkar@example.com', status: 'New', source: 'Instagram' },
  { name: 'Vijay Mallya', email: 'vijay.mallya@example.com', status: 'Lost', source: 'Website' },
  { name: 'Pooja Hegde', email: 'pooja.hegde@example.com', status: 'Qualified', source: 'Referral' },
  { name: 'Arjun Kapoor', email: 'arjun.kapoor@example.com', status: 'Contacted', source: 'Website' },
  { name: 'Deepika Padukone', email: 'deepika.p@example.com', status: 'New', source: 'Instagram' },
  { name: 'Ranveer Singh', email: 'ranveer.singh@example.com', status: 'Qualified', source: 'Website' },
  { name: 'Alia Bhatt', email: 'alia.bhatt@example.com', status: 'Contacted', source: 'Referral' },
  { name: 'Ranbir Kapoor', email: 'ranbir.kapoor@example.com', status: 'Lost', source: 'Instagram' },
  { name: 'Kiara Advani', email: 'kiara.advani@example.com', status: 'New', source: 'Website' },
  { name: 'Siddharth Malhotra', email: 'sid.m@example.com', status: 'Qualified', source: 'Referral' },
  { name: 'Katrina Kaif', email: 'katrina.kaif@example.com', status: 'Contacted', source: 'Website' },
  { name: 'Vicky Kaushal', email: 'vicky.kaushal@example.com', status: 'New', source: 'Instagram' }
];

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(env.MONGO_URI);
    console.log('Connected.');

    // Clear existing data
    console.log('Clearing old users and leads...');
    await User.deleteMany({});
    await Lead.deleteMany({});
    console.log('Cleared.');

    // Create users
    console.log('Creating Admin and Sales users...');
    const adminUser = await User.create({
      name: 'Admin Manager',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const salesUser = await User.create({
      name: 'Sales Representative',
      email: 'sales@example.com',
      password: 'password123',
      role: 'sales',
    });
    console.log('Users created.');

    // Create leads
    console.log('Seeding mock leads...');
    const leadsToInsert = mockLeadsData.map((leadData, index) => {
      // Assign roughly half to admin, half to sales
      const createdBy = index % 2 === 0 ? adminUser._id : salesUser._id;
      return {
        ...leadData,
        createdBy,
      };
    });

    await Lead.insertMany(leadsToInsert);
    console.log(`Seeded ${leadsToInsert.length} leads successfully!`);

    console.log('\n--- DEMO ACCOUNTS ---');
    console.log('Admin User:');
    console.log('  Email: admin@example.com');
    console.log('  Password: password123');
    console.log('Sales User:');
    console.log('  Email: sales@example.com');
    console.log('  Password: password123');
    console.log('---------------------\n');

  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

seed();
