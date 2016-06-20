Template.profileViews.events({
    'click .profile-view-container': function(e){
        var comp = $(e.target);
        var route = ""
        if(comp.attr('data-view') === undefined){
            route = comp.closest(".profile-view-container").attr('data-view');
        }else {
            route = comp.attr('data-view');
        }
        Router.go(route);
    }
});