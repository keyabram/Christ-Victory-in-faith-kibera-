document.addEventListener('DOMContentLoaded', () => {
    const verses = [
        "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11",
        "I can do all things through him who strengthens me. - Philippians 4:13",
        "The Lord is my shepherd; I shall not want. - Psalm 23:1",
        "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint. - Isaiah 40:31",
        "Trust in the Lord with all your heart, and do not lean on your own understanding. - Proverbs 3:5"
    ];

    const today = new Date();
    const index = today.getDate() % verses.length;
    document.getElementById("verse").innerText = verses[index];

    const links = document.querySelectorAll('nav ul li a');
    const heroSection = document.querySelector('.hero-section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function changeBackgroundImage() {
        const images = [
            'https://source.unsplash.com/1600x900/?church,inside',
            'https://source.unsplash.com/1600x900/?church,altar',
            'https://source.unsplash.com/1600x900/?church,prayer',
            'https://source.unsplash.com/1600x900/?church,service'
        ];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        heroSection.style.backgroundImage = `url(${randomImage})`;
    }

    setTimeout(changeBackgroundImage, 3000);

    const galleryItems = document.querySelectorAll('.gallery-item');

    function checkSlide() {
        galleryItems.forEach(item => {
            const slideInAt = (window.scrollY + window.innerHeight) - item.clientHeight / 2;
            const itemBottom = item.offsetTop + item.clientHeight;
            const isHalfShown = slideInAt > item.offsetTop;
            const isNotScrolledPast = window.scrollY < itemBottom;

            if (isHalfShown && isNotScrolledPast) {
                item.classList.add('slide-in');
            }
        });
    }

    window.addEventListener('scroll', checkSlide);
    setTimeout(() => {
        galleryItems.forEach(item => item.style.opacity = 1);
    }, 3000);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    galleryItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    document.querySelector('.carousel-control-next').addEventListener('click', () => {
        moveToNextSlide();
    });

    document.querySelector('.carousel-control-prev').addEventListener('click', () => {
        moveToPrevSlide();
    });

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    const ministryDetails = {
        "children-ministry": {
            title: "Children's Ministry",
            description: "Details about the children's ministry, including activities, goals, and events.",
            leaders: [
                { name: "Leader Name 1", role: "Role and description of the leader.", image: "images/secreatary.jpg" },
                { name: "Leader Name 2", role: "Role and description of the leader.", image: "images/leader2.jpg" }
            ],
            photos: ["images/ministry1.jpg", "images/ministry2.jpg"],
            videos: ["videos/ministry1.mp4"]
        },
        "youth-ministry": {
            title: "Youth Ministry",
            description: "Details about the youth ministry, including activities, goals, and events.",
            leaders: [
                { name: "Van Vica", role: "Preacher and Event Co-ordinator.", image: "images/.jpg" },
                { name: "Bramuel", role: "Event Moderator.", image: "images/bk.jpg" }
            ],
            photos: ["images/ministry3.jpg", "images/ministry4.jpg"],
            videos: ["videos/ministry2.mp4"]
        },
        "door-to-door-ministry": {
            title: "Door to Door Ministry",
            description: "Details about the Door to Door ministry, including activities, goals, and events.",
            leaders: [
                { name: "MOSES", role: "Preacher.", image: "images/adie.jpg" },
                { name: "Deborah", role: "Team Leader.", image: "images/secreatary.jpg" }
            ],
            photos: ["door to door/d1.jpg", "images/ministry6.jpg"],
            videos: ["door to door/d2.mp4"]
        }
    };

    function loadMinistryDetails(ministryId) {
        const ministry = ministryDetails[ministryId];
        document.getElementById('ministry-title').innerText = ministry.title;
        document.getElementById('ministry-description').innerText = ministry.description;

        const leadersContainer = document.getElementById('ministry-leaders');
        leadersContainer.innerHTML = '';
        ministry.leaders.forEach(leader => {
            const leaderDiv = document.createElement('div');
            leaderDiv.classList.add('leader');
            leaderDiv.innerHTML = `
                <img src="${leader.image}" alt="${leader.name}">
                <h4>${leader.name}</h4>
                <p>${leader.role}</p>
            `;
            leadersContainer.appendChild(leaderDiv);
        });

        const photosContainer = document.getElementById('ministry-photos');
        photosContainer.innerHTML = '';
        ministry.photos.forEach(photo => {
            const photoDiv = document.createElement('div');
            photoDiv.classList.add('gallery-item');
            photoDiv.innerHTML = `<img src="${photo}" alt="Ministry Photo">`;
            photosContainer.appendChild(photoDiv);
        });

        const videosContainer = document.getElementById('ministry-videos');
        videosContainer.innerHTML = '';
        ministry.videos.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('video-item');
            videoDiv.innerHTML = `
                <video controls>
                    <source src="${video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            videosContainer.appendChild(videoDiv);
        });
    }

    const ministryLinks = document.querySelectorAll('.ministry a');
    ministryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const ministryId = e.target.getAttribute('href').substring(1);
            loadMinistryDetails(ministryId);
        });
    });

    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });

    function openModal(id) {
        const modal = document.getElementById(id);
        modal.style.display = 'flex';
        const firstFocusableElement = modal.querySelector('.modal-content');
        firstFocusableElement.focus();
        trapFocus(modal);
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        modal.style.display = 'none';
        document.querySelector(`[data-modal="${id}"]`).focus();
    }

    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', function (event) {
            const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);

            if (!isTabPressed) {
                return;
            }

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const verses = [
        "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11",
        "I can do all things through him who strengthens me. - Philippians 4:13",
        "The Lord is my shepherd; I shall not want. - Psalm 23:1",
        "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint. - Isaiah 40:31",
        "Trust in the Lord with all your heart, and do not lean on your own understanding. - Proverbs 3:5"
    ];

    const today = new Date();
    const index = today.getDate() % verses.length;
    document.getElementById("verse").innerText = verses[index];

    const links = document.querySelectorAll('nav ul li a');
    const heroSection = document.querySelector('.hero-section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function changeBackgroundImage() {
        const images = [
            'https://source.unsplash.com/1600x900/?church,inside',
            'https://source.unsplash.com/1600x900/?church,altar',
            'https://source.unsplash.com/1600x900/?church,prayer',
            'https://source.unsplash.com/1600x900/?church,service'
        ];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        heroSection.style.backgroundImage = `url(${randomImage})`;
    }

    setTimeout(changeBackgroundImage, 3000);

    const galleryItems = document.querySelectorAll('.gallery-item');

    function checkSlide() {
        galleryItems.forEach(item => {
            const slideInAt = (window.scrollY + window.innerHeight) - item.clientHeight / 2;
            const itemBottom = item.offsetTop + item.clientHeight;
            const isHalfShown = slideInAt > item.offsetTop;
            const isNotScrolledPast = window.scrollY < itemBottom;

            if (isHalfShown && isNotScrolledPast) {
                item.classList.add('slide-in');
            }
        });
    }

    window.addEventListener('scroll', checkSlide);
    setTimeout(() => {
        galleryItems.forEach(item => item.style.opacity = 1);
    }, 3000);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    galleryItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    document.querySelector('.carousel-control-next').addEventListener('click', () => {
        moveToNextSlide();
    });

    document.querySelector('.carousel-control-prev').addEventListener('click', () => {
        moveToPrevSlide();
    });

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    const ministryDetails = {
        "children-ministry": {
            title: "Children's Ministry",
            description: "Details about the children's ministry, including activities, goals, and events.",
            leaders: [
                { name: "Leader Name 1", role: "Role and description of the leader.", image: "images/secreatary.jpg" },
                { name: "Leader Name 2", role: "Role and description of the leader.", image: "images/leader2.jpg" }
            ],
            photos: ["images/ministry1.jpg", "images/ministry2.jpg"],
            videos: ["videos/ministry1.mp4"]
        },
        "youth-ministry": {
            title: "Youth Ministry",
            description: "Details about the youth ministry, including activities, goals, and events.",
            leaders: [
                { name: "Van Vica", role: "Preacher and Event Co-ordinator.", image: "images/.jpg" },
                { name: "Bramuel", role: "Event Moderator.", image: "images/bk.jpg" }
            ],
            photos: ["images/ministry3.jpg", "images/ministry4.jpg"],
            videos: ["videos/ministry2.mp4"]
        },
        "door-to-door-ministry": {
            title: "Door to Door Ministry",
            description: "Details about the Door to Door ministry, including activities, goals, and events.",
            leaders: [
                { name: "MOSES", role: "Preacher.", image: "images/adie.jpg" },
                { name: "Deborah", role: "Team Leader.", image: "images/secreatary.jpg" }
            ],
            photos: ["door to door/d1.jpg", "images/ministry6.jpg"],
            videos: ["door to door/d2.mp4"]
        }
    };

    function loadMinistryDetails(ministryId) {
        const ministry = ministryDetails[ministryId];
        document.getElementById('ministry-title').innerText = ministry.title;
        document.getElementById('ministry-description').innerText = ministry.description;

        const leadersContainer = document.getElementById('ministry-leaders');
        leadersContainer.innerHTML = '';
        ministry.leaders.forEach(leader => {
            const leaderDiv = document.createElement('div');
            leaderDiv.classList.add('leader');
            leaderDiv.innerHTML = `
                <img src="${leader.image}" alt="${leader.name}">
                <h4>${leader.name}</h4>
                <p>${leader.role}</p>
            `;
            leadersContainer.appendChild(leaderDiv);
        });

        const photosContainer = document.getElementById('ministry-photos');
        photosContainer.innerHTML = '';
        ministry.photos.forEach(photo => {
            const photoDiv = document.createElement('div');
            photoDiv.classList.add('gallery-item');
            photoDiv.innerHTML = `<img src="${photo}" alt="Ministry Photo">`;
            photosContainer.appendChild(photoDiv);
        });

        const videosContainer = document.getElementById('ministry-videos');
        videosContainer.innerHTML = '';
        ministry.videos.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('video-item');
            videoDiv.innerHTML = `
                <video controls>
                    <source src="${video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            videosContainer.appendChild(videoDiv);
        });
    }

    const ministryLinks = document.querySelectorAll('.ministry a');
    ministryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const ministryId = e.target.getAttribute('href').substring(1);
            loadMinistryDetails(ministryId);
        });
    });

    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });

    function openModal(id) {
        const modal = document.getElementById(id);
        modal.style.display = 'flex';
        const firstFocusableElement = modal.querySelector('.modal-content');
        firstFocusableElement.focus();
        trapFocus(modal);
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        modal.style.display = 'none';
        document.querySelector(`[data-modal="${id}"]`).focus();
    }

    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', function (event) {
            const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);

            if (!isTabPressed) {
                return;
            }

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        });
    }

    // Notification Banner Feature
    function showNotification(message) {
        const banner = document.getElementById('notification-banner');
        const messageElement = document.getElementById('notification-message');
        const dismissButton = document.getElementById('dismiss-banner');

        messageElement.innerText = message;
        banner.style.display = 'block';

        dismissButton.addEventListener('click', () => {
            banner.style.display = 'none';
        });
    }

    // Example usage: Show notification when a new event is added
    showNotification('New event added: Community Outreach on March 15, 2025');
});
