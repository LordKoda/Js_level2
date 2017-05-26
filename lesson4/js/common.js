
(function($){
	$.fn.tabsPlugin = function(options) { 

		options = $.extend({ //стандартные опции плагина
			duration : 500, //скорость перехода
			easing: 'linear' //timing-function перехода
		}, options);

		var showTabs = function(){ //оснвоная функция плагина

			var ths = $(this); 

			$(ths).find('.tbs_content div:first').show(100); //отображаем первую в списке вкладку
			//вешаем событие на ярлыки вкладок
			$(ths).on('click', 'li', function(event){ //функция показа/скрытия вкладок
				event.preventDefault();

				var showTabsName = $(this).children().attr('href'); //связываемый ярклык вкладки и и саму вкладку
				var hideTabsName = $(ths).find('li.active').children().attr('href');//переменная с активной в данный момент вкладкой

				$(ths).find('li.active').removeClass('active');//деактивируем вкладку
				$(this).addClass('active');//активируем новую

				$(hideTabsName).fadeOut(options.duration,options.easing);//скрываем вкладку
				$(showTabsName).fadeIn(options.duration,options.easing);//показываем вкладку
			});
		};
		return this.each(showTabs);
	};
})(jQuery);

//два разных блока с вкладками
$('#tbs_section').tabsPlugin({//меняем стандартные опции для примера
	duration: 'slow',
	easing: 'swing'
});

$('#tbs_section_new').tabsPlugin();

