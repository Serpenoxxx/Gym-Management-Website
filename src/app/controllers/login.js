module.exports = {
    post(req, res) {
        temp = req.session;
        temp.username = req.body.username;
        temp.password = req.body.pass;
    
        bcrypt.hash(temp.password, 10, function(err, hashed){
            const query = `SELECT * FROM admin WHERE username='${temp.username}' AND password='${hashed}';`
            bcrypt.compare(temp.password, hashed, (err, isMatch) => {
                if (err) {
                    alert('Incorrect Password')
                    return
                }
                db.query(query, (err, res) => {
                    if (err) {
                        console.log(err)
                        return
                    } else {
                        alert('Login Successfull')
                        console.log('Login Successfull')
                        res.end
                    }
                });
            });
        })
    },
}