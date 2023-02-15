const jwt = require('jsonwebtoken');

exports.signToken = (userId, roleType) => {
    const token = jwt.sign(
        {
            userId,
            roleType,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};
