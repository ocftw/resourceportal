$('.main_btns').children('button').each(function () {
	$(this).click(function(){
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
		var now = "#" + $(this).attr('id').slice(0,-4) + "_cont";
		$(now).parent().find('.active').removeClass('active');
		$(now).addClass('active');
	})
})