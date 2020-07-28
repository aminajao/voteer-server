# voteer-server
This us the backend for a mobile voting application

/login = login route


/candidates = get all candidates


/candidate/:id = get the specific candidate by his/her id from param


/candidate = post new candidates detail

 newCandidate = new Candidate({
      fullName: req.body.fullName,
      email:req.body.email,
    department:req.body.department,
    level:req.body.level,
    image:req.body.image
    });
    details include fullName, email, department, level, image link from cloudinary (or any online media/file db ur using)
