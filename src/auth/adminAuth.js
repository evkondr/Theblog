module.exports={             
    validate: async (request, token, h) => {
        const isValid = token === '1234';
        const credentials = { token };
        const artifacts = { test: 'info' };
        return { isValid, credentials, artifacts };
    }
}