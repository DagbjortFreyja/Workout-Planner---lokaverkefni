## Inngangur

Verkefnið snýst um að búa til einfalt vefforrit til að halda utan um æfingar og æfingaáætlanir. Notandi getur skráð æfingar, séð lista yfir þær og búið til workout plans þar sem hægt er að fylgjast með framvindu.

Hugmyndin var að búa til eitthvað sem er einfalt en samt nýtist í raun, þar sem hægt er að halda utan um æfingar og sjá hvað hefur verið gert. Áherslan var því frekar á að láta alla hluta kerfisins vinna saman (bakendi, gagnagrunn og framendi) heldur en að gera flókna virkni.

Hugmyndin kom frá eigin áhuga á líkamsrækt.

## Útfærsla

Verkefnið uppfyllir eftirfarandi skilyrði:

- Bakendi útfærður með Node.js og Hono til að búa til létta og skilvirka vefþjónustu
- REST-lík API útfært fyrir CRUD aðgerðir á æfingum og æfingaáætlunum
- Framendi útfærður með server-side rendering (JSX templates) til að einfalda uppsetningu og draga úr flækjustigi á client-hlið
- PostgreSQL gagnagrunnur notaður til að geyma æfingar, æfingaáætlanir og tengdar upplýsingar
- Tengingar við gagnagrunn útfærðar með `pg` og connection pool
- Einingapróf skrifuð með Vitest fyrir gagnagrunnsvirkni (t.d. create, read og delete aðgerðir)
- GitHub Actions notað til að keyra lint og próf sjálfkrafa við breytingar (CI)
- Verkefnið sett upp í hýsingu (Render) með tengingu við PostgreSQL gagnagrunn (CD)
- Villumeðhöndlun útfærð til að grípa og meðhöndla villur frá gagnagrunni og API köllum

Helsta virkni:

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
- GitHub Actions fyrir sjálfvirkt lint og prófanir (CI)
- Render fyrir hýsingu og tengingu við gagnagrunn (CD)

Hono var valið þar sem það er einfalt og létt framework sem hentar vel fyrir lítil vefforrit og gerir auðvelt að skilgreina API leiðir. TypeScript var notað til að auka öryggi og minnka líkur á runtime villum.

PostgreSQL var notað til að geyma gögn á áreiðanlegan hátt og leyfa tengsl milli taflna (t.d. workout plans og æfinga innan þeirra), sem einfaldaði gagnamódelið.

Server-side rendering með JSX var valið til að halda framendanum einföldum án þess að þurfa flókna client-side uppsetningu.

GitHub Actions og Render voru notuð til að sjálfvirknivæða keyrslu prófa og deploy, sem tryggir að kóðinn haldist stöðugur og virki í production umhverfi.

## Hvað gekk vel

Almennt gekk verkefnið vel og flestir lykilþættir komust snemma í gang. Uppsetning á gagnagrunni og tenging við bakenda gekk vel þegar grunnurinn var kominn, og CRUD virkni fyrir æfingar var fljótlega komin í lag. Það gerði það auðvelt að prófa kerfið og bæta smám saman við virkni.

Einnig gekk vel að bæta við smærri eiginleikum eins og checkboxum og progress bar, sem bættu notendaupplifun og gerðu verkefnið lifandi. Þar sem verkefnið varð keyranlegt tiltölulega snemma í ferlinu var auðvelt að prófa breytingar og laga villur jafnóðum.



## Hvað gekk illa

Helstu áskoranir tengdust uppsetningu og tengingum á milli kerfishluta. Í byrjun ollu TypeScript og module imports nokkrum vandræðum, sérstaklega varðandi uppsetningu og hvernig skrár voru fluttar inn á milli.

Uppsetning á gagnagrunni og tenging við umhverfisbreytur tók einnig tíma, sérstaklega þegar verkefnið var fært yfir í hýsingu. Þar komu upp vandamál tengd tengistrengjum og SSL stillingum sem þurfti að leysa til að fá kerfið til að virka í production umhverfi.

Debugging á route villum (t.d. 404 villum) reyndist stundum flókið þar sem erfitt gat verið að sjá hvort vandamálið lá í routing, server eða gagnagrunni.

Að lokum tók styling lengri tíma en búist var við, þar sem smáatriði í útliti og uppsetningu geta verið tímafrek þrátt fyrir að virknin sé komin í lag.

## Hvað var áhugavert

Það sem stóð mest upp úr var að sjá hvernig allt tengist saman þegar unnið er með fullstack verkefni. Sérstaklega hvernig gögn fara úr gagnagrunni, í gegnum API og enda síðan í rendering á síðunni.

Einnig var áhugavert að vinna með stöðu (t.d. checkbox og progress) sem er geymd í gagnagrunni frekar en bara í frontendi. Það gerði það skýrara hvernig á að halda utan um gögn þannig að þau haldist rétt milli requests.

Að setja verkefnið í hýsingu var líka lærdómsríkt, þar sem komu upp raunveruleg vandamál eins og tengingar við gagnagrunn og SSL sem komu ekki fram í local umhverfi.

## Annað
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
