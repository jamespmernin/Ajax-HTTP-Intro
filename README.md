<!-- TO DO -->
<!-- Examples of APIs they've used so far? -->
<!-- Are there popular XML-only APIs? -->
<!-- Provide additional info on what exactly a promise is. -->
<!-- Show them what exactly a promise looks like. -->
<!-- Give a beginner's definition of HTTP methods and CRUD -->
<!-- When posting, will need to wrap `data` in `artist: { ... }` -->

# Intro to APIs & AJAX

## Learning Objectives

- Describe what an API is and why we might use one.
- Understand the format of API data.
- Explain the common role of JSON on the web.
- Use jQuery's `$.ajax()` method to make GET requests for data.
- Use jQuery's "promise-like" methods to handle AJAX responses.
- Render new HTML content using data loaded from an AJAX request.
- Perform POST, PUT and DELETE requests to an API to modify data.


## Framing (5 minutes / 0:05)

**What is an API?**

> Basically, an API is a service that provides raw data for public use.

API stands for "Application Program Interface" and technically applies to all of software design. Since the explosion of information technology, however, the term now commonly refers to web URLs that can be accessed for raw data.

APIs publish data for public use. As third-party software developers, we can access an organization's API and use their data within our own applications.

**Why do we care?**

Why recreate data when we don't have to? Think about past projects or ideas that would be easier if you could pull in data already gathered elsewhere.

**Why now?**

As we move into building single page applications, now is the perfect time to start understanding how to obtain data on the client side and then render it on the browser.

## API Exploration

**Check out these stock quotes...**

* [http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL](http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL)
* [http://dev.markitondemand.com/Api/Quote/json?symbol=GOOGL](http://dev.markitondemand.com/Api/Quote/json?symbol=GOOGL)

### Think, Pair, Share (5 minutes / 0:10)

Form pairs and explore the API links in the below table. Record any observations that come to mind. In particular, think about what you see in the URL and the API response itself.

| API | Sample URL |
|-----|------------|
| **[This for That](http://itsthisforthat.com/)** | http://itsthisforthat.com/api.php?json |
| **[Giphy](https://github.com/Giphy/GiphyAPI)** | http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC |
| **[OMDB API](http://www.omdbapi.com/)** | http://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1 |
| **[StarWars](http://swapi.co/)** | http://swapi.co/api/people/3 |
| **[Stocks](http://dev.markitondemand.com/MODApis/)** | http://dev.markitondemand.com/Api/Quote/xml?symbol=AAPL |


### Why Just Data?

Sometimes thats's all we need. All this information, from all these browsers and all these servers, has to travel through the network. That's almost certainly the slowest part of the request cycle. We want to minimize the bits. There are times when we just need the data. For those times, we want a concise format.   

### What is Serialized Data? (10 minutes / 0:20)

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

#### Exercise: White Table a Blog Post in JSON (3 minutes)

Spend 3 minutes using your markers to write out a JSON representation of a blog post (`title`, `author`, `published_on` date) which has many comments, each with an author and body.

> When we say "has many," this means that something *can* have arguments. It doesn't have to though. For this exercise, just give your blog post at least two comments.

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

## Where Do We Find APIs? (5 mins)

APIs are published everywhere. Chances are good that most major content sources you follow online publish their data in some type of serialized format. Heck, [even Marvel publishes an API](http://developer.marvel.com/documentation/getting_started). Look around for a "Developers" section on major websites.

**That sounds hard. Can't you just give me a freebie?**

Try the [Programmable Web API Directory](http://www.programmableweb.com/apis/directory) or the [Public APIs Directory](http://www.publicapis.com/).

## What Is An API Key? (5 minutes / 0:25)

While the majority of APIs are free to use, many of them require an API "key" that identifies the developer requesting data access. This is done to regulate usage and prevent abuse. Some APIs also rate-limit developers, meaning they have caps on the free data allowed during a given time period.

**Try hitting the [Giphy](https://api.giphy.com/) API...**

* No key: [http://api.giphy.com/v1/gifs/search?q=funny+cat](http://api.giphy.com/v1/gifs/search?q=funny+cat)

* With key: [http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC](http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC)

**It is very important that you not push your API keys to a public Github repo.**

> This is especially true when working with [Amazon Web Services (AWS)](https://aws.amazon.com/). Here's an example of a [stolen key horror story](https://wptavern.com/ryan-hellyers-aws-nightmare-leaked-access-keys-result-in-a-6000-bill-overnight).

## AJAX (5 minutes / 0:30)

**So we know what an API is. Now what?**

How can we use an API to dynamically manipulate the DOM with the given data? **AJAX**. As you'll come to learn, this allows us to build single page applications that do not require refreshes.

**AJAX**, which stands for "Asynchronous Javascript and XML," is the method through which we are able to make HTTP requests. The standard requests we will be making are `GET` `POST` `PUT` `PATCH` and `DELETE`.

| Type of Request | What's It Do? | An Example URL |
|-----------------|---------------|----------------|
| `GET`  | Read | http://www.yearbook.com/students |
| `POST` | Create | http://www.yearbook.com/students |
| `PUT` | Update | http://www.yearbook.com/students/4 |
| `PATCH` | Update | http://www.yearbook.com/students/4 |
| `DELETE` | Delete | http://www.yearbook.com/students/4 |

<details>
  <summary><strong>Q: Why do you think there is a "4" at the end of the URLs in the last three rows? (Hint: you could replace it with any number)</strong></summary>

  > You'll notice that the URLs for `PUT` `PATCH` and `DELETE` end with a number. That's because these actions are updating or deleting a *particular* student. That number is a unique identifier for a particular student defined on the back-end. More on this next week...

</details>


## Break (10 minutes / 0:45)

## `GET` Data From an API using AJAX

### I Do: GET From OMDB (15 minutes / 1:00)

> **Do not follow along for this portion of the lesson.** You will have the opportunity to do it yourself afterwards.

Let's build a very simple app that posts a movie title and poster after searching for it. We'll do this using the [OMDB API](http://www.omdbapi.com/).

**[OMDB movie search](https://github.com/ga-wdi-exercises/omdb-api)**

The starter code is linked above. It contains a basic HTML/CSS/JS setup. If you open up the HTML in the browser, you will notice that searching for something returns no results.

Let's go ahead and add in the AJAX request...

```js
// Get value from search input field.
var keyword = $("input[name='keyword']").val();
var url = "https://www.omdbapi.com/?t="+keyword
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

  > The [OMDB API documentation](http://www.omdbapi.com/)

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
  <summary><strong>Q: What are we passing into the `.done` promise? Does this remind you of anything we've done previously in class?</strong></summary>

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

### You Do: GET From OMDB (10 minutes / 1:10)

Now it's your turn to do the same. Start by cloning down the starter code...

`$ git clone git@github.com:ga-wdi-exercises/omdb-api.git`

Then you may either walk through the specific steps outlined in the previous section or try to do it yourself using this pseudocode...

```
When the user clicks the search button.
  Store the search term.
  Create and store the URL.
  Make an AJAX call, indicating the proper URL, type and data type.
    Indicate what should be done after a successful API call.
    Indicate what should be done after a failed API call.
```

#### Bonus I

You'll notice we're only receiving one movie in the API response. Use the OMDB Documentation to figure out how to return **multiple** movies.

#### Bonus II

Instead of just logging the API response to the console, append it to the page!

## Another API: Tunr

Now let's take a look at an API that resembles those that we'll be working with in class over the next few weeks: Tunr. It's a web app the instructors made that lists artists and their songs. It also has an API that we will not only be reading from today but writing to it as well.

[Click here](https://tunr-api.herokuapp.com) and take a look. As you're exploring, try adding `.json` to the end of the different URLs you encounter. What do you see?

### Set Up (5 minutes / 1:15)

We will create a small app that will allow us to interact with the Tunr API. Start out by cloning down the starter code...

`$ git clone git@github.com:ga-wdi-exercises/tunr-ajax.git`

Change into that directory and open its files in Atom. We will only be adding code to `script.js`. Also take a look at the interface we'll be using by opening `index.html` in Chrome.

### You Do: GET (10 minutes / 1:25)

> 5 minutes exercise. 5 minutes review.

Start by creating an AJAX `GET` request to Tunr.
* It should be triggered when the user clicks on the big "GET" button.
* If the AJAX call is successful, it should print the response to the console.
* If the AJAX call is failure, it should print the word "FAIL" as well as the response to the console.

#### Bonus

Render the response on the page. You may add to `index.html` to do this.

> If we access the response object, we can see all of the artists that were seeded in the database. Inside the done promise, we can interact with and display all the contents of the response.

## AJAX and the rest of CRUD

### I Do: POST a new artist (15 mins)

Let's go ahead and add the following to the ajax GET request in the `.done` promise:

```js
console.log(response)
for (var i = 0; i<response.length;i++){
  $("ul.artists").append("<li><a href='/artists/" + response[i].id + "'>" + response[i].name + "</a></li>")
}
```
* what is this doing?
This allows us to add the artists to the browser when we click GET.

Now let's update our view to include some input fields in `app/views/artists/test_ajax.html.erb`:

```html
<!-- div attached to event handler -->
<div class="test_ajax_get">AJAX GET!</div>

<!-- form for ajax post and put request -->
<label>Name:</label>
<input class="name" type="text">
<label>Photo_url:</label>
<input class="photo_url" type="text">
<label>Nationality:</label>
<input class="nationality" type="text">

<!-- divs attached to event handlers -->
<div class="test_ajax_post">AJAX POST!!</div>
<div class="test_ajax_put">AJAX PUT!!</div>
<div class="test_ajax_delete">AJAX DELETE!!</div>

```

#### AJAX Post (10 mins)

Let's try and create an artist using AJAX. Let's update our `app/assets/javascripts/application.js`...

```javascript
$(".test_ajax_post").on("click", function(){
  $.ajax({
    type: 'POST',
    data: {
      artist: {
        photo_url: "www.google.com",
        name: "bob",
        nationality: "bob"
      }
    },
    dataType: 'json',
    url: "http://localhost:3000/artists"
  }).done(function(response) {
    console.log(response);
  }).fail(function(response){
    console.log("Ajax get request failed");
  })
})
```

As you can see, every time we click on this button another artist is generated. This is awesome! We can now POST things to our database on the client side. But there's a problem here: we've hardcoded the attributes.

**Question for you:** how might we be able to dynamically acquire data on the client side instead of hardcoding values?

**Answer for you**

```js
$(".test_ajax_post").on("click", function(){
    var name = $(".name").val()
    var photoUrl = $(".photo_url").val()
    var nationality = $(".nationality").val()
    $.ajax({
      type: 'POST',
      data: {artist: {photo_url: photoUrl, name: name, nationality: nationality}},
      dataType: 'json',
      url: "http://localhost:3000/artists"
    }).done(function(response) {
      console.log(response)
      $("ul.articles").append("<li><a href='/artists/" + response.id + "'>" + response.name + "</a></li>")
    }).fail(function(response){
      console.log("ajax post request failed")
    })
  })
```

## Break (10 mins/115)

### You Do: Finish Tunr Artist CRUD (30 mins)
> answers at the end of lesson plan

Make a PUT request that updates the artist with an ID of 3 with any information you add into the input fields.

Make a DELETE request that will delete the artist with an ID of 4

*Note*: If you finish early, there are bonuses galore

### Bonus You Do: CRUD for Songs

### Super Bonuses

* Create a button or link that, when clicked, creates inline editing for an artist.
* Create a button that submits an AJAX `PUT` request to update that artist in the database. Change the view on the client side, if need be.
* Create a button or link for each artist that submits an AJAX `DELETE` request to delete an artist in the database. Update the view in the client side accordingly.
* Create an AJAX request in another app you've created (e.g., projects, Scribble). Be sure to make sure your controller actions respond to JSON.

## Conclusion (5 mins)

- What is an API?
- Why are APIs useful/important?
- What is AJAX?

## Hungry for More?

### Postman: A Closer Look at an API Request

Let's make a basic HTTP request to an API. While we can technically just do this in the browser, we're going to use Postman - a Chrome plug-in for making HTTP requests - so we can look at it in more detail.  
Steps  
  1. [Download Postman](https://www.getpostman.com/).  
  2. Type in the "url" of an API call.  
  3. Ensure the "method" is "GET".  
  4. Press "Send".  

Here's an example of a successful `200 OK` API call...

![Postman screenshot success](http://i.imgur.com/2TADr4J.png)

And here's an example of an unsuccessful `403 Forbidden` API call. Why did it fail?

![Postman screenshot fail](http://i.imgur.com/r3nIhGH.png)

## Resources:
* [Andy's blog](http://andrewsunglaekim.github.io/Server-side-api-calls-wrapped-in-ruby-classes/)
* [Postman](https://www.getpostman.com/)
* [Intro to APIs](https://zapier.com/learn/apis/chapter-1-introduction-to-apis/)
* [Practice with APIs](https://github.com/ga-dc/weather_teller)
* [Beautify your JSON in Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)


## Artist PUT/DELETE code

```js
// ajax put
$(".test_ajax_put").on("click", function(){
  var name = $(".name").val()
  var photoUrl = $(".photo_url").val()
  var nationality = $(".nationality").val()
  $.ajax({
    type: 'PUT',
    data:{artist: {photo_url: photoUrl, name: name, nationality: nationality}},
    dataType: 'json',
    url: "http://localhost:3000/artists/6"
  }).done(function(response){
    console.log(response)
  }).fail(function(){
    console.log("failed to update")
  })
})

// ajax delete
$(".test_ajax_delete").on("click", function(){
  $.ajax({
    type: 'DELETE',
    dataType: 'json',
    url: "http://localhost:3000/artists/3"
  }).done(function(response){
    console.log("DELETED")
    console.log(response)
  }).fail(function(){
    console.log("failed to delete")
  })
})
})
```
