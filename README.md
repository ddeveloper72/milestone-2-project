
# Milestone 2 Project

## [Your Local Medical Services](https://ddeveloper72.github.io/milestone-2-project/)

*(Interactive Front-End Development)*

### by Duncan Falconer for the Code Institute, 2018

1. The project brief from the Code Institute can be found by clicking [here](https://github.com/ddeveloper72/milestone-2-project/blob/master/readme/brief.md).

        This project is about creating a dashboard filled with useful information and incorporates good user experience on both a small mobile device scree as well as a desktop monitor.  I have used the Bootswatch Cosmo theme with bootstrap v.4.1
  
2. The Guidelines for the project from the Code Institute can be found by clicking [here](https://github.com/ddeveloper72/milestone-2-project/blob/master/readme/guidelines.md).
   
        The purpose of this webpage is to show data about my local medical facilities in a visual way.

        To do this, I had to crate my own custom data-set.  I sourced my data from different locations.  First  I used the google maps search function to locate any medical facilities near me.  Based on the search results, I collected the names and gps coordinates which I later used with the google maps API to place markers on my map.  I then researched actual clinics, found in the search, to study the kind of  information that was published by them.  I collated the common characteristics of each one, such as the advertised service categories offered, details about the number of practitioners at the facilities and contact details, open close times etc.  I then sorted and sifted through the data to pick out elements that was useful and changed other elements to make them generic to maintain the privacy of the facilities that I was researching. 




## 1. The Project Goals:  Create a  dc.js and d3.js dashboard

<div>
<img src="https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/fullPageSmall.png" alt="Screenshot of the webpage"style="float: right; margin-left: 10px; margin-top: 5px; margin-bottom: 5px;"> <p>Fig 1 Webpage screenshot</p></div>

    During the development of my database I used faker.js and found that because I am new to web development, I was unable to refine the use of the tool to my specific needs within the confines of the project time-line.  I used faker.js  to generate average the number of patient visits per medical facility type as well as number of patient visits per facility type every day for a year, 2017.  I then cleaned up may data when it was in csv format using Microsoft Excel and the =RANDBETWEEN(lowerval,upperval) function.  The result is functional static data.  If you have a look at the composite chart how ever, because it’s random patient count values, there is no variation in the data from week to week, month to month or any seasonal variations which would have been nice to demonstrate.  The purpose of the project was to create a dashboard and not a database, though the project could be changed in time to use actual real-world dynamic data if it becomes available in the form of an API.

    I would like to have been able to link the google maps geolocation data with the cross filter data from the charts.  Unfortunately I was unsuccessful in all my attempts to do this. I have an idea to output the dynamic crossfilter data as a table, which includes the lat lng coordinates.  My work around would be to use the google maps JavaScript to read the coordinates from the dynamic html table.  I will look to see if this is possible to do.   I would like to credit a user in stack overflow for the JavaScript method which I adopted, to read and place the markers on my own google map, along with information tags from my csv database.  There is no name given.  Here is a link to the resource on [stackoverflow](https://goo.gl/G6GvHn)

    This project relies heavily on dc-js charts.  My inspiration came from the class tutorials as well as from work by the likes of Gordon Woodhull.  I spent a lot of my time reading through the [dc.js - Dimensional Charting Javascript Library](http://dc-js.github.io/dc.js/)

    I have included a contact modal that uses emailJS for the dashboard user to send a message via a google email account.

    The webpage is made using semantic HTML5 with a Bootstrap grid layout.  I have used css media queries as well as full screen width bootstrap grid layout for small screen sizes.

## 2. The UX Design
*(This template is with thanks from 
@sarahloh)*



## 3. Web Page Construction

Structure will be a bootstrap grid. 

![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/gridTable.png "Fig 2 Grid layout shown as table rows")

## **The page layout:**

General Bootstrap Grid Layout:

![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/bootstrapGridLayout.png "Fig 3 Screensot of webpage with the grid overlay")

## **Getting into checking the HTML & CSS Code:**

I wrote this project in VS Code which helped me with much of the programming syntax.  I then used the html and CSS code validator by W3C Validation Service.  I found two open div elements, which were not plainly visible when parsing the code visually. The validation checker found a problem with the border colour used by bootswatch.  I suspect that it is because the the colour is a hexadecimal value with transparency and I felt that there was no need to change something that is already working fine.

## **Getting the JavaScript:**

>I would like to say that checking the JavaScript has been the most challenging part of this project.  Google Chrome Dev Tools has been my best friend throughout this whole process.  I have used console.log to return my arrays from the start which was essential for learning to see my data and so parse the correct information from objects to integers and dates. The most difficult bugs that I came across were the ones were I couldn't return any data at all, or ones where the faults were in a dc or d3 JavaScript file, brought about by a coding error on my part.  
>I discovered errors in my dimensions, were I had used the dimension name more than once across multiple functions.  I had also intermixed dimension and group names.  This was easily solved by completely nailing down how dimensions and groups were used. Fatigue had also had a big influence in causing coding errors. Changing my approach solved many of my problems, but the long lead time the discovery of the root case was difficult. As a new developer, 3 months into going from no coding experience at all, to this project, I found myself using functions as examples from my class tutorials as well as referenced material from google dev tools, stack overflow and [dc-js
](https://github.com/dc-js) on gitHub plus numerous other sites.  My coding is probably very long-winded and could be simplified to be more efficiendc-jst. This will come with experience in time.

## **Testing & Debugging:**

>My method of testing has been primarily by peer review.  The very nature of using dc-charts has meant that viewing the charts on smaller mobile devices has been very challenging.  To test the charts and how they are rendered, used Chrome Dev tools to simulate the smaller mobile device screens. I then hosted the site on github so that I could then access it from my Samsung Galaxy S5.  I shared the site with other colleagues on Slack as well as on WhatsApp to gain feedback on the look and feel.  I also tested the site on additional web browser, so see how it was being rendered.  I used:

    * Chrome
    * Microsoft Edge
    * Firefox
    * Opera
  
>One of the most difficult challenges I faced, toward the end of crating all of the charts, was implementing pagination on the data_table.  Paginating is easy to find and implement, if ones data is all hard coded into the html or piped in through an API, but not so easily done with dc-js.  I used git to create a branch of my project then refactored all of my functions to use globalVariables.  This got me working pagination but a less than ideal project.  Thanks to git, I was able to branch my project and then spend time refactoring just the pagination function for the table. Again with help from referencing the dc-js material, I finally resolved the pagination issue.

## **Wire Frames - The Concept Started Here:**
>The webpage evolved from these concept drawings:

![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-1.png "Fig 4 Project Idea Page 1")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-2.png "Fig 5 Project Idea Page 2")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-3.png "Fig 6 Project Idea Page 3")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-4.png "Fig 7 Project Idea Page 4")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-5.png "Fig 8 Project Idea Page 5")
![alt text](https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/projectIdea-6.png "Fig 9 Project Idea Page 6")