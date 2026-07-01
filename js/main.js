/* ===== Puente de eventos hacia GA4 =====
   Dentro de Colab, invokeFunction llama a la función de Python que
   registramos con output.register_callback(), la cual manda el evento
   a GA4 vía Measurement Protocol (esquiva el bloqueo del iframe).
   Si el sitio se abre fuera de Colab (ej. GitHub Pages), usa gtag normal. */
function enviarEventoGA(nombre, params){
    params = params || {};
    if (window.google && google.colab && google.colab.kernel) {
        google.colab.kernel.invokeFunction('enviar_evento_ga', [nombre, params], {});
    } else if (typeof gtag === 'function') {
        gtag('event', nombre, params);
    } else {
        console.log('[GA4 dev]', nombre, params);
    }
}

function irA(pageId){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('#nav-list a').forEach(a=>{
        a.classList.toggle('active', a.dataset.page===pageId);
    });
    window.scrollTo({top:0,behavior:'smooth'});

    /* ===== Vista de página manual (GA4) =====
       Como las 4 secciones no recargan el navegador, GA4 no las detecta solas.
       Cada cambio de pestaña envía su propio page_view con una URL "virtual". */
    var titulos = {
        inicio:   'Inicio',
        nosotros: 'Sobre Nosotros',
        galeria:  'Galería',
        contacto: 'Contacto'
    };
    enviarEventoGA('page_view', {
        page_title: 'StyleAI · ' + (titulos[pageId] || pageId),
        page_location: window.location.href.split('#')[0] + '#' + pageId,
        page_path: '/' + pageId
    });
}
document.querySelectorAll('#nav-list a').forEach(link=>{
    link.addEventListener('click', ()=> irA(link.dataset.page));
});

/* ===== Tracking de clics GA4 (botones y CTAs) =====
   Cualquier elemento con data-ga-id envía un evento "click_cta" a GA4.
   El botón "Enviar" del formulario de contacto además dispara "generate_lead",
   el evento estándar de GA4 para captación de leads. */
document.querySelectorAll('[data-ga-id]').forEach(function(el){
    el.addEventListener('click', function(){
        var id = el.dataset.gaId;

        enviarEventoGA('click_cta', {
            event_category: 'CTA',
            event_label: id,
            page_location: document.querySelector('.page.active') ? document.querySelector('.page.active').id : 'inicio'
        });

        if (id === 'contacto_enviar') {
            enviarEventoGA('generate_lead', {
                event_category: 'Formulario',
                event_label: 'contacto_enviar',
                form_name: 'Formulario de contacto'
            });
        }
    });
});
