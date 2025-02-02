const express=require('express');
const users=require('./MOCK_DATA.json')

const app=express();

const PORT=8000;

//Routes
//REST API
app.get('/users', (req, res) => {
    const html=`
    <ul>
        ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    try {
        return res.send(html);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.route('/api/users/:id').get((req, res) => {
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id ===id);
    try {
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}).put((req,res)=>{
    //TODO:create user with ID
    try {
        return res.json({status:"pending"});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}).patch((req,res)=>{
    //TODO:Edit the user with id 
    try {
        return res.json({status:"pending"});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}).delete((req,res)=>{
    //TODO:Delete the user with id 
    try {
        return res.json({status:"pending"});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
})

app.post('./api/users',(req,res)=>{
    //TODO:create new user
    try {
        return res.json({status:"pending"});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(8000,(req,res)=>console.log(`Server started at PORT:${PORT}`));