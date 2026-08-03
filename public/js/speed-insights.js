/**
 * Vercel Speed Insights initialization
 * Automatically tracks web vitals and performance metrics
 */
(function() {
  'use strict';
  
  // Initialize Speed Insights queue
  window.si = window.si || function () { 
    (window.siq = window.siq || []).push(arguments); 
  };
  
  // Load Speed Insights script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/speed-insights/script.js';
  script.onerror = function() {
    // Fail silently if Speed Insights is not enabled on Vercel
    console.debug('Speed Insights: Not enabled or not deployed on Vercel');
  };
  document.head.appendChild(script);
})();
