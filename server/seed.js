const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Doctor.deleteMany();

        // Create Admin
        const admin = await User.create({
            name: 'System Admin',
            email: 'admin@example.com',
            password: 'password123',
            role: 'Admin',
            gender: 'Male'
        });
        console.log('Admin created');

        // Create a Patient
        await User.create({
            name: 'Jane Patient',
            email: 'patient@example.com',
            password: 'password123',
            role: 'Patient',
            gender: 'Female'
        });
        console.log('Patient created');

        // Doctors Data definition
        const doctorsData = [
            {
                user: {
                    name: 'Dr. John Doe',
                    email: 'doctor@example.com',
                    password: 'password123',
                    role: 'Doctor',
                    gender: 'Male',
                    phone: '1234567890'
                },
                profile: {
                    specialization: 'Cardiology',
                    qualification: 'MBBS, MD',
                    experience: 15,
                    hospital: 'City Hospital',
                    consultationFee: 120,
                    bio: 'Expert cardiologist with 15 years of experience in diagnosing and treating cardiovascular diseases.',
                    availableDays: ['Monday', 'Tuesday', 'Wednesday'],
                    availableTime: '10:00 AM - 02:00 PM',
                    approvalStatus: 'Approved'
                }
            },
            {
                user: {
                    name: 'Dr. Jane Smith',
                    email: 'jane.smith@example.com',
                    password: 'password123',
                    role: 'Doctor',
                    gender: 'Female',
                    phone: '9876543210'
                },
                profile: {
                    specialization: 'Dermatology',
                    qualification: 'MBBS, DVD',
                    experience: 8,
                    hospital: 'Skin & Health Clinic',
                    consultationFee: 80,
                    bio: 'Experienced dermatologist specializing in skin care, allergy treatment, and aesthetic procedures.',
                    availableDays: ['Tuesday', 'Thursday', 'Friday'],
                    availableTime: '11:00 AM - 04:00 PM',
                    approvalStatus: 'Approved'
                }
            },
            {
                user: {
                    name: 'Dr. Charles Xavier',
                    email: 'charles.xavier@example.com',
                    password: 'password123',
                    role: 'Doctor',
                    gender: 'Male',
                    phone: '5551234567'
                },
                profile: {
                    specialization: 'Neurology',
                    qualification: 'MD, PhD (Neurology)',
                    experience: 25,
                    hospital: 'Xavier Institute of Health',
                    consultationFee: 200,
                    bio: 'Renowned neurologist with a focus on cognitive disorders, neuropathy, and electrophysiology.',
                    availableDays: ['Monday', 'Wednesday', 'Friday'],
                    availableTime: '09:00 AM - 01:00 PM',
                    approvalStatus: 'Approved'
                }
            },
            {
                user: {
                    name: 'Dr. Sarah Connor',
                    email: 'sarah.connor@example.com',
                    password: 'password123',
                    role: 'Doctor',
                    gender: 'Female',
                    phone: '5559876543'
                },
                profile: {
                    specialization: 'Pediatrics',
                    qualification: 'MBBS, MD (Pediatrics)',
                    experience: 12,
                    hospital: 'Children First Clinic',
                    consultationFee: 90,
                    bio: 'Caring pediatrician dedicated to providing high-quality healthcare to children from infancy to adolescence.',
                    availableDays: ['Wednesday', 'Thursday', 'Saturday'],
                    availableTime: '02:00 PM - 06:00 PM',
                    approvalStatus: 'Approved'
                }
            },
            {
                user: {
                    name: 'Dr. Sigmund Freud',
                    email: 'sigmund.freud@example.com',
                    password: 'password123',
                    role: 'Doctor',
                    gender: 'Male',
                    phone: '5552468102'
                },
                profile: {
                    specialization: 'Psychiatry',
                    qualification: 'MD (Psychiatry)',
                    experience: 30,
                    hospital: 'Vienna Mental Wellness',
                    consultationFee: 150,
                    bio: 'Dedicated psychiatrist specializing in psychoanalysis, anxiety, depression, and cognitive therapies.',
                    availableDays: ['Monday', 'Tuesday', 'Thursday'],
                    availableTime: '03:00 PM - 07:00 PM',
                    approvalStatus: 'Approved'
                }
            },
            {
                user: {
                    name: 'Dr. Gregory House',
                    email: 'gregory.house@example.com',
                    password: 'password123',
                    role: 'Doctor',
                    gender: 'Male',
                    phone: '5551357911'
                },
                profile: {
                    specialization: 'Cardiology',
                    qualification: 'MD (Cardiology & Nephrology)',
                    experience: 20,
                    hospital: 'Princeton-Plainsboro Hospital',
                    consultationFee: 250,
                    bio: 'Brilliant diagnostic cardiologist specializing in complex medical conditions and cardiovascular anomalies.',
                    availableDays: ['Monday', 'Wednesday', 'Thursday'],
                    availableTime: '10:00 AM - 03:00 PM',
                    approvalStatus: 'Approved'
                }
            }
        ];

        // Seed Doctors
        for (const doc of doctorsData) {
            const u = await User.create(doc.user);
            await Doctor.create({
                userId: u._id,
                ...doc.profile
            });
            console.log(`Doctor created: ${doc.user.name}`);
        }

        console.log('Seeding completed successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error.message);
        process.exit(1);
    }
};

seedData();
