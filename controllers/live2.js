exports.live2 = (req, res) => {
    console.log(req.params);
      res.render('live2', {
        title: 'Live2',
        language: 'english'
      });
  
  };
  