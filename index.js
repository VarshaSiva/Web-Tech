const express = require("express") const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo") const port = process.env.PORT || 4000 app.use(express.json())
app.use(express.urlencoded({ extended: false })) app.use(express.static(path.join( dirname, '../public'))); const tempelatePath = path.join( dirname, '../tempelates'); app.set('view engine', 'hbs')
app.set('views', tempelatePath)

// hbs.registerPartials(partialPath) app.get('/signup', (req, res) => {
res.render('signup')
})
app.get('/login', (req, res) => { res.render('login')
})
app.get('/forgot', (req, res) => { res.render('forgot')
})
app.get('/admin', (req, res) => { res.render('admin')
})
app.get('/marks', (req, res) => { res.render('marks')
})
app.get('/about', (req, res) => { res.render('about')
})
app.get('/', (req, res) => { res.render('home')
})
app.post('/signup', async (req, res) => {
// const data = new LogInCollection({
//	name: req.body.name,
//	password: req.body.password
// })
// await data.save() const data = {
name: req.body.name, rollnumber: req.body.roll, dob: req.body.dob,
std: req.body.std, email: req.body.em,
phonenumber: req.body.ph, password: req.body.ps, confirmpassword: req.body.cps

}
await LogInCollection.insertMany([data])
res.status(201).render("home", { naming: req.body.name
})
})
app.post('/login', async (req, res) => { try {
const check = await LogInCollection.findOne({ name: req.body.name })

if (check.password === req.body.ps) { res.status(201).render("home", { naming: `${req.body.name}`
,rolll:`${req.body.roll}`})
}
else {
res.send("incorrect password")
}
}
catch (e) {
res.send("wrong details")
}
})
app.post('/admin', async (req, res) => { try {
const check = await LogInCollection.findOne({ name: req.body.name })

if (check.password === req.body.ps) { res.status(201).render("home", { naming: `${req.body.name}` })
}
else {
res.send("incorrect password")
}
 
}
catch (e) {
res.send("wrong details")
}
})
app.post('/forgot', async (req, res) => { const filter = { name:req.body.name };
const update = { password:req.body.ps,confirmpassword:req.body.ps};

let doc = await LogInCollection.findOneAndUpdate(filter, update); console.log("updated successfully"); res.status(201).render("home", { naming: `${req.body.name}` })
})
app.post('/marks', async (req, res) => { try {
const subject = req.body.subject; const marks = req.body.marks;
// Assuming you have a MongoDB model/schema for storing marks const mark = new MarkCollection({
subject: subject, marks: marks
});
await mark.save();

res.status(201).render("home", { naming: req.body.name });
} catch (e) {
res.send("Error occurred while adding marks");
}
});
app.listen(port, () => { console.log('port connected');
})
