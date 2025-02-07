const express=require('express');
const fs=require('fs');
const users=require('./MOCK_DATA.json');
const { json } = require('stream/consumers');

const app=express();

const PORT=8000;

//middleware-plugin
app.use(express.urlencoded({extended:false}));

//Routes
app.get('/users', (req, res) => {
    const html=`
    <ul>
        ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    try {
        return res.send(html);
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
});
app.get('/api/users', (req, res) => {
    try {
        return res.json(users);
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
});

app.route('/api/users/:id').get((req, res) => {
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id ===id);
    try {
        return res.json(user);
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
}).put((req,res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    const body = req.body;

    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.json({ error: "Error writing to file" });
        }
        return res.json({ status: "Success", updatedUser: users[userIndex] });
    });
}).patch((req,res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    const body = req.body;

    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.json({ error: "Error writing to file" });
        }
        return res.json({ status: "Success", updatedUser: users[userIndex] });
    });
}).delete((req,res)=>{
    const userId = parseInt(req.params.id);  
    const userIndex = users.findIndex(user => user.id === userId);  

    users.splice(userIndex, 1); 

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) { 
            return res.json({ error: "Error writing to file" });
        }
        return res.json({ status: "Success", message: "User deleted" });  
    });
})

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        try {
            return res.json({status:"Success",id:users.length});
        } catch (error) {
            return res.json({ error: "Error parsing JSON" });
        }
    });
});


app.listen(8000,(req,res)=>console.log(`Server started at PORT:${PORT}`));
