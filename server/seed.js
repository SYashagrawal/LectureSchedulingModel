const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');
const bcryptjs = require('bcryptjs');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create admin user
    const adminPassword = await bcryptjs.hash('admin123', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('✅ Admin user created: admin@example.com / admin123');

    // Create sample instructors
    const instructors = [
      { name: 'Rahul Kumar', email: 'rahul@example.com', password: 'instructor123' },
      { name: 'Priya Singh', email: 'priya@example.com', password: 'instructor123' },
      { name: 'Amit Patel', email: 'amit@example.com', password: 'instructor123' },
      { name: 'Neha Sharma', email: 'neha@example.com', password: 'instructor123' },
      { name: 'Vikram Das', email: 'vikram@example.com', password: 'instructor123' },
    ];

    for (const instructor of instructors) {
      const hashedPassword = await bcryptjs.hash(instructor.password, 10);
      const newInstructor = new User({
        name: instructor.name,
        email: instructor.email,
        password: hashedPassword,
        role: 'instructor',
      });
      await newInstructor.save();
      console.log(`✅ Instructor created: ${instructor.email}`);
    }

    console.log('\n✅ Database seeding completed!');
    console.log('\nDemo Credentials:');
    console.log('Admin - admin@example.com / admin123');
    console.log('Instructors - [any of the above] / instructor123');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
