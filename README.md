
# Milestone 2 Project

## [Your Local Medical Services](https://ddeveloper72.github.io/milestone-2-project/)

*(Interactive Front-End Development)*

### by Duncan Falconer for the Code Institute, 2018

1. The project brief from the Code Institute can be found by clicking [here](https://github.com/ddeveloper72/milestone-2-project/blob/master/readme/brief.md). This project is about creating a dashboard filled with useful information and incorporates good user experience on both a small mobile device screen as well as a desktop monitor.  I have used the Bootswatch Cosmo theme with bootstrap v.4.1
  
2. The Guidelines for the project from the Code Institute can be found by clicking [here](https://github.com/ddeveloper72/milestone-2-project/blob/master/readme/guidelines.md). The purpose of this webpage is to show data about my local medical facilities in a visual way.  To do this, I had to create my own custom data-set.  I sourced my data from different locations.  First  I used the google maps search function to locate any medical facilities near me.  Based on the search results, I collected the names and gps coordinates which I later used with the google maps API to place markers on my map.  I then researched actual clinics, found in the search, to study the kind of  information that was published by them.  I collated the common characteristics of each one, such as the advertised service categories offered, details about the number of practitioners at the facilities and contact details, open close times etc.  I then sorted and sifted through the data to pick out elements that was useful and changed other elements to make them generic to maintain the privacy of the facilities that I was researching. 




## 1. The Project Goals:  Create a D3.js and dc.js dashboard

During the development of my database I used faker.js and found that because I am new to web development, I was unable to refine the use of the tool to my specific needs within the confines of the project time-line.  I used faker.js  to generate average the number of patient visits per medical facility type as well as number of patient visits per facility type every day for a year, 2017.  I then cleaned up may data when it was in csv format using Microsoft Excel and the =RANDBETWEEN(lowerval,upperval) function.  The result is functional static data.  If you have a look at the composite chart how ever, because it’s random patient count values, there is no variation in the data from week to week, month to month or any seasonal variations which would have been nice to demonstrate.  The purpose of the project was to create a dashboard and not a database, though the project could be changed in time to use actual real-world dynamic data if it becomes available in the form of an API.

I would like to have been able to link the google maps geolocation data with the cross filter data from the charts.  Unfortunately I was unsuccessful in my attempts at the time to do this. I have an idea to output the dynamic crossfilter data as a table, which includes the lat lng coordinates.  My work around would be to use the google maps JavaScript to read the coordinates from the returned crossfilter data.  I would like to credit a user on stack overflow for the JavaScript method which I adopted, to read and place the markers on my own google map, along with information tags from my csv database.  There is no name given.  Here is a link to the resource on [stackoverflow](https://goo.gl/G6GvHn)

This project relies heavily on dc-js charts.  My inspiration came from the class tutorials as well as from work by the likes of Gordon Woodhull.  I spent a lot of my time reading through the [dc.js - Dimensional Charting Javascript Library](http://dc-js.github.io/dc.js/)

As my own addition to the project scope, I have included a contact modal that uses emailJS for the dashboard user to send a message through a google email account.

The webpage is made using semantic HTML5 with a Bootstrap grid layout.  I have used css media queries as well as full screen width bootstrap grid layout for small screen sizes.

## 2. The UX Design
*(This template is with thanks from 
@sarahloh)*

#### Strategy

| Focus                                                       | User Needs                                                            | Business Objectives                             |
|-------------------------------------------------------------|-----------------------------------------------------------------------|-------------------------------------------------|
| What are you aiming to achieve?                             | To be able to see information about local medical facilities  | To inform users about our facilities |
|                                                             | To be able to see graphical stats about medical facilities.  | To advertise where we are located, using a Google maps API |
|                                                             | To present and demonstrate dc-js charts in the best way possible  |  |
| For whom?                                                   | Anyone looking for information about our medical facilities |  |
| TARGET AUDIENCE                                             | Customers with access to mobile devices and PCs  |  |





#### Scope

| Focus                                                       | Functional Specification                                              | Content Requirements                            |
|-------------------------------------------------------------|-----------------------------------------------------------------------|-------------------------------------------------|
| Which features?                                             | Create a Single-Page Application (SPA)  | Data is stored locally in .csv format |
| What’s on the table?                                        | Incorporate links or buttons to allow your user to navigate the site and reset/control the site functionality |  |
|                                                             | Use of Bootstrap CSS framework |  |
|                                                             | Use of JavaScript & jQuery |  |
|                                                             | Version control managed with Git & GitHub |  |



#### Structure

| Focus                                                       | Interaction Design                                                           | Information Architecture                                                               |
|-------------------------------------------------------------|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| How is the information structured?                          | Where am I? / How did I get here? / What can I do here? / Where can I go?    | Organizational / Navigational schemas (tree / nested list / hub and spoke / dashboard) |
|                                                             | The information is presented as a dc-js dashboard | Single root page |
| How is it logically grouped?                                | The nav-bar provides access to an email modal | About/contact |
|                               							  | The nav-bar provides a link to the project readme on the developers gitHub repository | About/readme |



#### Skeleton

| Focus                                                       | Interface Design                                       | Navigational Design  | Information Design  |
|-------------------------------------------------------------|--------------------------------------------------------|----------------------|---------------------|
| How will the information be represented?                    | See wireframes                                         |                      |                     |
| How will the user navigate to the information and features? | See wireframes |  |  |

### Wireframes

1. Bootstrap card: col-12 col-sm.
<img src="https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/wfselect.png" width="560" alt="Fig 1 Nav bar & select boxes"/>

2. Bootstrap card: col-12 col-sm.  Chart: col-12,  svg pie-chart scale: not programable
<img src="https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/wfsection1.png" width="560" alt="Fig 2 Map & dc-js pie charts"/>

3. Bootstrap card: col-12 col-sm.  Chart: col-12,  svg chart scale: dynamic
<img src="https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/wfsection2.png" width="560" alt="Fig 3 dc-js bar & composit charts"/>

4. Bootstrap card: col-12 col-sm.  Chart: col-12,  svg chart scale: dynamic
<img src="https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/wfsection3.png" width="560" alt="Fig 4 dc-js table with pagination"/>

1. Bootstrap modal: col-xs-12.
<img src="https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/wfmodal.png" width="560" alt="Fig 5 dc-js table with pagination"/>

#### Surface

| Focus                                                       | Visual Design                       |
|-------------------------------------------------------------|-------------------------------------|
| What will the finished product look like?                   |  |
|                                                             |  |
| What colours, typography and design elements will be used?  |  |


## 3. The page layout

The page template has been built using off the shelf Bootstrap v4.2.  I used BooBootstrap cards to contain the charts and google maps graph.  The challenge ahs always been to render the dc-js charts.  I hope that this dashboard demonstrates how useful amazing they are for cross-filtering even larger amounts of data, than what I was able to prepare as a sample.

General Bootstrap Grid Layout:

<div>
<img src="https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/fullPage.PNG" alt="Screenshot of the webpage"style="float: right; margin-left: 10px; margin-top: 5px; margin-bottom: 5px;"> <p>Fig 1 Webpage screenshot</p></div>

## 4. Getting the JavaScript

I would like to say that checking the JavaScript has been the most challenging part of this project.  Google Chrome Dev Tools has been my best friend throughout this whole process.  I have used console.log to return my arrays from the start which was essential for learning to see my data and so parse the correct information from objects to integers and dates. The most difficult bugs that I came across were the ones were I couldn't return any data at all, or ones where the faults were in a dc or d3 JavaScript file, brought about by a coding error on my part.  

I discovered errors in my dimensions, were I had used the dimension name more than once across multiple functions.  I had also intermixed dimension and group names.  This was easily solved by completely nailing down how dimensions and groups were used. Fatigue had also had a big influence in causing coding errors. Changing my approach solved many of my problems, but the long lead time the discovery of the root case was difficult. As a new developer, 3 months into going from no coding experience at all, to this project, I found myself using functions as examples from my class tutorials as well as referenced material from google dev tools, stack overflow and [dc-js](https://github.com/dc-js) on gitHub plus numerous other sites.  My coding is probably very long-winded and could be simplified to be more efficient. This will come with experience in time.

## 5. Testing & Debugging

1. Tools used
   
   * Written in VSCode
   * Tested Chrome dev tools & VSCode debugger
   * HTML and CSS checked with help from the [Markup Validation Service](https://validator.w3.org/)
   * Version management and test branches created in git
   * Web deployment hosted on GitHub
  
2. Challenges
   
   1. dc-js charts will use the width and height of the element in which they are placed, but the text will overflow... To fix this, I used media queries to rotate the x-axis text, by 10deg so allowing the text to remain legible.
   2. The data table pagination was most difficult to resolve and took time to research to create the function as well as to let let onClick call the function.  
   
   HTML function call
   ``` javaScript
        <input id="last" class="btn btn-primary btn-sm" type="Button" value="Last" onclick="javascript:last()"
        disabled="true">
        <input id="next" class="btn btn-primary btn-sm" type="button" value="Next" onclick="javascript:next()">

   ```
   JavaScript function listener
   ``` javascript
        document.getElementById("last").onclick = last; 
        document.getElementById("next").onclick = next;

        function next() {
                ofs += pag;
                update();
                chart.redraw();
        }
        function last() {
                ofs -= pag;
                update();
                chart.redraw();
        }

   ```

  
   3. Testing

        My method of testing has been primarily by peer review.  The very nature of using dc-charts has meant that viewing the charts on smaller mobile devices has been very challenging.  To test the charts and how they are rendered, I used Chrome Dev tools to simulate the smaller mobile device screens. I then hosted the site on gitHub so that I could then access it from other mobile devices.  I shared the site with other colleagues on Slack as well as on WhatsApp to gain feedback on the look and feel.  I also tested the site on additional web browser, so see how it was being rendered.  I used:

   * Chrome
   * Microsoft Edge
   * Firefox
   * Opera
  
        One of the most difficult challenges I faced, toward the end of crating all of the charts, was implementing pagination on the data_table.  I found Pagination tools available which were simple to implement, if ones data is all hard coded into the html or linked in through an API, but not so easily done with dc-js.  I used git to create a branch of my project then refactored all of my functions to use globalVariables.  This got me working pagination but left me with a less than ideal project.  Thanks to git again, I was able to branch my project and then spend time refactoring just the pagination function for the table. Again with help from referencing the dc-js material, I finally resolved the pagination issue.

## 7. Deployment

To deploy this site to GitHub Pages from the project dashboard, follow the following steps:

        └── <> Code --> select Settings tab
                        └── Github Pages
                                └── Select None in Source --> Select master branch
                                                                        └──  Select Save

Once you have click save, it will take some time for the site to deploy.  Refresh the page. You will be provide with a notification that the site is published with a link to the site.  See the graphic below.
<img src="https://github.com/ddeveloper72/milestone-2-project/blob/master/static/images/readme/deployment5.png" width="560" alt="Fig 5 dc-js table with pagination"/>


## 8. References

* GitHub dc-js dimensional charting JavaScript library: for information on how to construct the dc-js charts and table pagination
* Google developer for information on how to setup and use google maps API
* @Eventyret for showing me how to user faker to generate my data.
* @Miro who showed me how to return my debug and console log my data.
* Stackoverflow for everything else!
* Friends and colleagues from the Code Institute who were involved in the user testing and were able to provide me with valuable user feedback to help me improve and debug my code.


<h6><span class="text-muted">Milestone 2 project for the Code Institute <br />by Duncan Falconer, 2018</span></h6>

