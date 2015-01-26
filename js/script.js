$(document).ready(function(){
    $("[data-fancybox]").fancybox({
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $('.js-sticky').Stickyfill();

    $('.js-chosen-select').chosen({
        no_results_text: "К сожалению, ничего не найдено"
    });

    $(".js-validate").each(function(){
        $(this).validate({
            errorPlacement: function(error, element) {}
        });
    });
});

$(document).on('click', '[data-show-more]', function(){
    var currentElement = $(this);
    var url = $(this).data('show-more-url');
    var param = $(this).data('show-more-param');
    var target = $(this).data('show-more-target');
    var element = $(this).data('show-more-element');
    var result;

    currentElement.addClass('active');

    setTimeout(function(){
        $.ajax({
            url: url
        }).success(function(data) {
            console.log(data);
            result = data;
        }).done(function(result) {
            if (result) {
                var modifiedResult = $(result);
                modifiedResult.find(element).each(function(){
                    $(this).addClass('not-active');
                });
                $(target).append(modifiedResult);
                $(target).find(element).removeClass('not-active');
            }
        });

        currentElement.removeClass('active');
    }, 1000);

    return false;
});

$(document).on('click', '[data-scroll-to-tab]', function(){
    var tab = $(this).data('scroll-to-tab');
    $('body').scrollTo(tab, 500);
    $(tab).tab('show');
    return false;
});

$(document).on('click', '[data-show-form]', function(){
    var form = $(this).data('show-form');
    $(this).closest('.form-success-block').hide();
    $(form).slideDown();
    return false;
});

$(document).on('submit', '[data-show-form-success]', function(){
    var form = $(this);
    var actionUrl = form.attr('action');
    var formSuccess = $(this).data('show-form-success');
    var errorMsg = form.data('ajax-form-error-msg');

    if ( form.valid() ) {
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.find('select, textarea, input').serialize(),
            success: function(data) {
                if(data.error === false) {
                    $(formSuccess).slideDown();
                    form.hide();
                    form[0].reset();
                } else {
                    alert(errorMsg + " " + data.errorMessage);
                }
            }
        });
    }
    return false;
});

$(document).on('chosen:ready', '.js-chosen-select', function(){
    $(this).parent().removeClass('custom-select');
});

$(window).scroll(function(){
    $('[data-scroll-hide]').each(function() {
        function isScrolledIntoView(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }
        var element = $(this);
        var target = $(element.data('scroll-hide'));
        if (
            isScrolledIntoView(target) ||
            $(window).scrollTop() < $(target).offset().top
        ) {
            element.slideUp();
        } else {
            element.slideDown();
        }
    });
});