$(document).ready(function(){
    $("[data-fancybox]").fancybox({
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $('.sticky').Stickyfill();
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