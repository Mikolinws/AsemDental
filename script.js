/* =========================================
   ASEM DENTAL — SCRIPT.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CONFIG
       ========================================= */

    const WHATSAPP_NUMBER = "77771945031";


    /* =========================================
       MOBILE MENU
       ========================================= */

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector("nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {
            nav.classList.toggle("mobile-open");
            menuButton.classList.toggle("active");
        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("mobile-open");
                menuButton.classList.remove("active");
            });

        });
    }


    /* =========================================
       SMOOTH SCROLL
       ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const id = link.getAttribute("href");

            if (!id || id === "#") {
                return;
            }

            const target = document.querySelector(id);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       SERVICES SEARCH
       ========================================= */

    const searchInput =
        document.querySelector(".services-search input");

    const categories =
        document.querySelectorAll(".service-category");

    if (searchInput && categories.length) {

        searchInput.addEventListener("input", () => {

            const query =
                searchInput.value.trim().toLowerCase();

            categories.forEach(category => {

                const items =
                    category.querySelectorAll(".service-item");

                let hasResult = false;

                items.forEach(item => {

                    const text =
                        item.textContent.toLowerCase();

                    const match =
                        query === "" || text.includes(query);

                    item.style.display =
                        match ? "" : "none";

                    if (match) {
                        hasResult = true;
                    }

                });


                if (query === "") {

                    category.style.display = "";
                    category.open = false;

                } else {

                    category.style.display =
                        hasResult ? "" : "none";

                    if (hasResult) {
                        category.open = true;
                    }

                }

            });

        });

    }


    /* =========================================
       APPOINTMENT FORM
       ========================================= */

    const form =
        document.querySelector(".appointment-form");

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const nameInput =
                form.querySelector('input[name="name"]');

            const phoneInput =
                form.querySelector('input[name="phone"]');

            const serviceInput =
                form.querySelector('select[name="service"]');

            const dateInput =
                form.querySelector('input[name="date"]');

            const timeInput =
                form.querySelector('input[name="time"]');

            const commentInput =
                form.querySelector('textarea[name="comment"]');


            const name =
                nameInput?.value.trim() || "";

            const phone =
                phoneInput?.value.trim() || "";

            const service =
                serviceInput?.value || "";

            const date =
                dateInput?.value || "";

            const time =
                timeInput?.value || "";

            const comment =
                commentInput?.value.trim() || "";


            /* =====================================
               VALIDATION
               ===================================== */

            if (!name) {
                showMessage(
                    form,
                    "Пожалуйста, укажите ваше имя."
                );

                nameInput?.focus();
                return;
            }


            if (!phone) {
                showMessage(
                    form,
                    "Пожалуйста, укажите номер телефона."
                );

                phoneInput?.focus();
                return;
            }


            if (!service) {
                showMessage(
                    form,
                    "Выберите услугу."
                );

                serviceInput?.focus();
                return;
            }


            if (!date) {
                showMessage(
                    form,
                    "Выберите дату записи."
                );

                dateInput?.focus();
                return;
            }


            if (!time) {
                showMessage(
                    form,
                    "Выберите удобное время."
                );

                timeInput?.focus();
                return;
            }


            /* =====================================
               FORMAT DATE
               ===================================== */

            const formattedDate =
                formatDate(date);


            /* =====================================
               WHATSAPP MESSAGE
               ===================================== */

            let message =
`Здравствуйте! Хочу записаться в Asem Dental.

Имя: ${name}
Телефон: ${phone}
Услуга: ${service}
Дата: ${formattedDate}
Время: ${time}`;


            if (comment) {

                message +=
`\nКомментарий: ${comment}`;

            }


            /* =====================================
               WHATSAPP
               ===================================== */

            const whatsappUrl =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappUrl,
                "_blank"
            );


            showMessage(
                form,
                "Заявка подготовлена. Открываем WhatsApp."
            );

        });

    }


    /* =========================================
       FORMAT DATE
       ========================================= */

    function formatDate(dateString) {

        if (!dateString) {
            return "";
        }

        const date =
            new Date(dateString + "T00:00:00");

        return date.toLocaleDateString(
            "ru-RU",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    }


    /* =========================================
       FORM MESSAGE
       ========================================= */

    function showMessage(form, text) {

        let message =
            form.querySelector(".form-message");

        if (!message) {

            message =
                document.createElement("div");

            message.className =
                "form-message";

            form.prepend(message);

        }

        message.textContent = text;

        message.classList.add("show");


        setTimeout(() => {

            message.classList.remove("show");

        }, 5000);

    }


    /* =========================================
       MINIMUM DATE
       ========================================= */

    const dateInput =
        document.querySelector('input[type="date"]');

    if (dateInput) {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1).padStart(2, "0");

        const day =
            String(today.getDate()).padStart(2, "0");

        dateInput.min =
            `${year}-${month}-${day}`;

    }


    /* =========================================
       PHONE INPUT
       ========================================= */

    const phoneInput =
        document.querySelector('input[type="tel"]');

    if (phoneInput) {

        phoneInput.addEventListener("input", () => {

            let value =
                phoneInput.value;

            value =
                value.replace(/[^\d+]/g, "");

            if (value.indexOf("+") > 0) {
                value =
                    value.replace(/\+/g, "");
            }

            phoneInput.value =
                value;

        });

    }


    /* =========================================
       SERVICE → FORM
       ========================================= */

    const serviceItems =
        document.querySelectorAll(".service-item");

    const serviceSelect =
        document.querySelector(
            'select[name="service"]'
        );

    if (serviceItems.length && serviceSelect) {

        serviceItems.forEach(item => {

            item.addEventListener("click", () => {

                const title =
                    item.querySelector("h3");

                if (!title) {
                    return;
                }

                const serviceName =
                    title.textContent.trim();

                const options =
                    Array.from(
                        serviceSelect.options
                    );

                const option =
                    options.find(
                        item =>
                            item.textContent
                                .trim()
                                .toLowerCase() ===
                            serviceName.toLowerCase()
                    );

                if (option) {

                    serviceSelect.value =
                        option.value;

                    const appointment =
                        document.querySelector(
                            "#appointment"
                        );

                    if (appointment) {

                        appointment.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            });

        });

    }


    /* =========================================
       TIME LIMIT
       ========================================= */

    const timeInput =
        document.querySelector('input[type="time"]');

    if (timeInput) {

        timeInput.addEventListener("change", () => {

            if (
                timeInput.value &&
                timeInput.value < "08:30"
            ) {

                timeInput.value =
                    "08:30";

            }

        });

    }


    /* =========================================
       REVEAL ANIMATION
       ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".advantage, " +
            ".doctor-card, " +
            ".review-card, " +
            ".service-category, " +
            ".gallery-grid figure"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =========================================
       ACTIVE NAVIGATION
       ========================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            'nav a[href^="#"]'
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entry.target.id;


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =========================================
       CURRENT YEAR
       ========================================= */

    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =========================================
       CLOSE MOBILE MENU ON RESIZE
       ========================================= */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 800 &&
            nav
        ) {

            nav.classList.remove(
                "mobile-open"
            );

            menuButton?.classList.remove(
                "active"
            );

        }

    });

});

