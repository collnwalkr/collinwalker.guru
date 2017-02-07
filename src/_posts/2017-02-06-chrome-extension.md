---
layout: blog
type: blog
title:  Designing & Prototyping with Chrome Extensions
description: From sketching to code&#58; how I built a proof-of-concept widget that works live on amazon.com
category: blog
permalink: /post/:title/
thumbnail: chrome-extension
published: true
link: chrome-extension
---

<hr class='flex'>

Prototypes exist on a **spectrum of fidelity and functionality**.
In this post I'll outline my journey from one side of the spectrum to the other as I sketch, design, and build a fully functioning Chrome extension prototype.

![Paper outlining my project goals]({{ site.images }}posts/{{page.thumbnail}}/overview.jpg){: data-action="zoom"}

## Making a Plan

It is important to **establish milestones** and **identify questions and concerns** at the outset of any project.
Since this project was split into two buckets, I did this exercise for both the design and build phases.

![Outlining the design process]({{ site.images }}posts/{{page.thumbnail}}/design.jpg){: .small data-action="zoom"}
![Outlining the build process]({{ site.images }}posts/{{page.thumbnail}}/build.jpg){: .small .right data-action="zoom"}

#### Design Concerns and Questions

* Should the widget link out of Amazon?
* Should the widget censor explicit language?
* Should twitter avatars be shown?
* How should images and video be handled?
* How should new lines be handled?
* How will this affect screen readers and accessibility?

#### Development Concerns and Questions
* How will errors be handled?
* How can we localize time stamps from UTC?
* What happens when a user reaches the end of the list?


## Fleshing out the Design

I began my design process by identifying key components and establishing early design principles.

![Mind map of the design requirements]({{ site.images }}posts/{{page.thumbnail}}/mind-map.jpg){: data-action="zoom"}

#### Design Components and Principles
* **URLs**: hyperlinks in the tweet
  * Only activate URLs if they link to an Amazon domain to prevent users from linking out
  * Use Twitter shortened URLs
* **Creation Time**: the time stamp when the tweet was created
  * Change time to be relative to user (ex: 4 minutes ago vs Thursday Feb 12, 2017 12:20pm)
  * Hyperlink to the actual tweet
* **Media**: images or video embedded in the tweet
  * Don't show image because it will increase network requests
  * Suppress images into Twitter shortened URLs
* **User**: author of the tweet
  * Emphasize name over username
  * Don't show avatar because it will increase network requests
* **Hashtags**: hashtags in the tweet
  * Emphasize #Amazon over other hashtags to show common thread throughout all of the tweets

![Initial thumbnails]({{ site.images }}posts/{{page.thumbnail}}/thumbnails.jpg){: .small data-action="zoom"}
![Paper mockups]({{ site.images }}posts/{{page.thumbnail}}/sketches.jpg){: .small .right data-action="zoom"}


I then moved from the individual design components to sketching thumbnails with various layouts and interaction models.
 During this phase I decided on several interaction and layout principles:
 
#### Interaction and Layout Principles
* **Interaction**
  * Tweets should move vertically on a carousel based on the widget's dimensions
  * Tweets should fade in and out to establish focus
* **Layout**
  * Show parts of the previous and next tweet as hints to interact
  * Primary focus should be first **creation time**, second **user**, third **#Amazon** and finally **tweet**.


### Final Mockup and Animation Test

![High fidelity mockup]({{ site.images }}posts/{{page.thumbnail}}/high-fidelity.jpg){: .ignore-margin-bottom data-action="zoom"}

<video width="100%" height="auto" controls preload autoplay loop>
 <source src="{{site.images}}posts/{{page.thumbnail}}/amazon_principle.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

## Building and Deploying

### Backend

In order to get live tweets to feed the widget, I built a simple Twitter api proxy using [express](http://expressjs.com/) and [this client twitter library](https://github.com/desmondmorris/node-twitter).


```javascript
var express = require('express');
var app = express();
var twitter = require('twitter');
var cors = require('cors');

app.use(cors());

var params = {q: '#Amazon', lang:'en', result_type:'recent'};

var client = new twitter({
    consumer_key:        '* * * * *',
    consumer_secret:     '* * * * *',
    access_token_key:    '* * * * *',
    access_token_secret: '* * * * *'
});


app.get('/', function (req,res) {
    client.get('search/tweets', params, function(error, tweets, response) {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.send(tweets)
        }
    })
})

app.listen(3000, function() {
    console.log('listening on 3000')
})
```

### Frontend

You can find the GitHub repo [**here**](https://github.com/collnwalkr/amazon-twitter-feed){:target="_blank"}

On the browser side, I built the widget with [Vue.js 2](https://vuejs.org/){:target="_blank"} and [webpack](https://webpack.github.io/){:target="_blank"} meshed into this Chrome extension [boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate){:target="_blank"}.
Vue.js is a great front-end framework for building UI's because of its flexibility and component driven nature.

Once built and installed in Chrome, the extension does the following:
* Detects if the current url matches amazon.com
* Injects the Twitter widget
* Requests data from the aforementioned proxy Twitter api
* Dynamically build a list of custom `<twitter>` Vue components
* Builds the carousel and navigation buttons

## Final Prototype & Testing

Below is a screen capture of the Chrome extension working live on amazon.com.
Informal testing and user feedback was conducted during the sketching, wireframe, and prototyping phase.
The testing was done informally because of the widget's low complexity in terms of user interaction.

<video width="100%" height="auto" controls preload>
  <source src="{{site.images}}posts/{{page.thumbnail}}/screen-cap.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
