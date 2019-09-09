# Intro to APIs & AJAX

## Learning Objectives

* Describe what an API is and why we might use one.
* Understand the format of API data.
* Explain the common role of JSON on the web.
* Use `axios` library to make GET requests for data.
* Describe what a promise is and how to resolve the promise returned from `axios`.
* Render new HTML content using data loaded from an AJAX request.

## Exercises Labs

* EXERCISE: Think, Pair, Research - 15min
* EXERCISE: Your First API Key(s) - 10min
* EXERCISE: Parsing JSON - 15min
* LAB: GET From RandomUser API - 30min

## Intro To APIs

**What is an API?**

> Basically, an API is a service that provides raw data for public use.

API stands for "Application Program Interface" and technically applies to all of software design. The DOM and `axios` are actually examples of APIs! Since the explosion of information technology, however, the term now commonly refers to web URLs that can be accessed for raw data.

APIs publish data for public use. As third-party software developers, we can access an organization's API and use their data within our own applications.

<details>
  <summary><strong>Q: Why do we care?</strong></summary>

> Why recreate data when we don't have to? Think about past projects or ideas that would be easier if you could pull in data already gathered elsewhere.

> APIs can provide us with data that would we would otherwise not be able to create ourselves.

</details>

As we move into building single page applications, now is the perfect time to start understanding how to obtain data on the client side and then render it on the browser.

## API Exploration

**Check out these stock quotes...**

* [http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL](http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL)
* [http://dev.markitondemand.com/Api/Quote/json?symbol=GOOGL](http://dev.markitondemand.com/Api/Quote/json?symbol=GOOGL)

> Does the JSON look unreadable in the browser? If you're using Chrome, install the [JSON View plugin](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en).

## Where Do We Find APIs?

APIs are published everywhere. Chances are good that most major content sources you follow online publish their data in some type of serialized format. Heck, [even Marvel publishes an API](http://developer.marvel.com/documentation/getting_started). Look around for a "Developers" section on major websites.

#### List Of Commonly Used APIs

Here is a short list of commonly used APIs for testing purposes.

| API                                                  | Sample URL                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------------- |
| **[This for That](http://itsthisforthat.com/)**      | http://itsthisforthat.com/api.php?json                                |
| **[Giphy](https://github.com/Giphy/GiphyAPI)**       | http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC |
| **[Stocks](http://dev.markitondemand.com/MODApis/)** | http://dev.markitondemand.com/Api/Quote/xml?symbol=AAPL               |
| **[Swapi](https://swapi.co/api/people/1/)**          | https://swapi.co/api/people/1/                                        |

#### APIs Are No Longer Supported

Sometimes APIs change their data structure or support structure. This is an important consideration if you intend to build an app based on this API only to find out several weeks\months later that you can longer leverage their data in your project. OMBD was free to use but never had required license, however they changed this model and it's required.

| API                                     | Sample URL                                             |
| --------------------------------------- | ------------------------------------------------------ |
| **[OMDB API](http://www.omdbapi.com/)** | http://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1 |

### EXERCISE: Think, Pair, Research - 15min

Go around the room and capture the industries that students are most interested in and have them find at least 3 possible APIs that fall within that scope. They should use the following sites to find the corresponding APIs

* [Programmable Web API Directory](http://www.programmableweb.com/apis/directory)
* [Public APIs Directory](http://www.publicapis.com/).

### Possible APIs

#### Music

* https://bandcamp.com/developer
* https://developers.soundcloud.com/docs/api/reference

#### Gov

* https://developer.cityofnewyork.us/api/open311-inquiry

#### Games

* https://igdb.github.io/api/

#### Social Media

* https://developer.twitter.com/en/docs/tweets/search/overview

## What Is An API Key?

While the majority of APIs are free to use, many of them require an API "key" that identifies the developer requesting data access. This is done to regulate usage and prevent abuse. Some APIs also rate-limit developers, meaning they have caps on the free data allowed during a given time period.

**Try hitting the [Giphy](https://api.giphy.com/) API...**

* No key: [http://api.giphy.com/v1/gifs/search?q=funny+cat](http://api.giphy.com/v1/gifs/search?q=funny+cat)

* With key: [http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC](http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC)

**It is very important that you not push your API keys to a public Github repo.**

> This is especially true when working with [Amazon Web Services (AWS)](https://aws.amazon.com/). Here's an example of a [stolen key horror story](https://wptavern.com/ryan-hellyers-aws-nightmare-leaked-access-keys-result-in-a-6000-bill-overnight).

### EXERCISE: Your First API Key(s) - 20min

As a developer you will need to figure out how to navigate a site and find what your looking for. Now go to the following web site(s) and sign up for an API key(s).

* [giphy.com](https://giphy.com/)
* [openweathermap.com](https://openweathermap.org/)
* [google maps](https://developers.google.com/maps/documentation/)

### Why Just Data?

Sometimes thats's all we need. All this information, from all these browsers and all these servers, has to travel through the network. That's almost certainly the slowest part of the request cycle. We want to minimize the bits. There are times when we just need the data. For those times, we want a concise format.

### What is Serialized Data?

All data sent via HTTP are strings. Unfortunately, what we really want to pass between web applications is **structured data** (i.e., arrays and hashes). Thus, native data structures can be **serialized** into a string representation of the data. This string can be transmitted and then parsed back into data by another web agent.

There are **two** major serialized data formats...

#### JSON

**JSON** stands for "JavaScript Object Notation" and has become a universal standard for serializing native data structures for transmission. It is light-weight, easy to read and quick to parse.

```json
{
  "users": [{ "name": "Bob", "id": 23 }, { "name": "Tim", "id": 72 }]
}
```

> Remember, JSON is a serialized format. While it may look like an object, it needs to be parsed so we can interact with it as a true Javascript object.

> For more information about [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

#### XML

**XML** stands for "eXtensible Markup Language" and is the granddaddy of serialized data formats (itself based on HTML). XML is fat, ugly and cumbersome to parse. It remains a major format, however, due to its legacy usage across the web. You'll probably always favor using a JSON API, if available.

```
<users>
  <user id="23">
    <name><![CDATA[Bob]]></name>
  </user>
  <user id="72">
    <name><![CDATA[Tim]]></name>
  </user>
</users>
```

**Many APIs publish data in multiple formats, for example...**

* [http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL](http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL)
* [http://dev.markitondemand.com/Api/Quote/xml?symbol=AAPL](http://dev.markitondemand.com/Api/Quote/xml?symbol=AAPL)

### Parsing JSON

You've seen a few examples of JSON and how data can be organized. Here is the stock quote for Apple that you saw earlier. If this data was stored in an object how would you return the `Low` and `High` values?

```
{
	"Data": {
	"Status": "SUCCESS",
	"Name": "Apple Inc",
	"Symbol": "AAPL",
	"LastPrice": 157.86,
	"Change": -3.08999999999998,
	"ChangePercent": -1.91985088536811,
	"Timestamp": "Thu Aug 17 00:00:00 UTC-04:00 2017",
	"MarketCap": 815382892080,
	"Volume": 27940565,
	"ChangeYTD": 115.82,
	"ChangePercentYTD": 36.2977033327577,
	"High": 160.71,
	"Low": 157.84,
	"Open": 160.52
	}
}
```

### EXERCISE: Parsing JSON - 15min

Working in groups can you parse the following JSON's data and determine what data is needed to populate the articles on the [GAFeddr](http://gafeedr.surge.sh/) web site?

* [http://gafeedr.surge.sh/](http://gafeedr.surge.sh/)
* [https://www.reddit.com/top.json](https://www.reddit.com/top.json)

### Working Locally With JSON

JSON is the standard format to orgranize data for servers to send and receive data. It's so popular that JS has two methods to package it for sending and receiving:

* [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
* [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

One instance where these methods can be useful is when you need to compare two different arrays or objects.

```
// what will the result of this comparison be?

let arr1 = [1,2,3];
let arr2 = [1,2,3];

arr1 == arr2
```

Now with **.stringify()**

```
// what will the result of this comparison be?

let arr1 = [1,2,3];
let arr2 = [1,2,3];

JSON.stringify(arr1) == JSON.stringify(arr2)
```

## AJAX

**So we know what an API is. Now what?**

How can we use an API to dynamically manipulate the DOM with the given data? **AJAX**. As you'll come to learn, this allows us to build single page applications that do not require refreshes.

**AJAX**, which stands for "Asynchronous Javascript and XML," is the method through which we are able to make HTTP requests. The standard requests we will be making are `GET` `POST` `PUT` `PATCH` and `DELETE`.

| Type of Request | What's It Do? | An Example URL                                                  |
| --------------- | ------------- | --------------------------------------------------------------- |
| `GET`           | Read          | [http://swapi.co/api/planets/](http://swapi.co/api/planets/)    |
| `POST`          | Create        | [http://swapi.co/api/planets/](http://swapi.co/api/planets/)    |
| `PUT`           | Update        | [http://swapi.co/api/planets/2/](http://swapi.co/api/planets/2) |
| `PATCH`         | Update        | [http://swapi.co/api/planets/2/](http://swapi.co/api/planets/2) |
| `DELETE`        | Delete        | [http://swapi.co/api/planets/2/](http://swapi.co/api/planets/2) |

<details>
  <summary><strong>Q: Why do you think there is a "2" at the end of the URLs in the last three rows? (Hint: you could replace it with any number)</strong></summary>

> You'll notice that the URLs for `PUT` `PATCH` and `DELETE` end with a number. That's because these actions are updating or deleting a _particular_ student. That number is a unique identifier for a particular student defined on the back-end. More on this next week...

</details>

## GET Data From an API Using AJAX

## Asynchronous vs Synchronous

What is a synchronous operation?

* Sync: A synchronous operation runs immediately after the previous operation and the subsequent operation is not run until after the synchronous completes. This is no problem if the operation is immediate (dependent only on values already present in the environment). However, any operations that take significant time to complete (require interaction with some outside resource) will block subsequent operations. Because JavaScript is single threaded (can only do one thing at a time), blocking operations jam up the entire application making for an intolerable user experience.

What is an asynchronous operation?

* Async: JavaScript environments (i.e. Node.js and browsers) provide built in utilities for doing work that takes time without blocking subsequent calls. The fundemental concept that permits this is the callback, a function provided to the built in utility that the utility knows to call when the long running operation completes. The environment then takes care of executing the callback when the operation completes and the environment is not occupied with other work. To understand "not occupied with other work", consider out coffee shop example. The cashier has two jobs, take orders (sending them to the kitchen) and serve the drinks as they come out. "Not occupied with other work" just means that if the cashier is taking a new order, the kitchen will wait until the cashier is free to ask them to serve the drink.

### Synchronous example:

```js
/**
 * Synchronous data fetching the old way (using XHR)
 */

console.log('step 1: declare request');
const request = new XMLHttpRequest();

console.log('Step 2: open request.');
// `false` makes the request synchronous
request.open(
  'GET',
  'http://api.giphy.com/v1/gifs/search?q=smooth&api_key=dc6zaTOxFJmzC',
  false,
);

console.log('Step 3: send request.');
// The null parameter indicates that no body content is needed for the GET request.
request.send(null);

////// The code is BLOCKED right here. Nothing will happen
////// until the response comes back.

console.log('Step 4: log the response text.');
// servers send back a status code. (200 means your request was okay)
console.log(request);

console.log('Synchronous data request is complete.');
```

### Asynchronous Example

```js
/**
 * Asynchronous data fetching the old way
 */

function logResponse(data) {
  console.log('response complete ====>', data);
}

function get(url, callback) {
  console.log('step 2: declare request.');
  const request = new XMLHttpRequest();

  console.log('Step 3: open request.');
  request.open('GET', url, true);

  console.log(
    'Step 4: set the request state change handler to call the callback when status = 200',
  );
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      callback(request);
    }
  };

  console.log('Step 5: send request.');
  request.send();
}

console.log('Step 1: invoke AJAX function.');
get(
  'http://api.giphy.com/v1/gifs/search?q=smooth&api_key=2qqBvRkz56JiTUcMbOJbak5VRRLEbV84',
  logResponse,
);

console.log('Step 6: End of JS file.');
```

### What is a Promise?

Think about the request we made above to giphy.

What are the possible outcomes of this request?

1.  It works; we get the data we requested
2.  It doesn't; thanks to web standards, we at least get some information about why it didn't work.

And before one of these two things happen, it hasn't happened and so we don't know which it is going to be.

All asynchronous operations can be described similarly. Either something is:

1.  **pending** and we are anticipating the completion of the asynchronous operation
2.  **fulfilled** and the asynchronous operation successfully did what we asked of it
3.  **rejected** and the asynchronous operation ran into a problem and wasn't able to complete its task

A promise is an object that represents the **state** of an asynchronous operation.

Promises (which can be [implemented](https://www.promisejs.org/implementing/) in just a few lines of code) started off as libraries have become a built in part of the JavaScript language. Almost all new libraries dealing with asynchronicity abstract it with Promises.

### Responding to Async Operations

The most important thing we want to do with an async operation is attach behavior to it by providing it a callback. Promises have a method `then` which takes a callback which the `Promise` calls when it is fulfilled. The interesting thing with promises is that the `then` method returns a new promise which will **resolve** based on the value returned by the callback passed to `then`.

#### Axios

```
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then((response) => {
    // handle success
    console.log(response);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
  });
```

To use axios we need to include the CDN ```<script src="https://unpkg.com/axios/dist/axios.min.js"></script>```
or install ```$ npm install axios```.




##### When Things Go Wrong

Promises also give us the `.catch` method for when something goes wrong.

```
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then((response) => {
    // handle success
    console.log(response);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
  });
```

### Demo

```
 axios.get(https://randomuser.me/api)
  .then((res) => {
    console.log(res)
  })
```
### Lab: Continue building out the Random User starter code

* Add Email
* Add City
* Add State
* Add Age

## Conclusion

* What is an API?
* Why are APIs useful/important?
* What is AJAX?
* What information might we need to pass into an AJAX call?
* How do we go about interacting with the response of an AJAX call?

## Resources

* [Postman](https://www.getpostman.com/)
* [Intro to APIs](https://zapier.com/learn/apis/chapter-1-introduction-to-apis/)
* [Beautify your JSON in Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)
