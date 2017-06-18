$(function(){

$.getJSON('./team.json', function (data) {
    var team = '';
    var group_name_before1 = '<div class="row-container team-group-name-container" id="'
    var group_name_before2 = '"><div class="row"><div class="team-group-name"><h2>';
    var group_name_after = '</h2></div></div></div>';
    var row_before = '<div class="row-container team-row-container"><div class="row team-row"><div class="span12 team-span"><div class="team-member-wrapper fixed">';
    var member_before = '<div class="team-member">';
    var img_before = '<img src="_content/team/';
    var img_after1 = '.jpg" class="team-member-pic ';
    var img_after2 = '">';
    var member_desc_before = '<div class="team-member-description"><div class="team-member-description-inner">';
    var member_name_before ='<div class="team-member-name"><div class="team-member-name-inner"><h3>';
    var member_name_after = '</h3></div></div>';
    var title_before = '<div class="team-member-title"><div class="team-member-title-inner"><p>';
    var title_after = '</p></div></div>';
    var member_desc_after = '</div></div>';
    var member_after = '</div>';
    var row_after = '</div></div></div></div>';
    var blank_space = '<div class="team-member"><img src="_content/team/blank-space.jpg" alt=""><div class="team-member-description" style="background: white;"><div class="team-member-description-inner"><div class="team-member-name"><div class="team-member-name-inner"><h3></h3></div></div><div class="team-member-title"><div class="team-member-title-inner"><p></p></div></div></div></div></div>';
    var row;
    var member;

    var group;
    var group_name_first;
    var group_data;
    var name;
    var name_split;
    var first_name;
    var last_name;

    // preload images
    var preload_name_split;
    var preload_name;
    var preload_group_data;
    var count = 0;
    var images = [];
    for (var group_name in data) {
      if (data.hasOwnProperty(group_name)) {
        preload_group_data = data[group_name];
        for (var name in group_data) {
            if(group_data.hasOwnProperty(name)) {
              preload_name_split = name.split(" ");
              images[count] = new Image();
              images[count].src = '_content/team/' + name_split[0].toLowerCase() + "-" + name_split[1].toLowerCase() + '.jpg';
            }
          }
        }
    }

    var i = 0;
    var rem;

    for (var group_name in data) {
        if (data.hasOwnProperty(group_name)) {
            group_name_first = group_name.split(" ")[0].toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}|=\-_`~()]/g,"");
            group = group_name_before1 + group_name_first + group_name_before2 + group_name + group_name_after;
            team += group;

            group_data = data[group_name];

            row = row_before;
            for (var name in group_data) {

                if(group_data.hasOwnProperty(name)) {

                    title = group_data[name];
                    name_split = name.split(" ");
                    first_name = name[0].toLowerCase();
                    last_name = name[1].toLowerCase();

                    member = member_before;

                    member += img_before;
                    member += name_split[0].toLowerCase();
                    member += "-";
                    member += name_split[1].toLowerCase();
                    member += img_after1;
                    member += group_name_first;
                    member += img_after2;

                    member += member_desc_before;

                    member += member_name_before;
                    member += name;
                    member += member_name_after;
                    member += title_before;
                    member += title;
                    member += title_after;

                    member += member_desc_after;

                    member += member_after;

                    row += member;

                    i++;
                    if (i === 4) {
                        i = 0;
                        team += row;
                        team += row_after;
                        row = row_before;
                    }
                }
            }

            if (i !== 0) {
                team += row;
                rem = 4 - i;
                team += blank_space.repeat(rem);
                team += row_after;
                i=0;
            }
        }
    };

    $('.groups-btn-group-row-container').after(team);

    $('#groups-btn-group').localScroll({duration:800, offset: -100});

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

    var groups = $('.team-group-name-container');
    var group = {};
    var loaded = new Object();
    var numImages = new Object();
    var groupId = '';
    var thisClass = '';
    var images = [];

    for (var i = 0; i <= groups.length; i++) {
        group = $(groups[i]);
        groupId = group.attr('id');
        loaded[groupId] = 0;

        images = $('.' + groupId);
        // console.log(images)
        numImages[groupId] = images.length;

        images.load(function(){
            thisClass = $(this).attr('class').split(" ")[1];

            ++loaded[thisClass];

            if (loaded[thisClass] === numImages[thisClass]) {
            //Scroll to group effect

                //Grayscale effect
                $('.' + thisClass).each(function() {
                    $(this).wrap('<div class="member-pic-wrapper" style="display:inline-block">').clone().addClass('gotcolors').css({'position': 'absolute', 'opacity' : 0 }).insertBefore(this);
                    this.src = grayscale(this.src);
                }).animate({opacity: 1}, 500);

                $('.' + thisClass).parent().hover(
                    function() {
                        $(this).find('.gotcolors').css({'width': $(this).width(), 'height':$(this).width()}).stop().animate({opacity: 1}, 400);
                        $(this).next().stop().animate({'color': '#CE4115'}, 400);
                    },
                    function() {
                        $(this).find('.gotcolors').stop().animate({opacity: 0}, 400);
                        $(this).next().stop().animate({'color': '#393939'}, 400);
                    }
                );

                //Description font color effect
                $('.' + thisClass).parent().next().hover(
                    function() {
                        $(this).prev().find('.gotcolors').css({'width': $(this).width(), 'height':$(this).width()}).stop().animate({opacity: 1}, 400);
                        $(this).stop().animate({'color': '#CE4115'}, 400);
                    },
                    function() {
                        $(this).prev().find('.gotcolors').stop().animate({opacity: 0}, 400);
                        $(this).stop().animate({'color': '#393939'}, 400);
                    }
                );

            }

        });
    };

});
});
