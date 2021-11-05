module.exports = {
    normalize: (userToNormalize) => {
        const propertyToDelete = {
            password: undefined
        };

        Object.assign(userToNormalize, propertyToDelete);

        return userToNormalize;
    }
};
