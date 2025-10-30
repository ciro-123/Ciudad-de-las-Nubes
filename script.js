// Default language (you can toggle this dynamically)
let currentLang = langES; // change to langEN for English

// Insert dynamic content
function populatePage(lang) {
  // Main title and description
  document.getElementById("main-title").textContent = lang.mainTitle;
  document.getElementById("main-desc").textContent = lang.mainDesc;

  // Horizontal timeline
  const timelineContainer = document.getElementById("timeline-horizontal");
  timelineContainer.innerHTML = "";
  lang.timeline.forEach((phase) => {
    const node = document.createElement("div");
    node.classList.add("timeline-node");
    node.innerHTML = `
      <button data-target="#${phase.id}">
        <img src="${phase.img}" alt="${phase.label}" class="timeline-img" />
      </button>
      <p>${phase.label}</p>
    `;
    timelineContainer.appendChild(node);
  });

  // Vertical timeline
  const wrapper = document.getElementById("timeline-wrapper");
  wrapper.innerHTML = "";
    lang.timeline.forEach((phase, i) => {
      const side = i % 2 === 0 ? "left" : "right";
      const section = document.createElement("section");
      section.id = phase.id;
      section.classList.add("timeline-section", side, "bg-transparent");

      // Build a phase card: top (image left, text right), bottom (UL of links)
      // If the phase has an `items` array, use it; otherwise create sensible defaults.
      const items = phase.items && Array.isArray(phase.items)
        ? phase.items
        : [
            { label: "Night of Wolves", href: "#", previewText: phase.content, previewImg: phase.img },
            { label: "Caroteo", href: "#", previewText: "See images and concept art.", previewImg: phase.img },
            { label: "Tete Manito", href: "#", previewText: "Full description and lore.", previewImg: phase.img }
          ];

      // Create markup
      const topHtml = `
        <div class="phase-top">
          <div class="phase-img">
            <img src="${phase.img}" alt="${phase.label}" />
          </div>
          <div class="phase-text">
            <h2>${phase.title}</h2>
            <p>${phase.content}</p>
          </div>
        </div>
      `;

      const ulItems = items.map(it => {
        // allow item to be string or object
        if (typeof it === 'string') {
          return `<li><a href="#" data-preview-text="${phase.content}" data-preview-img="${phase.img}">${it}</a></li>`;
        }
        const pText = (it.previewText || it.preview || phase.content).replace(/"/g, '&quot;');
        const pImg = it.previewImg || it.img || phase.img;
        const label = it.label || it.title || 'Link';
        // support a status field: 'wip' or 'released' (default released)
  // support either `status` or legacy `state` from language files
  const status = ((it.status || it.state) || 'released').toLowerCase();
        // if wip, avoid navigating away by using '#' and mark as disabled for styling
        const href = status === 'wip' ? '#' : (it.href || '#');
        const disabledAttrs = status === 'wip' ? 'aria-disabled="true" class="disabled"' : '';
        return `<li><a href="${href}" data-preview-text="${pText}" data-preview-img="${pImg}" data-status="${status}" ${disabledAttrs}>${label}</a></li>`;
      }).join('');

      const bottomHtml = `
        <div class="phase-bottom">
          <ul>
            ${ulItems}
          </ul>
        </div>
      `;

      section.innerHTML = `<div class="phase-card">${topHtml}${bottomHtml}</div>`;
      wrapper.appendChild(section);
    });

    // Create a single preview card element (reused for all hovers)
    createPreviewCard();

      // Attach hover listeners for preview behavior and prevent clicks for wip
      document.querySelectorAll('.phase-bottom a').forEach(a => {
        const status = a.getAttribute('data-status') || 'released';
        a.addEventListener('mouseenter', (e) => {
          const el = e.currentTarget;
          const text = el.getAttribute('data-preview-text') || '';
          const img = el.getAttribute('data-preview-img') || '';
          showPreview(el, { text, img });
        });
        a.addEventListener('mousemove', (e) => {
          movePreview(e);
        });
        a.addEventListener('mouseleave', () => {
          hidePreview();
        });

        // If it's a WIP item, prevent navigation on click and keep it visibly disabled
        if (status === 'wip') {
          a.addEventListener('click', (ev) => {
            ev.preventDefault();
            // optionally, we could show a small tooltip/popover here — keep minimal for now
          });
        }
      });

  addScrollBehavior();
}

// Smooth scroll + parallax
function addScrollBehavior() {
  const cloud1 = document.querySelector('.cloud1');
  const cloud2 = document.querySelector('.cloud2');
  const cloud3 = document.querySelector('.cloud3');

  document.querySelectorAll('.timeline-node button').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.getAttribute('data-target'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    cloud1.style.transform = `translateY(${-scrolled * 0.1}px)`;
    cloud2.style.transform = `translateY(${-scrolled * 0.3}px)`;
    cloud3.style.transform = `translateY(${-scrolled * 0.7}px)`;
  });
}

// Preview card helpers
function createPreviewCard() {
  // if already exists, skip
  if (document.querySelector('.preview-card')) return;
  const card = document.createElement('div');
  card.className = 'preview-card';
  // include a small tag element inside the preview image container so we can show status
  card.innerHTML = `
    <div class="preview-img"><img src="" alt="preview" /><span class="tag"></span></div>
    <div class="preview-text"></div>
  `;
  document.body.appendChild(card);
}

function showPreview(anchorEl, { text = '', img = '' } = {}) {
  const card = document.querySelector('.preview-card');
  if (!card) return;
  const imgEl = card.querySelector('.preview-img img');
  const textEl = card.querySelector('.preview-text');
  const tagEl = card.querySelector('.preview-img .tag');
  imgEl.src = img;
  textEl.textContent = text;
  // set tag based on the anchor's data-status
  const status = (anchorEl.getAttribute('data-status') || 'released').toLowerCase();
  if (tagEl) {
    tagEl.textContent = status === 'wip' ? 'WIP' : 'Released';
    tagEl.className = 'tag ' + (status === 'wip' ? 'wip' : 'released');
  }
  // apply a class to the preview card so its background matches the link state
  card.classList.remove('wip', 'released');
  card.classList.add(status === 'wip' ? 'wip' : 'released');
  card.style.display = 'block';
  card.style.opacity = '1';
  // Position near the anchor
  const rect = anchorEl.getBoundingClientRect();
  const top = rect.top + window.scrollY - 10;
  const left = rect.right + 10 + window.scrollX;
  card.style.top = `${top}px`;
  card.style.left = `${left}px`;
}

function movePreview(e) {
  const card = document.querySelector('.preview-card');
  if (!card) return;
  const offsetX = 20;
  const offsetY = 10;
  card.style.top = `${e.clientY + window.scrollY + offsetY}px`;
  card.style.left = `${e.clientX + window.scrollX + offsetX}px`;
}

function hidePreview() {
  const card = document.querySelector('.preview-card');
  if (!card) return;
  card.style.opacity = '0';
  card.style.display = 'none';
  // remove state classes to reset styling
  card.classList.remove('wip', 'released');
}

// Language switcher (optional)
function switchLanguage(langCode) {
  currentLang = langCode === "en" ? langEN : langES;
  populatePage(currentLang);
}

// Initialize
populatePage(currentLang);
