Meteor.startup(function () {
    // code to run on server at startup
    if (Meteor.users.find().count() === 0) {ç
        createUsers();
    }

    if (FriendRequests.find().count() === 0){ç
        createFriendRequests();
    }

    if (ChatRooms.find().count() === 0){ç
        createChatRooms();
    }
    
});


function createUsers(){
	var id_user1 = Accounts.createUser({
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'user1',
    });

    var id_user2 = Accounts.createUser({
            username: 'user2',
            email: 'user2@gmail.com',
            password: 'user2',
    });
    var id_user3 = Accounts.createUser({
            username: 'user3',
            email: 'user3@gmail.com',
            password: 'user3',
    });

    var id_user4 = Accounts.createUser({
        username: 'user4',
        email: 'user4@gmail.com',
        password: 'user4',
    });

    var id_user5 = Accounts.createUser({
        username: 'user5',
        email: 'user5@gmail.com',
        password: 'user5',
    });

    Meteor.users.update(id_user1, {
        $set: {
            friends: [id_user2],
            "emails.0.verified": true,
        }
    });

    Meteor.users.update(id_user2, {
        $set: {
            friends: [id_user1, id_user3, id_user4, id_user5],
            "emails.0.verified": true,
        }
    });

    Meteor.users.update(id_user3, {
        $set: {
            friends: [id_user2],
            "emails.0.verified": true,
        }
    });

    Meteor.users.update(id_user4, {
        $set: {
            friends: [id_user2, id_user5],
            "emails.0.verified": true,
        }
    });

    Meteor.users.update(id_user5, {
        $set: {
            friends: [id_user2, id_user4],
            "emails.0.verified": true,
        }
    });

}

function createFriendRequests(){
    var user1 = Meteor.users.findOne({username: 'user1'});
    var user2 = Meteor.users.findOne({username: 'user2'});
    var user3 = Meteor.users.findOne({username: 'user3'});
    var user4 = Meteor.users.findOne({username: 'user4'});
    var user5 = Meteor.users.findOne({username: 'user5'});

    FriendRequests.insert({
        createdAt: new Date('2016-06-02'),
        from: user1._id,
        to: user3._id,
    });

    FriendRequests.insert({
        createdAt: new Date('2016-06-03'),
        from: user4._id,
        to: user1._id,
    });

}

function createChatRooms(){
    var user1 = Meteor.users.findOne({username: 'user1'});
    var user2 = Meteor.users.findOne({username: 'user2'});
    var user3 = Meteor.users.findOne({username: 'user3'});
    var user4 = Meteor.users.findOne({username: 'user4'});
    var user5 = Meteor.users.findOne({username: 'user5'});

    ChatRooms.insert({
        players: [user1._id, user2._id],
        messages: [
            {
                order: 1,
                createdAt: new Date('2016-06-03'),
                message: "Hola!",
                player: user1._id
            },
            {
                order: 2,
                createdAt: new Date('2016-06-03'),
                message: "Hola user1! Me alegro de verte!",
                player: user2._id
            },
            {
                order: 3,
                createdAt: new Date('2016-06-03'),
                message: "Igualmente! Que tal te va todo?",
                player: user1._id
            },
            {
                order: 4,
                createdAt: new Date('2016-06-03'),
                message: "No puedo quejarme la verdad!!",
                player: user2._id
            },
            {
                order: 5,
                createdAt: new Date('2016-06-03'),
                message: "Trabajando mucho, pero ya llega el verano!",
                player: user2._id
            },
            {
                order: 6,
                createdAt: new Date('2016-06-03'),
                message: "Jaja espero verte este verano!",
                player: user1._id
            }
        ]
    });

    ChatRooms.insert({
        players: [user2._id, user3._id],
        messages: [
            {
                order: 1,
                createdAt: new Date('2016-06-03'),
                message: "Hola user2!",
                player: user2._id
            },
            {
                order: 2,
                createdAt: new Date('2016-06-03'),
                message: "Hola user1! que tal?! :)",
                player: user3._id
            },
            {
                order: 3,
                createdAt: new Date('2016-06-03'),
                message: "Muy bien! No sabia que tu usases esta aplicación!",
                player: user2._id
            }
        ]
    });
}