$('body').append('<div id="verstka" style="font-size: 12px; position: fixed; top: 0; right: 0; background: #fff; border: 1px solid #cecece; box-shadow: 2px 3px 10px #808080; padding: 15px; z-index: 999;"><a id="close" style="cursor:pointer;">x</a> Страницы верстки:<br />' +
'1. <a href="index.html">Главная</a><br />' +
'2. <a href="agent.html">Страница агента</a><br />' +
'3. <a href="howto.html">Как создать страницу</a><br />' +
'</div>');
$('#close').click(function(e) {
    $('#verstka').hide();
    e.preventDefault();
});