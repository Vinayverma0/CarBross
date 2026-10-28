document.addEventListener("DOMContentLoaded", () => {
    const introOverlay = document.getElementById("intro-overlay");
    const mainContent = document.getElementById("main-content");
    const bgVideo = document.getElementById("bg-video");

    // Start directly with Car Bros Animation screen for 2 seconds then show website
    setTimeout(() => {
        if (introOverlay) introOverlay.classList.add("fade-out");
        if (mainContent) mainContent.classList.remove("hidden");
        if (bgVideo) bgVideo.play().catch(e => console.log("BG video play error:", e));

        setTimeout(() => {
            if (introOverlay) introOverlay.remove();
        }, 800);
    }, 2000);

    // VIRTUAL GARAGE PHOTO SWITCHING LOGIC
    const carButtons = document.querySelectorAll(".car-option-btn");
    const activeCarImg = document.getElementById("active-car-img");
    const activeCarTitle = document.getElementById("active-car-title");
    const activeCarDesc = document.getElementById("active-car-desc");

    carButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            carButtons.forEach(btn => btn.classList.remove("active"));
            const clickedBtn = e.currentTarget;
            clickedBtn.classList.add("active");

            const imgSrc = clickedBtn.getAttribute("data-img");
            const carName = clickedBtn.getAttribute("data-name");
            const carDesc = clickedBtn.getAttribute("data-desc");

            // Smooth image transition effect
            activeCarImg.style.opacity = "0";
            setTimeout(() => {
                activeCarImg.src = imgSrc;
                activeCarTitle.textContent = carName;
                activeCarDesc.textContent = carDesc;
                activeCarImg.style.opacity = "1";
            }, 200);
        });
    });

    // CONTACT FORM SUBMISSION TO FORMSPREE & THANK YOU POPUP
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const thankyouModal = document.getElementById("thankyou-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", async function(e) {
            e.preventDefault();

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            const formspreeEndpoint = contactForm.action;
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'json'
                    }
                });

                if (response.ok) {
                    thankyouModal.classList.remove("hidden");
                    contactForm.reset();
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            } catch (error) {
                alert("Network error! Please check your connection.");
            } finally {
                submitBtn.textContent = "Submit Inquiry";
                submitBtn.disabled = false;
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            thankyouModal.classList.add("hidden");
        });
    }

    if (thankyouModal) {
        thankyouModal.addEventListener("click", (e) => {
            if (e.target === thankyouModal) {
                thankyouModal.classList.add("hidden");
            }
        });
    }
});