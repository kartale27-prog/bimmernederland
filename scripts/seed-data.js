const categories = [
  { slug: "auto-algemeen", naam: "🚗 BMW Auto's – Algemeen", beschrijving: "Algemene discussies over BMW auto's.", type: "algemeen", volgorde: 0, subforums: [
    { slug: "auto-algemeen-discussie", naam: "Algemene BMW Discussie", beschrijving: "Alles wat niet in een specifieke serie past.", volgorde: 0 },
    { slug: "auto-aankoop-advies", naam: "Aankoop & Verkoopadvies", beschrijving: "Hulp nodig bij het kopen of verkopen van een BMW?", volgorde: 1 },
    { slug: "auto-verzekering-financiering", naam: "Verzekering & Financiering", beschrijving: "Verzekeringstips, leasevragen en financiering.", volgorde: 2 },
    { slug: "auto-tuning-modificaties", naam: "Tuning & Modificaties", beschrijving: "Chips, remupgrades, velgen en uitlaten.", volgorde: 3 },
  ]},
  { slug: "serie-1", naam: "BMW 1 Serie", beschrijving: "E87, E81, F20, F40 — alles over de BMW 1 Serie hatchback.", type: "auto", volgorde: 1, subforums: [
    { slug: "1-serie-techniek", naam: "Techniek & Onderhoud", beschrijving: "Motorproblemen, beurten, APK en reparaties.", volgorde: 0 },
    { slug: "1-serie-aankoop", naam: "Aankoop & Occasions", beschrijving: "Koopadvies, prijzen en wat te controleren.", volgorde: 1 },
    { slug: "1-serie-modificaties", naam: "Modificaties & Tuning", beschrijving: "Styling, performance en upgrades.", volgorde: 2 },
  ]},
  { slug: "serie-2", naam: "BMW 2 Serie", beschrijving: "F22, F45, G42 — Coupé, Active Tourer en Gran Coupé.", type: "auto", volgorde: 2, subforums: [
    { slug: "2-serie-techniek", naam: "Techniek & Onderhoud", beschrijving: "Problemen, beurten en reparaties.", volgorde: 0 },
    { slug: "2-serie-aankoop", naam: "Aankoop & Occasions", beschrijving: "Koopadvies en occasiontips.", volgorde: 1 },
  ]},
  { slug: "serie-3", naam: "BMW 3 Serie", beschrijving: "E30, E36, E46, E90, F30, G20 — het hart van BMW.", type: "auto", volgorde: 3, subforums: [
    { slug: "3-serie-techniek", naam: "Techniek & Onderhoud", beschrijving: "Motorproblemen, ketting, beurten.", volgorde: 0 },
    { slug: "3-serie-aankoop", naam: "Aankoop & Occasions", beschrijving: "Welke 3 Serie kopen?", volgorde: 1 },
    { slug: "3-serie-e46", naam: "E46 Specifiek", beschrijving: "Alles over de populaire E46 (1998–2006).", volgorde: 2 },
    { slug: "3-serie-f30", naam: "F30/F31 Specifiek", beschrijving: "Alles over de F30/F31 (2012–2019).", volgorde: 3 },
    { slug: "3-serie-g20", naam: "G20/G21 Specifiek", beschrijving: "Alles over de nieuwste G20/G21 (2019+).", volgorde: 4 },
  ]},
  { slug: "serie-4", naam: "BMW 4 Serie", beschrijving: "F32, F82, G22 — Coupé, Cabrio en Gran Coupé.", type: "auto", volgorde: 4, subforums: [
    { slug: "4-serie-techniek", naam: "Techniek & Onderhoud", beschrijving: "Problemen, onderhoud en reparaties.", volgorde: 0 },
    { slug: "4-serie-aankoop", naam: "Aankoop & Occasions", beschrijving: "Koopadvies voor de 4 Serie.", volgorde: 1 },
    { slug: "m4-f82-g82", naam: "BMW M4 (F82/G82)", beschrijving: "Specifiek voor de M4 coupé eigenaren.", volgorde: 2 },
  ]},
  { slug: "serie-5", naam: "BMW 5 Serie", beschrijving: "E34, E39, E60, F10, G30 — de zakelijke BMW bij uitstek.", type: "auto", volgorde: 5, subforums: [
    { slug: "5-serie-techniek", naam: "Techniek & Onderhoud", beschrijving: "Motorproblemen, beurten en reparaties.", volgorde: 0 },
    { slug: "5-serie-aankoop", naam: "Aankoop & Occasions", beschrijving: "Koopadvies, welke F10 is betrouwbaar?", volgorde: 1 },
    { slug: "5-serie-e60", naam: "E60/E61 Specifiek", beschrijving: "Alles over de E60/E61 (2003–2010).", volgorde: 2 },
    { slug: "5-serie-f10", naam: "F10/F11 Specifiek", beschrijving: "Alles over de F10/F11 (2010–2017).", volgorde: 3 },
    { slug: "5-serie-g30", naam: "G30/G31 Specifiek", beschrijving: "Alles over de G30/G31 (2017+).", volgorde: 4 },
    { slug: "m5-forum", naam: "BMW M5 Forum", beschrijving: "E60, F10, F90 en G90 M5 eigenaren.", volgorde: 5 },
  ]},
  { slug: "serie-6", naam: "BMW 6 Serie", beschrijving: "E63, F12, G32 Gran Turismo — elegant en krachtig.", type: "auto", volgorde: 6, subforums: [
    { slug: "6-serie-techniek", naam: "Techniek & Onderhoud", beschrijving: "Problemen en reparaties.", volgorde: 0 },
    { slug: "6-serie-aankoop", naam: "Aankoop & Occasions", beschrijving: "Koopadvies 6 Serie.", volgorde: 1 },
  ]},
  { slug: "serie-7", naam: "BMW 7 Serie", beschrijving: "E38, E65, F01, G11 — de luxe limousine van BMW.", type: "auto", volgorde: 7, subforums: [
    { slug: "7-serie-techniek", naam: "Techniek & Onderhoud", beschrijving: "Complexe elektronica, beurten.", volgorde: 0 },
    { slug: "7-serie-aankoop", naam: "Aankoop & Occasions", beschrijving: "7 Serie kopen: wat checken?", volgorde: 1 },
  ]},
  { slug: "serie-8", naam: "BMW 8 Serie", beschrijving: "E31, G14/G15 — de grand tourer van BMW.", type: "auto", volgorde: 8, subforums: [
    { slug: "8-serie-techniek", naam: "Techniek & Onderhoud", beschrijving: "Problemen en onderhoud.", volgorde: 0 },
    { slug: "8-serie-aankoop", naam: "Aankoop & Occasions", beschrijving: "8 Serie kopen.", volgorde: 1 },
  ]},
  { slug: "x-serie", naam: "BMW X Serie (SUV's)", beschrijving: "X1 t/m X7 — BMW's SUV-familie.", type: "auto", volgorde: 9, subforums: [
    { slug: "x1-x2", naam: "BMW X1 & X2", beschrijving: "Compacte SUV's voor dagelijks gebruik.", volgorde: 0 },
    { slug: "x3-x4", naam: "BMW X3 & X4", beschrijving: "De populairste BMW SUV's in Nederland.", volgorde: 1 },
    { slug: "x5-x6", naam: "BMW X5 & X6", beschrijving: "Grote SUV's — E53, E70, F15, G05.", volgorde: 2 },
    { slug: "x7", naam: "BMW X7", beschrijving: "BMW's grootste SUV.", volgorde: 3 },
    { slug: "x-serie-techniek", naam: "X Serie Techniek Algemeen", beschrijving: "xDrive, transmissieproblemen, beurten.", volgorde: 4 },
  ]},
  { slug: "m-serie-auto", naam: "BMW M Serie (Auto's)", beschrijving: "M2, M3, M4, M5, M8, XM — pure M-modellen.", type: "auto", volgorde: 10, subforums: [
    { slug: "m2-forum", naam: "BMW M2 (F87/G87)", beschrijving: "De kleine M-auto met groot karakter.", volgorde: 0 },
    { slug: "m3-forum", naam: "BMW M3 (E30–G80)", beschrijving: "Alle generaties M3.", volgorde: 1 },
    { slug: "m4-forum", naam: "BMW M4 (F82–G82)", beschrijving: "M4 Coupé, Cabrio en CSL.", volgorde: 2 },
    { slug: "m5-m8-forum", naam: "BMW M5 & M8", beschrijving: "De snelle grote BMW's.", volgorde: 3 },
    { slug: "xm-forum", naam: "BMW XM", beschrijving: "De hybride M SUV.", volgorde: 4 },
    { slug: "m-track-circuit", naam: "Circuit & Track Days", beschrijving: "Trackday ervaringen, instelling tips.", volgorde: 5 },
  ]},
  { slug: "i-serie", naam: "BMW i Serie (Elektrisch)", beschrijving: "i3, i4, i5, i7, iX — elektrische BMW's.", type: "auto", volgorde: 11, subforums: [
    { slug: "i3-forum", naam: "BMW i3", beschrijving: "De originele elektrische BMW (2013–2022).", volgorde: 0 },
    { slug: "i4-forum", naam: "BMW i4", beschrijving: "Elektrische sedan — eDrive40 en M50.", volgorde: 1 },
    { slug: "i5-i7-forum", naam: "BMW i5 & i7", beschrijving: "Elektrische 5 en 7 Serie.", volgorde: 2 },
    { slug: "ix-forum", naam: "BMW iX", beschrijving: "De elektrische flagship SUV.", volgorde: 3 },
    { slug: "elektrisch-laden", naam: "Laden & Infrastructuur", beschrijving: "Laadpalen, actieradius, thuisladen.", volgorde: 4 },
  ]},
  { slug: "z-serie", naam: "BMW Z Serie & Roadsters", beschrijving: "Z3, Z4, Z8 — open rijplezier.", type: "auto", volgorde: 12, subforums: [
    { slug: "z3-z4-forum", naam: "BMW Z3 & Z4", beschrijving: "Roadster plezier, zomer rijden.", volgorde: 0 },
  ]},
  { slug: "motor-algemeen", naam: "🏍️ BMW Motorrad – Algemeen", beschrijving: "Algemene discussies over BMW motorfietsen.", type: "algemeen", volgorde: 20, subforums: [
    { slug: "motor-algemeen-discussie", naam: "Algemene Motorrad Discussie", beschrijving: "Alles over BMW motorfietsen.", volgorde: 0 },
    { slug: "motor-aankoop-advies", naam: "Aankoop & Verkoopadvies", beschrijving: "Welke BMW motor kopen?", volgorde: 1 },
    { slug: "motor-ritten-routes", naam: "Ritten & Routes", beschrijving: "Favoriete routes, weekendritten, Alpenreizen.", volgorde: 2 },
    { slug: "motor-uitrusting-kleding", naam: "Uitrusting & Kleding", beschrijving: "Helmen, jassen, schoenen en accessoires.", volgorde: 3 },
    { slug: "motor-onderhoud-algemeen", naam: "Onderhoud & Techniek Algemeen", beschrijving: "Onderhoudstips en technische vragen.", volgorde: 4 },
  ]},
  { slug: "gs-serie-motor", naam: "BMW GS Serie", beschrijving: "R 1300 GS, R 1250 GS, R 1200 GS, F 900 GS, G 310 GS.", type: "motor", volgorde: 21, subforums: [
    { slug: "r1300gs-forum", naam: "R 1300 GS (2023+)", beschrijving: "Nieuwste GS — ASA, ShiftCam, technologie.", volgorde: 0 },
    { slug: "r1250gs-forum", naam: "R 1250 GS (2018–2022)", beschrijving: "ShiftCam, betrouwbaarheid, onderhoud.", volgorde: 1 },
    { slug: "r1200gs-forum", naam: "R 1200 GS (2004–2018)", beschrijving: "Hexhead, camhead, LC — alle varianten.", volgorde: 2 },
    { slug: "f900gs-forum", naam: "F 900 GS & Adventure", beschrijving: "De middelgrote GS.", volgorde: 3 },
    { slug: "g310gs-forum", naam: "G 310 GS", beschrijving: "A2-rijbewijs instap-GS.", volgorde: 4 },
    { slug: "gs-reizen-expeditie", naam: "Reizen & Expeditie", beschrijving: "Lange afstandsreizen, camping, Afrika, Azië.", volgorde: 5 },
  ]},
  { slug: "s-serie-motor", naam: "BMW S & M Serie (Sport)", beschrijving: "S 1000 RR, M 1000 RR, S 1000 R, M 1000 R, S 1000 XR.", type: "motor", volgorde: 22, subforums: [
    { slug: "s1000rr-forum", naam: "S 1000 RR", beschrijving: "De superbike — circuit, techniek, afstelling.", volgorde: 0 },
    { slug: "m1000rr-forum", naam: "M 1000 RR", beschrijving: "De ultieme M-superbike met winglets.", volgorde: 1 },
    { slug: "s1000r-m1000r-forum", naam: "S 1000 R & M 1000 R", beschrijving: "Naked streetfighters.", volgorde: 2 },
    { slug: "s1000xr-forum", naam: "S 1000 XR", beschrijving: "Sport tourer — snelheid én comfort.", volgorde: 3 },
    { slug: "motor-circuit-trackday", naam: "Circuit & Trackdays", beschrijving: "Assen, Spa, Zandvoort — ervaringen en tips.", volgorde: 4 },
  ]},
  { slug: "r-serie-motor", naam: "BMW R Serie & Heritage", beschrijving: "R 18, R nineT, R 1250 RT — boxer-twins en cruisers.", type: "motor", volgorde: 23, subforums: [
    { slug: "r18-forum", naam: "BMW R 18 (Cruiser)", beschrijving: "1.800 cc cruiser — retro rijplezier.", volgorde: 0 },
    { slug: "rninet-forum", naam: "BMW R nineT", beschrijving: "Heritage roadster en scrambler.", volgorde: 1 },
    { slug: "r-boxer-algemeen", naam: "R Serie Boxer Algemeen", beschrijving: "Boxer-motor techniek, VANOS, onderhoud.", volgorde: 2 },
  ]},
  { slug: "k-serie-motor", naam: "BMW K Serie (Tourers)", beschrijving: "K 1600 GT, K 1600 GTL — zescilinder tourers.", type: "motor", volgorde: 24, subforums: [
    { slug: "k1600-forum", naam: "K 1600 GT & GTL", beschrijving: "Lange afstandstourers — comfort en techniek.", volgorde: 0 },
  ]},
  { slug: "f-g-serie-motor", naam: "BMW F & G Serie", beschrijving: "F 900 R, F 900 XR, G 310 R — middenklasse en instap.", type: "motor", volgorde: 25, subforums: [
    { slug: "f900r-f900xr-forum", naam: "F 900 R & F 900 XR", beschrijving: "Veelzijdige middenklasse naked & tourer.", volgorde: 0 },
    { slug: "g310r-forum", naam: "G 310 R", beschrijving: "A2 instapmotor — beginners welkom.", volgorde: 1 },
  ]},
  { slug: "ce-serie-motor", naam: "BMW CE Elektrisch", beschrijving: "CE 04 en toekomstige elektrische Motorrad modellen.", type: "motor", volgorde: 26, subforums: [
    { slug: "ce04-forum", naam: "BMW CE 04", beschrijving: "Elektrische scooter — accu, laden, rijervaring.", volgorde: 0 },
    { slug: "elektrisch-motorrad", naam: "Elektrisch Rijden Motorrad", beschrijving: "Toekomst van elektrische motorfietsen.", volgorde: 1 },
  ]},
];

module.exports = { categories };
