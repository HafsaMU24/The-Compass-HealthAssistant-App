The Compass - Hälsoassistent
The Compass är en modern webbapplikation byggd för att underlätta hälsohantering genom smarta verktyg, noggrann dataanalys och smidig tillgång till medicinska uppgifter.

* funktioner
Flerspråkigt stöd: Fullt stöd för svenska och arabiska med automatisk anpassning av layout (RTL/LTR) via ett anpassat LanguageContext växlar appen sömlöst mellan (sv/ar).
Uppläsning SpeechButton: Integrerat stöd för att lyssna på information direkt i webbläsaren via Web Speech API(Text-To-Speach).

** Säker Autentisering: Inloggning och användarhantering via Clerk.
Smart Validering: Avancerad logik för att säkerställa korrekta medicinska doseringar (stöd för både siffror och enheter som mg/ml).
Modern Design: Byggd med den senaste versionen av Tailwind CSS för en responsiv och snabb användarupplevelse.

*** Teknisk Stack
Frontend: React 19 Utnyttjar de senaste krokarna (Hooks) och optimeringarna för ett snabbt UI.
Build Tool: Vite 7 Fungerar som vår "Build Tool" för blixtsnabb utveckling och optimerade produktionsbyggen.
Språk : Typescript Ger strikt typning vilket minimerar buggar och gör koden själv-dokumenterande.
Styling: Tailwind CSS 4 Används för en nyttocentrerad (utility-first) styling som är extremt snabb att ladda och enkel att underhålla.
Routing: React Router 7
Autentisering: Clerk Auth Hanterar autentisering på ett säkert sätt utan att vi behöver lagra känsliga lösenord i vår egen databas.

-Varför React + TypeScript? Kombinationen ger en skalbar arkitektur där vi kan fånga fel redan under utveckling, vilket är kritiskt i en hälsoapplikation där dataintegritet är viktig.
-Varför Context API istället för Redux? För språkhantering och användarstatus räcker Reacts inbyggda Context API. Det håller appen lättviktig och minskar komplexiteten (boilerplate).
-Varför Web Speech API? Genom att använda webbläsarens inbyggda API istället för externa tjänster minskar vi latens (fördröjning), sänker kostnader och förbättrar användarens integritet.
-Varför Regex för validering? Genom att använda /^\d+\s*[a-zA-Z]*$/ skapar vi en flexibel men säker inmatning som tillåter både enbart siffror och internationella måttenheter (mg, ml, g).

Ändring som jag gjört:
Rensning: Tog bort oanvända filer och mallar.
Nya filer: Lade till nödvändiga komponenter och resurser.
Refaktorering: Justerade kod och stil för att färdigställa appens utseende.
Dokumentation: Skrev en fullständig README.
