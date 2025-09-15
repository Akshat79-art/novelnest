import { faker } from '@faker-js/faker';
import * as schema from '../../src/db/schema';
import { database } from '../src/index';
import { hashPassword } from './lib/auth';

const db = database;

/**
 * Using Faker.js for seeding because why not.
 */

async function generateUser() {
    const id = faker.string.uuid();
    const strPassword = faker.string.alphanumeric({ casing: 'mixed', length: {min: 7, max: 15} });
    const password = await hashPassword(strPassword);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = firstName + lastName;
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const location = faker.location.streetAddress();
    const ratingAsOwner = faker.number.int({ min: 2, max: 5 });
    const ratingAsRenter = faker.number.int({ min: 2, max: 5 });
    const createdAt = faker.date.recent({ days: 30 });

    return {id, email, phone, password, name, location, ratingAsOwner, ratingAsRenter, createdAt};
}

// Function to generate a single book for a given owner
function generateBook(owner_id : string){
    const id = faker.string.uuid();
    const title = faker.book.title();
    const author = faker.book.author();
    const isbn = faker.string.numeric({ length: 42, allowLeadingZeros: false });
    const description = faker.string.alphanumeric({ length: { min: 5, max: 100 } });
    const bookCondition = faker.helpers.arrayElement(schema.bookConditionEnum.enumValues);
    const coverImage = faker.internet.url();
    const price_per_day = faker.number.int();
    const maxRentalDays = faker.number.int();
    const ownerId = owner_id;

    return {title, author, isbn, description, bookCondition, coverImage, price_per_day, maxRentalDays, ownerId}
}

function generateRentalTransactions(renterId: string, ownerId: string, bookId: string){
    const id = faker.string.uuid();
    const startDate = faker.date.recent({days:30});
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + faker.number.int({ min: 5, max: 14 }));
    const rentalStatus = faker.helpers.arrayElement(schema.rentalStatusEnum.enumValues);
    const totalPrice = faker.number.int({ min: 30, max: 500 });
    const createdAt = new Date();
    const shouldHaveRatings = rentalStatus === "completed";
    const renterRating = shouldHaveRatings ? faker.number.int({ min: 3, max: 5 }) : null;
    const ownerRating =  shouldHaveRatings ? faker.number.int({ min: 3, max: 5 }) : null;
    
    return { id, startDate, endDate, rentalStatus, totalPrice, renterId, ownerId, bookId, renterRating, ownerRating, createdAt};
}

async function seed(){
    console.log('Generating seed data using Faker...');
    console.log('Generating users...');
    const userPromises = Array.from({length: 10}, () => generateUser());
    const dummyUsers = await Promise.all(userPromises);

    console.log('Generating books...');
    const dummyBooks: (typeof schema.books.$inferInsert)[] = [];
    dummyUsers.forEach((user) => {
        const numBooks = faker.number.int({min: 1, max: 5});
        for (let i = 0; i < numBooks; i++) {
           dummyBooks.push(generateBook(user.id));            
        }
    })

    console.log('Generating rental transactions...');
    const dummyRentals: (typeof schema.rentalTransactions.$inferInsert)[] = [];
    const availBooks = dummyBooks.filter(book => book.status == "available");
    
    for (let i = 0; i < 15; i++) {
        const randomBook = availBooks[i];
        // Find a renter who is not the book's owner
        const potentialRenters = dummyUsers.filter(user => user.id !== randomBook.ownerId);
        const randomRenter = faker.helpers.arrayElement(potentialRenters);
        if (randomBook.id == undefined) {
            randomBook.id = "hardCoded";
        }

        dummyRentals.push(generateRentalTransactions(randomRenter.id, randomBook.ownerId, randomBook.id));
    }

    console.log("Inserting users into database...");
    await db.insert(schema.users).values(dummyUsers);

    console.log("Inserting books into database...");
    await db.insert(schema.books).values(dummyBooks);

    console.log("Inserting rental transactions into database...");
    await db.insert(schema.rentalTransactions).values(dummyRentals);

    console.log('✅ Seed completed successfully!');
    console.log(`📊 Created: ${dummyUsers.length} users, ${dummyBooks.length} books, ${dummyRentals.length} rentals.`);
}

seed().catch((err) => {
    console.error("Seed failed!");
    console.error(err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});