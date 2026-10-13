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


/* =========================================
   ASEM DENTAL — RU / KZ
   ========================================= */

const languageButton = document.getElementById("languageToggle");

const translations = {
    "Главная": "Басты бет",
    "О клинике": "Клиника туралы",
    "Услуги": "Қызметтер",
    "Врачи": "Дәрігерлер",
    "Галерея": "Галерея",
    "Отзывы": "Пікірлер",
    "Контакты": "Байланыс",
    "Записаться": "Жазылу",
    "Здоровая улыбка начинается с заботы": "Салауатты күлкі қамқорлықтан басталады",
    "Стоматологическая клиника в Дарьинске для взрослых и детей.": "Дарьинскідегі ересектер мен балаларға арналған стоматологиялық клиника.",
    "Записаться на приём": "Қабылдауға жазылу",
    "Услуги и цены": "Қызметтер мен бағалар",
    "О клинике": "Клиника туралы",
    "AsemDental": "AsemDental",
    "Стоматологическая клиника «AsemDental» в Дарьинске предлагает качественную и квалифицированную медицинскую помощь по доступным ценам.": "Дарьинскідегі «AsemDental» стоматологиялық клиникасы қолжетімді бағамен сапалы әрі білікті медициналық көмек ұсынады.",
    "Бесплатная стоматологическая помощь по ОСМС": "МӘМС бойынша тегін стоматологиялық көмек",
    "Амбулаторная стоматологическая помощь бесплатно предоставляется отдельным категориям населения в рамках обязательного социального медицинского страхования (ОСМС).": "Міндетті әлеуметтік медициналық сақтандыру (МӘМС) аясында халықтың жекелеген санаттарына амбулаториялық стоматологиялық көмек тегін көрсетіледі.",
    "Плановая помощь": "Жоспарлы көмек",
    "Экстренная помощь": "Шұғыл көмек",
    "Бесплатная стоматологическая помощь доступна:": "Тегін стоматологиялық көмек мына санаттарға қолжетімді:",
    "Детям до 18 лет": "18 жасқа дейінгі балаларға",
    "Беременным женщинам": "Жүкті әйелдерге",
    "Участникам Великой Отечественной войны": "Ұлы Отан соғысының қатысушыларына",
    "Лицам с инвалидностью I, II и III групп": "I, II және III топтағы мүгедектігі бар адамдарға",
    "Многодетным матерям, награждённым подвесками «Алтын алқа» и «Күміс алқа»": "«Алтын алқа» және «Күміс алқа» алқаларымен марапатталған көпбалалы аналарға",
    "Получателям адресной социальной помощи": "Атаулы әлеуметтік көмек алушыларға",
    "Пенсионерам по возрасту": "Жасына байланысты зейнеткерлерге",
    "Перечень категорий и условия предоставления помощи определяются действующими правилами ОСМС. Для уточнения доступных услуг и записи на приём свяжитесь с клиникой.": "Көмек көрсетілетін санаттар мен оны ұсыну шарттары қолданыстағы МӘМС қағидаларымен анықталады. Қолжетімді қызметтер мен қабылдауға жазылу туралы ақпарат алу үшін клиникаға хабарласыңыз.",
    "Опытные специалисты": "Тәжірибелі мамандар",
    "Команда специалистов разных стоматологических направлений.": "Стоматологияның әртүрлі бағыттары бойынша мамандар командасы.",
    "Индивидуальный подход": "Жеке тәсіл",
    "Внимательное отношение к каждому пациенту.": "Әр пациентке мұқият көңіл бөлеміз.",
    "Для всей семьи": "Бүкіл отбасыға",
    "Взрослая и детская стоматология в одном месте.": "Ересектер мен балалар стоматологиясы бір жерде.",
    "Удобная запись": "Ыңғайлы жазылу",
    "Записаться на приём можно через WhatsApp.": "Қабылдауға WhatsApp арқылы жазылуға болады.",
    "Прайс": "Бағалар",
    "Выберите направление стоматологии, чтобы посмотреть услуги и стоимость.": "Қызметтер мен бағаларды көру үшін стоматология бағытын таңдаңыз.",
    "Поиск услуги...": "Қызметті іздеу...",
    "Поиск услуги": "Қызметті іздеу",
    "Консультация и профилактика": "Кеңес беру және профилактика",
    "Консультация стоматолога": "Стоматолог кеңесі",
    "Консультация ортодонта": "Ортодонт кеңесі",
    "Обучение гигиене полости рта": "Ауыз қуысының гигиенасын үйрету",
    "Удаление зубных отложений в области зуба (1 зуб)": "Бір тістегі тіс шөгінділерін тазалау",
    "Чистка зубов оборудованием Air flow (1 зуб)": "Air Flow аппаратымен тісті тазалау (1 тіс)",
    "Покрытие фторлаком 4х зубов": "4 тіске фторлак жағу",
    "Шлифовка, полировка ранее выполненных реставраций": "Бұрын жасалған реставрацияларды тегістеу және жылтырату",
    "Герметизация": "Герметизация",
    "Химического отвержения (1 зуб)": "Химиялық жолмен қатайтылатын пломба (1 тіс)",
    "Свет": "Жарықпен қатайтылатын пломба",
    "Медикаментозная обработка слизистой полости рта": "Ауыз қуысының шырышты қабатын дәрілік өңдеу",
    "Отбеливание зубов. Система Opalescence": "Opalescence жүйесімен тісті ағарту",
    "Анестезия": "Анестезия",
    "Анестезия аппликационная": "Аппликациялық анестезия",
    "Анестезия анестетиками импортного производства (септонест, убистезин, ультракаин)": "Импорттық анестетиктермен жансыздандыру (септонест, убистезин, ультракаин)",
    "Терапия": "Терапия",
    "Лечение глубокого кариеса завершенного световой пломбой (анестезия включена без стоимости штифта)": "Терең кариесті жарықпен қататын пломбамен емдеу (анестезия кіреді, штифт бағасы кірмейді)",
    "Лечение поверхностного кариеса, завершенной световой пломбой (анестезия включена)": "Беткей кариесті жарықпен қататын пломбамен емдеу (анестезия кіреді)",
    "Лечение среднего кариеса, завершенное световой пломбой": "Орташа кариесті жарықпен қататын пломбамен емдеу",
    "Лечение пульпита 1 корневого зуба": "Бір түбірлі тістің пульпитін емдеу",
    "Лечение пульпита 2 корневого зуба": "Екі түбірлі тістің пульпитін емдеу",
    "Лечение пульпита 3 корневого зуба": "Үш түбірлі тістің пульпитін емдеу",
    "Лечение периодонтита 1 корневого зуба": "Бір түбірлі тістің периодонтитін емдеу",
    "Лечение периодонтита 2 корневого зуба": "Екі түбірлі тістің периодонтитін емдеу",
    "Лечение периодонтита 3 корневого зуба": "Үш түбірлі тістің периодонтитін емдеу",
    "Канал пломбирован пастой на окисьцинковой основе": "Тіс өзегін мырыш оксиді негізіндегі пастамен пломбалау",
    "Канал пломбирован полимеризующейся пастой": "Тіс өзегін полимерленетін пастамен пломбалау",
    "Канал пломбирован цементом": "Тіс өзегін цементпен пломбалау",
    "Лечение некариозных поражений": "Кариеске жатпайтын зақымдарды емдеу",
    "Лечение периодонтита зуба мудрости (8)": "Ақыл тістің периодонтитін емдеу",
    "Реставрация 1 зуба с помощью рибонд системы": "Ribbond жүйесі арқылы бір тісті қалпына келтіру",
    "Реставрация зуба при полном отсутствии коронки зуба с помощью штифта": "Тіс сауыты толық болмаған жағдайда штифт арқылы қалпына келтіру",
    "Реставрация зубных рядов: треммы, диастема": "Тіс қатарындағы тремалар мен диастеманы қалпына келтіру",
    "Фиксация скайс (украшение на зубы)": "Тіске скайс әшекейін бекіту",
    "Наложение коффердама": "Коффердам қою",
    "Детский приём": "Балаларды қабылдау",
    "Для незастрахованных": "Сақтандырылмағандарға",
    "Пломбирование молочных зубов по среднему кариесу": "Сүт тістеріндегі орташа кариесті пломбалау",
    "Пломбирование постоянных зубов по поверхностному кариесу": "Тұрақты тістердегі беткей кариесті пломбалау",
    "Пломбирование постоянных зубов по среднему кариесу": "Тұрақты тістердегі орташа кариесті пломбалау",
    "Пломбирование постоянных зубов по глубокому кариесу": "Тұрақты тістердегі терең кариесті пломбалау",
    "Наложение девитализирующей пасты": "Девитализациялаушы паста қою",
    "Временное пломбирование молочных зубов (2 посещения)": "Сүт тістерін уақытша пломбалау (2 қабылдау)",
    "Временное пломбирование постоянных зубов (2 посещения)": "Тұрақты тістерді уақытша пломбалау (2 қабылдау)",
    "Лечение пульпита постоянных зубов": "Тұрақты тістердің пульпитін емдеу",
    "Лечение пульпита молочных зубов": "Сүт тістерінің пульпитін емдеу",
    "Лечение периодонтита постоянных зубов": "Тұрақты тістердің периодонтитін емдеу",
    "Лечение периодонтита молочных зубов": "Сүт тістерінің периодонтитін емдеу",
    "Удаление молочных зубов (простое)": "Сүт тісін жұлу (қарапайым)",
    "Удаление молочных зубов (сложное)": "Сүт тісін жұлу (күрделі)",
    "Удаление постоянных зубов (простое)": "Тұрақты тісті жұлу (қарапайым)",
    "Удаление постоянных зубов (сложное)": "Тұрақты тісті жұлу (күрделі)",
    "Хирургия": "Хирургия",
    "Удаление импортным анестетиком однокоренного зуба": "Импорттық анестетикпен бір түбірлі тісті жұлу",
    "Сложное удаление однокоренного зуба": "Бір түбірлі тісті күрделі жұлу",
    "Сложное удаление двухкорневого зуба": "Екі түбірлі тісті күрделі жұлу",
    "Иссечение капюшона": "Тіс үстіндегі қызыл иек қақпағын кесу",
    "Кюретаж": "Кюретаж",
    "Наложение шва": "Тігіс салу",
    "Резекция верхушки корня зуба": "Тіс түбірінің ұшын резекциялау",
    "Вскрытие абсцесса (периостит)": "Абсцессті ашу (периостит)",
    "Удаление многокорневого зуба простое": "Көп түбірлі тісті қарапайым жұлу",
    "Удаление многокорневого зуба сложное": "Көп түбірлі тісті күрделі жұлу",
    "Удаление зуба мудрости (8)": "Ақыл тісті жұлу",
    "Имплантация Dentium, Osstem": "Dentium, Osstem имплантациясы",
    "Синус лифтинг (один сегмент)": "Синус-лифтинг (бір сегмент)",
    "Посадка костной ткани": "Сүйек тінін отырғызу",
    "Расщепление нижней челюсти": "Төменгі жақ сүйегін бөлу",
    "Гемостатическая губка Альвеожил": "Альвеожил гемостатикалық губкасы",
    "Плазмолифтинг (одна пробирка)": "Плазмолифтинг (бір пробирка)",
    "Ортопедия": "Ортопедия",
    "Штампованная коронка (простое покрытие)": "Штампталған сауыт (қарапайым жабын)",
    "Штампованная коронка (цирконий покрытие)": "Цирконий жабынды штампталған сауыт",
    "Цельнолитная коронка (простое покрытие)": "Құйма сауыт (қарапайым жабын)",
    "Фасетка": "Фасетка",
    "Пластмассовая коронка": "Пластмассадан жасалған сауыт",
    "Металлокерамическая коронка": "Металл-керамикалық сауыт",
    "Металлокерамическая коронка на имплант": "Имплантқа арналған металл-керамикалық сауыт",
    "Безметалловая керамика": "Металлсыз керамика",
    "Безметалловая керамика на имплант": "Имплантқа арналған металлсыз керамика",
    "Виниры": "Винирлер",
    "Съёмное протезирование": "Алмалы-салмалы протездеу",
    "Съёмный протез": "Алмалы-салмалы протез",
    "С зубами производства Украина": "Украинада өндірілген тістері бар протез",
    "С зубами производства Украина + имп. пласт": "Украинада өндірілген тістері және имплант пластинасы бар протез",
    "С зубами производство Германия, Япония": "Германияда немесе Жапонияда өндірілген тістері бар протез",
    "С зубами Ivoclar": "Ivoclar тістері бар протез",
    "Нейлоновый протез (мягкий)": "Нейлон протезі (жұмсақ)",
    "Бюгельный протез (металлический)": "Бюгельді протез (металл)",
    "Микрозамок": "Микроқұлып",
    "Микропротез": "Микропротез",
    "Микропротез (Biodentaplast)": "Biodentaplast микропротезі",
    "Починка протеза": "Протезді жөндеу",
    "Снятие старой коронки": "Ескі сауытты алу",
    "Слепок на съёмные протезы": "Алмалы-салмалы протезге арналған қалып",
    "Литой зуб": "Құйма тіс",
    "Фиксация старой коронки": "Ескі сауытты бекіту",
    "Приварка одного зуба": "Бір тісті қосып бекіту",
    "Приварка 1 кламмера (крючек)": "Бір кламмерді бекіту",
    "Наши специалисты": "Біздің мамандар",
    "Стоматолог": "Стоматолог",
    "График работы": "Жұмыс кестесі",
    "Пн–Пт:": "Дс–Жм:",
    "Перерыв:": "Үзіліс:",
    "Сб:": "Сб:",
    "по предварительной записи": "алдын ала жазылу бойынша",
    "Администрация": "Әкімшілік",
    "Директор — Бисенбаев С.К.": "Директор — Бисенбаев С.К.",
    "Наша клиника": "Біздің клиника",
    "Интерьер": "Интерьер",
    "Оборудование": "Жабдықтар",
    "Что говорят пациенты": "Пациенттеріміз не дейді",
    "Запись": "Жазылу",
    "Запишитесь на приём": "Қабылдауға жазылыңыз",
    "Заполните форму — после отправки откроется WhatsApp с готовым сообщением.": "Форманы толтырыңыз — жібергеннен кейін дайын хабарламасы бар WhatsApp ашылады.",
    "Ваше имя": "Аты-жөніңіз",
    "Введите имя": "Атыңызды енгізіңіз",
    "Номер телефона": "Телефон нөмірі",
    "Процедура": "Процедура",
    "Выберите услугу": "Қызметті таңдаңыз",
    "Лечение кариеса": "Кариесті емдеу",
    "Протезирование": "Протездеу",
    "Другая услуга": "Басқа қызмет",
    "Желаемая дата": "Қалаған күн",
    "Желаемое время": "Қалаған уақыт",
    "Комментарий": "Түсініктеме",
    "Дополнительная информация": "Қосымша ақпарат",
    "Записаться через WhatsApp": "WhatsApp арқылы жазылу",
    "Как нас найти": "Бізді қалай табуға болады",
    "Телефон:": "Телефон:",
    "Написать в WhatsApp": "WhatsApp-қа жазу",
    "Instagram:": "Instagram:",
    "Мы на карте": "Біз картадамыз",
    "Открыть в 2GIS": "2GIS-те ашу",
    "Бесплатно": "Тегін"
};

/* Қосымша атрибуттарды аудару */
const attributeTranslations = {
    "Поиск услуги...": "Қызметті іздеу...",
    "Поиск услуги": "Қызметті іздеу",
    "Введите имя": "Атыңызды енгізіңіз",
    "Дополнительная информация": "Қосымша ақпарат",
    "Открыть меню": "Мәзірді ашу",
    "AsemDental — стоматология в Дарьинском": "AsemDental — Дарьинскідегі стоматология",
    "Интерьер AsemDental": "AsemDental интерьері",
    "Оборудование AsemDental": "AsemDental жабдықтары",
    "AsemDental - стоматология в Дарьинскe": "AsemDental — Дарьинскідегі стоматология"
};

let currentLanguage = localStorage.getItem("asemDentalLanguage") || "ru";

const normalizeTranslationText = text =>
    text.replace(/\s+/g, " ").trim();

const originalTextNodes = [];
const originalAttributes = [];

const textWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
);

let textNode;

while ((textNode = textWalker.nextNode())) {
    if (textNode.parentElement?.closest("script, style")) continue;

    const original = textNode.nodeValue;
    if (!original.trim()) continue;

    originalTextNodes.push({
        node: textNode,
        original,
        key: normalizeTranslationText(original)
    });
}

document.querySelectorAll("[placeholder], [aria-label], img[alt]").forEach(element => {
    ["placeholder", "aria-label", "alt"].forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;

        originalAttributes.push({
            element,
            attribute,
            original: element.getAttribute(attribute)
        });
    });
});

const originalTitle = document.title;
const descriptionMeta = document.querySelector('meta[name="description"]');
const originalDescription = descriptionMeta?.content || "";

function translatePage(language) {
    currentLanguage = language;

    originalTextNodes.forEach(({ node, original, key }) => {
        if (language === "ru") {
            node.nodeValue = original;
            return;
        }

        node.nodeValue = translations[key] || original;
    });

    originalAttributes.forEach(({ element, attribute, original }) => {
        if (language === "ru") {
            element.setAttribute(attribute, original);
        } else {
            element.setAttribute(
                attribute,
                attributeTranslations[original] || original
            );
        }
    });

    document.documentElement.lang = language === "kk" ? "kk" : "ru";

    if (language === "kk") {
        document.title = "AsemDental — Дарьинскідегі стоматология";

        if (descriptionMeta) {
            descriptionMeta.content =
                "AsemDental — Батыс Қазақстан облысы, Дарьинск ауылындағы стоматологиялық клиника.";
        }
    } else {
        document.title = originalTitle;

        if (descriptionMeta) {
            descriptionMeta.content = originalDescription;
        }
    }

    if (languageButton) {
        languageButton.textContent = language === "kk" ? "RU" : "KZ";
        languageButton.setAttribute(
            "aria-label",
            language === "kk" ? "Орыс тіліне ауыстыру" : "Қазақ тіліне ауыстыру"
        );
    }

    localStorage.setItem("asemDentalLanguage", language);

    const searchInput = document.querySelector(".services-search input");
    if (searchInput) {
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
}

if (languageButton) {
    languageButton.addEventListener("click", () => {
        translatePage(currentLanguage === "ru" ? "kk" : "ru");
    });
}

translatePage(currentLanguage);
});
