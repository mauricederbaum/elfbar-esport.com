// Teamdaten hier ergänzen. Nur bestätigte Angaben veröffentlichen.
const teamConfig = {
  discordInvite: '',
  faceitUrl: '',
  steamGroupUrl: '',
};

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Menü öffnen');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

const matchViews = {
  upcoming: ['Die nächste Runde kommt.', 'Aktuell sind keine anstehenden Matches veröffentlicht. Sobald Termine feststehen, findest du Gegner und Spielzeiten hier.', 'NO MATCH SCHEDULED'],
  results: ['Jede Runde schreibt Geschichte.', 'Bisher sind keine Ergebnisse veröffentlicht. Gespielte Matches und Scores findest du künftig an dieser Stelle.', 'NO RESULTS YET'],
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  const [title, description, status] = matchViews[tab.dataset.view];
  document.querySelector('#match-title').textContent = title;
  document.querySelector('#match-description').textContent = description;
  document.querySelector('#match-status').textContent = status;
  document.querySelector('#match-panel').setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs[tabs.length - 1];
    if (next) { event.preventDefault(); selectTab(next); next.focus(); }
  });
});

const articles = {
  home: { kicker: 'WEBSITE / TEAM', title: 'Neue Homebase. Gleiche Crew.', paragraphs: ['ELFBAR-ESPORT bekommt eine eigene Website. Als inoffizielles Team, das von Freunden gegründet wurde, haben wir hier einen gemeinsamen Platz abseits des Servers.', 'Hier findest du unsere Teamvorstellung, einen Bereich für anstehende Matches und Ergebnisse sowie Updates aus der Crew. Spielerprofile und Community-Links ergänzen wir, sobald die Angaben vorliegen.'] },
  cs: { kicker: 'COUNTER-STRIKE / FOKUS', title: 'Ein Spiel. Ein gemeinsamer Nenner.', paragraphs: ['Unser Schwerpunkt ist Counter-Strike. Zusammen spielen, miteinander kommunizieren und als Team in die nächste Runde gehen: Darum geht es bei ELFBAR-ESPORT.', 'Die Website wächst mit der Crew. Hier werden künftig die Menschen hinter dem Clantag und unsere gemeinsamen Matches sichtbar.'] },
  about: { kicker: 'ÜBER DIESE SEITE', title: 'Von Freunden gegründet.', paragraphs: ['ELFBAR-ESPORT ist ein inoffizielles Esport-Team mit dem Schwerpunkt Counter-Strike. Diese Seite stellt unser Community-Team vor.', 'Diese erste Fassung enthält noch keine Anbieter- oder Kontaktangaben. Vor einem öffentlichen Betrieb müssen die tatsächlichen Betreiberangaben und gegebenenfalls ein vollständiges Impressum ergänzt werden.', 'Die Seite ist keine offizielle Website von ELFBAR oder Valve. Counter-Strike und die zugehörigen Spielgrafiken gehören Valve. Das Teamlogo wurde vom Team bereitgestellt.'] },
  privacy: { kicker: 'DATENSCHUTZ / ENTWURF', title: 'Hinweise zum Datenschutz.', paragraphs: ['Diese Website verwendet im eigenen Seitencode keine Analyse- oder Werbedienste, keine Kontaktformulare und keinen lokalen Browser-Speicher. Schriften, Teamlogo und Spielgrafik werden als lokale Dateien ausgeliefert.', 'Beim Aufruf verarbeitet der Hosting-Anbieter technisch erforderliche Verbindungsdaten, beispielsweise die IP-Adresse. Bei der privaten Vorschau können außerdem Anmeldung und Zugriffsprüfung des Hosting-Anbieters erforderlich sein.', 'Externe Seiten werden erst beim Anklicken eines Links geöffnet. Dann gelten deren Datenschutzbestimmungen.', 'Diese Hinweise sind ein Entwurf. Verantwortlicher, Kontakt, konkreter Hosting-Anbieter, Rechtsgrundlagen und weitere erforderliche Angaben müssen vor dem öffentlichen Betrieb vervollständigt werden.'] },
};
const dialog = document.querySelector('#info-dialog');
let dialogTrigger;
function showInfo(key, trigger) {
  const item = articles[key];
  if (!item) return;
  dialogTrigger = trigger;
  document.querySelector('#dialog-kicker').textContent = item.kicker;
  document.querySelector('#dialog-title').textContent = item.title;
  document.querySelector('#dialog-body').replaceChildren(...item.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
  document.body.classList.add('dialog-open');
  dialog.showModal();
}
document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => showInfo(button.dataset.article, button)));
document.querySelectorAll('[data-legal]').forEach(button => button.addEventListener('click', () => showInfo(button.dataset.legal, button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); dialogTrigger?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();

const links = [
  ['Discord beitreten', teamConfig.discordInvite, ['discord.gg', 'discord.com']],
  ['FACEIT', teamConfig.faceitUrl, ['faceit.com', 'www.faceit.com']],
  ['Steam-Gruppe', teamConfig.steamGroupUrl, ['steamcommunity.com']],
];
const container = document.querySelector('#community-links');
for (const [label, href, hosts] of links) {
  if (!href) continue;
  let url;
  try { url = new URL(href); } catch { continue; }
  if (url.protocol !== 'https:' || !hosts.includes(url.hostname)) continue;
  const a = document.createElement('a'); a.href = url.href; a.textContent = `${label} ↗`; a.className = 'button social-link'; a.target = '_blank'; a.rel = 'noopener noreferrer';
  if (label === 'Discord beitreten') container.querySelector('.discord-pending')?.remove();
  container.append(a);
}
