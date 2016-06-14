# hackerscafe
Gebruik Meetup API voor 1e [Hackers café Meetup](http://www.meetup.com/Web-Developers-Heuvelrug/events/231065621/) van Webdevs op de Heuvelrug 15 juni '16.
Deze demo is gebouwd met Angular 1 en doet een aanroep van de Meetup API om aanwezigen op te halen.
De namen worden getoond in een foto met wat HTML/CSS.

### Demo
Check hier [een demo](http://www.itoffthewall.nl/hackerscafe).

### Install/contribute/play around
- Installeer [git](https://desktop.github.com/) en evt. een git client als je deze nog niet hebt
- `git clone https://github.com/bartvanderwal/hackerscafe.git`
- Installeer [nodeJs](https://nodejs.org) als je deze nog niet hebt (v4+)
- Installeer de npm dependencies

`$npm install`
- Installeer de frontend dependencies met bower

`$bower install`

- Run de app in een locale applicatie server, bv. de simpele via Node:
`npm install http-server -g`
`cd hackerscafe`
`http-server .`
Surf naar `http://localhost:8081' (vervang poort nr conform wat http-server aangeeft)
