/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URL defined and not empty', function() {
             for (let feed of allFeeds) {
                 expect(feed.url).toBeDefined();
                 expect(typeof feed.url).toBe('string');
                 expect(feed.url).not.toBe('');
             };
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have name defined and not empty', function() {
             for (let feed of allFeeds) {
                 expect(feed.name).toBeDefined();
                 expect(typeof feed.name).toBe('string');
                 expect(feed.name).not.toBe('');
             };
         });
    });


    /* This suite is about the menu visibility
    * and its initial state
    */
    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
             expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('changes visibility when clicked', function() {
              let hamburger = $('.menu-icon-link');
              hamburger.click();
              expect($('body').hasClass('menu-hidden')).toBeFalsy();
              hamburger.click();
              expect($('body').hasClass('menu-hidden')).toBeTruthy();
          });
    });

    /* This test suite checks for the
    * presence of a minimum one initial entry
    */
    describe('Initial Entries', function() {

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
             loadFeed(0, function() {
                 done();
             });
         });

         it('there is at least a single entry', function(done) {
             expect($('.feed .entry').length).toBeGreaterThan(0);
             done();
         });
   });

    /* This test suite checks for change
    * in content on new feed selection.
    */
    describe('New Feed Selection', function() {

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
         var previousContent,
             newContent;

         beforeEach(function(done) {
             loadFeed(0, function() {
                 previousContent = $('.feed').html();

                 loadFeed(1, function(){
                     newContent= $('.feed').html();
                     done();
                 });
             });
         });

         it('content actually changes', function() {
             expect(previousContent).not.toBe(newContent);
         });
   });
}());
