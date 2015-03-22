$(document).ready(function() {
    $('.content .page-content .select-button').on('click', function() {
        $('.content .page-content .select-city').trigger('click');
    });

    if($('.helper .steps')) stepsClick();
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