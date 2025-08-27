/**
* Template Name: Restaurantly
* Updated: Sep 20 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function (e) {
        e.preventDefault();
        menuFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  // -------------------------------------------------------------------------------------


  // // Function to initialize the slider
  // function initializeSlider(sliderContainerId, images) {
  //   const sliderContainer = document.querySelector(`#${sliderContainerId}`);
  //   const slider = sliderContainer.querySelector('.slider');
  //   const dotsContainer = sliderContainer.querySelector('.dots');
  //   const prevBtn = sliderContainer.querySelector('.prev');
  //   const nextBtn = sliderContainer.querySelector('.next');

  //   let currentIndex = 0; // Tracks the current slide index
  //   let autoSlideInterval; // Will hold the interval ID for auto-sliding

  //   // Create slides and dots dynamically based on the images array
  //   images.forEach((imageSrc, index) => {
  //     // Create slide
  //     const slide = document.createElement('div');
  //     slide.classList.add('slide');
  //     slide.innerHTML = `<img src="${imageSrc}" alt="Slide ${index + 1}">`;
  //     slider.appendChild(slide);

  //     // Create dot
  //     const dot = document.createElement('span');
  //     dot.classList.add('dot');
  //     dot.dataset.index = index;
  //     dotsContainer.appendChild(dot);
  //   });

  //   const slides = slider.querySelectorAll('.slide');
  //   const dots = dotsContainer.querySelectorAll('.dot');

  //   // Function to update the active dot indicator
  //   function updateDots() {
  //     dots.forEach((dot, index) => {
  //       if (index === currentIndex) {
  //         dot.classList.add('active');
  //       } else {
  //         dot.classList.remove('active');
  //       }
  //     });
  //   }

  //   // Function to display a specific slide based on the index
  //   function showSlides(index) {
  //     if (index >= slides.length) {
  //       currentIndex = 0; // Reset to first slide if at the end
  //     } else if (index < 0) {
  //       currentIndex = slides.length - 1; // Go to last slide if at the beginning
  //     } else {
  //       currentIndex = index; // Otherwise, set to the provided index
  //     }
  //     slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide transition
  //     updateDots(); // Update the dots to reflect the current slide
  //   }

  //   // Function to move to the next slide
  //   function nextSlide() {
  //     showSlides(currentIndex + 1);
  //   }

  //   // Function to move to the previous slide
  //   function prevSlide() {
  //     showSlides(currentIndex - 1);
  //   }

  //   // Start the automatic sliding of images
  //   function startAutoSlide() {
  //     autoSlideInterval = setInterval(nextSlide, 4000); // Slide every 4 seconds
  //   }

  //   // Stop the automatic sliding
  //   function stopAutoSlide() {
  //     clearInterval(autoSlideInterval); // Clear the interval
  //   }

  //   // Add click event listeners to dots for direct slide navigation
  //   dots.forEach(dot => {
  //     dot.addEventListener('click', () => {
  //       stopAutoSlide(); // Stop auto-slide when manually selecting a slide
  //       showSlides(parseInt(dot.dataset.index)); // Show the selected slide
  //       startAutoSlide(); // Restart auto-slide
  //     });
  //   });

  //   // Add event listeners for navigation buttons
  //   nextBtn.addEventListener('click', nextSlide);
  //   prevBtn.addEventListener('click', prevSlide);

  //   // Stop auto-slide when the mouse enters the slider container
  //   sliderContainer.addEventListener('mouseover', stopAutoSlide);

  //   // Restart auto-slide when the mouse leaves the slider container
  //   sliderContainer.addEventListener('mouseout', startAutoSlide);

  //   // Start auto-slide when the page loads
  //   startAutoSlide();
  //   updateDots(); // Initialize the dots
  // }

  // // Function to fetch images from the backend and initialize the slider
  // function loadImagesForSlider(sliderId, folderPath) {
  //   fetch(`/get-images-from-folder/${folderPath}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.images) {
  //         const images = data.images; // Get the image paths from the backend
  //         initializeSlider(sliderId, images); // Initialize the slider with the image paths
  //       } else {
  //         console.error('No images found or an error occurred.');
  //       }
  //     })
  //     .catch(error => console.error('Error fetching images:', error));
  // }

  // // Example usage: Load images for the slider from a specific folder
  // loadImagesForSlider('slider1', 'folder1'); // Replace 'folder1' with the actual folder path




  // ---------------------------------------------------------------------------------
  // function to load images 
  // TODO: make it to load from google drive 

  function loadSliderImages(folderPath, sliderName) {

    fetch(`${folderPath}`)
      .then(response => response.json())
      .then(data => {
        const images = data.images;
        const slider = document.querySelector(`#${sliderName} .slider`);
        console.log(slider, "slider var");
        const dotsContainer = document.querySelector(`#${sliderName} + .dots-container`);
        console.log( dotsContainer, " dotsContainer var");
        let currentIndex = 0;
        if (!slider || !dotsContainer) {
          console.error(`Slider or dots container with id ${sliderName} not found!`);
          return; // Exit the function if elements are missing
        }
  
        // Clear existing content
        slider.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        // Create slides and dots dynamically
        images.forEach((image, index) => {
          const slide = document.createElement('div');
          slide.classList.add('slide');
          slide.innerHTML = `<img src="${image}" alt="Image ${index + 1}">`;
          slider.appendChild(slide);

          // Create dots for navigation
          const dot = document.createElement('span');
          dot.classList.add('dot');
          dot.setAttribute('data-index', index);
          dotsContainer.appendChild(dot);
        });

        // Add event listeners to the dots
        document.querySelectorAll(`#${sliderName} .dot`).forEach(dot => {
          dot.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index);
            showSlides(currentIndex, slider, dotsContainer);

          });
        });

        // Initialize slider
        showSlides(currentIndex, slider, dotsContainer);

        // Event listeners for navigation buttons
        document.querySelector(`#${sliderName} .next`).addEventListener('click', () => {
          currentIndex++;
          showSlides(currentIndex, slider, dotsContainer);
        });

        document.querySelector(`#${sliderName} .prev`).addEventListener('click', () => {
          currentIndex--;
          showSlides(currentIndex, slider, dotsContainer);
        });
      })
      .catch(error => console.error('Error loading images:', error));
  }

  // Function to show slides based on index
  function showSlides(index, slider, dotsContainer) {
    const images = slider.querySelectorAll('.slide');
    const dots = dotsContainer.querySelectorAll('.dot');

    if (index >= images.length) index = 0;
    if (index < 0) index = images.length - 1;

    const transformValue = `translateX(-${index * 100}%)`;
    slider.style.transform = transformValue;

    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }


  // Call the function with the folder and slider name
  document.addEventListener('DOMContentLoaded', function () {
    loadSliderImages('assets/js/json_files/meny_images.json', 'slider1')
    loadSliderImages('assets/js/json_files/galery_images.json', 'slider2')
  });



document.getElementById("downloadMenu").addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = "assets/menupdf/menu.pdf"; // path to your PDF file
  const now = new Date();
  const dateStr = now.getFullYear() +
                  ("0" + (now.getMonth()+1)).slice(-2) +
                  ("0" + now.getDate()).slice(-2);
  let filename = `Freshii-Menu_${dateStr}.pdf`;
  link.download = filename; // file name on download
  link.click();
});





  // const slider = document.querySelector('.slider');
  // const slides = document.querySelectorAll('.slide');
  // const prevBtn = document.querySelector('.prev');
  // const nextBtn = document.querySelector('.next');
  // const dots = document.querySelectorAll('.dot');
  // const sliderContainer = document.querySelector('.slider-container');

  // let currentIndex = 0; // Tracks the current slide index
  // let autoSlideInterval; // Will hold the interval ID for auto-sliding

  // // Function to update the active dot indicator
  // function updateDots() {
  //   dots.forEach((dot, index) => {
  //     if (index === currentIndex) {
  //       dot.classList.add('active');
  //     } else {
  //       dot.classList.remove('active');
  //     }
  //   });
  // }

  // // Function to display a specific slide based on the index
  // function showSlides(index) {
  //   if (index >= slides.length) {
  //     currentIndex = 0; // Reset to first slide if at the end
  //   } else if (index < 0) {
  //     currentIndex = slides.length - 1; // Go to last slide if at the beginning
  //   } else {
  //     currentIndex = index; // Otherwise, set to the provided index
  //   }
  //   slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide transition
  //   updateDots(); // Update the dots to reflect the current slide
  // }

  // // Function to move to the next slide
  // function nextSlide() {
  //   showSlides(currentIndex + 1);
  // }

  // // Function to move to the previous slide
  // function prevSlide() {
  //   showSlides(currentIndex - 1);
  // }

  // // Start the automatic sliding of images
  // function startAutoSlide() {
  //   autoSlideInterval = setInterval(nextSlide, 4000); // Slide every 4 seconds
  // }

  // // Stop the automatic sliding
  // function stopAutoSlide() {
  //   clearInterval(autoSlideInterval); // Clear the interval
  // }

  // // Add click event listeners to dots for direct slide navigation
  // dots.forEach(dot => {
  //   dot.addEventListener('click', () => {
  //     stopAutoSlide(); // Stop auto-slide when manually selecting a slide
  //     showSlides(parseInt(dot.dataset.index)); // Show the selected slide
  //     startAutoSlide(); // Restart auto-slide
  //   });
  // });

  // // Add event listeners for navigation buttons
  // nextBtn.addEventListener('click', nextSlide);
  // prevBtn.addEventListener('click', prevSlide);

  // // Stop auto-slide when the mouse enters the slider container
  // sliderContainer.addEventListener('mouseover', stopAutoSlide);

  // // Restart auto-slide when the mouse leaves the slider container
  // sliderContainer.addEventListener('mouseout', startAutoSlide);

  // // Start auto-slide when the page loads
  // startAutoSlide();
  // updateDots(); // Initialize the dots

  // ********************************











})()