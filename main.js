/* ============================================================
   AXIOM SYSTEMS V2 — Animations
   Lenis smooth scroll + GSAP ScrollTrigger
   ============================================================ */

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ========================
// LENIS SMOOTH SCROLL
// ========================
const lenis = new Lenis({
  duration: 1.25,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
})

// ========================
// GSAP SETUP
// ========================
gsap.registerPlugin(ScrollTrigger)

// Wire Lenis into GSAP ticker (single RAF — no double tick)
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0, 0)

// ========================
// INIT ON DOM READY
// ========================
document.addEventListener('DOMContentLoaded', () => {
  initExitIntent()
  initSmoothAnchorLinks()
  initCursor()
  initFloatingPaths()
  initHero()
  initRobot()
  initNav()
  initServices()
  initBentoSpotlight()
  initBentoLinks()
  initStats()
  initProcess()
  initEngagement()
  initSectionHeads()
  initFeatureSplits()
  initFaq()
  initWhoWeServe()
  initScrollShowcase()
  initClientResult()
  initCTA()
  initBlogCards()
})

// ========================
// BLOG CARDS REVEAL
// ========================
function initBlogCards() {
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-blog-card]').forEach(el => {
      el.style.opacity = 1
    })
    return
  }

  gsap.utils.toArray('[data-blog-card]').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
        }
      }
    )
  })
}

// ========================
// SMOOTH ANCHOR NAVIGATION
// ========================
function initSmoothAnchorLinks() {
  const easingFn = t => t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const target = document.querySelector(href)
      if (!target) return

      e.preventDefault()

      // Duration scales with distance so pace feels consistent
      const distance = Math.abs(target.getBoundingClientRect().top)
      const duration = Math.min(3.4, Math.max(1.2, distance / 900))
      lenis.scrollTo(target, { offset: -80, duration, easing: easingFn })
    })
  })
}

// ========================
// CURSOR GLOW
// ========================
function initCursor() {
  const cursor = document.getElementById('cursorGlow')
  if (!cursor || prefersReducedMotion) {
    if (cursor) cursor.style.display = 'none'
    return
  }

  document.addEventListener('mousemove', e => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.65,
      ease: 'power2.out',
    })
  })

  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 })
  })

  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.3 })
  })
}

// ========================
// HERO ENTRANCE
// ========================
// ========================
// FLOATING BACKGROUND PATHS
// ========================
function initFloatingPaths() {
  const container = document.getElementById('heroPaths')
  if (!container || prefersReducedMotion) return

  const NS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('viewBox', '0 0 696 316')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('aria-hidden', 'true')

  // Two mirrored layers: position 1 (cyan) and position -1 (blue)
  const layers = [
    { position: 1,  color: '143,245,255' },  // --cyan
    { position: -1, color: '102,157,255' },  // --blue
  ]

  layers.forEach(({ position, color }) => {
    for (let i = 0; i < 36; i++) {
      const p = 380 - i * 5 * position
      const q = 189 + i * 6
      const r = 312 - i * 5 * position
      const s = 216 - i * 6
      const t = 152 - i * 5 * position
      const u = 343 - i * 6
      const v = 616 - i * 5 * position
      const w = 470 - i * 6
      const x = 684 - i * 5 * position
      const y = 875 - i * 6

      const d = `M-${p} -${q}C-${p} -${q} -${r} ${s} ${t} ${u}C${v} ${w} ${x} ${y} ${x} ${y}`

      const opacityLo = +(0.03 + i * 0.008).toFixed(3)
      const opacityHi = +(0.06 + i * 0.016).toFixed(3)
      const width     = +(0.5  + i * 0.03).toFixed(2)
      const dur       = (20 + (i % 7) * 1.8 + (position === -1 ? 3.5 : 0)).toFixed(1)
      const delay     = (-(i * 0.6 + (position === -1 ? 10 : 0))).toFixed(1)

      const path = document.createElementNS(NS, 'path')
      path.setAttribute('d', d)
      path.setAttribute('stroke', `rgba(${color},1)`)
      path.setAttribute('stroke-width', width)
      path.setAttribute('pathLength', '1')
      path.style.setProperty('--path-dur',        `${dur}s`)
      path.style.setProperty('--path-delay',      `${delay}s`)
      path.style.setProperty('--path-opacity-lo', opacityLo)
      path.style.setProperty('--path-opacity-hi', opacityHi)

      svg.appendChild(path)
    }
  })

  container.appendChild(svg)
}

function initHero() {
  if (prefersReducedMotion) {
    gsap.set(['.hero__label', '.hero__sub', '.hero__cta', '.hero__scroll-hint', '.hero__robot'], { opacity: 1 })
    gsap.set('.hero__line', { y: '0%' })
    return
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power4.out' },
    delay: 0.1,
  })

  tl.fromTo('.hero__label',
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 }
  )
  .fromTo('.hero__line',
    { y: '105%' },
    { y: '0%', duration: 1.05, stagger: 0.1 },
    '-=0.35'
  )
  .fromTo('.hero__sub',
    { y: 22, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    '-=0.55'
  )
  .fromTo('.hero__cta',
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    '-=0.5'
  )
  .fromTo('.hero__scroll-hint',
    { opacity: 0 },
    { opacity: 1, duration: 0.6 },
    '-=0.3'
  )
  .fromTo('.hero__robot',
    { x: 40, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
    0.3
  )

  // Orb parallax on scroll
  gsap.to('.hero__orb--1', {
    y: -140,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    }
  })

  gsap.to('.hero__orb--2', {
    y: -90,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  })
}

// ========================
// EXIT INTENT SLIDE-IN
// ========================
function initExitIntent() {
  const el = document.getElementById('exitIntent')
  const form = document.getElementById('exitIntentForm')
  const closeBtn = document.getElementById('exitIntentClose')
  const dismissLink = document.getElementById('exitIntentDismiss')
  if (!el) return

  const DISMISS_KEY = 'vornela_exit_dismissed'
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwbHmDh-ep430j8QlbDThqFMKXHi_clLHe_5bz80D809HCC3IAvQjI4QL1ztW9a3xk_oA/exec'

  const dismissed = localStorage.getItem(DISMISS_KEY)
  if (dismissed && Date.now() - Number(dismissed) < SEVEN_DAYS) return
  if (sessionStorage.getItem('vornela_audit_submitted')) return

  let triggered = false

  function show() {
    if (triggered) return
    triggered = true
    el.setAttribute('aria-hidden', 'false')
    el.classList.add('visible')
  }

  function hide() {
    el.classList.remove('visible')
    el.setAttribute('aria-hidden', 'true')
    localStorage.setItem(DISMISS_KEY, String(Date.now()))
  }

  document.addEventListener('mouseleave', e => {
    if (e.clientY < 20) show()
  })

  closeBtn.addEventListener('click', hide)
  dismissLink.addEventListener('click', hide)

  form.addEventListener('submit', async e => {
    e.preventDefault()
    const btn = form.querySelector('.exit-intent__btn')
    btn.disabled = true
    btn.textContent = 'Sending…'
    const payload = Object.fromEntries(new FormData(form))
    payload.formType = 'exit-intent'
    try {
      await fetch(ENDPOINT, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const success = document.createElement('div')
      success.className = 'exit-intent__success'
      const strong = document.createElement('strong')
      strong.textContent = 'Got it — we’ll be in touch.'
      const p = document.createElement('p')
      p.textContent = 'Check your inbox within 24 hours.'
      success.appendChild(strong)
      success.appendChild(p)
      form.replaceWith(success)
      sessionStorage.setItem('vornela_audit_submitted', '1')
      setTimeout(hide, 3000)
    } catch (_) {
      btn.disabled = false
      btn.textContent = 'Get the Free Audit'
    }
  })
}

// ========================
// NAV SCROLL EFFECT
// ========================
function initNav() {
  gsap.to('.nav', {
    backgroundColor: 'rgba(14, 14, 15, 0.92)',
    scrollTrigger: {
      trigger: 'body',
      start: '80px top',
      end: '140px top',
      scrub: true,
    }
  })
}

// ========================
// BENTO CARD LINKS
// ========================
function initBentoLinks() {
  document.querySelectorAll('.bento-card[data-href]').forEach(card => {
    card.style.cursor = 'pointer'
    card.addEventListener('click', e => {
      if (e.target.closest('a, button')) return
      window.location.href = card.dataset.href
    })
  })
}

// ========================
// BENTO SPOTLIGHT BORDER
// ========================
function initBentoSpotlight() {
  if (prefersReducedMotion) return

  document.querySelectorAll('.bento-card').forEach(card => {
    const isBlue = card.querySelector('.bento-card__glow--blue') !== null
    card.style.setProperty('--spotlight-color',
      isBlue ? 'rgba(102, 157, 255, 0.45)' : 'rgba(143, 245, 255, 0.45)')

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    })

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '-500px')
      card.style.setProperty('--mouse-y', '-500px')
    })
  })
}

// ========================
// SERVICES BENTO REVEAL
// ========================
function initServices() {
  if (prefersReducedMotion) {
    gsap.set('.service-card', { opacity: 1 })
    return
  }

  gsap.fromTo('.service-card',
    { y: 52, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: {
        amount: 0.5,
        from: 'start',
      },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.bento',
        start: 'top 80%',
      }
    }
  )
}

// ========================
// STATS COUNTERS
// ========================
function initStats() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.stat__num').forEach(el => {
      el.innerText = el.getAttribute('data-target')
    })
    gsap.set('.stat-item', { opacity: 1 })
    return
  }

  document.querySelectorAll('.stat__num').forEach((el, i) => {
    const target = parseInt(el.getAttribute('data-target'), 10)

    // Fade in stat item
    gsap.fromTo(el.closest('.stat-item'),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats',
          start: 'top 82%',
        }
      }
    )

    // Counter
    gsap.fromTo(el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2.2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: '.stats',
          start: 'top 82%',
        }
      }
    )
  })
}

// ========================
// CLIENT RESULT COUNTERS
// ========================
function initClientResult() {
  const els = document.querySelectorAll('[data-cr-target]')
  if (!els.length) return

  if (prefersReducedMotion) {
    els.forEach(el => {
      const suffix = el.getAttribute('data-cr-suffix') || ''
      el.innerText = el.getAttribute('data-cr-target') + suffix
    })
    return
  }

  els.forEach((el, i) => {
    const target = parseInt(el.getAttribute('data-cr-target'), 10)
    const suffix = el.getAttribute('data-cr-suffix') || ''

    gsap.fromTo(el.closest('.cr-stat'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.client-result', start: 'top 82%' } }
    )

    const proxy = { val: 0 }
    gsap.fromTo(proxy, { val: 0 }, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate() { el.innerText = Math.round(proxy.val) + suffix },
      scrollTrigger: { trigger: '.client-result', start: 'top 82%' }
    })
  })
}

// ========================
// PROCESS STEPS
// ========================
function initProcess() {
  if (prefersReducedMotion) {
    gsap.set('.process-step', { opacity: 1 })
    return
  }

  gsap.fromTo('.process-step',
    { x: -44, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process__steps',
        start: 'top 78%',
      }
    }
  )
}

// ========================
// ENGAGEMENT TIMELINE REVEALS
// ========================
function initEngagement() {
  if (prefersReducedMotion) return

  gsap.utils.toArray('.eng-phase').forEach((phase, i) => {
    gsap.fromTo(phase,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: phase, start: 'top 88%' }
      }
    )
  })

  const gantt = document.querySelector('.eng-gantt-wrap')
  if (gantt) {
    gsap.fromTo(gantt,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: gantt, start: 'top 88%' } }
    )
  }

  gsap.utils.toArray('.partners__layer').forEach((layer, i) => {
    gsap.fromTo(layer,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
        delay: i * 0.08,
        scrollTrigger: { trigger: layer, start: 'top 88%' }
      }
    )
  })
}

// ========================
// SECTION HEADER REVEALS
// ========================
function initSectionHeads() {
  if (prefersReducedMotion) return

  gsap.utils.toArray('.section-head').forEach(el => {
    gsap.fromTo(el,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
        }
      }
    )
  })
}

// ========================
// ROBOT — CURSOR EYE TRACKING
// ========================
function initRobot() {
  const leftPupil  = document.getElementById('robotLeftPupil')
  const rightPupil = document.getElementById('robotRightPupil')
  const robotSvg   = document.querySelector('.robot-svg')
  if (!leftPupil || !rightPupil || !robotSvg || prefersReducedMotion) return

  const eyes = [
    { el: leftPupil,  bx: 73,  by: 76 },
    { el: rightPupil, bx: 127, by: 76 },
  ]

  const MAX_TRAVEL = 4.5

  document.addEventListener('mousemove', e => {
    const rect = robotSvg.getBoundingClientRect()
    if (rect.width === 0) return

    const scaleX = 200 / rect.width
    const scaleY = 300 / rect.height

    eyes.forEach(({ el, bx, by }) => {
      const svgCursorX = (e.clientX - rect.left) * scaleX
      const svgCursorY = (e.clientY - rect.top)  * scaleY

      const dx    = svgCursorX - bx
      const dy    = svgCursorY - by
      const angle = Math.atan2(dy, dx)
      const dist  = Math.min(Math.hypot(dx, dy), MAX_TRAVEL)

      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist

      gsap.to(el, {
        attr: { transform: `translate(${tx}, ${ty})` },
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
  })

  document.addEventListener('mouseleave', () => {
    eyes.forEach(({ el }) => {
      gsap.to(el, { attr: { transform: 'translate(0, 0)' }, duration: 0.6, ease: 'elastic.out(1,0.5)' })
    })
  })
}

// ========================
// CTA REVEAL
// ========================
// ========================
// FEATURE SPLIT SECTIONS
// ========================
function initFeatureSplits() {
  document.querySelectorAll('.feature-split').forEach(section => {
    const text     = section.querySelector('[data-fs-text]')
    const mainCard = section.querySelector('[data-fs-main]')
    const bgCard   = section.querySelector('[data-fs-bg]')

    if (prefersReducedMotion) {
      if (text) gsap.set(text, { opacity: 1 })
      if (mainCard) gsap.set(mainCard, { opacity: 1 })
      if (bgCard) gsap.set(bgCard, { opacity: 1 })
      return
    }

    if (text) {
      gsap.fromTo(text,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%' } }
      )
    }

    // Main card slides down into place
    if (mainCard) {
      gsap.fromTo(mainCard,
        { y: -20, opacity: 0 },
        { y: 30, opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 78%' } }
      )
    }

    // BG card slides up — opposite direction creates depth separation
    if (bgCard) {
      gsap.fromTo(bgCard,
        { y: 20, opacity: 0 },
        { y: -20, opacity: 0.88, duration: 1.2, ease: 'power2.out', delay: 0.08,
          scrollTrigger: { trigger: section, start: 'top 78%' } }
      )
    }
  })
}

function initFaq() {
  document.querySelectorAll('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item')
      const answer = item.querySelector('.faq__a')
      const isOpen = btn.getAttribute('aria-expanded') === 'true'

      document.querySelectorAll('.faq__q[aria-expanded="true"]').forEach(open => {
        if (open !== btn) {
          open.setAttribute('aria-expanded', 'false')
          const a = open.closest('.faq__item').querySelector('.faq__a')
          a.classList.remove('is-open')
        }
      })

      btn.setAttribute('aria-expanded', String(!isOpen))
      answer.removeAttribute('hidden')
      answer.classList.toggle('is-open', !isOpen)
    })
  })
}

function initWhoWeServe() {
  const BIZ  = ['startup', 'sole trader', 'growing SME', 'enterprise team', 'new business']
  const LOCS = ['Dublin', 'London', 'New York', 'Cork', 'Belfast', 'Chicago']

  function clearEl(el) {
    while (el.firstChild) el.removeChild(el.firstChild)
  }

  function showWord(el, word, instant) {
    const span = document.createElement('span')
    span.className = instant ? 'tc-word tc-word--instant' : 'tc-word'
    span.textContent = word
    clearEl(el)
    el.appendChild(span)
  }

  function startCycle(el, words, interval, startOffset) {
    if (!el) return
    let idx = 0
    showWord(el, words[0], true)

    function tick() {
      const cur = el.querySelector('.tc-word')
      if (!cur) return
      cur.classList.add('tc-word--out')
      setTimeout(() => {
        idx = (idx + 1) % words.length
        showWord(el, words[idx], false)
        setTimeout(tick, interval)
      }, 300)
    }

    setTimeout(tick, interval + startOffset)
  }

  startCycle(document.getElementById('wwsBiz'), BIZ,  2800, 0)
  startCycle(document.getElementById('wwsLoc'), LOCS, 2600, 500)

  if (prefersReducedMotion) return

  const section = document.querySelector('.wws')
  if (!section) return

  gsap.fromTo('[data-wws-headline]',
    { y: 32, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 82%' } }
  )
  gsap.fromTo('[data-wws-tags]',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.18,
      scrollTrigger: { trigger: section, start: 'top 82%' } }
  )
}


function initCTA() {
  if (prefersReducedMotion) {
    gsap.set('.cta__inner', { opacity: 1 })
    return
  }

  gsap.fromTo('.cta__inner',
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta',
        start: 'top 80%',
      }
    }
  )
}

// ========================
// SCROLL SHOWCASE — 3D tilt + arrow navigation
// ========================
function initScrollShowcase() {
  const section    = document.querySelector('.scroll-showcase')
  const card       = document.querySelector('[data-showcase-card]')
  const header     = document.querySelector('[data-showcase-header]')
  const slides     = document.querySelectorAll('.showcase-slide')
  const metaSlides = document.querySelectorAll('.showcase-meta__slide')
  const counter    = document.querySelector('.showcase-counter__cur')
  const btnPrev    = document.querySelector('[data-reel-prev]')
  const btnNext    = document.querySelector('[data-reel-next]')
  if (!section || !card) return

  // Header entry reveal
  gsap.fromTo(header,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 80%' } }
  )

  if (prefersReducedMotion) {
    gsap.set(card, { rotateX: 0, scale: 1 })
  } else {
    // 3D tilt scrub: card flattens as it scrolls into the viewport
    gsap.fromTo(card,
      { rotateX: 30, scale: 1.12 },
      {
        rotateX: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 10%',
          scrub: 1.8,
        }
      }
    )
  }

  // Arrow slide navigation
  let current = 0
  const total = slides.length

  function goTo(index) {
    const prev = current
    current = ((index % total) + total) % total
    if (current === prev) return

    slides[prev].classList.remove('active')
    slides[current].classList.add('active')
    metaSlides[prev]?.classList.remove('active')
    metaSlides[current]?.classList.add('active')
    if (counter) counter.textContent = String(current + 1).padStart(2, '0')

    slides[current].querySelector('video')?.play().catch(() => {})
    const prevVideo = slides[prev].querySelector('video')
    if (prevVideo) setTimeout(() => { prevVideo.pause(); prevVideo.currentTime = 0 }, 750)
  }

  btnPrev?.addEventListener('click', () => goTo(current - 1))
  btnNext?.addEventListener('click', () => goTo(current + 1))

  // Ensure first slide's video is playing on init
  slides[0]?.querySelector('video')?.play().catch(() => {})
}


// ========================
// FORM SUBMIT HANDLER
// ========================
function handleFormSubmit(e) {
  e.preventDefault()
  const btn = e.target.querySelector('button')
  const input = e.target.querySelector('input')
  const original = btn.textContent

  btn.textContent = 'Sent!'
  btn.style.background = 'linear-gradient(135deg, #00deec, #00a86b)'
  input.value = ''

  setTimeout(() => {
    btn.textContent = original
    btn.style.background = ''
  }, 3000)
}
