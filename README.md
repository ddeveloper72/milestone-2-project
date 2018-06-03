# **Interactive Front-End Development Milestone-2-Project**

## **Your Local Medical Services**

## **Design brief:**
>This project is about creating a dashboard filled with useful information and incorporates good user experience on both a small mobile device scree as well as a desktop monitor.  I have used the Bootswatch Cosmo theme with bootstrap v.4.1.  


## **The project brief was to create a  dc.js and d3.js dashboard**
>The purpose of this webpage is to show data about my local medical facilities in a visual way.  
>To do this, I had to crate my own custom data-set.  I sourced my data from different locations.  First  I used the google maps search function to locate any medical facilities near me.  Based on the search results, I collected the names and gps coordinates which I later used with the google maps API to place markers on my map.  I then researched actual clinics, found in the search, to study the kind of  information that was published by them.  I collated the common characteristics of each one, such as the advertised service categories offered, details about the number of practitioners at the facilities and contact details, open close times etc.  I then sorted and sifted through the data to pick out elements that was useful and changed other elements to make them generic to maintain the privacy of the facilities that I was researching. 

![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/fullPageSmall.PNG "Fig 1 Webpage screenshot") 
>During the development of my database I used faker.js and found that because I am new to web development, I was unable to refine the use of the tool to my specific needs within the confines of the project time-line.  I used faker.js  to generate average the number of patient visits per medical facility type as well as number of patient visits per facility type every day for a year, 2017.  I then cleaned up may data when it was in csv format using Microsoft Excel and the =RANDBETWEEN(lowerval,upperval) function.  The result is functional static data.  If you have a look at the composite chart how ever, because it’s random patient count values, there is no variation in the data from week to week, month to month or any seasonal variations which would have been nice to demonstrate.  The purpose of the project was to create a dashboard and not a database, though the project could be changed in time to use actual real-world dynamic data if it becomes available in the form of an API.
>I would like to have been able to link the google maps geolocation data with the cross filter data from the charts.  Unfortunately I was unsuccessful in all my attempts to do this. I have an idea to output the dynamic crossfilter data as a table, which includes the lat lng coordinates.  My work around would be to use the google maps JavaScript to read the coordinates from the dynamic html table.  I will look to see if this is possible to do.   I would like to credit a user in stack overflow for the JavaScript method which I adopted, to read and place the markers on my own google map, along with information tags from my csv database.  There is no name given.  The link to the source code is at https://goo.gl/G6GvHn
>I have included a contact modal that uses emailJS for the dashboard user to send a message via a google email account.
>The webpage is made using semantic HTML5 with a Bootstrap grid layout.  I have used css media queries as well as full screen width bootstrap grid layout for small screen sizes.

## **Web Page Construction:**
>Structure will be a bootstrap grid. 

## **Web Page Construction:**
>General Bootstrap Grid Layout:
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/gridTable.png "Fig 2 Grid layout shown as table rows")

## **The page layout:**
>General Bootstrap Grid Layout:
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/bootstrapGridLayout.png"Fig 3 Screensot of webpage with the grid overlay")

## **Wire Frames - The Concept Started Here:**
>The webpage evolved from these concept drawings:

![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-1.png "Fig 4 Project Idea Page 1")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-2.png "Fig 5 Project Idea Page 2")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-3.png "Fig 6 Project Idea Page 3")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-4.png "Fig 7 Project Idea Page 4")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-5.png "Fig 8 Project Idea Page 5")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-6.png "Fig 9 Project Idea Page 6")