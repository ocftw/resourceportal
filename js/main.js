/* main btn scroll */

$('.main_btns').children('button').each(function () {
	$(this).click(function mainBtnClick (){
        window.scroll({
          top: $('.main_conts:first').offset().top - $('#find_btn').innerHeight() - 50, 
          left: 0, 
          behavior: 'smooth' 
        });
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
	if ($(this).children('.popup.active').is(':hover')) {
		if ($(this).children('.popup.active').find('.popup_close').is(':hover')){
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

    var e = $(e);

    if (e.find('li:hover').length > 0) {
        return;
    }

    var win = window.open(e.attr('data-href'),'_blank');
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
        return;
    }

    $('#popup_wrap').addClass('active');
    $('#popup_feedback').addClass('active');

    /* get data */
    var feedback = $('#result_feedback');
    feedback.find('.tabs:first').empty();

    var name = e.find('h4:first').text();
    var img = e.find('img:first').attr('src');
    var rank = e.find('.stars:first').attr('data-rank');
    var from = e.find('.from:first').html();
    e.find('.tabs:first').children('li').each(function(){
        var tab = $(this).html();
        feedback.find('.tabs:first').append('<li>'+tab+'</li>');
    });
    feedback.find('h4:first').html(name);
    feedback.find('img:first').attr('src',img);
    feedback.find('.stars:first').attr('data-rank',rank);
    feedback.find('.from:first').html(from);
    feedback.find('h5:first').html(from);
    
};
function click_library(e) {
    $('#popup_wrap').addClass('active');
    $('#popup_feedback_library').addClass('active');

    /* get data */
    var e = $(e);
    var feedback = $('#library_feedback');

    var name = e.find('span:first').text();

    feedback.find('h4:first').html(name);
};

$('.summon_btn').each(function (){
	$(this).click(function(){
		$('#popup_wrap').addClass('active');
		$('#popup_summon').addClass('active');
        var question = $('input[name^="search"]').val();
        $('#question').val(question);
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
$('#wizard_form').find('input').each((function(){
    $(this).click(function(){
        $(this).parent().next().addClass('active');
    })
}))

$('#backtop_btn').click(function backToTop(){
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
})

/* form ajax */
/*
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
});*/

/* scroll menu */
window.addEventListener('scroll', function(e) {
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
    let scroll = {
        x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
        y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    };
    if(scroll.y > 50){
        $('header').eq(0).addClass("active");
        $('#backtop_btn').addClass("active")
    }else{
        $('header').eq(0).removeClass("active");
        $('#backtop_btn').removeClass("active")
    }
});

/* curated auto run */
var crt_auto

function crt_setTime(){
    crt_auto = window.setTimeout(function(){
        vm.active_question = (vm.active_question + 1) % vm.questions.length;
        crt_setTime();
    }, 5000);
}

crt_setTime();

$('#crt_sec').hover(function(){
    clearTimeout(crt_auto);
},function(){
    crt_setTime();
})
