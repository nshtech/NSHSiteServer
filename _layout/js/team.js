$(function(){
    //Scroll to group effect
    $('#groups-btn-group').localScroll({duration:400, offset: -100});

    var grayscale = function(src) {
        var supportsCanvas = !!document.createElement('canvas').getContext;
        if (supportsCanvas) {
            var canvas = document.createElement('canvas'), 
            context = canvas.getContext('2d'), 
            imageData, px, length, i = 0, gray, 
            img = new Image();
            
            img.src = src;
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
                
            imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            px = imageData.data;
            length = px.length;
            
            for (; i < length; i += 4) {
                gray = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11;
                px[i] = px[i + 1] = px[i + 2] = gray;
            }
                    
            context.putImageData(imageData, 0, 0);
            return canvas.toDataURL();
        } else {
            return src;
        }
    };

    //Grayscale effect
    $('.team-member-pic-color').each(function() {
        $(this).wrap('<div class="member-pic-wrapper" style="display:inline-block">').clone().addClass('gotcolors').css({'position': 'absolute', 'opacity' : 0 }).insertBefore(this);
        this.src = grayscale(this.src);
    }).animate({opacity: 1}, 500);

    $(".member-pic-wrapper").hover(
        function() {
            $(this).find('.gotcolors').css({'width': $(this).width(), 'height':$(this).width()}).stop().animate({opacity: 1}, 200);
            $(this).next().css({background-color: })
        }, 
        function() {
            $(this).find('.gotcolors').stop().animate({opacity: 0}, 500);
        }
    );
});