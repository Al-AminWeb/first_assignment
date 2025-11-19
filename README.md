# Type আর Interface এর মধ্যে পার্থক্য

**Type একটা কিওয়ার্ড**, আমরা ডাটার গঠন বোঝাতে এইটা ব্যবহার করে থাকি।
Primitive types টাইপস্ক্রিপ্ট এ বিল্ট ইন করা, সেগুলোর মধ্যে আছে:

* number
* string
* boolean
* null
* undefined

আমরা primitive type এর জন্য type alias ব্যবহার করতে পারি, যেমন:

```ts
type Address = string;
```

আমরা বেশির ভাগ সময় primitive data type এর সাথে union type মিশিয়ে type alias ব্যবহার করি, যেন কোডটা পড়তে সুবিধা হয়। যেমন:

```ts
type NullOrUndefined = null | undefined;
```

কিন্তু আমরা interface এর ক্ষেত্রে এইটা করতে পারি না।
**Interface শুধু object type এর জন্য ব্যবহার হয়।**

---

## Union Types

Union types আমাদের অনুমতি দেয় ব্যাখ্যা করতে যে একটা ভ্যালু অনেক গুলো টাইপ হতে পারে। যেমন:

```ts
type Transport = 'Bus' | 'Car' | 'Bike' | 'Walk';
```

Union type শুধু type ব্যবহার করেই লেখা সম্ভব।
Interface এ এই রকম কিছু নেই।

কিন্তু ২টা interface ব্যবহার করে এইটা করা সম্ভব। উদাহরণ:

```ts
interface CarBattery {
  power: number;
}

interface Engine {
  type: string;
}

type HybridCar = Engine | CarBattery;
```

---

## আরও কিছু পার্থক্য

### ১. Declaration Merging (ঘোষণা একত্রিত করা)

**Interface এর ক্ষেত্রে:**
একই নামে দুইবার interface লিখলে সেগুলো একসাথে মার্জ হয়ে যায়।

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

এখন `User` এর মধ্যে `name` এবং `age` দুইটাই থাকবে।

**Type এর ক্ষেত্রে:**
একই নামে দুইবার type লিখলে error আসবে (Duplicate identifier).

---

### ২. Extends vs Intersection

**Interface extends করা যায়:**

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}
```

**Type intersection ব্যবহার করে:**

```ts
type Animal = { name: string };

type Dog = Animal & {
  bark: () => void;
};
```

---

### ৩. Tuple এবং Array

Type দিয়ে tuple সহজে তৈরি করা যায়:

```ts
type Point = [number, number];
type RGB = [number, number, number];
```

Interface দিয়ে এইটা করা অনেক জটিল।

---

### ৪. Computed Properties

Type এ computed property name সাপোর্ট করে:

```ts
type Keys = 'name' | 'age';

type Person = {
  [K in Keys]: string;
};
```

Interface এ এইটা সরাসরি করা যায় না।



# keyof Keyword এর ব্যবহার টাইপস্ক্রিপ্ট এ

`keyof` হলো একটা টাইপস্ক্রিপ্ট operator যেটা একটা object type এর সব property এর নাম গুলো **union type হিসেবে বের করে দেয়**।
সহজ ভাষায় বলতে গেলে, `keyof` দিয়ে আমরা কোনো object এর সব key গুলো পেতে পারি।

---

## কিভাবে কাজ করে?

ধরুন আমাদের একটা `Person` interface আছে:

```ts
interface Person {
  name: string;
  age: number;
  email: string;
}
```

এখন যদি আমরা লিখি:

```ts
type PersonKeys = keyof Person;
```

তাহলে `PersonKeys` হবে:

```
"name" | "age" | "email"
```

অর্থাৎ Person এর key গুলোর union type।

---

## ব্যবহারিক উদাহরণ

### ১. Function Parameter হিসেবে ব্যবহার

```ts
function getProperty(obj: Person, key: keyof Person) {
  return obj[key];
}

const person: Person = {
  name: "আহমেদ",
  age: 25,
  email: "ahmed@example.com"
};

getProperty(person, "name"); // ঠিক আছে
getProperty(person, "age"); // ঠিক আছে
getProperty(person, "address"); // Error! কারণ address Person এ নেই
```

এখানে `keyof Person` ব্যবহার করায় আমরা শুধুমাত্র Person এর valid key গুলোই পাস করতে পারবো।

---

### ২. Generic Type এর সাথে ব্যবহার

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020
};

const brand = getValue(car, "brand"); // string
const year = getValue(car, "year");   // number
```

এখানে:

```
K extends keyof T
```

মানে হলো `K` অবশ্যই `T` এর একটা valid key হতে হবে।

---

### ৩. Mapped Types এর সাথে ব্যবহার

```ts
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadOnlyPerson = ReadOnly<Person>;
```

এখানে `keyof T` দিয়ে আমরা T এর সব properties loop করছি এবং সবগুলোকে `readonly` বানিয়ে দিচ্ছি।

---