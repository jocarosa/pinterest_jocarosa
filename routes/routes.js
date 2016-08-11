
var Link             = require('../model/Links');
var request			 = require('request');

module.exports= function(app,passport){
    
    app.get('/auth/twitter',passport.authenticate('twitter'));
	
	app.get('/twitter/callback',passport.authenticate('twitter', {
			successRedirect: '/#'
		}));
	
	app.get('/logout',function (req, res) {
			req.logout();
			res.redirect('/#');
		});
		
    app.get('/session',function(req,res){
    	if (req.user){
    		res.send(req.user.twitter);
    	}
    });
   
	   
    
    app.post('/validateLink',function(req,res){
       
        var url= req.body.link;
            
           validateL([{link:url}],res);
        
    });
    
    
    function validateL(urls,res){
    
     var urlcont = [];
     var index   = 0;
     
     urls.forEach(function(value){
        
        request(value.link, function (error, response, body) {
            
			if (!error && response.statusCode == 200) {
    		   urlcont.push({msg:'si',img:value.link}); // Send the url if the response is ok
    		     
			}else{
				urlcont.push({msg:'no existe',img:'../img/noavailable.png'});
			
			}
			
			index++;
			
			if(index==urls.length){
			    res.send(urlcont);
			}
			
			
			//res.send(urlcont);
		}); 
     });
     
        
    }
    
    app.post('/insertLink',function(req,res){
    
    	var linkToInsert = req.body.inLink;
        
        Link.find({link:linkToInsert},function(err,result){
        	
        	if(result.length == 0){
        		
        			var options={link:linkToInsert, idUser:req.user.twitter.id};
        			
        			var newLink = new Link(options);
        		
        			newLink.save(function(err,doc){
        				console.log('newLink: '+doc);
        			});
        			res.send('Link inserted!');
        	}else{
        	res.send('Already exist!');
        	}	
        });
    	
    		
    });
    
    
    app.post('/getLinks',function(req,res){
    	var dame      = req.body.dame;
    	var options   = {};
    	
    	if(dame=="my"){
    		
    		options   = {idUser:req.user.twitter.id};
    	}
    	
    	Link.find(options,function(err,links){
    		 if(links.length>0){
    		    validateL(links,res);
    		 }else{
    		     res.send([{msg:"no existe",link:"Please insert a link"}])
    		 }
    	});
    });
    
    app.post('/deleteLink',function(req,res){
    	
    	var linkD= req.body.linkToDelete;
    	
    	Link.remove({link:linkD},function(err,doc){console.log('doc removed')})
    	
    });
    
};