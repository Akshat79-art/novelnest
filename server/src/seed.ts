import { faker } from '@faker-js/faker';
import * as schema from '../../src/db/schema';
import { drizzle } from "drizzle-orm/neon-http";

/**
 * Using Faker.js for seeding because why not.
 */

function generateUser() {
    const id = faker.string.uuid();
    // const password = salt
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = firstName + lastName;
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const location = faker.location.streetAddress();

    // return {id, email, phone, password, name, location};
}

// Function to generate a single book for a given owner
function generateBook(ownerId : string){
    const id = faker.string.uuid();
    const title = faker.book.title();
    const author = faker.book.author();
    const isbnSring = faker.string.numeric({ length: 42, allowLeadingZeros: false });
    const isbn = Number(isbnSring);
    const description = faker.string.alphanumeric({ length: { min: 5, max: 100 } });
    // const bookCondition = schema.bookConditionEnum
    // const coverImage = link
    const price_per_day = faker.number.int();
    const maxRentalDays = faker.number.int();
    const owner_id = ownerId;

    // return {title, author, isbn, description, bookCondition, coverImage, price_per_day, maxRentalDays, owner_id}
}

function generateRentalTransactions(){
    const id = faker.string.uuid();
}

async function seed(){
    console.log('Generating seed data using Faker...');
    console.log('Generating users...');
    // Call generateUsers 10 times.

    console.log('Generating books...');
    // Call generateBook 10 times.

    console.log('Generating rental transactions...');
    // Call generateRentalTransaction 15 times.

    console.log("Inserting users into database...");


    console.log("Inserting books into database...");


    console.log("Inserting rental transactions into database...");
}