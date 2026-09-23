
(function() {

    /* ── Tab Navigation ── */
    function navTo(name) {
        console.log('nav clicked', name);
        document.querySelectorAll('.tab-content').forEach(function(t) {
            t.classList.remove('active');
        });
        var target = document.getElementById('tab-' + name);
        if (target) target.classList.add('active');
        window.scrollTo(0, 0);
        closeMobileMenu();
        setTimeout(observeAnimations, 50);
    }

    function closeMobileMenu() {
        var menu = document.getElementById('mobileMenu');
        if (menu) menu.classList.remove('open');
        document.body.style.overflow = '';
    }

    /* ── Animations ── */
    function observeAnimations() {
        var els = document.querySelectorAll('.animate-on-scroll:not(.visible)');
        if (!els.length) return;
        if (!window.IntersectionObserver) {
            els.forEach(function(el) { el.classList.add('visible'); });
            return;
        }
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
            });
        }, { threshold: 0.05 });
        els.forEach(function(el) { obs.observe(el); });
        setTimeout(function() {
            document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(function(el) {
                el.classList.add('visible');
            });
        }, 800);
    }

    /* ── Cookie Banner ── */
    function initCookieBanner() {
        var banner = document.getElementById('cookieBanner');
        if (!banner) return;
        try {
            if (!localStorage.getItem('jk-cookie-v2')) banner.classList.add('visible');
        } catch(e) {}
    }

    window.acceptCookies = function(level) {
        try { localStorage.setItem('jk-cookie-v2', level); } catch(e) {}
        var banner = document.getElementById('cookieBanner');
        if (banner) banner.classList.remove('visible');
    };

    /* ── Modals ── */
    window.showModal = function(id) {
        var el = document.getElementById('modal-' + id);
        if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
    };
    window.closeModal = function(id) {
        var el = document.getElementById('modal-' + id);
        if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
    };

    /* ── Dark Mode ── */
    function initDarkMode() {
        var htmlEl = document.documentElement;
        try {
            var saved = localStorage.getItem('jk-theme');
            if (saved) htmlEl.setAttribute('data-theme', saved);
        } catch(e) {}
        var btn = document.getElementById('darkToggle');
        if (btn) {
            btn.addEventListener('click', function() {
                var next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                htmlEl.setAttribute('data-theme', next);
                try { localStorage.setItem('jk-theme', next); } catch(e) {}
            });
        }
    }

    /* ── Language Toggle ── */
    var currentLang = 'de';
    var translations = {
        "nav-coaching-text":    { de: "Coaching",  en: "Coaching" },
        "nav-speaking-text":    { de: "Speaking",  en: "Speaking" },
        "nav-contact-text":     { de: "Contact",   en: "Contact"  },
        "nav-cta-text":         { de: "Work with me", en: "Work with me" },
        "hero-tagline":    { de: "Coach & Speaker für innere Transformation", en: "Coach & Speaker for Inner Transformation" },
        "hero-headline":   { de: "Außen erfolgreich.<br>Innen noch unterwegs.<br><em>Vielleicht kommt dir das bekannt vor.</em>", en: "Successful on the outside.<br>Still finding your way within.<br><em>Maybe that sounds familiar.</em>" },
        "hero-subtext":    { de: "Du hast viel erreicht. Übernimmst Verantwortung. Wirst geschätzt für das, was du tust. Und trotzdem gibt es Momente, in denen du dich fragst:<br><br><em>Kann das wirklich schon alles gewesen sein?</em><br><br>Ich kenne diese Frage.<br>Mein Weg führte mich über eine Top-Uni, internationale Konzerne und eine Karriere, die von außen betrachtet erfolgreich war. Und doch hatte ich irgendwann das Gefühl, dass etwas Wesentliches fehlt.<br><br>Heute weiß ich: Erfolg im Außen und Erfüllung im Inneren sind nicht dasselbe.<br><br>Als Coach begleite ich Menschen, die sich wieder stärker mit sich selbst verbinden möchten — jenseits von Leistung, Erwartungen und dem Gefühl, ihren Wert ständig beweisen zu müssen. Als Speaker bringe ich diese Themen auf die Bühne.", en: "You've achieved a lot. You take on responsibility. You're valued for what you do. And yet there are moments when you find yourself wondering:<br><br><em>Is this really all there is?</em><br><br>I know that question well.<br>My own path led me through a top university, international corporations, and a career that looked successful from the outside. And yet, at some point, I felt that something essential was missing.<br><br>Today I know: outer success and inner fulfilment are not the same thing.<br><br>As a coach, I support people who want to reconnect more deeply with themselves — beyond performance, expectations, and the constant need to prove their worth. As a speaker, I bring these very themes to the stage." },
        "btn-coaching":    { de: "Coaching entdecken", en: "Explore Coaching" },
        "btn-speaking":    { de: "Speaking ansehen",   en: "See Speaking"     },
        "trust-dbi":       { de: "zertifiziert",       en: "certified"        },
        "trust-years":     { de: "Jahre Erfahrung",    en: "years experience" },
        "trust-2in1":      { de: "Coach & Speaker",    en: "Coach & Speaker"  },
        "card-coaching-label": { de: "Coaching", en: "Coaching" },
        "card-coaching-title": { de: "Inner Clarity & Self-Leadership", en: "Inner Clarity & Self-Leadership" },
        "card-coaching-desc":  { de: "Für erfolgreiche Menschen, die spüren: da müsste mehr sein. Finde heraus, was dir wirklich wichtig ist — und triff Entscheidungen, die sich richtig anfühlen.", en: "For successful people who sense there’s more. Find out what actually matters to you — and make decisions that genuinely feel right." },
        "card-coaching-link":  { de: "Mehr erfahren", en: "Learn more" },
        "card-speaking-label": { de: "Speaking", en: "Speaking" },
        "card-speaking-title": { de: "Finance Transformation meets Leadership", en: "Finance Transformation meets Leadership" },
        "card-speaking-desc":  { de: "The Human Side of Transformation — Keynotes aus der Praxis einer Senior-Leaderin, die bewegen und inspirieren.", en: "The Human Side of Transformation — keynotes from a senior leader who is still in the middle of it, speaking from real experience." },
        "card-speaking-link":  { de: "Mehr erfahren", en: "Learn more" },
        "quote-text": { de: "„Die meisten Menschen verbringen ihr Leben damit, ihren Wert zu beweisen. Meine Arbeit begleitet sie dabei, ihren Wert wieder in sich zu erkennen. Alles, was du brauchst, liegt bereits in dir.“", en: "“Most people spend their lives proving their worth. My work guides them back to recognising it within themselves. Everything you need is already there.”" },
        "coaching-label": { de: "Coach für innere Transformation", en: "Coach for Inner Transformation" },
        "coaching-h2":    { de: "Erfolgreich sein und sich auch so fühlen —<br><span class='gradient-text'>das sind zwei verschiedene Dinge.</span>", en: "Being successful and actually feeling it —<br><span class='gradient-text'>those are two very different things.</span>" },
        "coaching-p1":    { de: "Ich begleite erfolgreiche Menschen, die nach außen längst angekommen sind — und trotzdem spüren, dass etwas fehlt. Menschen, die bereit sind, innezuhalten. Die den Mut haben, ehrlich auf ihr Leben zu schauen. Und die ahnen, dass die Antworten, nach denen sie suchen, nicht im Außen liegen.", en: "I work with successful people who have already arrived on the outside — and still sense that something is missing. People who are willing to pause. Who have the courage to look honestly at their lives. And who feel, somewhere deep down, that the answers they’re looking for won’t be found out there." },
        "coaching-quote": { de: "„Wann fängst du an, dir selbst die erste Priorität zu sein?“", en: "“When will you start making yourself your own first priority?”" },
        "coaching-cta":   { de: "Kostenloses Vorgespräch buchen", en: "Book a free intro call" },
        "about-label": { de: "Über mich", en: "About me" },
        "about-h2":    { de: "Warum ich weiß,<br><span class='gradient-text'>worüber ich spreche.</span>", en: "Why I know<br><span class='gradient-text'>what I’m talking about.</span>" },
        "about-p1":    { de: "Universität St. Gallen. P&G. Horváth. Heute als Senior Leader & Director Finance Excellence bei Syntegon. Von außen: eine klassische High-Performance-Karriere. Ich habe auch geglaubt, dass mein Wert von meiner Leistung abhängt.", en: "University of St. Gallen. P&G. Horváth. Now Senior Leader & Director Finance Excellence at Syntegon. On the outside: a picture-perfect career. For a long time, I believed my worth depended on my performance." },
        "about-p2":    { de: "Ich habe den Ehrgeiz, den Druck und die innere Leere dahinter selbst gefühlt. Ich habe an meinen Blockaden gearbeitet, alte Glaubenssätze aufgebrochen und gelernt, mir selbst die erste Priorität zu sein — ohne die Karriere aufzugeben. Ich habe mich bewusst entschieden.", en: "I've felt the ambition, the pressure, and the quiet emptiness that can hide behind it all. Then I started looking inward: working through unconscious blocks, releasing old beliefs and learning to make myself a priority — without walking away from my career. It was a conscious choice." },
        "about-p3":    { de: "Heute begleite ich Menschen, die genau an diesem Punkt stehen. Als zertifizierter Business- und Life-Coach (<strong>Dr. Bock Institute, DBI</strong>) und mit Jahren an Führungserfahrung in internationalen Konzernen bringe ich beides mit: die Sprache deiner Welt — und die Tiefe, die echte Veränderung braucht.", en: "Now I am working with people who are exactly at this point. As a certified Business & Life Coach (<strong>Dr. Bock Institute, DBI</strong>) with years of senior leadership experience in global companies, I bring both: the language of your world — and the depth that real change actually requires." },
        "services-label":    { de: "Zusammenarbeiten", en: "What I Offer" },
        "services-h2":       { de: "Der erste Schritt", en: "The First Step" },
        "services-subtitle": { de: "Jede Zusammenarbeit beginnt mit einem Klarheitsgespräch.", en: "Every collaboration starts with a clarity call." },
        "speaking-hero-label":  { de: "The Human Side of Finance Transformation", en: "The Human Side of Finance Transformation" },
        "speaking-cta":         { de: "Speaking-Anfrage stellen", en: "Reach out about speaking" },
        "speaking-about-label": { de: "Über mich als Speaker", en: "About me as a speaker" },
        "speaking-hero-h2":     { de: "Transformation<br><span class='highlight-orange'>beginnt</span><br><span class='highlight-pink'>innen.</span>", en: "Transformation<br><span class='highlight-orange'>starts</span><br><span class='highlight-pink'>within.</span>" },
        "speaking-h2":          { de: "Ich führe heute noch —<br><span class='gradient-text'>aber mit einem anderen Blick als früher.</span>", en: "I’m still in it —<br><span class='gradient-text'>but I see it differently now.<\/span>" },
        "speaking-p1":          { de: "Ich spreche über das, was die meisten nicht ansprechen: dass echter Wandel nicht mit Prozessen beginnt — sondern mit dem Menschen dahinter.", en: "I speak about what most people don’t say out loud: that real change doesn’t start with processes — it starts with the person behind them." },
        "speaking-p2":          { de: "Als Director Finance Excellence & Transformation bei Syntegon führe ich heute noch Teams und kenne den Druck aus erster Hand.", en: "As Director of Finance Excellence & Transformation at Syntegon, I still lead teams — and know this pressure from the inside." },
        "keynotes-label":       { de: "Keynotes", en: "Keynotes" },
        "keynotes-h2":          { de: "Meine Key Notes", en: "My Keynotes" },
        "keynotes-sub":         { de: "Vorträge, die unter die Oberfläche gehen.", en: "Talks that go beneath the surface." },
        "k1-title": { de: "Why Finance Transformation fails — and what leadership has to do with it", en: "Why Finance Transformations Fail — and What Leadership Has to Do With It" },
        "k1-body":  { de: "Die meisten Transformationen scheitern nicht an Technologie — sie scheitern an Menschen.", en: "Most transformations don’t fail because of bad tech — they fail because of people." },
        "k2-title": { de: "High Performance & innere Leere — warum beides zusammen existiert", en: "High Performance & Inner Emptiness — Why They Coexist" },
        "k2-body":  { de: "Die meisten Führungskräfte liefern — und fragen sich heimlich, ob sie genug sind.", en: "Most leaders deliver — and quietly wonder if they’re enough." },
        "k3-title": { de: "Wann fängst du an, dir selbst die erste Priorität zu sein?", en: "When Will You Start Making Yourself Your First Priority?" },
        "k3-body":  { de: "Über den Moment, in dem Erfolg nicht mehr reicht — und was danach kommt.", en: "About the moment when success stops being enough — and what comes next." },
        "contact-hero-label": { de: "Lass uns sprechen", en: "Let's talk" },
        "contact-hero-h2":    { de: "Bereit für<br><span class='gradient-text'>den nächsten Schritt?</span>", en: "Something is<br><span class='gradient-text'>already shifting.</span>" },
        "contact-hero-sub":   { de: "Ob du Coaching suchst oder einen Speaker anfragen möchtest — ich freue mich, von dir zu hören.", en: "Whether you’re exploring coaching, looking for a speaker, or simply want to have an honest conversation — I’m glad you’re here." },
        "footer-nav-h4":      { de: "Navigation", en: "Navigate" },
        "spk-imp-label":      { de: "Auf der B\u00fchne", en: "On Stage" },
        "spk-imp-h2":         { de: "Eindr\u00fccke aus meinen Talks", en: "Impressions From My Talks" },
        "spk-heroimg-cap":    { de: "Keynote beim Finance Summit \u2014 The Future of Finance", en: "Keynote at the Finance Summit \u2014 The Future of Finance" },
        "footer-social-p":    { de: "Verbinde dich mit mir auf LinkedIn und Instagram.", en: "Connect with me on LinkedIn and Instagram." },
        "footer-social-h4":   { de: "Verbinden",  en: "Let’s connect" },
        "footer-copy":        { de: "© 2025 Julia Kreft. Alle Rechte vorbehalten. — Fotos: Denise Claus Fotografie", en: "© 2025 Julia Kreft. All rights reserved. — Photos: Denise Claus Fotografie" },
        "footer-impressum":   { de: "Impressum",   en: "Legal Notice" },
        "footer-datenschutz": { de: "Datenschutz", en: "Privacy Policy" },
        "footer-agb":         { de: "AGB",         en: "Terms" },
        "footer-nav-home":    { de: "Home",     en: "Home"     },
        "footer-nav-coaching":{ de: "Coaching", en: "Coaching" },
        "footer-nav-speaking":{ de: "Speaking", en: "Speaking" },
        "footer-nav-contact": { de: "Contact",  en: "Contact"  },
        "header-subtitle":  { de: "Coach & Speaker für innere Transformation", en: "Coach & Speaker for Inner Transformation" },
        "footer-subtitle":  { de: "Coach & Speaker für innere Transformation", en: "Coach & Speaker for Inner Transformation" },
        "trust-dbi":        { de: "zertifiziert", en: "certified" },
        "trust-years":      { de: "Jahre Erfahrung", en: "years experience" },
        "trust-2in1":       { de: "Coach & Speaker", en: "Coach & Speaker" },
        "keynote-tag-1":    { de: "Transformation · Leadership", en: "Transformation · Leadership" },
        "keynote-tag-2":    { de: "Leadership · Mentale Stärke", en: "Leadership · Mental Strength" },
        "keynote-tag-3":    { de: "Innere Transformation · Selbstwert", en: "Inner Transformation · Self-Worth" },
        "testi-h2-c":       { de: "Was andere sagen", en: "What Others Say" },
        "testi-label-c":    { de: "Stimmen meiner Klient:innen", en: "Voices from My Clients" },
        "impressions-label": { de: "Einblicke", en: "Impressions" },
        "impressions-h2":    { de: "So f\u00fchlt sich Coaching mit mir an", en: "This is what Coaching with Me feels like" },
        "testi-1-text":      { de: "\u201eJulia w\u00fcrde ich jedem empfehlen, der bereit ist, wirklich hinzuschauen \u2014 auch wenn die Antworten unbequemer sind als erwartet. Sie schafft einen Raum, in dem man sich vollst\u00e4ndig gesehen und gehalten f\u00fchlt, ohne jede Wertung, und gibt einem gleichzeitig Tools mit, um mit dem Erkannten auch wirklich etwas anfangen zu k\u00f6nnen.\u201c", en: "\u201cI would recommend Julia to anyone who is ready to truly look within \u2014 even when the answers turn out to be more uncomfortable than expected. She creates a space where you feel completely seen and held, without any judgement, while giving you the tools to actually do something with what you uncover.\u201d" },
        "testi-1-role":      { de: "Projekt- und Strategiemanagerin", en: "Project & Strategy Manager" },
        "testi-2-text":      { de: "\u201eDurch die Arbeit mit Julia habe ich gelernt, die Dynamik von Konflikten besser zu verstehen und im Ergebnis deutlich professioneller damit umzugehen. Dies verbessert sp\u00fcrbar die Qualit\u00e4t meiner L\u00f6sungen sowie mein allgemeines Wohlbefinden. Aus meiner Erfahrung kann ich sie insbesondere an jeden empfehlen, der mit komplizierten oder schwelenden Konflikten im Unternehmen oder auch privaten Umfeld konfrontiert ist oder die eigene pers\u00f6nliche Entwicklung kritisch hinterfragen m\u00f6chte.\u201c", en: "\u201cWorking with Julia, I have learned to understand the dynamics of conflict far better and, as a result, to handle it much more professionally. This noticeably improves both the quality of my solutions and my overall well-being. From my experience, I can especially recommend her to anyone facing complicated or simmering conflicts in a company or private setting, or who wants to critically reflect on their own personal development.\u201d" },
        "testi-2-role":      { de: "Unternehmer", en: "Entrepreneur" },
        "speaking-testi-label":  { de: "Stimmen von Veranstaltern", en: "Voices from Event Organizers" },
        "speaking-testi-h2":     { de: "Was Organizer sagen", en: "What Organizers Say" },
        "speaking-testi-1-text": { de: "\u201eJulia moderierte die Diskussion mit gro\u00dfer Fachkompetenz und sp\u00fcrbar lebendiger Energie und griff die praktischen Erkenntnisse der Session gezielt auf. Das Publikum stellte w\u00e4hrend der gesamten Session Fragen \u2014 ein klares Zeichen daf\u00fcr, wie engagiert es war und wie sehr es von der Expertise auf der B\u00fchne profitieren wollte.\u201c", en: "\u201cJulia moderated the discussion with real expertise and lively energy, drawing out the practical insights that came up during the session. Throughout, the audience kept submitting questions \u2014 a clear sign they were engaged and eager to learn from the expertise on stage.\u201d" },
        "speaking-testi-1-role": { de: "Event Organizer, World Finance Forum", en: "Event Organizer, World Finance Forum" },
        "testi-3-text":      { de: "\u201eDurch die Arbeit mit Julia habe ich gelernt, die Bed\u00fcrfnisse meines inneren Selbst anzusprechen und die unterschiedlichen Stimmen in meinem Kopf klar zu unterscheiden. Ich w\u00fcrde Julias Coaching jedem empfehlen, der gerade versucht, seine Gedanken und Gef\u00fchle zu entwirren und zu verstehen \u2014 sie hilft dir, Klarheit zu finden, indem sie dich herausfordert, dich selbst besser zu verstehen, und gibt dir Werkzeuge und Konzepte f\u00fcr deinen eigenen Weg, statt dir einfach zu sagen, was du tun sollst.\u201c", en: "\u201cWorking with Julia, I learned to address my inner self's needs and to distinguish the different voices in my head. I would recommend her coaching to anyone who is currently trying to untangle and understand their thoughts and feelings \u2014 she helps you find clarity by challenging you to understand yourself better, and gives you tools and concepts for your own journey rather than just telling you what to do.\u201d" },
        "testi-3-role":      { de: "Senior Associate", en: "Senior Associate" },
        "offer-label":      { de: "Einstieg", en: "First Step" },
        "offer-title":      { de: "Klarheitsgespräch", en: "Clarity Call" },
        "offer-price":      { de: "Kostenlos", en: "Free" },
        "offer-desc":       { de: "Wir sprechen offen über dein Anliegen, deine Situation und was du dir wünschst. Gemeinsam schauen wir, ob und wie eine Zusammenarbeit für dich Sinn macht.", en: "We talk openly about what's on your mind, where you are right now, and what you're looking for. Together we'll explore whether and how working together makes sense for you." },
        "offer-f1":         { de: "30 Minuten via Video Call oder Telefon", en: "30 minutes via video call or phone" },
        "offer-f2":         { de: "Coaching-Sessions sind jeweils 60–90 Minuten", en: "Coaching sessions are 60–90 minutes each" },
        "offer-f3":         { de: "Umfang und Format bestimmen wir gemeinsam", en: "Scope and format decided together" },
        "offer-f4":         { de: "Kein Commitment, kein Druck", en: "No commitment, no pressure" },
        "offer-cta":        { de: "Klarheitsgespräch anfragen →", en: "Request a Clarity Call →" },
        "services-h2":      { de: "Der erste Schritt", en: "The First Step" },
        "services-label":   { de: "Zusammenarbeiten", en: "Work Together" },
        "contact-info-h3":  { de: "So kannst du<br>mit mir arbeiten", en: "Ways to<br>reach me" },
        "contact-info-p":   { de: "Der einfachste Weg: Buche direkt einen Termin über Calendly. Alternativ kannst du mir auch eine E-Mail schreiben oder mich auf LinkedIn kontaktieren.", en: "The simplest way is to book a slot directly via Calendly. You're also welcome to reach out by email or connect with me on LinkedIn." },
        "contact-detail-cal":   { de: "Online Termin", en: "Schedule a Call" },
        "contact-detail-email": { de: "E-Mail", en: "Email" },
        "contact-detail-li":    { de: "LinkedIn", en: "LinkedIn" },
        "contact-li-link":      { de: "Julia Kreft auf LinkedIn ↗", en: "Julia Kreft on LinkedIn ↗" },
        "services-subtitle":    { de: "Jede Zusammenarbeit beginnt mit einem Klarheitsgespräch. Kein Druck, kein Commitment — nur ein ehrliches Gespräch darüber, wo du stehst und wohin du willst.", en: "Every collaboration starts with a clarity call. No pressure, no commitment — just an honest conversation about where you are and where you want to go." },
        "calendly-box-h3":      { de: "Termin buchen", en: "Reserve a Spot" },
        "calendly-box-p":       { de: "Buche direkt dein kostenloses 30-Minuten Kennenlerngespräch oder eine Coaching-Session.", en: "Book your free 30-minute clarity call or a coaching session — straight from your calendar." },
        "calendly-box-btn":     { de: "Jetzt Termin buchen", en: "Find a Time" },
        "calendly-preview-p":   { de: "Sicher & unverbindlich · Sofortige Bestätigung per E-Mail", en: "No commitment · Confirmation straight to your inbox" },
        "steps-label":          { de: "So läuft es ab", en: "How it works" },
        "steps-h3":             { de: "In 3 Schritten zu deiner Klarheit", en: "3 steps to getting started" },
        "step1-title":          { de: "Kostenloses Vorgespräch buchen", en: "Book your free clarity call" },
        "step1-body":           { de: "Klick auf „Termin buchen“ und wähle einen freien Slot in meinem Kalender. Kein Druck, kein Commitment.", en: "Pick a slot in my calendar that works for you. No pressure, nothing to prepare." },
        "step2-title":          { de: "Kennenlerngespräch (30 Min.)", en: "We talk — 30 minutes" },
        "step2-body":           { de: "Wir sprechen über dein Anliegen, deine Ziele und schauen, ob wir ein gutes Match sind.", en: "We talk about where you are, what matters to you, and whether working together makes sense." },
        "step3-title":          { de: "Deine Reise beginnt", en: "We find the right format" },
        "step3-body":           { de: "Wir starten mit dem Format, das am besten zu dir passt — einzelne Session oder Paket.", en: "Together we decide what suits you best — a single session or an ongoing process." },
        "faq-h4":               { de: "Häufige Fragen", en: "A few things people often ask" },
        "faq-q1":               { de: "Wo finden die Sessions statt?", en: "Where do sessions happen?" },
        "faq-a1":               { de: "Online via Video Call oder persönlich.", en: "Online via video call, or in person if you're based in Stuttgart." },
        "faq-q2":               { de: "Für wen ist das Coaching geeignet?", en: "Is this coaching right for me?" },
        "faq-a2":               { de: "Für ambitionierte Menschen in beruflichen oder persönlichen Umbruchphasen.", en: "If you're driven, reflective, and sense that something needs to change — then yes, probably." },
        "faq-q3":               { de: "Wie bezahle ich?", en: "How does payment work?" },
        "faq-a3":               { de: "Per Rechnung nach der Session.", en: "You'll receive an invoice after each session." },
        "header-subtitle":  { de: "Coach & Speaker für innere Transformation", en: "Coach & Speaker for Inner Transformation" },
        "footer-subtitle":  { de: "Coach & Speaker für innere Transformation", en: "Coach & Speaker for Inner Transformation" },
        "trust-dbi":        { de: "zertifiziert", en: "certified" },
        "trust-years":      { de: "Jahre Erfahrung", en: "years experience" },
        "trust-2in1":       { de: "Coach & Speaker", en: "Coach & Speaker" }
    };

    var i18nMap = [
        ['#nav-coaching','nav-coaching-text','text'],
        ['#nav-speaking','nav-speaking-text','text'],
        ['#nav-contact','nav-contact-text','text'],
        ['.nav-cta','nav-cta-text','text'],
        ['.hero-tagline','hero-tagline','text'],
        ['.hero-headline','hero-headline','html'],
        ['.hero-subtext','hero-subtext','html'],
        ['.btn-coaching-discover','btn-coaching','text'],
        ['.btn-speaking-view','btn-speaking','text'],
        ['.card-coaching-label-el','card-coaching-label','text'],
        ['.card-coaching-title-el','card-coaching-title','text'],
        ['.card-coaching-desc-el','card-coaching-desc','html'],
        ['.card-coaching-link-el','card-coaching-link','text'],
        ['.card-speaking-label-el','card-speaking-label','text'],
        ['.card-speaking-title-el','card-speaking-title','text'],
        ['.card-speaking-desc-el','card-speaking-desc','html'],
        ['.card-speaking-link-el','card-speaking-link','text'],
        ['.coaching-hero-label','coaching-label','text'],
        ['.coaching-hero-h2','coaching-h2','html'],
        ['.coaching-hero-p1','coaching-p1','html'],
        ['.coaching-italic-quote','coaching-quote','html'],
        ['.coaching-cta-btn','coaching-cta','text'],
        ['.about-label-el','about-label','text'],
        ['.about-h2-el','about-h2','html'],
        ['.about-p1-el','about-p1','html'],
        ['.about-p2-el','about-p2','html'],
        ['.about-p3-el','about-p3','html'],
        ['.services-label-el','services-label','text'],
        ['.services-h2-el','services-h2','text'],
        ['.speaking-hero-label-el','speaking-hero-label','text'],
        ['.speaking-cta-btn','speaking-cta','text'],
        ['.speaking-about-label-el','speaking-about-label','text'],
        ['.speaking-hero-h2-el','speaking-hero-h2','html'],
        ['.speaking-h2-el','speaking-h2','html'],
        ['.speaking-p1-el','speaking-p1','html'],
        ['.speaking-p2-el','speaking-p2','html'],
        ['.keynotes-label-el','keynotes-label','text'],
        ['.keynotes-h2-el','keynotes-h2','text'],
        ['.keynotes-sub-el','keynotes-sub','html'],
        ['.k1-title-el','k1-title','html'],
        ['.k1-body-el','k1-body','html'],
        ['.k2-title-el','k2-title','html'],
        ['.k2-body-el','k2-body','html'],
        ['.k3-title-el','k3-title','html'],
        ['.k3-body-el','k3-body','html'],
        ['.contact-hero-label-el','contact-hero-label','text'],
        ['.contact-hero-h2-el','contact-hero-h2','html'],
        ['.contact-hero-sub-el','contact-hero-sub','html'],
        ['.footer-nav-h4-el','footer-nav-h4','text'],
        ['.footer-social-h4-el','footer-social-h4','text'],
        ['.spk-imp-label-el','spk-imp-label','text'],
        ['.spk-imp-h2-el','spk-imp-h2','text'],
        ['.spk-heroimg-cap-el','spk-heroimg-cap','text'],
        ['.footer-social-p-el','footer-social-p','text'],
        ['.footer-copy-el','footer-copy','text'],
        ['.footer-impressum-el','footer-impressum','text'],
        ['.footer-datenschutz-el','footer-datenschutz','text'],
        ['.footer-agb-el','footer-agb','text'],
        ['.footer-nav-home-el','footer-nav-home','text'],
        ['.footer-nav-coaching-el','footer-nav-coaching','text'],
        ['.footer-nav-speaking-el','footer-nav-speaking','text'],
        ['.footer-nav-contact-el','footer-nav-contact','text'],
        ['.header-subtitle-el','header-subtitle','text'],
        ['.footer-subtitle-el','footer-subtitle','text'],
        ['.quote-text-el','quote-text','html'],
        ['.trust-dbi-el','trust-dbi','text'],
        ['.trust-years-el','trust-years','text'],
        ['.trust-2in1-el','trust-2in1','text'],
        ['.keynote-tag-1-el','keynote-tag-1','text'],
        ['.keynote-tag-2-el','keynote-tag-2','text'],
        ['.keynote-tag-3-el','keynote-tag-3','text'],
        ['.testi-h2-c-el','testi-h2-c','text'],
        ['.testi-label-c-el','testi-label-c','text'],
        ['.impressions-label-el','impressions-label','text'],
        ['.impressions-h2-el','impressions-h2','text'],
        ['.testi-1-text-el','testi-1-text','html'],
        ['.testi-1-role-el','testi-1-role','text'],
        ['.testi-2-text-el','testi-2-text','html'],
        ['.testi-2-role-el','testi-2-role','text'],
        ['.speaking-testi-label-el','speaking-testi-label','text'],
        ['.speaking-testi-h2-el','speaking-testi-h2','text'],
        ['.speaking-testi-1-text-el','speaking-testi-1-text','html'],
        ['.speaking-testi-1-role-el','speaking-testi-1-role','text'],
        ['.testi-3-text-el','testi-3-text','html'],
        ['.testi-3-role-el','testi-3-role','text'],
        ['.offer-label-el','offer-label','text'],
        ['.offer-title-el','offer-title','text'],
        ['.offer-price-el','offer-price','text'],
        ['.offer-desc-el','offer-desc','html'],
        ['.offer-f1-el','offer-f1','text'],
        ['.offer-f2-el','offer-f2','text'],
        ['.offer-f3-el','offer-f3','text'],
        ['.offer-f4-el','offer-f4','text'],
        ['.offer-cta-el','offer-cta','text'],
        ['.services-label-el','services-label','text'],
        ['.services-h2-el','services-h2','text'],
        ['.contact-info-h3-el','contact-info-h3','html'],
        ['.contact-info-p-el','contact-info-p','html'],
        ['.contact-detail-cal-el','contact-detail-cal','text'],
        ['.contact-detail-email-el','contact-detail-email','text'],
        ['.contact-detail-li-el','contact-detail-li','text'],
        ['.contact-li-link-el','contact-li-link','html'],
        ['.services-subtitle-el','services-subtitle','html'],
        ['.calendly-box-h3-el','calendly-box-h3','text'],
        ['.calendly-box-p-el','calendly-box-p','html'],
        ['.calendly-box-btn-el','calendly-box-btn','text'],
        ['.calendly-preview-p-el','calendly-preview-p','html'],
        ['.steps-label-el','steps-label','text'],
        ['.steps-h3-el','steps-h3','html'],
        ['.step1-title-el','step1-title','text'],
        ['.step1-body-el','step1-body','html'],
        ['.step2-title-el','step2-title','text'],
        ['.step2-body-el','step2-body','html'],
        ['.step3-title-el','step3-title','text'],
        ['.step3-body-el','step3-body','html'],
        ['.faq-h4-el','faq-h4','text'],
        ['.faq-q1-el','faq-q1','text'],
        ['.faq-a1-el','faq-a1','text'],
        ['.faq-q2-el','faq-q2','text'],
        ['.faq-a2-el','faq-a2','text'],
        ['.faq-q3-el','faq-q3','text'],
        ['.faq-a3-el','faq-a3','text']
    ];

    function applyLang(lang) {
        i18nMap.forEach(function(entry) {
            document.querySelectorAll(entry[0]).forEach(function(el) {
                var t = translations[entry[1]];
                if (!t) return;
                if (entry[2] === 'html') el.innerHTML = t[lang];
                else el.textContent = t[lang];
            });
        });
        document.documentElement.lang = lang;
        var lbl = document.getElementById('langLabel');
        if (lbl) lbl.textContent = lang === 'de' ? 'EN' : 'DE';
        currentLang = lang;
        try { localStorage.setItem('jk-lang', lang); } catch(e) {}
    }

    /* ── Bootstrap everything after DOM ready ── */
    document.addEventListener('DOMContentLoaded', function() {

        /* Direct listeners – no event delegation */

        /* Mobile Toggle */
        var mobileToggle = document.getElementById('mobileToggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function() {
                console.log('mobileToggle clicked');
                var menu = document.getElementById('mobileMenu');
                if (menu) {
                    menu.classList.add('open');
                    document.body.style.overflow = 'hidden';
                    console.log('mobile menu opened');
                }
            });
        }

        /* Mobile Close */
        var mobileClose = document.getElementById('mobileClose');
        if (mobileClose) {
            mobileClose.addEventListener('click', closeMobileMenu);
        }

        /* All [data-nav] elements – direct listeners */
        /* multipage: real links */

        /* Modal close on overlay click */
        document.querySelectorAll('.modal-overlay').forEach(function(el) {
            el.addEventListener('click', function(e) {
                if (e.target === el) { el.classList.remove('open'); document.body.style.overflow = ''; }
            });
        });

        /* Escape key closes modals */
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.open').forEach(function(el) {
                    el.classList.remove('open'); document.body.style.overflow = '';
                });
            }
        });

        /* Scroll shadow on header */
        window.addEventListener('scroll', function() {
            var h = document.getElementById('siteHeader');
            if (h) h.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });



        initImpressionsGallery();
        initSpeakingGallery();
        initDarkMode();
        initCookieBanner();
        observeAnimations();
    });

    /* Impressions gallery: continuous auto-scroll, speed controlled by arrows */
    function initSpeakingGallery() {
        var wrap = document.querySelector('.spk-imp-track-wrap');
        var track = wrap ? wrap.querySelector('.spk-imp-track') : null;
        if (!wrap || !track) return;
        var prevBtn = document.getElementById('spkImpPrev');
        var nextBtn = document.getElementById('spkImpNext');
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var speeds = [-2, -1, -0.5, 0, 0.5, 1, 2];
        var level = reduce ? 3 : 4;
        var pos = 0;
        function half() { return track.scrollWidth / 2; }
        function updateButtons() {
            if (prevBtn) prevBtn.disabled = (level <= 0);
            if (nextBtn) nextBtn.disabled = (level >= speeds.length - 1);
        }
        updateButtons();
        function step() {
            var v = speeds[level];
            var h = half();
            if (v !== 0 && h > 0) {
                pos = (((pos + v) % h) + h) % h;
                wrap.scrollLeft = pos;
            }
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        if (nextBtn) nextBtn.addEventListener('click', function() { if (level < speeds.length - 1) level++; updateButtons(); });
        if (prevBtn) prevBtn.addEventListener('click', function() { if (level > 0) level--; updateButtons(); });
    }

    function initImpressionsGallery() {
        var wrap = document.querySelector('.impressions-track-wrap');
        var track = wrap ? wrap.querySelector('.impressions-track') : null;
        if (!wrap || !track) return;

        var prevBtn = document.getElementById('impPrev');
        var nextBtn = document.getElementById('impNext');

        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var speeds = [-2, -1, -0.5, 0, 0.5, 1, 2];   // px per frame; index moves with arrows
        var level = reduce ? 3 : 4;                  // reduce -> stopped, otherwise normal forward
        var pos = 0;

        function half() { return track.scrollWidth / 2; }   // content is duplicated once

        function updateButtons() {
            if (prevBtn) prevBtn.disabled = (level <= 0);
            if (nextBtn) nextBtn.disabled = (level >= speeds.length - 1);
        }
        updateButtons();

        function step() {
            var v = speeds[level];
            var h = half();
            if (v !== 0 && h > 0) {
                pos = (((pos + v) % h) + h) % h;   // wrap seamlessly into [0, h)
                wrap.scrollLeft = pos;
            }
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);

        if (nextBtn) nextBtn.addEventListener('click', function() {
            if (level < speeds.length - 1) level++;
            updateButtons();
        });
        if (prevBtn) prevBtn.addEventListener('click', function() {
            if (level > 0) level--;
            updateButtons();
        });
    }

})();
