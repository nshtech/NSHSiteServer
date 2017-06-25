$(function(){
$.getJSON('./team.json', function (data) {
    console.log(data)
    var team = '';
    var group_name_before1 = '<div class="row-container team-group-name-container" id="'
    var group_name_before2 = '"><div class="row"><div class="team-group-name"><h2>';
    var group_name_after = '</h2></div></div></div>';
    var row_before = '<div class="row-container team-row-container"><div class="row team-row"><div class="span12 team-span"><div class="team-member-wrapper fixed">';
    var member_before = '<div class="team-member">';
    var img_before = '<img src="_content/team/';
    var img_after = '.jpg" class="team-member-pic">';
    var member_desc_before = '<div class="team-member-description"><div class="team-member-description-inner">';
    var member_name_before ='<div class="team-member-name"><div class="team-member-name-inner"><h3>';
    var member_name_after = '</h3></div></div>';
    var title_before = '<div class="team-member-title"><div class="team-member-title-inner"><p>';
    var title_after = '</p></div></div>';
    var member_desc_after = '</div></div>';
    var member_after = '</div>';
    var row_after = '</div></div></div></div>';
    var blank_space = '<div class="team-member blank"><img src="_content/team/blank-space.jpg" alt=""><div class="team-member-description" style="background: white;"><div class="team-member-description-inner"><div class="team-member-name"><div class="team-member-name-inner"><h3></h3></div></div><div class="team-member-title"><div class="team-member-title-inner"><p></p></div></div></div></div></div>';
    var row;
    var member;

    var group;
    var group_data;
    var name;
    var name_split;
    var first_name;
    var last_name;

    var i = 0;
    var rem;

    for (var group_name in data) {
        if (data.hasOwnProperty(group_name)) {
            group_name_split = group_name.split();
            group = group_name_before1 + group_name_split[0].toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") + group_name_before2 + group_name + group_name_after;
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
                    member += img_after;

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
                    console.log(i)
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
                rem = i % 4;
                team += blank_space.repeat(rem);
                team += row_after;
                i=0;
            }
        }
    };

    $('.groups-btn-group-row-container').after(team);
})

});