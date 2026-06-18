import iwt from 'jsonwebtoken';

const createToken = async(userId) => {
    try {
        const token = await iwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token;
    } catch (error) {
        console.log("Error creating token");
    }
}

export default createToken;