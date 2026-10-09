import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { JSDOM } from 'jsdom'

const SITIO = '_site' // la carpeta que arma el job build
let html
let doc

beforeAll(() => {
  html = readFileSync(`${SITIO}/index.html`, 'utf-8')
  doc = new JSDOM(html).window.document
})

// ---- Pruebas base de la guía ----
describe('index.html', () => {
  it('tiene un título', () => {
    expect(doc.title.trim()).not.toBe('')
  })

  it('muestra mi nombre en el h1', () => {
    expect(doc.querySelector('h1')?.textContent).toContain('Marco Yataco')
  })

  it('todas las imágenes tienen texto alternativo', () => {
    const sinAlt = [...doc.querySelectorAll('img')].filter((img) => !img.getAttribute('alt'))
    expect(sinAlt).toHaveLength(0)
  })

  it('los archivos locales que usa la página existen', () => {
    const rutas = [...doc.querySelectorAll('script[src], link[rel="stylesheet"], img[src]')]
      .map((el) => el.getAttribute('src') ?? el.getAttribute('href'))
      .filter((ruta) => !/^(https?:)?\/\//.test(ruta)) // ignora lo que viene de Internet
    for (const ruta of rutas) {
      expect(existsSync(`${SITIO}/${ruta}`), `falta ${ruta}`).toBe(true)
    }
  })
})

describe('el sitio que se publica', () => {
  it('no incluye archivos internos del repositorio', () => {
    for (const interno of ['compose.yaml', '.env.example', 'api', 'db', 'tests']) {
      expect(existsSync(`${SITIO}/${interno}`), `${interno} no debería publicarse`).toBe(false)
    }
  })
})

// ---- Mis pruebas ----
describe('pruebas propias', () => {
  it('el libro de visitas tiene un formulario con los campos nombre y mensaje', () => {
    const seccion = doc.querySelector('section#libro-de-visitas')
    expect(seccion, 'falta la sección #libro-de-visitas').not.toBeNull()
    expect(seccion.querySelector('form input[name="nombre"]')).not.toBeNull()
    expect(seccion.querySelector('form textarea[name="mensaje"]')).not.toBeNull()
  })

  it('los campos del formulario respetan los límites de la API (60 y 280)', () => {
    expect(doc.querySelector('input[name="nombre"]')?.getAttribute('maxlength')).toBe('60')
    expect(doc.querySelector('textarea[name="mensaje"]')?.getAttribute('maxlength')).toBe('280')
  })

  it('declara lang="es", charset y viewport', () => {
    expect(doc.documentElement.getAttribute('lang')).toBe('es')
    expect(doc.querySelector('meta[charset]')).not.toBeNull()
    expect(doc.querySelector('meta[name="viewport"]')).not.toBeNull()
  })

  it('hay un solo h1 y los títulos no saltan de nivel', () => {
    expect(doc.querySelectorAll('h1')).toHaveLength(1)
    const niveles = [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]))
    for (let i = 1; i < niveles.length; i++) {
      expect(niveles[i] - niveles[i - 1], `salto de h${niveles[i - 1]} a h${niveles[i]}`).toBeLessThanOrEqual(1)
    }
  })

  it('el sitio no apunta a localhost ni a rutas de mi máquina', () => {
    expect(html).not.toMatch(/localhost|127\.0\.0\.1/)
    expect(html).not.toMatch(/[A-Za-z]:\\/)
  })
})