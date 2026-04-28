//HEADER MENU
$(function () {
  const $body = $('body');
  const $menu = $('#headerMenu');
  const $openButton = $('.header__menu-open');
  const $closeButton = $('.header-menu__close');

  if (!$menu.length || !$openButton.length) {
    return;
  }

  const closeMenu = function () {
    const activeElement = document.activeElement;

    if (activeElement && $.contains($menu[0], activeElement)) {
      if ($openButton.is(':visible')) {
        $openButton.trigger('focus');
      } else {
        activeElement.blur();
      }
    }

    $menu.removeClass('is-active').attr('aria-hidden', 'true').attr('inert', '');
    $openButton.attr('aria-expanded', 'false');
    $body.removeClass('page--menu-open');
  };

  const openMenu = function () {
    $menu.removeAttr('inert').addClass('is-active').attr('aria-hidden', 'false');
    $openButton.attr('aria-expanded', 'true');
    $body.addClass('page--menu-open');
  };

  $menu.attr('inert', '');

  $openButton.on('click', openMenu);
  $closeButton.on('click', closeMenu);

  $menu.on('click', 'a', closeMenu);

  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  $(window).on('resize', function () {
    if (window.innerWidth > 1279) {
      closeMenu();
    }
  });
});

$(function () {
  const $slider = $('.loop');

  if (!$slider.length) {
    return;
  }

  $slider.owlCarousel({
    items: 1,
    margin: 5,
    center: false,
    loop: true,
    nav: true,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    smartSpeed: 650,
    navText: ['', ''],
    responsiveRefreshRate: 100,
    responsive: {
      768: {
        items: 2,
        margin: 16,
        center: false,
      },
      1440: {
        items: 3,
        margin: 18,
        center: true,
      },
    },
  });
});

//MOBILE CARD SLIDERS
$(function () {
  const $mobileSliders = $('.audience__list, .service__list');
  const breakpoint = 640;

  if (!$mobileSliders.length) {
    return;
  }

  const initMobileSliders = function () {
    $mobileSliders.each(function () {
      const $slider = $(this);
      const isInitialized = $slider.hasClass('owl-loaded');

      if (window.innerWidth <= breakpoint && !isInitialized) {
        $slider.addClass('owl-carousel').owlCarousel({
          items: 1,
          margin: 10,
          loop: false,
          nav: false,
          dots: true,
          mouseDrag: true,
          touchDrag: true,
          smartSpeed: 500,
          autoHeight: true,
        });
      }

      if (window.innerWidth > breakpoint && isInitialized) {
        $slider.trigger('destroy.owl.carousel');
        $slider.removeClass('owl-carousel owl-loaded owl-drag');
        $slider.find('.owl-stage-outer').children().unwrap();
      }
    });
  };

  initMobileSliders();
  $(window).on('resize', initMobileSliders);
});

//FORM

$(function () {
  const $form = $('#contactForm');

  if (!$form.length) {
    return;
  }

  $('input[name="phone"]').mask('+7 (999) 999-99-99');

  $form.validate({
    ignore: [],
    errorElement: 'div',
    errorClass: 'form__error-message',
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
      },
      site: {
        required: true,
        url: true,
      },
      policy: {
        required: true,
      },
    },
    messages: {
      name: {
        required: 'Обязательное поле',
      },
      phone: {
        required: 'Обязательное поле',
      },
      site: {
        required: 'Обязательное поле',
        url: 'Введите корректную ссылку',
      },
      policy: {
        required: '',
      },
    },
    errorPlacement: function (error, element) {
      const $field = element.closest('.form__field');
      const $checkbox = element.closest('.form__checkbox');

      if ($field.length) {
        $field.find('.form__error').html(error);
        return;
      }

      if ($checkbox.length) {
        return;
      }
    },
    highlight: function (element) {
      $(element).addClass('form__input--error');
    },
    unhighlight: function (element) {
      const $element = $(element);

      $element.removeClass('form__input--error');
      $element.closest('.form__field').find('.form__error').empty();
    },
    submitHandler: function () {
      alert('Форма отправлена');
      return false;
    },
  });
});

//FAQ
$(function () {
  const $faqList = $('.faq__list');

  if (!$faqList.length) {
    return;
  }

  $faqList.on('click', '.faq__item', function () {
    const $currentItem = $(this).closest('.faq__item');
    const isCurrentItemActive = $currentItem.hasClass('faq__item--active');

    $faqList.find('.faq__item--active').removeClass('faq__item--active');

    if (!isCurrentItemActive) {
      $currentItem.addClass('faq__item--active');
    }
  });
});
