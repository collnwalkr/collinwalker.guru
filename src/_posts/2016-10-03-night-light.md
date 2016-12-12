---
layout: post
title:  Night Light
description: Lighting the path for increased pedestrian safety
team: 
  - name: Adam Riddle
    link: http://www.adamriddle.com/
  - name: Tim Wong
    link: http://www.timothyxwong.com/
category: project
time: two weeks
role: designer and hardware developer
thumbnail: night-light
link: night-light
permalink: /project/:title/
---


## Problem
Growing up, most of us were instructed by our parents to look both ways before crossing the street. However, this type of precaution only works
however if the driver is also aware. And according to the CDC: 
more than 4,700 pedestrians are killed by vehicles every year with 3/4 of the deaths happening in low-light.
With this information, our team asked the question: **How can we increase drivers awareness of pedestrians in low-light situations?**

> In 2013, 4,735 pedestrians were killed in traffic crashes in the United States. This averages to one crash-related pedestrian death every 2 hours.
>
> -- [CDC Report](https://www.cdc.gov/motorvehiclesafety/pedestrian_safety/){:target="_blank"}


<hr class='magnifying'>

## Ideation
In order to validate our design, our team discussed the stakeholders involved and their goals.
Three stakeholders were identified: the driver, the pedestrian, and the city.
For the two direct stakeholders (the pedestrian and driver), we identified of their goals through our own experiences. For the driver, their goals are to acknowledge any crossing pedestrians and to understand the boundaries for themselves and pedestrians. Pedestrians have the same goals with the additional goal of preceding into the crosswalk confident that they have been acknowledged by the driver. 
 
![initial sketches]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-2.jpg){: .small data-action="zoom"}
![original timing diagram]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-1.jpg){: .small .right data-action="zoom"}

After identifying the stakeholders and their goals, we began sketching out various builds and forms that our crosswalk to take.
In order to satisfy a pedestrian's goal of confidently crossing in a low-light environment, our team developed the concept of illuminating the boundaries of the crosswalk with lasers. This would be coupled with the primary ways of displaying the state of the crosswalk, the pedestrian crossing and hand signs.
Taking queues from existing crosswalk systems, we would present pedestrians with both a crossing and hand sign while the drivers only the pedestrian sign. The position of drivers and pedestrians informed our design to have our final 'twisting' design (shown in the illustration below).

#### Final Design

![final digital rendering]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-0.jpg){: data-action="zoom"}

Pedestrians could approach our system facing the crosswalk and interact with upward sloping console which housed the button to trigger the crosswalk. The crosswalk sign then 'twists' in order to face pedestrians crossing in the street and display either the pedestrian or hand sign. The sign takes one final 'twist' to face cars driving which is where the big pedestrian sign would be. The order of these twists is important as well as they correlate with the distance to be interacted with. The first twist lowest to the ground is where the console is housed. This console needs to be high enough for both adults and children. The second twists that communicates pedestrians the state of the crosswalk should be seen at a medium range. The final twists that communicates drivers the state of the crosswalk should be visible at the greatest distance which is why it is at the top.

<hr class='flex'>

## Prototype
From our ideation sessions, our crosswalk had a shape (three twists) a main interface (pedestrian facing console to trigger the crosswalk) and three signals (pedestrian facing hand/crossing sign, driver facing crossing sign, and lasers to define the crosswalk boundaries). Before jumping into a high-fidelity prototype, we wanted to validate our idea quickly. So we used big foam blocks and blue scotch tape to create a 1:1 low-fidelity prototype and simulated a crosswalk scenario (Adam and Tim are pictured below discussing this low-fidelity prototype). This prototype illuminated the sizing and placement of the crosswalk signals. These were further validated by researching government standards on the sizing of street signs. 

![Prototyping the height of Night Light]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-3.jpg){: data-action="zoom"}

Next we wanted to test the main signal to drivers in a low-light scenario. Using laser cutters, power tools, and some very strong LED's, we assembled the top of the crosswalk and trekked out into the night to test its visibility. Pictured below is a shot of both our illuminated sign and a typical pedestrian crossing sign in the background. Excusing the quality of the photo, our team was satisfied with the direction and qualities that our crosswalk was taking on.

![Adam testing the height of Night Light as seen by a car]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-8.jpg){: .small .ignore-margin-bottom data-action="zoom"}
![Laser cutting the pedestrian sign]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-13.jpg){: .small .ignore-margin-bottom .right data-action="zoom"}
![Laser cutting the pedestrian and hand sign]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-5.jpg){: data-action="zoom"}

The next step was to assemble the electrical components of the crosswalk. I took on the bulk of these responsibilities. Starting out, I decided to leverage the Arduino platform because of its flexibility in prototyping. It took me a second to dust off my electrical engineering skills, but eventually we had a working circuit of high powered LEDs and beam laser pointers. The final hurdle was the vital communication between two crosswalk signs. Our team got our hands on some Xbee wireless shields in order to give our Arduinos wireless capabilities. Once we had established the ad-hoc network, I designed a simple handshake protocol between two crosswalk signs that relayed their current state and the trigger to begin the crosswalk sequence.

![Me testing different configurations for stop-hand LED]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-6.jpg){: .small .ignore-margin-bottom data-action="zoom"}
![fully assembled Arduino controller]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-11.jpg){: .small .ignore-margin-bottom .right data-action="zoom"}
![Me wiring up the LEDs to the Arduino]({{ site.images }}projects/{{page.thumbnail}}/{{page.thumbnail}}-12.jpg){: data-action="zoom"}

<hr class='hundred'>

## Results
By the end of our prototyping sprint, we had gone from sketches to high-fidelity working prototype. We took it to the streets in order to see our prototype in its target context. Below our some photos of the final build as well as a video demonstrating the prototype and our collective vision for Night Light.

![a motorcyclist waits for a pedestrian]({{ site.images }}projects/{{ page.thumbnail }}/{{ page.thumbnail }}-9.jpg){: .ignore-margin-bottom data-action="zoom"}
![Adam assembles Night Light]({{ site.images }}thumbnails/{{ page.thumbnail }}.jpg){: .ignore-margin-bottom data-action="zoom"}
<div class="vimeo-embed">
<iframe src="https://player.vimeo.com/video/164376095?color=ffffff&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

