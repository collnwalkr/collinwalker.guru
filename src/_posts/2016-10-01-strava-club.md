---
layout: post
title:  Strava Club
description: Empowering athletic communities to better understand their data and make connections
team: 
  - name: Ricki Xie
    link: http://www.rickixiesi.com/
  - name: Yitao Wang
    link: http://www.yitaowang.info/
  - name: Li Zeng
    link: https://ischool.uw.edu/people/phd/lizeng
category: project
time: one month
role: designer and developer
thumbnail: strava-club
link: strava-club
permalink: /project/:title/
---


## Problem
Recent years have seen the increasing popularity of fitness tracking applications, among which [Strava](http://strava.com/){:target="_blank"} plays a leading role in facilitating online communities by individual connections and activity-based clubs. Strava users have the ability to search for clubs (groups) of athletes based on similiar interest and location. Where Strava's current search fails, however, is in helping users understand a club's riding habbits. For example, if I am searching for cycling clubs here in Seattle Strava provides over 90 clubs. The majority of these clubs only list 'Seattle' as their location. This is a problem because Seattle is a big, dense city. Finding a group of cyclists who ride around Greeen Lake is much different than a group that pedal through West Seattle for instance (to see this current search in action [click here](https://www.strava.com/clubs/search?utf8=%E2%9C%93&text=&location=Seattle&%5Bcountry%5D=United+States&%5Bstate%5D=Washington&%5Bcity%5D=Seattle&%5Blat_lng%5D=47.6062095%2C-122.3320708&sport_type=cycling&club_type=all){:target="_blank"}). 

Our team ultimately asked the question: **How can we better inform both Strava users and club owners of a club's activity?**

<hr class='magnifying'>

## Research
To better understand the problem space we interviewed Strava end-users to gather our design specifications. Of the two Strava users we recruited, one is an officer for the [Husky Cycling Club](http://www.huskycycling.org/){:target="_blank"} and the other is an active member in two other cycling clubs.

The goal of the interview was to understand how Strava Club administrators currently use clubs to organize and recruit and how Strava athletes find clubs to join. To ease into the interview, we first asked each participant to describe their current cycling habits. Then we transitioned into social riding to get a sense of how rides are organized and routes are discovered and shared. Finally we dove deep into their experience with Strava Clubs and how they use these current tools to accomplish their goals. We summarized our findings as follows:

#### Research Findings
- Strava athletes want to ride with athletes of similar ability
- Strava athletes and club owners want to find clubs / recruit members that are active in their area
- Strava athletes want to discover popular routes taken by other members

> There are so many people who are new to Seattle
and UW, being able for them to see [where we ride the
most] would be pretty cool. 
>
> -- Strava Athlete

<hr class='praise'>

## Ideation
Equipped with our research findings, our team first set off to outline our design requirements. We decided early on that it was imperative that we visualize a club's activity data onto an interactive map. This would alleviate several user frustrations and needs: discovering groups in your area and popular routes taken by group members. Our team communicated our ideas the whiteboard in order to quickly generate ideas and visuals. Whiteboarding also allowed for the developers on the team (me and Li) to map the UI to the data we would need to access either via API or through data scraping techniques. While we did photograph our whiteboarding their kind of difficult to read. Below are some re-drawn sketches of our whiteboarding during our project.

![Me whiteboarding potential designs]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-4.jpg){: .ignore-margin-bottom data-action="zoom"}
![High level view of data pipeline]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-3.jpg){: .small .right data-action="zoom"}
![Mapping between UI and data]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-2.jpg){: .small data-action="zoom"}

#### Final Design
Our team then took our design requirements and sketches and refined them into wireframes and ultimately a high-fidelity mockup. The final solution: **Strava Club Visualizer**, an exploratory visualization for Strava users, allowing athletes to find prospective clubs, explore new routes and meet new partners.

![High-fidelity mockup]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-9.jpg){: data-action="zoom"}

<hr class="flex">

## Prototype
I took these renderings and created a small web application that can consume preprocessed Strava data for a club and render a fully interactive map.

![Final product]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-8.jpg){: data-action="zoom"}

**[Check out the working demo here!](http://cse512-16s.github.io/fp-rickixie-taoaoao-collnwalkr-lilizeng99/development/){:target="_blank"}**

The main panel that visualized the map utilizes [Mapbox GL](https://www.mapbox.com/mapbox-gl-js/api/), a JavaScript library that leverages WebGL to visualize interactive maps. Our major motivation for using Mapbox is that it is used by Strava as well as being a developer friendly platform. For example, Mapbox comes packaged with a robust navigation toolset for zooming, panning, and rotating. In addition, Mapbox allows for customizable map styling through an online editor. For our visualization, we customized typography, coloring, as well as the inclusion or exclusion of certain map features in order to reduce visual clutter and present only the most pertinent information to our end-user.An example of this would be the inclusion of topographical contour lines to provide elevation information. Mapbox allows for dynamic customizable layering.This meant that the addition of our heatmap could be layered underneath map labels. This was a crucial design choice because our heatmap had the potential of obfuscating important information such as labels for neighborhoods, parks, or roads.

The hexagonal heatmap was generated using a club’s activity
data. Within each activity, a breadcrumb trail of location data is
generated as a polyline. This polyline was then decoded as latitude
longitude pairs. To increase efficiency, we sampled a subset of these
data points. We then generated a hexagonal grid over the bounds of
the activity coordinates. Using this grid, we counted the number of
breadcrumbs that occurred in each hexagon. Next, using Jenks
natural breaks optimization, a data clustering technique, we
classified each hex grid cell into nine classifications. The major
motivation for using this data clustering technique was scalability
between data sets across different Strava clubs. For instance, the club
we used to prototype performs around ten activities per day.
Different Strava clubs, however, could perform upwards to a
hundred activities today or more. Jenks natural breaks optimization
will work with both extremes. Finally, using the classifications given
to us by Jenks, we color coded each hex cell to correspond to the
number of occurrences.

The histogram timeline feature was created using d3 and the
Crossfilter library. This was done by parsing through all activity data
collecting timestamps. Crossfilter groups the timestamps into days
which are then handed off to d3 in order to visualize as a histogram.
Crossfilter also handled the “brushing” of selecting different bars.
When a brush ends, an event is triggered that causes the heatmap to
update as well as the list of most active club organizers.

As for performance, there are currently major bottlenecks
slowing down the visualization. The most damaging of these is the
order of latitude and longitude tuples. The Strava API returns
coordinate data as a [lat,long] (for latitude and longitude
respectively). However, for Mapbox GL, in order to plot a coordinate
it must be entered as a [long,lat]. Therefore, in order to transform the
Strava data into something that is consumable for Mapbox we must
flip every tuple. Since these activities and segments are hundreds of
tuples long, this becomes an expensive operation. One possible workaround would be to use the Mapbox.js variant rather than
Mapbox GL. However, due to time constraints and the wildly
different syntactical implementation between the JavaScript and GL
flavor of Mapbox, we stayed with the GL variant.

#### Prototype Evaluation

To evaluate our visualization, we conducted brief informal
usability sessions with 6 Strava users during the poster session on
Jun 7, 2016. We first explained the goal of our design and allowed
the users to explore the visualization with our guidance to gather
feedback regarding tasks and corresponding motivations of our two
user groups (regular Strava user and Club officer). Participants
thought that the heatmap view was easy to comprehend and identify
areas that were most active within the presented dataset, however,
because of the constraint in our thematic mapping technique, areas
that were mapped outside of the land were perceived as distractions
for one of the participants (“There is no bike path in the river”).
Moreover, users liked the map-based navigation to query the segment results, and thought that the ability to view segment
attempts within the club directly through the map was more
meaningful rather than seeing the attempts across all Strava users.

**Overall, participants showed positive feedback for our system
regarding intuitive interactions, pleasing visual aesthetics, and
support for data exploration**.

We were also able to discover several interesting findings with
the tool. For instance, in addition to riding around the university
areas, cyclists in the Husky Cycling Club also explored segments
that are near the coasts and by the mountains. Besides riding during
the weekday, club members also rode frequently during the
weekends. This high-level information could be potentially
beneficial for the prospective club members who are looking for a
club to meet in-person and ride with based on their schedules,
geography preference, and type of rides. For club officers, they can
leverage the most active members lists to identify riders that can
recruit as future ride leader based on their riding capability, which
can be found through the members’ Strava profile pages. 

<hr class="hundred">

## Results

Our exploration began looking at the current way athletes on Strava find other athletes to join and recognizing current shortcomings in the way club information was presented. Our goal was to create a better experience using existing data in order to give potential members tools to be more informed in joining a group and officers a better understanding of their group's activities. This resulted in **Strava Club Visualizer**: an interactive map that is populated with a club's activity data. To see a demonstration of it in your browser, check out our **[working demo](http://cse512-16s.github.io/fp-rickixie-taoaoao-collnwalkr-lilizeng99/development/){:target="_blank"}** here. To see how it was made, be sure to check out our [Github repo](https://github.com/collnwalkr/strava-public){:target="_blank"}.


![Our team presenting Strava Club Visualizer]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-0.jpg){: data-action="zoom"}
