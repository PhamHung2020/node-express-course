const login = (req, res) => {
    res.status(200).send('fake login');
}

const dashboard = (req, res) => {
    const secret = Math.floor(Math.random() * 100);
    res.status(200).json({message: `Your secret is ${secret}`});
}

module.exports = {
    login,
    dashboard
}