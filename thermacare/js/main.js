$(document).ready(function() {

    if( $('#search-form').length > 0 )
    {
        var obj = $('#search-form').nextAll();
        if(obj.html().indexOf('no results') > 0)
        {
            obj.empty().append("<div class='bold-title'>По вашему запросу ничего не найдено.</div><ul><li>Проверьте правописание. Все ли верно указано в вашем запросе?</li><li>Попробуйте использовать синонимы. Возможно то, что вы ищете, записано иначе.</li><li>Попробуйте изменить условия поиска, вводя более обобщенные понятия.</li><li>Воспользуйтесь <a href='/content/%D0%BA%D0%B0%D1%80%D1%82%D0%B0-%D1%81%D0%B0%D0%B9%D1%82%D0%B0'>картой сайта</a>.</li></ul>");
        }
    }

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
    $('.mobile-nav-btn').on('click touchstart', function(e){
        e.preventDefault();
        $(this).closest('.main-nav').show();
    });
    $('.testForm').on('submit', function(e) {
        e.preventDefault();
        $('label', this).removeClass('active');
        $('.result', this).hide();
        var temp = 0;

        $('input[type="radio"]', this).each(function(i){
            if($(this).is(':checked')) temp ++;
        });
        if(temp == 9) {
            $('input[type="radio"]', this).each(function(){
                if($(this).is(':checked')) {
                    $(this).closest('label').addClass('active');
                }
            });
            $('.result', this).fadeIn();
        }
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
