## Inngangur

Verkefnið felst í þróun á einföldu vefforriti til að halda utan um æfingar og æfingaáætlanir (workout plans). Notandi getur skráð æfingar, fylgst með þyngd og endurtekningum og einnig búið til skipulagðar æfingar fyrir ákveðna daga.

Hugmyndin kemur úr eigin áhuga á líkamsrækt og mikilvægi þess að fylgjast með framförum yfir tíma. Markmiðið var að búa til einfalt og notendavænt kerfi sem heldur utan um æfingar og gerir notanda kleift að skipuleggja æfingadaga.

## Útfærsla

Verkefnið uppfyllir eftirfarandi skilyrði:

- Bakendi útfærður með Node.js og Hono
- Vefþjónusta (REST-lík API) útfærð
- Framendi útfærður með server-side rendering (JSX templates)
- Gagnagrunnur (PostgreSQL) notaður
- Einingapróf skrifuð fyrir gagnagrunnsvirkni

Helstu virkni:

- Notandi getur bætt við æfingu (exercise, weight, reps, sets)
- Skoðað lista yfir æfingar
- Eytt æfingum
- Búið til workout plans
- Bætt æfingum inn í plan
- Hakað við æfingar sem kláraðar
- Séð framvindu (progress bar) fyrir hvert plan

## Tækni

Eftirfarandi tækni var notuð:

- Node.js sem keyrsluumhverfi
- Hono sem veframmi (backend framework)
- PostgreSQL sem gagnagrunnur
- TypeScript fyrir týpuöryggi
- JSX fyrir server-side rendering
- Vitest fyrir einingapróf

Hono var valið þar sem það er einfalt og létt framework sem hentar vel fyrir lítil vefforrit. PostgreSQL var notaður til að geyma gögn á áreiðanlegan hátt og leyfa tengsl milli taflna (t.d. workout plans og æfinga innan þeirra).

## Hvað gekk vel

- Uppsetning á gagnagrunni og tenging við backend gekk vel
- CRUD virkni fyrir æfingar virkaði snemma í ferlinu
- Workout plans virkni bætti mikið við verkefnið
- Progress bar og checkbox virkni gaf verkefninu meiri dýpt
- Verkefnið varð keyranlegt snemma og auðvelt að prófa

## Hvað gekk illa

- Tengingar milli TypeScript og module imports ollu vandræðum í byrjun
- Uppsetning á gagnagrunni og tenging við umhverfisbreytur tók tíma
- Debugging á route villum (t.d. 404) var stundum flókið
- Styling tók lengri tíma en búist var við

## Hvað var áhugavert

- Að vinna með relational database og tengja saman töflur
- Að sjá hvernig server-side rendering virkar með JSX
- Að bæta við interactivity án þess að nota client-side framework
- Að útfæra progress tracking fyrir workout plans

```
npm install
npm run dev
```

```
open http://localhost:3000
```
## próf
```
npx vitest
```
