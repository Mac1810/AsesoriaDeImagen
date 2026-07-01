# StyleAI — Asesoría de Imagen

Sitio web de 4 secciones (Inicio, Sobre Nosotros, Galería, Contacto) con navegación por pestañas y tracking de eventos vía Google Analytics 4.

## Estructura del proyecto

```
styleai-proyecto/
├── index.html          → Estructura y contenido del sitio
├── css/
│   └── styles.css      → Estilos (paleta, tipografía, layout)
├── js/
│   └── main.js         → Navegación entre secciones + eventos GA4
└── README.md
```

## Cómo verlo en Visual Studio Code

1. Descomprime la carpeta y ábrela en VS Code (`File > Open Folder`)
2. Instala la extensión **Live Server** (si no la tienes)
3. Clic derecho sobre `index.html` → **Open with Live Server**
4. Se abre en `http://127.0.0.1:5500` — navega entre las 4 pestañas para probar

## Google Analytics 4

El Measurement ID (`G-LGCKNBM5BL`) ya está configurado en el `<head>` de `index.html`. Eventos que se registran automáticamente:

| Evento | Cuándo se dispara |
|---|---|
| `page_view` | Al cambiar de pestaña (Inicio, Sobre Nosotros, Galería, Contacto) |
| `click_cta` | Al hacer clic en cualquier botón marcado con `data-ga-id` |
| `generate_lead` | Al hacer clic en "Enviar" del formulario de contacto |

**Importante:** estos eventos solo se registran en Analytics cuando el sitio corre en un servidor real (Live Server, GitHub Pages, etc.), no al abrir el `index.html` directamente con doble clic desde el explorador de archivos (`file://`), ya que los navegadores restringen ciertos scripts en ese modo.

## Desplegar en GitHub Pages (para compartir el link)

1. Crea un repositorio nuevo en GitHub y sube esta carpeta completa
2. Ve a **Settings → Pages**
3. En "Source", selecciona **Deploy from a branch**
4. Elige la rama `main` y la carpeta `/ (root)` → **Save**
5. Espera 1-2 minutos. Tu sitio quedará en:
   `https://tu-usuario.github.io/nombre-del-repo/`
6. Comparte ese link — cada visita quedará registrada en **Analytics → Informes → Tiempo real**

### Dominio propio (opcional)

Si quieres un dominio personalizado en vez de `github.io`:
1. Compra el dominio (Namecheap, GoDaddy, etc.)
2. En **Settings → Pages → Custom domain**, escribe tu dominio
3. En tu proveedor de DNS, agrega un registro `CNAME` apuntando a `tu-usuario.github.io`
4. Espera la propagación del DNS (puede tardar hasta 24h)
