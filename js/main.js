/* main section switch */

$('.main_btns').children('button').each(function () {
	$(this).click(function(){
		$('.main_conts:first').addClass('active');
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
		var now = "#" + $(this).attr('id').slice(0,-4) + "_cont";
		$(now).parent().children('.active').removeClass('active');
		$(now).addClass('active');
	})
})


/*
--select custom style--
Reference: http://jsfiddle.net/BB3JK/47/
*/

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

/* rank */
$('.rank_enable').each(function (){
	$(this).mousemove(function (){
		var x = event.pageX;
		var left = $(this).offset().left;
		var width = $(this).width();
	    var rank = Math.round( 5 * (x - left) / width )*20;
	    $(this).next('input[type=range]').val(rank/20);
	    $(this).children('.stars').css('width', rank + '%');
	});
});

/* popup close */
$('#popup_wrap').click(function(){
	if ($(this).children('.popup.active').is(":hover")) {
		if ($(this).children('.popup.active').find('.popup_close').is(":hover")){
			$(this).find('.active').removeClass('active');
			$(this).removeClass('active');
		}else{
			return;
		}
	}else {
		$(this).find('.active').removeClass('active');
		$(this).removeClass('active');
	}
});

/* result click pop */
function click_result(e) {
	$('#popup_wrap').addClass('active');
	$('#popup_feedback').addClass('active');
	var name = $(e).find('h4:first').text();
	$('#popup_feedback').find('h4:first').html(name);
};

$('.summon_btn').each(function (){
	$(this).click(function(){
		$('#popup_wrap').addClass('active');
		$('#popup_summon').addClass('active');
	})
})

/* answer */
$('.answer').each(function (){
	$(this).click(function(){
		$('#find_btn').click();
		var top = $('#find_cont').offset().top;
		$('html').stop().animate({scrollTop: top}, 600, 'swing');
		var question = $(this).prev('h4').text();
		$('#find_cont').find('input[name="search"]').val(question);
	})
})

/* wizard result */
$('#wizard_form').submit(function(){
	$(this).removeClass('active');
	$('#wizard_result').addClass('active');
})
$('#wizard_result').find('a.back:first').click(function(){
	$('#wizard_result').removeClass('active');
	$('#wizard_form').addClass('active');
})

$( document ).ready(function() {
    $("form").submit(function(e) {
        e.preventDefault(); // prevent page refresh

        $.ajax({
            type: "POST",
            url: "",
            data: $(this).serialize(), // serialize form data
            success: function(data) {
                // Success ...
            },
            error: function() {
                // Error ...
            }
        });
    });
});