$(document).ready(function() {
    var clicked = '';
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

   /* $('.main-nav .sub').on('click', function(e) {
        e.preventDefault();
        $(this).show();
    });
*/
    $('.main-nav .sub').on('touchstart', function(e){
        e.preventDefault();
        $('.main-nav ul').hide();
        $(this).parent().find('ul').show();

        if(clicked == $(this).attr('href')) {
            location.href = $(this).attr('href');
        }
        else {
            clicked = $(this).attr('href');
        }
    });
    $('.testForm').on('submit', function(e) {
        e.preventDefault();
        $('label', this).removeClass('active');
        $('.result', this).hide();
        var temp = false;

        $('input[type="radio"]', this).each(function(){
            if($(this).is(':checked')) {
                $(this).closest('label').addClass('active');
                temp = true;
            }
            else {
                temp = false;
                return false;
            }
        });
        if(temp) $('.result', this).fadeIn();
        else alert('Вы не ответили на все вопросы теста.');
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
}).on('change', '.select-city select', function() {
    var num = $(this).val();
    $('.stores').fadeOut(function() {
        $('.stores.store-' + num).fadeIn();
    });
});

function stepsClick() {
    var index = $('.helper .steps .active').index() + 1;
    $('.helper .info').hide();
    $('.helper .info-' + index).show();
}
