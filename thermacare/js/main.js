$(document).ready(function() {
    $('.content .page-content .select-button').on('click', function() {
        $('.content .page-content .select-city').trigger('click');
    });

    if($('.helper .steps')) stepsClick();

    $('.share-btn').on('click', function(e) {
        e.preventDefault();
        $('.popup').fadeIn();
    });
    $('.popup .close').on('click', function(e) {
        e.preventDefault();
        $('.popup').fadeOut();
    });


    $('.testForm').on('submit', function(e) {
        e.preventDefault();
        $('label', this).removeClass('active');
        $('.result', this).hide();
        var temp = false;

        $('input[type="checkbox"]', this).each(function(){
            if($(this).is(':checked')) {
                $(this).closest('label').addClass('active');
                temp = true;
            }
        });
        if(temp) $('.result', this).fadeIn();
        else alert('Ответьте на вопросы.');
    });

}).on('click', '.helper .steps li', function() {
    $('.helper .steps li').removeClass('active');
    $(this).addClass('active');
    stepsClick();
}).on('click', '.content .faq li.active', function() {
    $('.content .faq li').removeClass('active').addClass('closed');
}).on('click', '.content .faq li.closed', function() {
    $('.content .faq li').removeClass('active').addClass('closed');
    $(this).removeClass('closed').addClass('active');
    var heightTemp = $('.answer', this).height();

    $('.answer', this).css({
        height: 0,
        paddingTop: 0,
        paddingBottom: 0
    }).animate({
        height: heightTemp,
        paddingTop: '15px',
        paddingBottom: '15px'
    }, 500);
});

function stepsClick() {
    var index = $('.helper .steps .active').index() + 1;
    $('.helper .info').hide();
    $('.helper .info-' + index).show();
}
