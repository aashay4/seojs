const dns = require('dns');
var Crawler = require("crawler");
const jsdom = require("jsdom");
const cheerio = require('cheerio')
const { JSDOM } = jsdom;
var Crawler1 = require("simplecrawler");
var async = require("async");
const colors = require('colors');


var request = require('request');
module.exports.seojs = seojs =>
{

 var a = seojs;
  //console.log(a)
    let metainfo44 = [];
    let firstff = [];
    var c = new Crawler({
      maxConnections : 10,
      // This will be called for each crawled page
      callback : function (error, res, done) {
          if(error){
              console.log(error);
          }
          else{
              var $ = res.$;
              // $ is Cheerio by default
              //a lean implementation of core jQuery designed specifically for the server
              //console.log("title:");
              var aa = $("title").text();
              console.log("Title: ".underline + aa.underline);
              if(aa.length > 60)
              {console.log("Error: Title length is ".red + aa.length + " characters. It should be between 40 to 60 Characters".red + "\n");}
              else if(aa.length < 40){
                console.log("Error: Title length is ".red + aa.length + " characters. It should be between 40 to 60 Characters".red + "\n");
              }
              else {
                var verdict = "Great! Your Title is idea"
                console.log(verdict.green + "\n");
              }
              //console.log("H1:" + $("h1").text());
              var description = $("meta[name=description]").attr("content");
              if(description !== undefined) {
              console.log("Description: ".underline + description.underline);
              if(description.length > 160){
                console.log("Error: Description length is ".red + description.length + " characters. It should be between 60 to 160 Characters".red + "\n");
              }
              else if(description.length < 60){
                console.log("Error: Description length is ".red + description.length + " characters. It should be between 60 to 160 Characters".red + "\n");
              }
              else{
                var verdict = "Great! Your Description is ideal"
                console.log(verdict.green + "\n");
              }
            }
            else{
              var verdict = "Description Missing"
              console.log("Description: ".underline + verdict.underline + "\n");
            }
              var canonical = $("link[rel='canonical']").attr("href");

              if(canonical !== undefined){
                console.log("Canonical: ".underline + canonical.underline);
                var verdict = "Great! Your Website Has Canonical Tag"
                console.log(verdict.green + "\n");
              }
              else{
                var verdict = "Canonical Tag Missing"
                console.log("Canonical: ".underline + verdict.red + "\n");
              }
            $('img').each(function(i, link){
              //console.log($(link).attr('alt'));
              let llp = [];
              llp = $(link).attr('alt');
              firstff.push(llp);
              });
             };
             function handler(req, res, val) {

              // console.log("the value" + val);
               //element.alttag = firstyeah;
              request(a + '/sitemap.xml', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                //  element.sitemapfound = 'Yes' // Print the google web pages.
                } else {
                //  element.sitemapfound = "No" // Print the google web pages.
                }
              })
            };
            function handlera(req, res) {
             request(a + '/robots.txt', function (error, response, body) {
               if (!error && response.statusCode == 200) {
                // element.robotsfile = 'Yes' // Print the google web pages.
               } else {
                // element.robotsfile = "No" // Print the google web pages.
               }
             })
           };
          done();
          handler();
          handlera();
      }
  });
  var crawler1 = Crawler1(a)
  crawler1.maxDepth = 1; // Only first page is fetched (with linked CSS & images)

  crawler1.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    if(queueItem.stateData.contentType === "text/html; charset=UTF-8" || queueItem.stateData.contentType === "text/html; charset=utf-8")
    //console.log(queueItem);
      var bb = queueItem.protocol;
      if(bb !== undefined){
      console.log("Protocol: ".underline + bb.underline);
      if(bb === "https"){
        console.log("Great! You are using HTTPs protocol".green + "\n")
      }
      else{
        console.log("We encourage you to add HTTPs Protocol for better seo result".red + "\n");
      }
    }
    else{
      console.log("Protocol: ".underline + "Not Able to get protocol".underline + "\n");
    }

    //  element.protocol = bb;
    //  element.referrer = (queueItem.referrer);
      //element.requesttime = (queueItem.stateData.requestTime);
      var requesttime = queueItem.stateData.requestTime + 3000;
      console.log("Page Loading Speed: ".underline + requesttime/1000 + "Seconds".underline)
      if(requesttime > 5000)
      {
        console.log("Error, Page loading speed is ".red + requesttime/1000 + " Seconds, it should be less then 4 seconds".orange + "\n")
      }
      else if(requesttime < 5000 && requesttime > 4000){
        console.log("Error, Page loading speed is ".orange + requesttime/1000 + " Seconds, it should be less then 4 seconds".orange + "\n")
      }
      else{
        console.log("Great! Your page is optimized with ".green + requesttime/1000 + " Seconds".green + "\n")
      }

      var size = queueItem.stateData.actualDataSize;
      console.log("Page Size: ".underline + size);
      if(size>33000)
      {
        console.log("This page is oversized ".red + size + "Bytes".red + " It should be below 33 KB".red + "\n");
      }
      else{
        console.log("The page size is SEO-friendly with ".green + size + " Bytes".green + "\n")
      }
      var server = queueItem.stateData.headers.server;
      console.log("server: ".underline + server)
  });
  crawler1.start();
  c.queue(a);
}
