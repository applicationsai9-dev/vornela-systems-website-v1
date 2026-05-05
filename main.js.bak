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
  initSmoothAnchorLinks()
  initCursor()
  initHero()
  initRobot()
  initNav()
  initServices()
  initBentoSpotlight()
  initBentoLinks()
  initStats()
  initProcess()
  initWork()
  initSectionHeads()
  initCTA()
})

// ========================
// SMOOTH ANCHOR NAVIGATION
// ========================
// workST and workTrack are set by initWork() so nav can interact with the pin
let workST = null
let workTrack = null

function initSmoothAnchorLinks() {
  const easingFn = t => t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2  // ease-in-out cubic

  // Reset the work track cleanly — syncs both visual state AND scrub tween internal state
  const resetWorkTrack = () => {
    if (workST && workST.animation) {
      workST.animation.progress(0)
    } else if (workTrack) {
      gsap.set(workTrack, { x: 0 })
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      const target = document.querySelector(href)
      if (!target) return

      e.preventDefault()

      const currentY = window.scrollY
      const inWorkPin = workST && currentY >= workST.start && currentY <= workST.end

      // Clicking "Work" — always land at the START of the pinned section (first card)
      if (href === '#work') {
        const dest = workST ? workST.start : target.offsetTop
        resetWorkTrack()

        // Coming from below the pin — bypass the scrub range by jumping to just
        // above Work, then smooth scroll the final stretch in cleanly
        if (workST && currentY > workST.end) {
          lenis.scrollTo(dest - 200, { duration: 0 })
          requestAnimationFrame(() => {
            lenis.scrollTo(dest, { duration: 0.8, easing: easingFn })
          })
          return
        }

        lenis.scrollTo(dest, { duration: 1.4, easing: easingFn })
        return
      }

      // Navigating away while horizontally scrolled within the work pin
      if (inWorkPin) {
        resetWorkTrack()
        // Jump scroll position to work section start (no animation)
        lenis.scrollTo(workST.start, { duration: 0 })
        // On next frame, smoothly scroll to destination
        requestAnimationFrame(() => {
          lenis.scrollTo(target, { offset: -80, duration: 1.4, easing: easingFn })
        })
        return
      }

      // Normal navigation — duration scales with distance so pace feels consistent
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
// SELECTED WORK — HORIZONTAL SCROLL
// ========================
function initWork() {
  if (prefersReducedMotion) return

  workTrack = document.querySelector('.work__track')
  if (!workTrack) return

  gsap.matchMedia().add('(min-width: 900px)', () => {
    const getScrollDist = () => workTrack.scrollWidth - window.innerWidth + 60

    workST = ScrollTrigger.create({
      trigger: '.work',
      start: 'top top',
      end: () => `+=${getScrollDist()}`,
      scrub: 1.2,
      pin: true,
      invalidateOnRefresh: true,
      animation: gsap.to(workTrack, {
        x: () => -getScrollDist(),
        ease: 'none',
      }),
    })

    return () => { workST = null }
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
