const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    usersRouts = require('./routes/api/users'),
    authRoutes = require('./routes/api/auth'),
    postsRoutes = require('./routes/api/posts'),
    profileRoutes = require('./routes/api/profile')


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/network', {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
        })
        console.log("MongoDB is connected");

    } catch (error) {
        console.error(error.message);
        //exit proccess with failure
        process.exit(1)
    }
}
connectDB()

//init middleware
app.use(express.json({extended: false}))



app.get("/", (req, res) => res.send("API is running"))

//define routes
app.use('/api/users', usersRouts);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/profile', profileRoutes);





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

