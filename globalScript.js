// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo
window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  var logo = document.querySelector('#logo-header img'); // Adjusted selector to target the logo image directly
  var landingPageElements = document.querySelectorAll('.landing-area'); // Select all elements with the class "landing-page"
  var additionalMargin = 60; // Adjust this value to add extra space between the navbar and the landing elements

  if (window.scrollY > 50) { // Change 50 to the scroll threshold you desire
      header.style.height = '68px'; // Adjust the header height
      logo.style.maxHeight = '60px'; // Adjust the logo height
      logo.style.maxWidth = '60px'; // Adjust the logo width

      landingPageElements.forEach(function(element) {
        // Adjust margin top dynamically based on the header height plus additional margin
        element.style.marginTop = (header.offsetHeight + additionalMargin) + 'px';
      });
  } else {
      header.style.height = '115px'; // Reset header height
      logo.style.maxHeight = '100px'; // Reset logo height
      logo.style.maxWidth = '150px'; // Reset logo width
      
      // Loop through all landing page elements and reset margin top dynamically
      landingPageElements.forEach(function(element) {
        // Adjust margin top dynamically based on the header height plus additional margin
        element.style.marginTop = (header.offsetHeight + additionalMargin) + 'px';
      });
  }
});
