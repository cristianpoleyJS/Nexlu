Meteor.publish('publication.me.all', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({"owner.0.id": user_id}, {fields: Fields.publication.all});
});

Meteor.publish('user.me', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Meteor.users.find(user_id, {
        fields: Fields.user.all
    });
});

Meteor.publish('publication.me.none', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({"owner.0.id": user_id}, {fields: Fields.publication.none});
});

Meteor.publish("findBio", function () {
    return Meteor.users.find(this.userId);
});

Meteor.publish('image.me.miniature', function(){
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Images.find({'owner.id': user_id}, {fields: Fields.image.miniature});
});
Meteor.publish('publication.followed.all', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    var followed_id = Meteor.users.find(user_id, {fields: Fields.user.followed}).fetch();
    return Publications.find({"owner.0.id": {"$in": [followed_id.followed]}}, {fields: Fields.publication.all});
});
Meteor.publish('image.one', function(img_id){
    return Images.find(img_id, {fields: Fields.image.all});
});

Meteor.publish("findUser", function(username) {
    return Meteor.users.findOne({"username": username}, { fields: { "username": 1 } } );
});

/*
Diccionario para almacenar todos los fields que se mostraran al publicar una colección.
Esto se realiza para poder centralizar los cambios. Si por ejemplo, se añaden nuevos atributos a un usuario,
cambiando solo en este diccionario cambiaremos todas las publicaciones automaticamente.
 */
Fields = {
    user: {
        all: {
            _id: 1,
            username: 1,
            emails: 1,
            bio: 1,
            followed: 1,
            followers: 1,
        },
        followed: {
            followed: 1
        }
    },
    publication: {
        all: {
            _id: 1,
            owner: 1,
            createdAt: 1,
            playersTagged: 1,
            description: 1,
            playersLike: 1,
            playersDislike: 1,
            comments: 1
        },
        none: {
            _id: 1
        }
    },
    image: {
        miniature: {
            _id: 1,
            owner: 1,
            url: 1
        },
        all: {
            _id: 1,
            owner: 1,
            url: 1,
            createdAt: 1,
            playersTagged: 1,
            description: 1,
            playersLike: 1,
            playersDislike: 1,
            comments: 1
        }
    }
};