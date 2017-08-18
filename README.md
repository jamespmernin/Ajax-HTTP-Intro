# Intro to APIs & AJAX

## Learning Objectives

- Describe what an API is and why we might use one.
- Understand the format of API data.
- Explain the common role of JSON on the web.
- Use jQuery's `$.ajax()` method to make GET requests for data.
- Use jQuery's "promise-like" methods to handle AJAX responses.
- Render new HTML content using data loaded from an AJAX request.
- Perform POST, PUT and DELETE requests to an API to modify data.


## Intro To API's 

**What is an API?**

> Basically, an API is a service that provides raw data for public use.

API stands for "Application Program Interface" and technically applies to all of software design. The DOM and jQuery are actually examples of APIs! Since the explosion of information technology, however, the term now commonly refers to web URLs that can be accessed for raw data.

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
> 

## Where Do We Find APIs? 

APIs are published everywhere. Chances are good that most major content sources you follow online publish their data in some type of serialized format. Heck, [even Marvel publishes an API](http://developer.marvel.com/documentation/getting_started). Look around for a "Developers" section on major websites.

#### List Of Commonly Used API's

Here is a short list of commonly used API's for testing purposes. 

| API | Sample URL |
|-----|------------|
| **[This for That](http://itsthisforthat.com/)** | http://itsthisforthat.com/api.php?json |
| **[Giphy](https://github.com/Giphy/GiphyAPI)** | http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC |
| **[Stocks](http://dev.markitondemand.com/MODApis/)** | http://dev.markitondemand.com/Api/Quote/xml?symbol=AAPL |
| **[Swapi](https://swapi.co/api/people/1/)** | https://swapi.co/api/people/1/ |

#### API's Are No Longer Supported

Sometimes support for your favorite API ends.  This is an important consideration if you intend to build an app based on this API only to find out several weeks\months later that you can longer leverage their data in your project. 

| API | Sample URL |
|-----|------------|
| **[OMDB API](http://www.omdbapi.com/)** | http://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1 |


### ACTIVITY: Think, Pair, Research - 15min

Go around the room and capture the industries that students are most interested in and have them find at least 3 possible API's that fall within that scope. They should use the following sites to find the corresponding API's

- [Programmable Web API Directory](http://www.programmableweb.com/apis/directory)
-  [Public APIs Directory](http://www.publicapis.com/).

## What Is An API Key? 

While the majority of APIs are free to use, many of them require an API "key" that identifies the developer requesting data access. This is done to regulate usage and prevent abuse. Some APIs also rate-limit developers, meaning they have caps on the free data allowed during a given time period.

**Try hitting the [Giphy](https://api.giphy.com/) API...**

* No key: [http://api.giphy.com/v1/gifs/search?q=funny+cat](http://api.giphy.com/v1/gifs/search?q=funny+cat)

* With key: [http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC](http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC)

**It is very important that you not push your API keys to a public Github repo.**

> This is especially true when working with [Amazon Web Services (AWS)](https://aws.amazon.com/). Here's an example of a [stolen key horror story](https://wptavern.com/ryan-hellyers-aws-nightmare-leaked-access-keys-result-in-a-6000-bill-overnight).
> 

#### EXERCISE: Your First API Key(s) - 10min

As a developer you will need to figure out how to navigate a site and find what your looking for.  No go to the following web sites and sign up for API keys.  

- [OpenWeatherMap.org](https://openweathermap.org/appid)
- [Giphy.com](https://giphy.com/)


### Why Just Data?

Sometimes thats's all we need. All this information, from all these browsers and all these servers, has to travel through the network. That's almost certainly the slowest part of the request cycle. We want to minimize the bits. There are times when we just need the data. For those times, we want a concise format.   

### What is Serialized Data? 

All data sent via HTTP are strings. Unfortunately, what we really want to pass between web applications is **structured data** (i.e., arrays and hashes). Thus, native data structures can be **serialized** into a string representation of the data. This string can be transmitted and then parsed back into data by another web agent.  

There are **two** major serialized data formats...  

#### JSON

**JSON** stands for "JavaScript Object Notation" and has become a universal standard for serializing native data structures for transmission. It is light-weight, easy to read and quick to parse.

```json
{
  "users": [
    {"name": "Bob", "id": 23},
    {"name": "Tim", "id": 72}
  ]
}
```
> Remember, JSON is a serialized format. While it may look like an object, it needs to be parsed so we can interact with it as a true Javascript object.

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

You've seen a few examples of JSON and how data can be organized.  Here is the stock quote for Apple that you saw earlier.  If this data was stored in an object how would you return the `Low` and `High` values?


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

- [http://gafeedr.surge.sh/](http://gafeedr.surge.sh/)
- [https://www.reddit.com/top.json](https://www.reddit.com/top.json)


### Working Locally With JSON

JSON is the standard format to orgranize data for servers to send and receive data.  It's so popular that JS has two methods to package it for sending and receiving:

- JSON.stringify()
- JSON.parse()

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

| Type of Request | What's It Do? | An Example URL |
|-----------------|---------------|----------------|
| `GET`  | Read | [http://swapi.co/api/planets/](http://swapi.co/api/planets/) |
| `POST` | Create | [http://swapi.co/api/planets/](http://swapi.co/api/planets/) |
| `PUT` | Update | [http://swapi.co/api/planets/2/](http://swapi.co/api/planets/2) |
| `PATCH` | Update | [http://swapi.co/api/planets/2/](http://swapi.co/api/planets/2) |
| `DELETE` | Delete | [http://swapi.co/api/planets/2/](http://swapi.co/api/planets/2) |

<details>
  <summary><strong>Q: Why do you think there is a "2" at the end of the URLs in the last three rows? (Hint: you could replace it with any number)</strong></summary>

  > You'll notice that the URLs for `PUT` `PATCH` and `DELETE` end with a number. That's because these actions are updating or deleting a *particular* student. That number is a unique identifier for a particular student defined on the back-end. More on this next week...

</details>


## GET Data From an API Using AJAX

### I Do: GET From Swapi 

> **Do not follow along for this portion of the lesson.** You will have the opportunity to do it yourself afterwards.

**[Swapi](https://swapi.co/api/people/1/)**

The example we are using will be in demo\swapi folder. It contains a basic HTML/CSS/JS setup. If you open up the HTML in the browser, you will notice that searching for something returns no results.

There are several tools that allow you to make an AJAX request.  This lecture focuses on using jQuery which provides a us a few options:

- low level request
- high level request

### Low Level Request

Let's go ahead and start with low level first.

```js
var url = "https://swapi.co/api/people/1/"
$.ajax({
  url: url,
  type: "GET",
  dataType: "json"
})
```

`$.ajax` takes an object as an argument with at least three key-value pairs...

  1. The URL endpoint for the JSON object.
  2. Type of HTTP request.
  3. Datatype. Usually JSON.

<details>

  <summary><strong>Q: How did we know which URL to use?</strong></summary>

  > The [Swapi](https://swapi.co/api/people/1/)

</details>

<details>

  <summary><strong>Q: What does it mean to set `type` to `GET`?</strong></summary>

  > We are **reading** the response sent back to us. To `GET` means to "read."

</details>

<details>

  <summary><strong>Q: So our application can make an AJAX call. Why aren't we seeing anything after clicking "Search"?</strong></summary>

  > We haven't told our application what to do once it receives a response.

</details>

### Promises

Now we need to tell our AJAX method what to do next. We can do this by doing something with the its return value, which comes in the form of a **promise**. We can use **promise methods** to tell the `$.ajax` request what to do if the request is successful or not. In this case, we are going to add three...

#### `.done`

A promise method for when the AJAX call is successful...

```js
.done(function(response){
  console.log(response);
});
```

<details>
  <summary><strong>Q: What are we passing into the `.done` promise method? Does this remind you of anything we've done previously in class?</strong></summary>

  > `.done` requires a callback that determines what we do after a successful AJAX call.

</details>

#### `.fail`

A promise method for when the AJAX call fails...

```js
.fail(function (){
  console.log("fail");
});
```

> `.fail` requires a callback that determines what we do after an unsuccessful AJAX call.

#### `.always`

A promise method that is executed regardless of whether the AJAX call succeeds or fails...

```js
.always(function(){
  console.log("Something happens");
});
```
> `.always` requires a callback that determines what we do regardless of a successful or unsuccessful call. While technically not necessary, it certainly doesn't hurt to include.
> 

### High Level Request

```
$.get("http://swapi.co/api/people/1/", function(data) {
      console.log(data)
 });
```

JSON specific request.

```
$.getJSON("http://swapi.co/api/people/1/", function(data) {
      console.log(data)
 });
```


### LAB: GET From RandomUser API - 30min

Now it's your turn to attempt the same but using the [RANDOMUSER API](https://randomuser.me/)

**Requirements:**

- Update the **makeCall()** function to make an API call using jQuery for a random user that passed the results to the getData() function
- Update the the **getData()** function to map the JSON keys to the corresponding variables
- Update the **addEventListeners()** function to display the data that corresponds with that icon.  

Here is the pseduocode for this assignment

```
When the page is refreshed.
  Make an AJAX call to randomuser api for a random user.
  Update the page with the new info.
  Make an AJAX call, indicating the proper URL, type and data type.
    Indicate what should be done after a successful API call.
    Indicate what should be done after a failed API call.
```

#### Bonus I
Add a "NEXT" and "PREVIOUS" button to the page.

## Conclusion 

- What is an API?
- Why are APIs useful/important?
- What is AJAX?
- What information might we need to pass into an AJAX call?
- How do we go about interacting with the response of an AJAX call?

## Resources

* [Postman](https://www.getpostman.com/)
* [Intro to APIs](https://zapier.com/learn/apis/chapter-1-introduction-to-apis/)
* [Beautify your JSON in Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)
