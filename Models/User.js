const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required.'],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is Required.'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide valid email.']

    },
    password: {
        type: String,
        required: [true, 'Password is Required.'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm Password is Required.'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password and Confirm Password are not same.'
        }
    },

    phone: {
        type: String,
        required: [true, 'Phone is Required.']
    },
    role: {
        type: String,
        enum: ["user", "guide", "admin"],
        default: "user"
    },
    profile: {
        type: String,
        default: "default.jpg"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    passwordCreatedAt: {
        type: Date
    },
    passwordResetToken: {
        type: String
    }
}, {
    timestamps: true
});
schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});


schema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
};






const User = mongoose.model('users', schema);

module.exports = User;