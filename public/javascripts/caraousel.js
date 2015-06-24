//widget



$.widget('snapdeal.searchbox', {
    //default options
    options: {
        placeholder: "Please type in the product name",
        buttonText: "search",
        minKeywords: 2,
        validateKeywords: $.noop
    },

    // the constructor
    _create: function() {
        var _self = this;
        var $element = $(this.element);
        $element.append($('<div id="search-widget" class="col-xs-12"><input  class="col-xs-8" placeholder="' + this.options.placeholder + '" type="text" id="searchbox"> <button id="search-button" class="col-xs-2 btn btn-primary">' + this.options.buttonText + '</button></div>'));
        $element.on('click', '#search-button', function(event) {
            if ($.isFunction(_self.options.searchCallback)) {
                var $searchbox = $(this).siblings('#searchbox');
                var searchValue = $searchbox.val();
                if ($.isFunction(_self.options.validateKeywords)) {
                    if (_self.options.validateKeywords(event, searchValue))
                        _self.options.searchCallback(event, searchValue)
                    else {
                        $searchbox.css({
                            'border': 'red 2px solid'
                        });
                    }
                }

            }
        })

        $element.on('keydown', '#searchbox', function(event) {
            var currentTarget = event.currentTarget || event.srcElement;
            if ($(currentTarget).val().length > _self.options.minKeywords) {
                //to do ajax call and the logic to stop previous ajax within debounce limits
            }
        })
    },
    // called when created, and later when changing options
    _refresh: function() {

    },

    // a public method to change the color to a random value
    // can be called directly via .colorize( "random" )


    // events bound via _on are removed automatically
    // revert other modifications here
    _destroy: function() {
        // remove generated elements
    },

    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
        // _super and _superApply handle keeping the right this-context

    },

    // _setOption is called for each individual option that is changing
    _setOption: function(key, value) {
        // prevent invalid color values


    }
});
$.widget('snapdeal.carousel', {

    //default options
    options: {
        cardWidth: 200,
        minCards: 2,
        maxCards: 4,
        prevHtml: '<button>prev</button>',
        nextHtml: '<button>next</button>',
        prevText: 'go to prev slide',
        nextText: 'go to next slide',
        infinite: true,
        data: null,
        html: null
    },

    // the constructor
    _create: function() {
        var _self = this;
        this.maxCards = this.options.maxCards;
        this.minCards = this.options.minCards;
        // if()
        var $element = $(this.element);
        var $carouselHtml = $('#craousel').html();
        if (!this.options.html) {
            var template = Handlebars.compile($carouselHtml);
            var html = template(this.options.data)

            $element.append(html);
        } else {
            $element.append(this.options.html);
        }
        // var template = Handlebars.compile($carouselHtml);
        // var html = template(this.options.data)

        // $element.append(html);
        $element.find('.caraousel-wrapper').css({
            minWidth: ((this.options.cardWidth) * (this.minCards)) + 'px'
        });
        $element.find('.caraousel-container').css({
            minWidth: (145 + (this.options.cardWidth) * (this.minCards)) + 'px'
        });

        $element.find('.caraousel-wrapper').before($(this.options.prevHtml).css({
            float: 'left',
            marginTop: '70px'
        }).on('click', _self.prevSlide.bind(_self)));
        $element.find('.caraousel-wrapper').after($(this.options.nextHtml).css({
            float: 'left',
            marginTop: '70px'
        }).on('click', _self.nextSlide.bind(_self)));
        $element.find('.caraousel li').width(this.options.cardWidth);
        this._calculateWidth($(this.element));
        this._registerResize($(this.element));


    },
    nextSlide: function() {
        if (!this.options.infinite) {
            var leftPostion = parseInt($(this.element).find('.caraousel').css('left')) - $(this.element).find('.caraousel-wrapper').width();
            $(this.element).find('.caraousel').animate({
                left: leftPostion
            }, 1000);
        } else {
            var cardsInViewPort = parseInt($('.caraousel-wrapper').width() / (this.options.cardWidth + 20));
            for (var i = 0; i < cardsInViewPort; i++) {
                $(this.element).find('.caraousel li:last').after($(this.element).find('.caraousel li:first'));
            }
        }


    },
    prevSlide: function() {
        if (!this.options.infinite) {

            var leftPostion = parseInt($(this.element).find('.caraousel').css('left')) + $(this.element).find('.caraousel-wrapper').width();
            $(this.element).find('.caraousel').animate({
                left: leftPostion > 0 ? 0 : leftPostion
            }, 1000)
        } else {
            var cardsInViewPort = parseInt($('.caraousel-wrapper').width() / (this.options.cardWidth + 20));
            for (var i = 0; i < cardsInViewPort; i++) {
                $(this.element).find('.caraousel li:first').before($(this.element).find('.caraousel li:last'));
            }
        }

    },

    _calculateWidth: function(element) {

        if (element.width() - 145 < (this.options.cardWidth) * this.maxCards) {
            this.maxCards--;
            this._calculateWidth(element)
        } else {
            element.find('.caraousel-wrapper').width((this.options.cardWidth) * (this.maxCards));
            if (this.maxCards != this.options.maxCards)
                this.maxCards++;
        }

    },


    // called when created, and later when changing options
    _refresh: function() {

    },

    reload: function(event) {
        this._destroy();
        this._create();


    },

    totalCount: function() {

        return $(this.element).find('.caraousel li').length;

    },

    // a public method to change the color to a random value
    // can be called directly via .colorize( "random" )
    _registerResize: function(element) {
        var _self = this;

        var should;
        window.onresize = function() {
            clearTimeout(should)
            should = setTimeout(_self._calculateWidth(element), 500);
        };
    },

    // events bound via _on are removed automatically
    // revert other modifications here
    _destroy: function() {
        // remove generated elements
        $(this.element).find('.caraousel-container').remove();

    },

    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
        // _super and _superApply handle keeping the right this-context

    },

    // _setOption is called for each individual option that is changing
    _setOption: function(key, value) {
        // prevent invalid color values


    }
});
$(document).ready(function() {

    $('.searchbox').searchbox({
        placeholder: "search for a brand, product or specific item",
        buttonText: "search",
        minKeywords: 5,
        searchCallback: function(event, searchValue) {
            alert(searchValue);
        },
        validateKeywords: function(event, searchValue) {
            return searchValue.length > this.minKeywords;
        },
    });


    $(".dummyCarousel").carousel({
        cardWidth: 140,
        data: {
            products: [{
                name: "xyzz1",
                src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz2",
                src: "http://n2.sdlcdn.com/imgs/a/h/2/113x132/Gauba-Traders-Jackly-31-In-SDL797046782-1-b9308.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz3",
                src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg"
            }, {
                name: "xyzz4",
                src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz5",
                src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",
                price: "Rs 1000"
            }, {
                name: "xyzz6",
                src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg"
            }, {
                name: "xyzz7",
                src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz8",
                src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz9        ",
                src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
            }, {
                name: "xyzz10",
                src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz11",
                src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz12",
                src: "http://n3.sdlcdn.com/imgs/a/y/q/113x132/jumbo_1-5c367.jpg"
            }, {
                name: "xyzz13",
                src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",
                price: "Rs 1000"
            }, {
                name: "xyzz14",
                src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz15",
                src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg"
            }, {
                name: "xyzz16",
                src: "http://n3.sdlcdn.com/imgs/a/y/q/113x132/jumbo_1-5c367.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz17",
                src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",
                price: "Rs 1000"
            }, {
                name: "xyzz18",
                src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg"
            }, {
                name: "xyzz19",
                src: "http://n3.sdlcdn.com/imgs/a/y/q/113x132/jumbo_1-5c367.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz20",
                src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz21",
                src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",

                name: "xyzz22",
                src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
                price: "Rs 1000"
            }, {
                name: "xyzz23",
                src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",
                price: "Rs 1000"
            }, {
                name: "xyzz24",
                src: "http://n3.sdlcdn.com/imgs/a/y/q/113x132/jumbo_1-5c367.jpg"
            }]
        },
        html: $('.caraousel-container'),
        minCards: 3,
        maxCards: 7,
        caraouselContainer: "caraousel-container",
        prevHtml: '<button class="btn btn-primary">Prev slide</button>',
        nextHtml: '<button class="btn btn-primary">next slide</button>',
        prevText: 'prev',
        nextText: 'next',
        containerWrapper: "caraousel-wrapper"



    });
    //$(".dummyCarousel").carousel("reload");
    console.log("totalCount is-----", $(".dummyCarousel").carousel("totalCount"));
});