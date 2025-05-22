//global variables 
let automaticScrollEnabled = true;

//mouse lighting and follow
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--x', `${x}%`);
    document.body.style.setProperty('--y', `${y}%`);
    const light = document.querySelector('.mouse-light');
    light.style.left = `${e.clientX}px`;
    light.style.top = `${e.clientY}px`;

    const follow = document.querySelector('.mouse-follow');
    follow.style.left = `${e.clientX}px`;
    follow.style.top = `${e.clientY}px`;
});

//change main color
let themes = {
    default: {
        '--mainColor': '#377f5d',
        '--white': '235, 235, 235',
        '--black': '0, 0, 0'
    },
    turquoise: {
        '--mainColor': '#377f5d',
        '--white': '235, 235, 235',
        '--black': '0, 0, 0'
    },
    forest: {
        '--mainColor': '#218721',
        '--white': '235, 235, 235',
        '--black': '0, 0, 0'
    },
    sky: {
        '--mainColor': '#7bc1fa',
        '--white': '255, 251, 223',
        '--black': '117, 170, 240'
    },
    tron: {
        '--mainColor': '#3f8996',
        '--white': '202, 243, 247',
        '--black': '1, 14, 23'
    },
    provence: {
        '--mainColor': '#7ba0fc',
        '--white': '235, 235, 235',
        '--black': '0, 0, 0'
    },
    red: {
        '--mainColor': '#c61017',
        '--white': '235, 235, 235',
        '--black': '103, 8, 12',
    },
    purple: {
        '--mainColor': 'rgb(102, 51, 153)',
        '--white': '241, 231, 254',
        '--black': '0, 0, 0'
    },
    terracotta: {
        '--mainColor': '#804004',
        '--white': '245, 240, 235',
        '--black': '10, 5, 0'
    },
    black: {
        '--mainColor': '#262628',
        '--white': '245, 240, 235',
        '--black': '10, 5, 0'
    },
    grey: {
        '--mainColor': '#6d757a',
        '--white': '245, 240, 235',
        '--black': '10, 5, 0'
    },
    paper: {
        '--mainColor': '#fffaed',//'#f9f8f6',
        '--white': '42, 42, 42',
        '--black': '245, 240, 235'
    },
    paper_blue: {
        '--mainColor': '#d2e9ff',
        '--white': '42, 42, 42',
        '--black': '236, 245, 255'
    },
    paper_red: {
        '--mainColor': '#fffaed',//'#f7f8fa',
        '--white': '167, 0, 0',
        '--black': '251, 252, 255'
    },
    geek: {
        '--mainColor': '#111111',
        '--white': '225, 225, 235',
        '--black': '88, 101, 242',
    },
    
};
setDefaultTheme('paper');

function setDefaultTheme(themeName){
    themes['default'] = themes[themeName];
    applyTheme('default');
}
function applyTheme(themeName) {
    const root = document.documentElement;
    const theme = themes[themeName];

    if (!theme) {
        console.warn(`Theme "${themeName}" not found.`);
        return;
    }
    Object.entries(theme).forEach(([varName, value]) => {
        document.body.style.setProperty(varName, value);
    });
}

function setMainColorTo(btn, nActive) {
    let filterText = btn.textContent;
    if(nActive == 0 || nActive > 1){
        applyTheme('default');
        return 0;
    }
    const buttons = document.getElementsByClassName('filter-button');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute("data-status") === "active") {
            if(buttons[i].textContent.includes('3D Printing')){
                applyTheme('purple');
            }
            if(buttons[i].textContent.includes('Humanitarian Aid')){
                applyTheme('paper_red');
            }
            if(buttons[i].textContent.includes('Medical Devices')){
                applyTheme('tron');
            }
            if(buttons[i].textContent.includes('Web Design')){
                applyTheme('geek');
            }
            if(buttons[i].textContent.includes('Open-Source')){
                applyTheme('terracotta');
            }
        }
    }
}
//filter toogling
function toggleFilterButton(btn) {
    const dels = document.getElementsByClassName('filter-delete');
    const buttons = document.getElementsByClassName('filter-button');
    const cards = document.querySelectorAll('.experience-card');
    const events = document.querySelectorAll('.event-card');


    const current = btn.getAttribute("data-status");
    btn.setAttribute("data-status", current === "active" ? "inactive" : "active");

    for (let i = 0; i < dels.length; i++) {
        dels[i].setAttribute("data-status", "active");
    }

    // Check if any filter button is active
    let nActive = 0;
    let anyCard = false;
    let anyEvent = false;
    setAllEventCardsHidden();
    setAllExperienceCardsHidden();
    for (let i = 0; i < buttons.length; i++) {
        console.log(i);
        if (buttons[i].getAttribute("data-status") === "active") {
            nActive ++;
            cards.forEach(card => {
                const filters = card.getAttribute('data-filters');
                if (filters.includes(buttons[i].textContent.trim()) || filters.includes('All')) {
                    card.style.display = 'block';
                    anyCard = true;
                } 
            });
            events.forEach(event => {
                const filters = event.getAttribute('data-filters');
                if (filters.includes(buttons[i].textContent.trim()) || filters.includes('All')) {
                    event.style.display = 'block';
                    anyEvent = true;
                } 
            });
        }
    }

    // color management 
    setMainColorTo(btn, nActive);


    // If no filter button is active, set the delete filter buttons to inactive
    if (!nActive) {
        setAllFilterButtonsInactive();
        cards.forEach(card => {
            card.style.display = 'block';
            anyCard = true;
        });
        events.forEach(event => {
            event.style.display = 'block';
            anyEvent = true;
        });
    }

    // alert if no card displayed
    if(! anyCard){
        alert('no experience found, filter may be irrelevant');
    }

    if(! anyEvent){
        alert('no event found, filter may be irrelevant');
    }
    
}

function setAllExperienceCardsHidden(){
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(card => {
        card.style.display = 'none';
    });
}

function setAllEventCardsHidden(){
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        card.style.display = 'none';
    });
}

function setAllFilterButtonsInactive(){
    const dels = document.getElementsByClassName('filter-delete');
    const buttons = document.getElementsByClassName('filter-button');

    for (let i = 0; i < dels.length; i++) {
        dels[i].setAttribute("data-status", "inactive");
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("data-status", "inactive");
    }
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(card => {
        card.style.display = 'block';
    });

    const events = document.querySelectorAll('.event-card');
    events.forEach(event => {
        event.style.display = 'block';
    });

    applyTheme('default');
}

// experience click journey
function showDescription(experienceCard) {
    // let init = experienceCard.querySelector('.experience-card-description').getAttribute("data-status");
    let init = experienceCard.getAttribute("data-status");
    console.log(init);
    // Hide all other descriptions
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(card => {
        // const desc = card.querySelector('.experience-card-description');
        // if (desc) desc.setAttribute("data-status", "inactive");
        card.setAttribute("data-status", "inactive");
    });

    // Activate the current card's description if it was not
    if(init === 'inactive'){
        // const currentDesc = experienceCard.querySelector('.experience-card-description');
        // if (currentDesc) currentDesc.setAttribute("data-status", "active");  
        experienceCard.setAttribute("data-status", "active");
        
    }
}

function showAllDescription() {
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(card => {
        // const desc = card.querySelector('.experience-card-description');
        // if (desc) desc.setAttribute("data-status", "inactive");
        card.setAttribute("data-status", "active");
        card.querySelector(".experience-card-date").style.opacity = 1.0;
        card.querySelector(".experience-card-date").style.color = 'black';
        card.querySelector(".experience-card-date").style.fontSize = 0.9 + 'em';
    });
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.style.maxWidth = 100 +'%';
        
        card.style.maxHeight = '100vh';
        card.style.height = 'auto';

        card.querySelector(".event-card-description").style.display="block";
    });
}

function showEventDescription(eventCard){
    //display opacifier
    const opaque = document.getElementById('events-back');
    hideAllEventDescriptions(opaque);
    opaque.setAttribute("data-status", "active");

    //display reader
    const reader = document.getElementById('eventDescriptionReader');
    reader.setAttribute("data-status", "active");

    //disable manual and auto-scroll
    automaticScrollEnabled = false;
    lockBodyScroll();

    // Extract content from clicked card
    const textZone = reader.querySelector('.text-zone');
    const widgetZone = reader.querySelector('.widget-zone');
    const title = eventCard.querySelector('.event-card-title')?.outerHTML || '';
    const date = eventCard.querySelector('.event-card-date')?.outerHTML || '';
    const description = eventCard.querySelector('.event-card-description')?.outerHTML || '';
    const imageContainer = eventCard.querySelector('.event-card-image-container')?.outerHTML || '';
    const skillsContainer = eventCard.querySelector('.event-card-skills-container')?.outerHTML || '';

    // Inject into reader
    textZone.innerHTML = title + date + description;
    widgetZone.innerHTML = imageContainer + skillsContainer;

    // mark the card as active
    eventCard.setAttribute("data-status", "active");
}


function hideAllEventDescriptions(opaque) {
    //enable manual and automatic scroll
    automaticScrollEnabled = true;
    unlockBodyScroll();
    //disable event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.setAttribute("data-status", "inactive");
        card.onclick = () => showEventDescription(card);
        card.removeEventListener('mouseover', lockBodyScroll);
    });
    //remove opacifier
    opaque.setAttribute("data-status", "inactive");
    //hide reader
    const reader = document.getElementById('eventDescriptionReader');
    reader.setAttribute("data-status", "inactive");
}

// Attach event listeners to all .event-card elements
  // Scroll-locking logic
function lockBodyScroll() {
    const scrollbarWidth = getScrollbarWidth();
    document.body.classList.add('noscroll');
    document.body.style.marginRight = `${scrollbarWidth}px`;  // Compensates for the scrollbar
}

function unlockBodyScroll() {
    document.body.classList.remove('noscroll');
    document.body.style.marginRight = '0';  // Reset margin when unlocking scroll
}


// page navigation
function goTo(url) {
    window.open(url, '_blank');
}

// sorcerer thing to scroll automatically
const edgeThreshold =  80; // px from top/bottom to trigger scroll
const maxScrollSpeed = 6;  // maximum speed (px per interval)
const intervalDelay = 10;   // ms

let scrollInterval = null;

document.addEventListener('mousemove', (e) => {
  if(!automaticScrollEnabled){
    clearInterval(scrollInterval);
    console.log('test');
    return;
}
const y = e.clientY;
const windowHeight = window.innerHeight;

  clearInterval(scrollInterval); // reset scroll on each move

  // Calculate distance from top and bottom edges
  const distanceFromTop = y;
  const distanceFromBottom = windowHeight - y;

  let scrollSpeed = 0;

  if (distanceFromTop < edgeThreshold) {
    // Proportional speed based on distance to top edge
    scrollSpeed = Math.min(maxScrollSpeed, (edgeThreshold - distanceFromTop) / edgeThreshold * maxScrollSpeed);
    scrollInterval = setInterval(() => {
      window.scrollBy(0, -scrollSpeed); // scroll up
  }, intervalDelay);
} else if (distanceFromBottom < edgeThreshold) {
    // Proportional speed based on distance to bottom edge
    scrollSpeed = Math.min(maxScrollSpeed, (edgeThreshold - distanceFromBottom) / edgeThreshold * maxScrollSpeed);
    scrollInterval = setInterval(() => {
      window.scrollBy(0, scrollSpeed); // scroll down
  }, intervalDelay);
}
});

document.addEventListener('mouseleave', () => {
  clearInterval(scrollInterval);
});

// sorcerer thing to manage scrollbar
function getScrollbarWidth() {
  // Create a temporary div to calculate the scrollbar width
  const div = document.createElement('div');
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';
  document.body.appendChild(div);
  
  // Get the width of the scrollbar
  const scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div); // Clean up the temporary div
  
  return scrollbarWidth;
}

// auto click after 5s
let timeoutId;
let lastEnteredElement = null;  // To track the element the mouse last entered

// Function to simulate mouse click on the concerned element
function simulateMouseClick() {
  if (lastEnteredElement) {
    console.log(`Simulating click on:`, lastEnteredElement);
    lastEnteredElement.click();  // Simulate a click on the last entered element
}
}

// Start or reset the inactivity timer when the mouse enters an element
function onMouseEnter(event) {
  lastEnteredElement = event.target;  // Track the element where the mouse entered
  if(lastEnteredElement.getAttribute('data-status') === 'active'){
    //
  }
  else{
      clearTimeout(timeoutId);  // Reset any existing timeout
      timeoutId = setTimeout(simulateMouseClick, 3000); // Trigger click after 5 seconds of inactivity
  }
}

// Reset the inactivity timer when the mouse leaves an element
function onMouseLeave() {
  clearTimeout(timeoutId);  // Clear timeout when the mouse leaves the element
}

function onClick(event) {
  clearTimeout(timeoutId);  // Clear any existing timeout on manual click
}

// Add event listeners for mouse enter, leave, and click only on specific elements
document.querySelectorAll('button, .experience-card, .event-card').forEach(element => {
  element.addEventListener('mouseenter', onMouseEnter);
  element.addEventListener('mouseleave', onMouseLeave);
  element.addEventListener('click', onClick);  // Add click listener to reset the timer

});

//printing management

// Function to update media attributes based on conditions
function updateStylesheets() {
  // Always remove print stylesheet
  var printCss = document.getElementById('print-css');
  if (printCss) printCss.remove();

  var desktopCss = document.getElementById('desktop-css');
  var mobileCss = document.getElementById('mobile-css');

  if (window.innerWidth >= 768) {
    // Desktop view
    if (!desktopCss) {
      // Add Desktop CSS
      desktopCss = document.createElement('link');
      desktopCss.rel = 'stylesheet';
      desktopCss.id = 'desktop-css';
      desktopCss.href = 'desktop.css';
      desktopCss.media = 'screen and (min-width: 768px)';
      document.head.appendChild(desktopCss);
    }
    // Remove Mobile CSS if exists
    if (mobileCss) mobileCss.remove();
  } else {
    // Mobile view
    if (!mobileCss) {
      // Add Mobile CSS
      mobileCss = document.createElement('link');
      mobileCss.rel = 'stylesheet';
      mobileCss.id = 'mobile-css';
      mobileCss.href = 'mobile.css';
      mobileCss.media = 'screen and (max-width: 767px)';
      document.head.appendChild(mobileCss);
    }
    // Remove Desktop CSS if exists
    if (desktopCss) desktopCss.remove();
  }
}

// Update styles on page load and window resize
window.addEventListener('load', updateStylesheets);
window.addEventListener('resize', updateStylesheets);


// Function to launch printing (same as ctrl-p)
function doPrint() {
    // Remove desktop and mobile stylesheets
    var desktopCss = document.getElementById('desktop-css');
    if (desktopCss) desktopCss.remove();

    var mobileCss = document.getElementById('mobile-css');
    if (mobileCss) mobileCss.remove();

    // Add print stylesheet
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'print-css';
    link.href = 'print.css'; // Update this path to your print CSS file
    document.head.appendChild(link);

    // Wait for the stylesheet to load, then print
    link.onload = function() {
        if (window.matchMedia) {
          var mediaQueryList = window.matchMedia('print');
          mediaQueryList.addEventListener('change', function(mql) {
            if (!mql.matches) {
                updateStylesheets();
            }
          });
        }
        window.print();
    };
}


// Function to execute before printing
function beforePrint() {
  // Remove desktop and mobile stylesheets
  var desktopCss = document.getElementById('desktop-css');
  if (desktopCss) desktopCss.remove();
  var mobileCss = document.getElementById('mobile-css');
  if (mobileCss) mobileCss.remove();

  // Add print stylesheet
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.id = 'print-css';
  link.href = 'print.css'; // Update this path to your print CSS file
  document.head.appendChild(link);

}

// Function to execute after printing
function afterPrint() {
    updateStylesheets(); 
}

// Attach the functions to the print events
window.onbeforeprint = beforePrint
window.onafterprint = afterPrint;

// update last updated
async function updateLastUpdated() {
  const apiUrl = "https://api.github.com/repos/arthurvangeersdaele/mycv/commits?path=index.html";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length > 0) {
      const lastCommitDate = new Date(data[0].commit.committer.date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = lastCommitDate.toLocaleDateString('en-US', options);

      // Update the DOM
      const smallText = document.querySelector('.last-updated');
      if (smallText) {
        smallText.innerHTML = `Last updated: ${formattedDate}.`;
      }
    }
  } catch (error) {
    console.error("Error fetching last commit date:", error);
  }
}

// Call the function on page load

window.addEventListener('load',  updateLastUpdated() );