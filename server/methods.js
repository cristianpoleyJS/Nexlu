Meteor.methods({
    'user_create':function (user) {
        var username_no_errors = Util.validate_username(user[0]);
        var password_no_errors = Util.validate_password(user[1], user[3]);
        var email_no_errors = Util.validate_email(user[2]);
        if(username_no_errors == true  && email_no_errors == true && password_no_errors == true){
            try {
                userId = Accounts.createUser({
                    username: user[0],
                    password: user[1],
                    email: user[2]
                });
                Meteor.users.update(userId, {
                    $set: {
                        bio: TAPi18n.__(" "),
                        followers: [],
                        followed: []
                    }
                });
            } catch (error) {
                throw new Meteor.Error("Server error", error);
            }
            Accounts.sendVerificationEmail(userId);
        }
    },
    'modify_bio': function(bio){
        if(bio == ""){
            bio = TAPi18n.__(" ");
        }
        var userId = Meteor.userId();
        Meteor.users.update(userId, {
            $set: {
                bio: bio
            }
        });
    },
    'send_email_verification': function(user){
        var userDB = Meteor.users.findOne({'username': user[0]});
        Accounts.sendVerificationEmail(userDB._id);
    },

    'checkUniqueUser': function(usernameRegister){
        return Meteor.users.find({'username': usernameRegister}).fetch().length==0
    },

    'checkUniqueEmail': function(emailRegister){
        return Meteor.users.find({'emails.0.address': emailRegister}).fetch().length==0
    },
    'deCodificaString': function (codificado) {
        var decodedString = Base64.decode(codificado);
        return decodedString;
    },
    "image.new": function(data){
        var user = Meteor.user();
        if(user!=undefined){
            var image = {
                owner: [
                    {
                        id: user._id,
                        username: user.username
                    }
                ],
                createdAt: new Date(),
                playersTagged: [], //TODO: Añadir etiquetas
                description: data.description,
                playersLike: [],
                playersDislike: [],
                comments: [],
                url: data.url
            };
            return Images.insert(image);
        }else{
            throw Meteor.Error("User not logued");
        }
    },
    'send_message_about': function(info) {
        Email.send({
            to: "infonexlu@gmail.com",
            from: info[0],
            subject: info[0],
            text: info[1] + "\n\n" + info[2]
        });
    }
});