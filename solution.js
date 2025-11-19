"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByRating = filterByRating;
exports.filterActiveUsers = filterActiveUsers;
exports.printBookDetails = printBookDetails;
var formatValue = function (value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    else if (typeof value === "number") {
        return value * 10;
    }
    else if (typeof value === "boolean") {
        return !value;
    }
};
var getLength = function (input) {
    if (typeof input === "string") {
        return input.length;
    }
    if (Array.isArray(input)) {
        return input.length;
    }
};
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getDetails = function () {
        return "Name: ".concat(this.name, ", Age: ").concat(this.age);
    };
    return Person;
}());
function filterByRating(items) {
    return items.filter(function (item) { return item.rating >= 4; });
}
function filterActiveUsers(users) {
    return users.filter(function (user) { return user.isActive === true; });
}
var users = [
    { id: 1, name: 'Rakib', email: 'rakib@example.com', isActive: true },
    { id: 2, name: 'Asha', email: 'asha@example.com', isActive: false },
    { id: 3, name: 'Rumi', email: 'rumi@example.com', isActive: true },
];
console.log(filterActiveUsers(users));
function printBookDetails(book) {
    return "Title: ".concat(book.title, ", Author: ").concat(book.author, ", Published: ").concat(book.publishedYear, ", Available: ").concat(book.isAvailable ? 'Yes' : 'No');
}
var myBook = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publishedYear: 1925,
    isAvailable: true,
};
printBookDetails(myBook);
